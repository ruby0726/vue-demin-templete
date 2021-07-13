<template>
    <div class="login">
        <div class="loginBox">
            <h2 class="loginH2"><strong>后台管理系统</strong></h2>
            <div class="loginCon">
                <div class="titleDiv">
                    <h3>登录</h3>
                    <p>请输入您的账户和密码:</p>
                    <i class="el-icon-key" />
                </div>
                <el-form
                    ref="loginForm"
                    :model="loginForm"
                    auto-complete="on"
                >
                    <el-form-item prop="user">
                        <el-input
                            ref="accountName"
                            v-model="loginForm.accountName"
                            placeholder="请输入账号"
                            name="accountName"
                            type="text"
                            tabindex="1"
                            auto-complete="on"
                            required
                        />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            ref="password"
                            v-model="loginForm.password"
                            show-password
                            placeholder="请输入密码"
                            name="password"
                            tabindex="2"
                            auto-complete="on"
                            required
                            @keyup.enter.native="handleLogin"
                        />
                    </el-form-item>
                    <el-button
                        type="primary"
                        class="loginBtn"
                        @click="handleLogin()"
                    >
                        登录
                    </el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import {login} from '@/api/login'
  import Storage from '@/utils/storage'

  const storage = new Storage(window.sessionStorage)

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          accountName: '',
          password: ''
        },
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            login({accountName: this.loginForm.accountName.trim(), password: this.loginForm.password}).then(data => {
              storage.set('token', data.data.token);
              const userInfo = {
                accountName: data.data.accountName,
                permissionMenu: data.data.permissionMenu,
                permissionBtn: data.data.permissionBtn,
                orgId: data.data.orgId,
              };
              storage.set('userInfo', userInfo);
              this.$router.push({path: this.redirect || '/'})
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    height: 100%;
    width: 100%;
    background: url(../../assets/images/loginBg.jpg) no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
  }

  .loginBox {
    height: 455px;
    width: 550px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -287px;
  }

  .loginH2 {
    font-size: 38px;
    color: #fff;
    text-align: center;
  }

  .loginCon {
    margin-top: 30px;
    background: #eee;
    border-radius: 4px;

    .titleDiv {
      padding: 0 28px;
      background: #fff;
      position: relative;
      height: 120px;
      border-radius: 4px 4px 0 0;

      h3 {
        font-size: 22px;
        color: #555;
        font-weight: initial;
        padding-top: 23px;
      }

      p {
        font-size: 16px;
        color: #888;
        padding-top: 12px;
      }

      i {
        font-size: 65px;
        color: #ddd;
        position: absolute;
        right: 27px;
        top: 29px;
      }
    }

    .el-form {
      padding: 25px 25px 30px 25px;
      background: #eee;
      border-radius: 0 0 4px 4px;
    }
  }

  .loginBtn {
    width: 100%;
    background: #19b9e7;
  }

  .slideShadow {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .slideSty {
    position: absolute;
    width: 380px;
    height: 311px;
    background: #e8e8e8;
    border: 1px solid #dcdcdc;
    left: 50%;
    top: 50%;
    margin-left: -188px;
    margin-top: -176px;
    z-index: 99;
    border-radius: 5px;
  }

  .iconBtn {
    padding: 9px 0 0 19px;
    color: #5f5f5f;
    border-top: 1px solid #d8d8d8;
    margin-top: 17px;

    i {
      font-size: 22px;
      cursor: pointer;
    }

    i:last-child {
      margin-left: 7px;
    }
  }
</style>
