<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.info"
        placeholder="容器名称"
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

      <router-link :to="'/app/app_create'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          更新网络
        </el-button>
      </router-link>

      <router-link :to="'/app/app_add'">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-edit"
        >
          增加Org组织
        </el-button>
      </router-link>
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
      <el-table-column label="Index" prop="index" align="center" min-width="40px">
        <template slot-scope="{ row }">
          <span>{{ row.index }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ID" min-width="70px">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="names" min-width="70px">
        <template slot-scope="{row}">
          <span>{{ row.names }}</span>
        </template>
      </el-table-column>
      <el-table-column label="command" min-width="60px">
        <template slot-scope="{ row }">
          <span>{{ row.command }}</span>
        </template>
      </el-table-column>
      <el-table-column label="created" min-width="50px">
        <template slot-scope="{ row }">
          <span>{{ row.created }}</span>
        </template>
      </el-table-column>
      <el-table-column label="posts " min-width="60px">
        <template slot-scope="{ row }">
          <span>{{ row.ports }}</span>
        </template>
      </el-table-column>
      <el-table-column label="state" min-width="40px">
        <template slot-scope="{ row }">
          <span>{{ row.state }} </span>
        </template>
      </el-table-column>
      <el-table-column label="status" min-width="40px">
        <template slot-scope="{ row }">
          <span>{{ row.status }} </span>
        </template>
      </el-table-column>
      <el-table-column label="hostConfig" min-width="40px">
        <template slot-scope="{ row }">
          <span>{{ row.hostConfig }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="90"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <router-link :to="'/app/app_prove'">
            <el-button
              type="primary"
              size="small"
            >
              日志信息
            </el-button>
          </router-link>
          <el-button
            type="primary"
            size="small"
            @click="handleReload(row)"
          >重启</el-button>
          <el-button
            type="primary"
            size="small"
            @click="handleDelete(row)"
          >删除</el-button>
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
  appList,
  appDelete,
  appReload
} from '@/api/app'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AppList',
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
      appList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },
    handleDelete(row) {
      const tempData = {
        id: row.id
      }
      this.$confirm('请确认是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        appDelete(tempData).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 500
          })
          this.getList()
        })
      }).catch(() => {})
    },
    handleReload(row) {
      const tempData = {
        id: row.id
      }
      this.$confirm('请确认是否重启?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        appReload(tempData).then(() => {
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Reloading Successfully',
            type: 'success',
            duration: 500
          })
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>
