<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isEdit===false">加入通道</span>
          <!-- <span v-if="isEdit===true">我的通道</span> -->
        </div>
        <div style="margin-bottom:50px;">
          <el-form ref="form" :model="form" label-width="140px">

            <el-form-item label="ChannelName">
              <el-input v-model="form.channel_channelName" placeholder="mychanneltwo.block" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :disabled="submitButDisabled" @click="handleSubmit">立即提交</el-button>
            </el-form-item>

          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { channelJoin } from '@/api/channel'
export default {
  name: 'ChannelJoin',
  data() {
    return {
      isEdit: false,
      submitButDisabled: false,
      form: {
        channel_channelName: undefined
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      // this.fetchData(id)
    }
  },
  methods: {
    // fetchData(id) {
    //   const query = { 'id': id }
    //   serviceDetail(query).then(response => {
    //     this.form.id = response.data.info.id
    //     this.form.load_type = response.data.info.load_type
    //     this.form.service_name = response.data.info.service_name
    //     this.form.service_desc = response.data.info.service_desc
    //     this.form.rule_type = response.data.http_rule.rule_type
    //     this.form.rule = response.data.http_rule.rule
    //     this.form.need_https = response.data.http_rule.need_https
    //     this.form.need_websocket = response.data.http_rule.need_websocket
    //     this.form.need_strip_uri = response.data.http_rule.need_strip_uri
    //     this.form.url_rewrite = response.data.http_rule.url_rewrite.replace(/,/g, '\n')
    //     this.form.header_transfor = response.data.http_rule.header_transfor.replace(/,/g, '\n')
    //     this.form.round_type = response.data.load_balance.round_type
    //     this.form.round_type = response.data.load_balance.round_type
    //     this.form.ip_list = response.data.load_balance.ip_list.replace(/,/g, '\n')
    //     this.form.weight_list = response.data.load_balance.weight_list.replace(/,/g, '\n')
    //     this.form.upstream_connect_timeout = response.data.load_balance.upstream_connect_timeout
    //     this.form.upstream_header_timeout = response.data.load_balance.upstream_header_timeout
    //     this.form.upstream_idle_timeout = response.data.load_balance.upstream_idle_timeout
    //     this.form.upstream_max_idle = response.data.load_balance.upstream_max_idle
    //     this.form.upstream_max_idle = response.data.load_balance.upstream_max_idle
    //     this.form.open_auth = response.data.access_control.open_auth
    //     this.form.black_list = response.data.access_control.black_list.replace(/,/g, '\n')
    //     this.form.white_list = response.data.access_control.white_list.replace(/,/g, '\n')
    //     this.form.clientip_flow_limit = response.data.access_control.clientip_flow_limit
    //     this.form.service_flow_limit = response.data.access_control.service_flow_limit
    //   }).catch(() => {
    //   })
    // },
    handleSubmit() {
      this.submitButDisabled = true
      const query = Object.assign({}, this.form)
      console.log(query)
      // query.url_rewrite = query.url_rewrite.replace(/\n/g, ',')
      // query.header_transfor = query.header_transfor.replace(/\n/g, ',')
      // query.ip_list = query.ip_list.replace(/\n/g, ',')
      // query.weight_list = query.weight_list.replace(/\n/g, ',')
      // query.black_list = query.black_list.replace(/\n/g, ',')
      // query.white_list = query.white_list.replace(/\n/g, ',')
      // query.service_flow_limit = Number(query.service_flow_limit)
      // query.clientip_flow_limit = Number(query.clientip_flow_limit)
      // query.upstream_connect_timeout = Number(query.upstream_connect_timeout)
      // query.upstream_header_timeout = Number(query.upstream_header_timeout)
      // query.upstream_idle_timeout = Number(query.upstream_idle_timeout)
      // query.upstream_max_idle = Number(query.upstream_max_idle)
      if (this.isEdit) {
        // channelMy().then(response => {
        //   this.submitButDisabled = false
        //   this.$notify({
        //     title: 'Success',
        //     message: '我的通道',
        //     type: 'success',
        //     duration: 2000
        //   })
        // }).catch(() => {
        //   this.submitButDisabled = false
        // })
      } else {
        channelJoin(query).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '加入通道',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitButDisabled = false
        })
      }
    }
  }
}
</script>

<style scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>
