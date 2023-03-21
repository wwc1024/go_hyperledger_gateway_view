<template>
  <div class="mixin-components-container">
    <el-row>
      <el-form ref="form" :model="form" label-width="130px">
        <el-card class="box-card" style="margin-bottom:20px;">
          <div slot="header" class="clearfix">
            <span v-if="is_edit === false">添加新的Org组织</span>
            <!-- <span v-if="is_edit === true">修改节点</span> -->
          </div>
          <div>
            <el-form-item label="配置yaml文件" class="is-required">
              <UploadFile :on-success="successImg"> 上传</UploadFile>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" :loading="disableButton" @click="onSubmitzero">生成新Org加密材料</el-button>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" :loading="disableButton" @click="onSubmit">启动新Org的peer节点并更新配置</el-button>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {
  appStart
} from '@/api/app'
import UploadFile from '@/components/UploadFile/index.vue'
export default {
  components: { UploadFile },
  data() {
    return {
      disableButton: false,
      form: {
        id: '0',
        name: '',
        script: ''
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.disableButton = true
      const formData = Object.assign({}, this.form)
      appStart(formData).then(() => {
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
