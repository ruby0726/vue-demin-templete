<template>
    <div>
        <el-dialog
            :title="`${title}审核`"
            :visible.sync="visible"
            :before-close="handleClose"
            center
        >
            <el-form ref="form" :model="form">
                <el-form-item label="审核结果:" prop="auditResult" required>
                    <el-radio-group v-model="form.auditResult">
                        <el-radio
                            v-for="item in radioList"
                            :key="item.key"
                            :label="item.key"
                        >
                            {{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    :key="form.auditResult"
                    label="备注:"
                    prop="msg"
                    :required="form.auditResult&&$utils.forJudgment(form.auditResult,radioList,'key','required')"
                    max="20"
                >
                    <el-input
                        v-model="form.msg"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6}"
                        placeholder="请填写原因"
                    />
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'CheckDialog',
    props: {
      title: {
        type: String,
        default: ''
      },
      radioList: {
        type: Array,
        default: null,
      }
    },
    data() {
      return {
        visible: false,
        form: {}
      }
    },
    methods: {
      open() {
        this.visible = true
      },
      handleClose() {
        this.visible = false
      },
      handleConfirm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$emit('checkConfirm', this.form)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
