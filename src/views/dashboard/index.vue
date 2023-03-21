<template>
  <div class="dashboard-editor-container">
    <panel-group :data="panelGroupData" />
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { panelGroupData, serviceNumStat, servicelineStat } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      panelGroupData: {
        'serviceNum': 23,
        'allServiceRequestNum': 1200,
        'currentQps': 200,
        'appNum': 5
      },

      lineChartData: {
        'title': '服务数',
        'allService': [1, 2, 3],
        'joinService': [1, 2, 1]
      },
      pieChartData: {
        'title': '服务占比',
        'legend': [1],
        'series': [1]
      }
    }
  },
  created() {
    this.fetchPanelGroupData()
    this.fetchserviceNumStat()
    this.fetchServicelineStat()
  },
  methods: {
    fetchPanelGroupData(id) {
      panelGroupData({ }).then(response => {
        this.panelGroupData = response.data
      }).catch(() => {
      })
    },
    fetchserviceNumStat(id) {
      serviceNumStat({ }).then(response => {
        this.lineChartData.allService = response.data.allService
        this.lineChartData.joinService = response.data.joinService
      }).catch(() => {
      })
    },
    fetchServicelineStat(id) {
      servicelineStat({ }).then(response => {
        this.pieChartData.legend = response.data.legend
        this.pieChartData.series = response.data.data
      }).catch(() => {
      })
    },
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
