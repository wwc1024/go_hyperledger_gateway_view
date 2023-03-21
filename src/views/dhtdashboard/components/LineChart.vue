<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default() {
        return {
          title: '温度视图',
          dhtId: undefined,
          time: undefined,
          nowTempList: undefined
          // averageTempList: [200, 180, 190, 130, 150, 100, 100]
        }
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: this.chartData.dhtId + '温度视图',
          textStyle: {
            fontSize: 15
          }
        },

        dataZoom: [
          {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            startValue: this.chartData.time.length - 6,
            end: 100,
            filterMode: 'filter'
          }],
        xAxis: {
          // max: 5,
          align: 'center',
          data: this.chartData.time,
          boundaryGap: true,
          axisTick: {
            length: 5,
            show: false
          },
          axisLabel: {
            formatter: function(value) {
              var ret = ''
              var maxLength = 10
              var valLength = value.length
              var rowN = Math.ceil(valLength / maxLength)
              if (rowN > 1) {
                for (var i = 0; i < rowN; i++) {
                  var temp = ''
                  var start = i * maxLength
                  var end = start + maxLength
                  // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + '\n'
                  ret += temp
                }
                return ret
              } else {
                return value
              }
            },
            overflow: 'break'
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 45,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          type: 'value',
          name: '',
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['时刻温度', '预警温度']
        },
        series: [
          {
            name: '时刻温度',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                }
              }
            },
            smooth: false,
            type: 'line',
            data: this.chartData.nowTempList,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
          // {
          //   name: '湿度',
          //   smooth: true,
          //   type: 'line',
          //   itemStyle: {
          //     normal: {
          //       color: '#FF005A',
          //       lineStyle: {
          //         color: '#FF005A',
          //         width: 2
          //       },
          //       areaStyle: {
          //         color: '#f3f8ff'
          //       }
          //     }
          //   },
          //   data: this.chartData.humitidy,
          //   animationDuration: 2800,
          //   animationEasing: 'quadraticOut'
          // }
        ]
      })
    }
  }
}
</script>
