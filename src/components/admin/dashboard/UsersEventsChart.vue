<template>
  <div>
    <el-row type="flex">
      <el-radio-group id="period" @change="plotChart" v-model="period" size="mini">
        <el-radio-button label="1h">1 ч</el-radio-button>
        <el-radio-button label="3h">3 ч</el-radio-button>
        <el-radio-button label="12h">12 ч</el-radio-button>
        <el-radio-button label="day">День</el-radio-button>
        <el-radio-button label="week">Неделя</el-radio-button>
      </el-radio-group>
      <div id="transfer_switch">
        <el-switch v-model="expandTransfer"></el-switch>
      </div>
    </el-row>
    <transition name="fade">
      <el-transfer
        v-if="expandTransfer"
        style="margin-bottom: 10px;"
        :titles="['Все события', 'На график']"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="Поиск события"
        :right-default-checked="[0]"
        v-model="transferModel"
        :data="transferData"
        @change="handleTransferChange">
      </el-transfer>
    </transition>
    <div class="line-chart">
      <line-chart :chartData="chartData" :options="chartOptions" :height="280"/>
    </div>
  </div>
</template>
<script>
  import {db, fs} from '@/services/fireinit'
  import LineChart from "@/components/chartjs/line-chart"

  export default {
    name: 'UsersEventsChart',
    components: {LineChart},
    data() {
      return {
        expandTransfer: false,
        period: 'day',
        groupedEvents: '',
        eventsForPlot: ['Главная страница'],
        transferModel: ['Главная страница'],
        transferData: [],
        filterMethod(query, item) {
          return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
        },
        chartOptions: {
          legend: {display: false},
          maintainAspectRatio: false
        },
        chartData: {labels: [], datasets: []},
        dateOptions: {
          month: 'long',
          day: 'numeric',
          timezone: 'UTC'
        }
      }
    },
    methods: {
      handleTransferChange(value, direction, movedKeys) {
        this.eventsForPlot = value
        this.plotChart()
      },
      fetchEvents: function () {
        console.log('Fetch: events data')
        return db.ref('events').once('value', snap => {
          let events = []
          let data = snap.val()
          for (let userId in data) {
            for (let eventId in data[userId]) {
              events.push(data[userId][eventId])
            }
          }
          this.groupedEvents = this.groupEventsByName(events, 'name')
        });
      },
      async plotChart() {
        this.$store.commit('LOADING', true)
        if (!this.groupedEvents) {
          await this.fetchEvents()
        }
        let eventNames = []
        for (let eName in this.groupedEvents) {
          eventNames.push({
            label: `${this.groupedEvents[eName].length}: ${eName}`,
            key: eName,
            count: this.groupedEvents[eName].length
          })
        }
        this.transferData = this.sortByProp(eventNames, 'count')

        let chartData = {
          labels: [],
          datasets: []
        }

        for (let i = 0; i < this.eventsForPlot.length; i++) {
          chartData.datasets.push({
            data: [],
            label: this.eventsForPlot[i],
            backgroundColor: i === 0 ? 'rgba(99, 185, 250, .3)' : this.random_rgba()
          })
          let group = this.groupByTime(this.groupedEvents[this.eventsForPlot[i]])
          for (let interval in group) {
            chartData.datasets[i].data.push(group[interval])
            if (i === 0) {
              chartData.labels.push(new Date(parseInt(interval)).toLocaleString('RU', this.dateOptions))
            }
          }
        }

        this.chartData = chartData
        this.$store.commit('LOADING', false)
      },
      groupByTime(arr) {
        let i
        let m
        if (this.period === '1h') {
          m = 1 / 24;
          this.dateOptions = {hour: 'numeric'}
        } else if (this.period === '3h') {
          m = 1 / 7
          this.dateOptions = {hour: 'numeric'}
        } else if (this.period === '12h') {
          m = 1 / 2
          this.dateOptions = {day: 'numeric', month: 'long'}
        } else if (this.period === 'day') {
          m = 1
          this.dateOptions = {day: 'numeric', month: 'long'}
        } else if (this.period === 'week') {
          m = 7
          this.dateOptions = {day: 'numeric', month: 'long'}
        }
        let iDate = 1000 * 60 * 60 * 24 * m
        let periodStart
        let group = {}
        arr.sort()
        arr.forEach(date => {
          i = Math.floor(date / iDate)
          periodStart = i * iDate
          if (group[periodStart]) {
            group[periodStart] += 1
          } else {
            group[periodStart] = 1
          }
        })
        return group
      },
      groupEventsByName(arr, prop) {
        let grouped = {}
        for (let item of arr) {
          let p
          if (item[prop]) {
            p = item[prop]
          } else { // without prop
            continue
          }
          if (!grouped[p]) grouped[p] = []
          grouped[p].push(item.date)
        }
        return grouped
      },
      sortByProp(arr, prop) {
        let x, y
        return arr.sort(function (a, b) {
          x = a[prop] ? a[prop] : ''
          y = b[prop] ? b[prop] : ''
          return x === y ? 0 : +(x < y) || -1
        })
      },
      random_rgba() {
        let r = Math.floor(Math.random() * 256)
        let g = Math.floor(Math.random() * 256)
        let b = Math.floor(Math.random() * 256)
        return 'rgb(' + r + ',' + g + ',' + b + ', .3)';
      }
    },
    created() {
      this.plotChart()
    }
  }
</script>
<style scoped lang="scss">
  h3 {
    margin: 0px;
  }

  p {
    margin: 10px;
  }

  .line-chart {
    margin-bottom: 12px;
  }

  #period {
    margin-bottom: 10px;
  }

  #transfer_switch {
    margin-top: 3px;
    margin-left: 15px;
  }
</style>
