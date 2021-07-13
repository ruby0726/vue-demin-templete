<template>
    <div>
        <action-bar
            title="渠道"
            :page="page"
            :current="actions"
            @fns-click="doAction"
        />
        <el-card class="form-card">
            <el-form
                ref="form"
                label-width="120px"
                cols="2"
                :model="formData"
            >
                <template>
                    <sub-title title="基本信息" nowrap />
                    <el-form-item label="渠道名称:" prop="channelName" :rules="{required:true,max:20}">
                        <span v-if="page === 'info'">{{ formData.channelName }}</span>
                        <el-input v-else v-model="formData.channelName" placeholder="请输入渠道名称" />
                    </el-form-item>
                    <el-form-item label="渠道类型:" prop="channelType">
                        <span v-if="page === 'info'&&formData.channelType">
                            {{ $utils.forJudgment(formData.channelType,$constant.channelType,'key','label') }}
                        </span>
                        <el-select v-else v-model="formData.channelType" placeholder="请选择">
                            <el-option
                                v-for="item in $constant.channelType"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="page === 'info'" label="渠道编号:" prop="number">
                        <span>{{ formData.number }}</span>
                    </el-form-item>
                </template>

                <template>
                    <sub-title title="负责人/管理员信息" nowrap />
                    <el-form-item label="姓名:" prop="chargeName" :rules="{required:true,max:20}">
                        <span v-if="page === 'info'">{{ formData.chargeName }}</span>
                        <el-input v-else v-model="formData.chargeName" placeholder="请输入姓名" />
                    </el-form-item>
                    <el-form-item
                        label="手机号码:"
                        prop="chargePhone"
                        :rules="{required:true}"
                        rule-type="mobile"
                    >
                        <span v-if="page === 'info'">{{ formData.chargePhone }}</span>
                        <el-input
                            v-else
                            v-model="formData.chargePhone"
                            maxlength="11"
                            placeholder="请输入手机号"
                        />
                    </el-form-item>
                    <el-form-item label="性别:" prop="sex">
                        <span v-if="page === 'info'">{{ formData.sex==1?'男':formData.sex==2?'女':'保密' }}</span>
                        <el-select v-else v-model="formData.sex" placeholder="请选择">
                            <el-option label="男" :value="1" />
                            <el-option label="女" :value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="身份证号码:" prop="idCard" rule-type="idcard">
                        <span v-if="page === 'info'">{{ formData.idCard }}</span>
                        <el-input v-else v-model="formData.idCard" placeholder="请输入18位身份证号码" />
                    </el-form-item>
                    <el-form-item label="负责人邮箱:" prop="email" rule-type="email">
                        <span v-if="page === 'info'">{{ formData.email }}</span>
                        <el-input v-else v-model="formData.email" placeholder="请输入邮箱" />
                    </el-form-item>
                </template>
            </el-form>
        </el-card>
    </div>
</template>
<script>
  export default {
    name: 'ChannelManagementInfo',
    props: {
      page: {
        type: String,
        default: 'info'
      },
      id: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        formData: {
          number: '',// 渠道编号
          channelName: '',//渠道名称
          channelType: '',//渠道类型（1:药厂,2:医院）
          chargeName: '',//负责人/管理员名称
          chargePhone: '',//负责人/管理员手机号码
          email: '',//邮箱
          idCard: '',//身份证号码
          sex: '',//性别(1 男, 2 女)
          id: '',//渠道id
        },
        number: '',//渠道编号
      }
    },
    computed: {
      actions() {
        if (this.page === 'info') {
          return ['back', 'edit']
        } else {
          return ['cancel', 'save']
        }
      }
    },
    mounted() {
      if (this.page != 'add') {
        this.getDetails(this.id)
      }
    },
    methods: {
      doAction({action}) {
        switch (action) {
          case 'edit':
            this.$router.push({params: {page: 'edit'}})
            break;
          case 'back':
            this.$router.go(-1);
            break;
          default:
            this[action] && this[action]()
        }
      },
      // 取消
      cancel() {
        // 清空表单
        this.$router.go(-1)
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getDetails(id) {
      }
    }
  }
</script>
<style lang="sass" scoped>

</style>
