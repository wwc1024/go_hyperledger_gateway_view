<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.info"
        placeholder="合约名称"
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

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合约名称" min-width="50px">
        <template slot-scope="{row}">
          <span>{{ row.content_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="版本号" min-width="20px">
        <template slot-scope="{ row }">
          <span>{{ row.tap }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" min-width="40px">
        <template slot-scope="{ row }">
          <span>{{ row.service_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" min-width="40px">
        <template slot-scope="{ row }">
          <span>{{ row.service_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务简介" min-width="100px">
        <template slot-scope="{ row }">
          <span>{{ row.detail }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="50"
        class-name="small-padding fixed-width"
      >
        <template>
          <router-link :to="'/channel/dhtdashboard/'">
            <el-button
              type="primary"
              size="small"
            >
              服务使用
            </el-button>
          </router-link>

          <router-link :to="'/channel/cardata/'">
            <el-button
              type="primary"
              size="small"
            >
              服务使用2
            </el-button>
          </router-link>
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
  contentList
} from '@/api/channel'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ContentList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 'qq',
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
        'content_name': undefined,
        'tap': undefined,
        'service_name': undefined,
        'service_type': undefined,
        'detail': undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      contentList(this.listQuery).then(response => {
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
