<template>
  <div class="line-chart">
    <line-chart ref="canvas" :data="chartData" :options="chartOptions" :height="240"/>
  </div>
</template>
<script>
  import LineChart from "@/components/chartjs/line-chart"

  export default {
    name: 'UsersEventsChart',
    components: {LineChart},
    data () {
      return {
        chartOptions: {
          legend: {display: false},
          maintainAspectRatio: false
        },
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: 'rgba(123, 203, 0, .3)',
              data: [40, 39, 10, 40, 39, 80, 40]
            }, {
              label: 'Data Two',
              backgroundColor: 'rgba(5, 203, 225, .3)',
              data: [60, 55, 32, 10, 2, 12, 53]
            }
          ]
        }
      }
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

</style>
