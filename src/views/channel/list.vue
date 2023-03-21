<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.info" placeholder="服务名称/服务描述" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <router-link :to="'/channel/channel_create/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          创建通道
        </el-button>
      </router-link>
      <router-link :to="'/channel/channel_join/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-user">
          加入通道
        </el-button>
      </router-link>
      <router-link :to="'/channel/channel_installCC/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-user">
          安装链码
        </el-button>
      </router-link>
      <router-link :to="'/channel/channel_initCC/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-user">
          initCC
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
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Peer" min-width="80px">
        <template slot-scope="{row}">
          <span>{{ row.peer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Channel_ID" min-width="80px">
        <template slot-scope="{row}">
          <span>{{ row.channel_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="QueryInstalledCC" min-width="120px">
        <template slot-scope="{row}">
          <span>{{ row.chaincode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <router-link :to="'/channel/content_list/'">
            <el-button type="primary" size="mini">
              合约
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { channelList, channelDelete } from '@/api/channel'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const loadTypeOptions = [
  { key: '0', display_name: 'Create' },
  { key: '1', display_name: 'My' }
]

const loadTypeKeyValue = loadTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ChannelList',
  components: { Pagination },
  directives: { waves },
  filters: {
    loadTypeFilter(type) {
      return loadTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page_no: 1,
        page_size: 20,
        info: ''
      },
      temp: {
        id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      channelList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },
    handleDelete(row, index) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const deleteQuery = {
          'id': row.id
        }
        channelDelete(deleteQuery).then(response => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: 'Success',
          message: '已取消删除',
          type: 'info',
          duration: 2000
        })
      })

      // this.list.splice(index, 1)
    }
  }
}
</script>
