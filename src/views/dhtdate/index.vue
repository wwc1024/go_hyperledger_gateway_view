<template>
  <div class="mixin-components-container">
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
    <div class="main-item1">
      <img src="@/assets/img/meishaonv/1.jpg" alt="" align="right" height="400px" width="280px">
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 80%;"
    >

      <el-table-column label="ID" prop="id" width="100">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="DhtId" min-width="10px">
        <template slot-scope="{ row }">
          <span>{{ row.dhtId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time" min-width="15px">
        <template slot-scope="{ row }">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="湿度" min-width="10px">
        <template slot-scope="{row}">
          <span>{{ row.humitidy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="温度" min-width="10px">
        <template slot-scope="{row}">
          <span>{{ row.temperature }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page_no"
      :limit.sync="listQuery.page_size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  dhtData
} from '@/api/channel'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'DhtData',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page_no: 1,
        page_size: 20,
        info: ''
      },
      parentsProps: { checkStrictly: true, value: 'id', label: 'name', children: 'children' },
      parentsKey: 0,
      temp: {
        'id': undefined,
        'dhtId': undefined,
        'time': undefined,
        'temperature': undefined,
        'humitidy': undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      dhtData(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    }
  }
}

</script>
<style>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
.main-item1{
    position: fixed;
    top: 40;
    right: 0;

  }
</style>
