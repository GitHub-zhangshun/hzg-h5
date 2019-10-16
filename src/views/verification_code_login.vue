<template>
  <div class="verification_code_login">
    <h1>欢迎回来</h1>
    <div class="content">
      <input class="phone" type="tel" v-model="formdata.phone" placeholder="请输入手机号码" maxlength="11">
      <div class="code">
        <input class="code_input" type="number" v-model="formdata.code" placeholder="请输入短信验证码">
        <input type="button" :class="disable001==true?'gary code_btn':'code_btn'" :value="word" :disabled="disable001" @click="sendMessage">
      </div>
    </div>
    <!-- <x-input v-model="formdata.phone" placeholder="请输入手机号码" type='tel' :max="11"></x-input>
    <x-input placeholder='请输入短信验证码' class="weui-vcode" v-model="formdata.code" type="number">
      <x-button slot="right" type="primary" mini @click.native="sendMessage" :class="disable001==true?'gary':''"
        :disabled="disable001">{{word}}</x-button>
    </x-input> -->
    <div class="btn">
      <x-button type="warn" @click.native="login" :disabled="disabled" :show-loading="show_loading" :class="disabled==true?'gary':''">登录</x-button>
    </div>
    <p class="registered"><span @click="$router.push('/register')">暂无账号，立即注册</span></p>
    <div class="verification_code">
      <button class="verification_code" @click="$router.push('/login')">密码登录 <i class="icon iconfont icon-qianjin1"></i>
      </button>
    </div>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton
  } from 'vux'
  import {
    indexApi
  } from '@/api/mine'
  import {
    Dialog
  } from 'vant'
  import {
    publicFun
  } from '@/libs/publicFun'
  export default {
    components: {
      XInput,
      XButton,
      Group,
    },
    data() {
      return {
        formdata: {
          phone: '',
          code: ''
        },
        word: '发送验证码',
        disable001: false,
        disabled: true,
        show_loading: false
      }
    },
    watch: {
      formdata: {
        deep: true,
        handler() {
          if (this.formdata.phone == '' || this.formdata.code == '') {
            this.disabled = true
          } else {
            this.disabled = false
          }
        }
      }
    },
    methods: {
      sendMessage() {
        let checkPhone = publicFun.checkPhone(this.formdata.phone)
        if (checkPhone) {
          this.disable001 = true
          let time = 60,
            that = this;
          indexApi.smsCodeSend(this.formdata.phone, "true")
            .then(data => {
              var sendTimer = setInterval(function () {
                that.disable001 = true;
                time--;
                that.word = time + 'S';
                if (time < 0) {
                  that.disable001 = false;
                  clearInterval(sendTimer);
                  that.word = "获取验证码";
                }
              }, 1000)
            })
            .catch((err) => {
              this.disable001 = false
            })
        } else {
          this.$toast({
            message: "手机号格式错误",
            duration: 2000
          })
        }
      },
      login() {
        window.scrollTo(0, 0);
        if (publicFun.checkPhone(this.formdata.phone) == false) {
          this.$toast({
            message: "手机号格式错误",
            duration: 2000
          })
        } else {
          this.disabled = true
          this.show_loading = true
          let formdata = {
            phone: this.formdata.phone,
            code: this.formdata.code,
            simplify: 'login_sms_code'
          }
          indexApi.investorSmsLogin(formdata)
            .then(data => {
              this.disabled = false
              this.show_loading = false
              localStorage.setItem("token", data.result && data.result.token)
              if (data.result.attachInfo && data.result.attachInfo.isInitPassword) {
                this.$store.commit('loginPwd', true)
              }
              this.$router.push('/my')
            })
            .catch(() => {
              this.disabled = false
              this.show_loading = false
            })
        }
      }
    },
    created() {
      if (localStorage.token) {
        this.$router.push('/')
      }
      
    }
  }

</script>

<style scoped lang='less'>
  .verification_code_login {
    min-height: 100vh;
    background: #fff;

    h1 {
      font-size: 60px;
      color: #333;
      font-weight: bold;
      padding: 66px 0 82px 40px;
    }
    .content{
      .phone{
        width:calc(100% - 80px);
        border-bottom: 1px solid #eff2f7;
        padding: 66px 0 40px;
        margin: 0 40px;
        font-size: 30px;
      }
      .code{
        margin: 0 40px;
        width:calc(100% - 80px);
        display: flex;
        justify-content: space-between;
        padding: 66px 0 40px;
        font-size: 30px;
        border-bottom: 1px solid #eff2f7;
        .code_btn{
          background: none;
          color: #ff4e30;
        }
        .gary {
          background: none;
          color: #848a93;
        }
      }
    }
    .weui-cell {
      border-bottom: 1px solid #eff2f7;
      padding: 66px 0 40px;
      margin: 0 40px;
      font-size: 30px;
    }

    /deep/.weui-icon-warn:before {
      content: "\EA0B";
    }

    .weui-cell:before {
      border-top: none;
    }

    .weui-btn_primary {
      background: transparent;
      color: #ff4e30;
      font-size: 28px;
      padding: 0;
    }

    .weui-btn_primary:after {
      border: none;
    }

    .weui-btn_primary:not(.weui-btn_disabled):active {
      background: #fff;
      color: #ff4e30;
    }

    .gary {
      color: #848a93;
    }

    /deep/.weui-loading {
      width: 40px;
      height: 40px;
    }

    .forger_pwd {
      padding: 48px 40px 88px;
      text-align: right;
      font-size: 26px;
      color: #ff4e30;
    }

    .btn {
      margin-top: 80px;
      padding: 0 40px;

      .weui-btn {
        height: 88px;
        background: #ff4e30;
        font-size: 32px;
      }

      .weui-btn:after {
        border: none;
      }

      .gary {
        background: #cfd4da;
        color: #fff;
      }
    }

    .registered {
      text-align: center;
      line-height: 100px;
      color: #ff4e30;
      font-size: 30px;
    }

    .verification_code {
      text-align: center;
      margin-top: 100px;

      button {
        margin-top: 0;
        width: 420px;
        height: 88px;
        font-size: 30px;
        border-radius: 88px;
        position: relative;
        background-color: transparent;
        border: 2px solid #e3e3e3;

        i {
          font-size: 40px;
          position: absolute;
          right: 60px;
          bottom: 13px;
        }
      }
    }
  }

</style>
