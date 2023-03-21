<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="is_edit === false">重新配置网络</span>
            <!-- <span v-if="is_edit === true">修改节点</span> -->
          </div>
          <div>
            <el-form-item label="配置端口映射" class="is-required">
              <el-input v-model="form.name" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="配置yaml文件" class="is-required">
              <UploadFile :on-success="successImg"> 上传</UploadFile>
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
  appDetail,
  appAdd,
  appUpdate
} from '@/api/app'
import UploadFile from '@/components/UploadFile/index.vue'
export default {
  components: { UploadFile },
  data() {
    return {
      is_edit: false,
      disableButton: false,
      form: {
        id: '0',
        name: '',
        script: ''
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
    fetchData(id) {
      this.listLoading = true
      const query = {
        id: id
      }
      appDetail(query).then(response => {
        const formData = response.data
        this.form = formData
        this.listLoading = false
      })
    },
    onSubmit() {
      this.disableButton = true
      const formData = Object.assign({}, this.form)
      formData.id = Number(formData.id)
      formData.qpd = Number(formData.qpd)
      formData.qps = Number(formData.qps)

      if (this.is_edit) {
        appUpdate(formData).then(() => {
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
      } else {
        appAdd(formData).then(() => {
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
