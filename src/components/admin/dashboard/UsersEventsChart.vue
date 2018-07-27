<template>
  <div>
    <el-row type="flex">
      <el-radio-group id="period" @change="plotChart" v-model="period" size="mini">
        <el-radio-button label="hour">час</el-radio-button>
        <el-radio-button label="day">День</el-radio-button>
        <el-radio-button label="week">Неделя</el-radio-button>
        <el-radio-button label="month">Месяц</el-radio-button>
      </el-radio-group>
      <div id="transfer_switch">
        <el-switch v-model="expandTransfer"></el-switch>
      </div>
    </el-row>
    <transition name="fade">
      <el-transfer
        v-if="expandTransfer"
        id="transfer"
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
          legend: {display: true},
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
        this.transferData = this.sortByProp(eventNames, 'count').slice(0, 101) // get top 101 events

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
        let m = 0
        let periodStart = new Date()
        if (this.period === 'hour') {
          m = 1 / 24;
          this.dateOptions = {hour: 'numeric', minute: 'numeric'}
          periodStart.setDate(periodStart.getDate() - 1) // one day display
        } else if (this.period === 'day') {
          m = 1
          this.dateOptions = {day: 'numeric', month: 'long'}
          periodStart.setDate(periodStart.getDate() - 11)
        } else if (this.period === 'week') {
          m = 7
          this.dateOptions = {day: 'numeric', month: 'long'}
          periodStart.setDate(periodStart.getDate() - 92)
        } else if (this.period === 'month') {
          m = 31
          this.dateOptions = {month: 'long'}
          periodStart.setDate(periodStart.getDate() - 367)
        }
        let now = new Date()
        let iLength = 1000 * 60 * 60 * 24 * m
        let intervalStart = new Date()
        let intervals = []
        let i = 1
        while (intervalStart > periodStart) {
          intervalStart = now - i * iLength
          intervals.unshift(intervalStart)
          i++
        }
        let group = {}
        intervals.forEach(date => {
          group[date] = 0
          arr.forEach(eventDate => {
            if (eventDate > date && eventDate < date + iLength) {
              if (group[date]) {
                group[date] += 1
              } else {
                group[date] = 1
              }
            }
          })
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
        return arr.sort(function (a, b) {
          return a[prop] === b[prop] ? 0 : +(a[prop] < b[prop]) || -1
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
    margin-bottom: 5px;
  }

  #transfer_switch {
    margin-top: 3px;
    margin-left: 15px;
  }

  #transfer {
    margin-bottom: 10px;
    margin-top: 15px;
  }
</style>
