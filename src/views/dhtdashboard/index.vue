<template>
  <div class="dashboard-editor-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.info"
        placeholder="传感器名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>

      <router-link :to="'/channel/content/dhtdashboard/dht_setting'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          设置采样频率
        </el-button>
      </router-link>
      <router-link :to="'/channel/dhtdate'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          总dht列表
        </el-button>
      </router-link>
    </div>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="contact">
          <baidu-map class="map" :center="markerPoint" :zoom="20">
            <bm-marker :position="markerPoint" :dragging="true" @click="infoWindowOpen">
              <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                {{ map1 }}

              </bm-info-window>
            </bm-marker>
            <bm-marker :position="markerPoint2" :dragging="true" @click="infoWindowOpen2">
              <bm-info-window :show="show2" @close="infoWindowClose2" @open="infoWindowOpen2">
                {{ map2 }}
                <br><br>
              </bm-info-window>
            </bm-marker>
          </baidu-map>
        </div>
      </el-col>
    </el-row>
    <panel-group2 :data="panelGroupData2" />
  </div>
</template>

<script>
import waves from '@/directive/waves'
import PanelGroup2 from './components/PanelGroup2'
import LineChart from './components/LineChart'
import { dhtData, mapData1, mapData2, panelGroupData2, temperatureData } from '@/api/channel'

export default {
  name: 'DhtDashboardAdmin',
  components: {
    PanelGroup2,
    LineChart
  },
  directives: { waves },
  data() {
    return {
      map1: {
        'dhtId': undefined,
        'address': undefined
      },
      map2: {
        'dhtId': '传感器2 ',
        'address': ' 地址:北京市跑路电子厂车间2'
      },
      markerPoint: {
        lng: 116.4,
        lat: 39.9
      },
      markerPoint2: { lng: 116.4005, lat: 39.9005 },
      show: false,
      show2: false,
      list: null,
      total: 0,
      listQuery: {
        page_no: 1,
        page_size: 20,
        info: ''
      },
      panelGroupData2: {
        'dhtNum': undefined,
        'nowdhtId': undefined,
        'nowSample': undefined
      },
      lineChartData: {
        'title': '温度视图未得数据',
        'dhtId': undefined,
        'time': undefined,
        'nowTempList': undefined
      }
    }
  },
  created() {
    this.getMap1()
    this.getMap2()
    this.fetchpanelGroupData2()
    this.fetchtemperatureData()
  },
  methods: {
    infoWindowClose() {
      this.show = false
    },
    infoWindowOpen() {
      this.show = true
    },
    infoWindowClose2() {
      this.show2 = false
    },
    infoWindowOpen2() {
      this.show2 = true
    },
    getList() {
      this.listLoading = true
      dhtData(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getMap1() {
      mapData1(this.map1).then(response => {
        this.map1.dhtId = response.data.dhtId
        this.map1.address = response.data.address
      }).catch(() => {
      })
    },
    getMap2() {
      mapData2(this.map2).then(response => {
        this.map2.dhtId = response.data.dhtId
        this.map2.address = response.data.address
      }).catch(() => {
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },
    fetchpanelGroupData2(id) {
      panelGroupData2({ }).then(response => {
        this.panelGroupData2 = response.data
      }).catch(() => {
      })
    },
    fetchtemperatureData(id) {
      temperatureData({ }).then(response => {
        this.lineChartData.dhtId = response.data.dhtId
        this.lineChartData.time = response.data.time
        this.lineChartData.nowTempList = response.data.nowTempList
        // this.lineChartData.averageTempList = response.data.averageTempList
      }).catch(() => {
      })
    }
    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 350px;
}
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
