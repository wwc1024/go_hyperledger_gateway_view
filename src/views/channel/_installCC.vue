<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isEdit===false">创建通道</span>
          <span v-if="isEdit===true">我的通道</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="通道名称" class="is-required">
              <el-input v-model="form.service_name" placeholder="6-128位字母数字下划线" :disabled="isEdit===true" />
            </el-form-item>
            <el-form-item label="配置通道文件" class="is-required">
              <el-input v-model="form.service_desc" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="hosts配置" class="is-required">
              <el-input v-model="form.rule" :disabled="isEdit===true" placeholder="路径格式：/user/,域名格式：www.test.com" class="input-with-select">
                <el-select slot="prepend" v-model="form.rule_type" placeholder="请选择" style="width:80px" :disabled="isEdit===true">
                  <el-option label="路径" :value="0" />
                  <el-option label="域名" :value="1" />
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="支持https">
              <el-switch
                v-model="form.need_https"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="创建创世区块">
              <el-input v-model="form.header_transfor" type="textarea" autosize placeholder="header转换支持 add(增加)/del(删除)/edit(修改) 格式：add headerName headValue" />
            </el-form-item>
            <el-form-item label="更新组织节点">
              <el-switch
                v-model="form.open_auth"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>

            <el-form-item label="方式">
              <el-radio-group v-model="form.round_type">
                <el-radio :label="0">random</el-radio>
                <el-radio :label="1">round-robin</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="建立连接超时">
              <el-input v-model="form.upstream_connect_timeout" placeholder="单位s，0表示无限制" />
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
import { channelCreate, channelMy } from '@/api/channel'
export default {
  name: 'ChannelCreate',
  data() {
    return {
      isEdit: false,
      submitButDisabled: false,
      form: {
        service_name: '',
        service_desc: '',
        rule_type: 0,
        rule: '',
        need_https: 0,
        need_websocket: 0,
        need_strip_uri: 1,
        url_rewrite: '',
        header_transfor: '',
        round_type: 2,
        ip_list: '',
        weight_list: '',
        upstream_connect_timeout: '',
        upstream_header_timeout: '',
        upstream_idle_timeout: '',
        upstream_max_idle: '',
        open_auth: 0,
        black_list: '',
        white_list: '',
        clientip_flow_limit: '',
        service_flow_limit: ''
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
      query.url_rewrite = query.url_rewrite.replace(/\n/g, ',')
      query.header_transfor = query.header_transfor.replace(/\n/g, ',')
      query.ip_list = query.ip_list.replace(/\n/g, ',')
      query.weight_list = query.weight_list.replace(/\n/g, ',')
      query.black_list = query.black_list.replace(/\n/g, ',')
      query.white_list = query.white_list.replace(/\n/g, ',')
      query.service_flow_limit = Number(query.service_flow_limit)
      query.clientip_flow_limit = Number(query.clientip_flow_limit)
      query.upstream_connect_timeout = Number(query.upstream_connect_timeout)
      query.upstream_header_timeout = Number(query.upstream_header_timeout)
      query.upstream_idle_timeout = Number(query.upstream_idle_timeout)
      query.upstream_max_idle = Number(query.upstream_max_idle)
      if (this.isEdit) {
        channelMy(query).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '我的通道',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitButDisabled = false
        })
      } else {
        channelCreate(query).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '添加成功',
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
