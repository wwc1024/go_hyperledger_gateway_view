<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="is_edit === false">采样设置</span>
            <span v-if="is_edit === true">采样设置</span>
          </div>
          <div>
            <el-form-item label="dht名称" class="is-required">
              <el-input v-model="form.dhtId" placeholder="默认为dht1, 具体可看dht列表" />
            </el-form-item>
            <el-form-item label="采样频率" class="is-required">
              <el-input v-model="form.nowSample" placeholder="默认30min/次上传到区块链，单位：小时/次" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="disableButton" @click="onSubmit">立即提交</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {
  dhtsettingAdd
} from '@/api/channel'
export default {
  data() {
    return {
      is_edit: false,
      disableButton: false,
      form: {
        dhtId: undefined,
        nowSample: undefined
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.is_edit = true
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    onSubmit() {
      this.disableButton = true
      const formData = Object.assign({}, this.form)
      formData.dhtId = Number(formData.dhtId)
      formData.nowSample = Number(formData.nowSample)

      dhtsettingAdd(formData).then(() => {
        this.disableButton = false
        this.$notify({
          title: 'Success',
          message: 'Submit Successfully',
          type: 'success',
          duration: 500
        })
      }, () => {
        this.disableButton = false
      })
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
.el-select .el-input {
    width: 130px;
  }
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
