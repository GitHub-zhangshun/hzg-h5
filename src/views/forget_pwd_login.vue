<template>
  <div>
    <div class="forget_pwd">
      <div class="background"></div>
      <h1>{{title}}</h1>
      <div class='contain'>
        <group>
          <x-input v-model="phone" disabled class="phoneDeafult"></x-input>
          <x-input placeholder='短信验证码' class="weui-vcode" v-model="formdata.code" type="tel">
            <x-button slot="right" type="primary" mini @click.native="sendMessage" :class="disable001==true?'gary':''"
              :disabled="disable001">{{word}}</x-button>
          </x-input>
          <x-input :type='pwdType' v-model="formdata.pwd" placeholder="设置6-16字符的新登录密码"><i :class="eye" slot="right"
              @click="changeType"></i> </x-input>
        </group>
        <x-button type="warn" @click.native="submit" :disabled="disabled" :class="disabled?'garybtn':''">确定</x-button>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XButton,
  } from 'vux'
  import {
    indexApi
  } from '@/api/mine'
  import {
    Dialog,
    Toast
  } from 'vant';
  import md5 from 'blueimp-md5'
  import {
    publicFun
  } from '@/libs/publicFun'
  export default {
    components: {
      XInput,
      Group,
      XButton,
    },
    data() {
      return {
        disabled: true,
        phone: '',
        formdata: {
          pwd: '',
          code: ''
        },
        word: '获取验证码',
        disable001: false,
        pwdType: 'password',
        eye: 'icon iconfont icon-biyan',
        showDialog: false,
        from: '',
        title: '',
        path:''
      }
    },

    watch: {
      formdata: {
        deep: true,
        handler() {
          if (this.formdata.code == "" || this.formdata.pwd == "") {
            this.disabled = true
          } else {
            this.disabled = false
          }
        }
      }
    },
    mounted() {
      if (this.$route.query.type && this.$route.query.type == 'new') {
        this.title = '重置登录密码'
        document.title = '重置登录密码'
      } else {
        this.title = '找回登录密码'
      }
      if (!localStorage.getItem('info')) {
        indexApi.investorCurrent().then(data => {
          this.phone = data.result.user.phone
          localStorage.setItem('info', JSON.stringify(data.result))
        })
      } else {
        this.phone = JSON.parse(localStorage.getItem('info')).user.phone
      }
    },
    methods: {
      //验证码
      sendMessage() {
        this.disable001 = true;
        let time = 60,
          that = this;
        indexApi.smsCodeDefaultSend().then(data => {
            var sendTimer = setInterval(function () {
              that.disable001 = true;
              time--;
              that.word = +time + 'S';
              if (time < 0) {
                that.disable001 = false;
                clearInterval(sendTimer);
                that.word = "获取验证码";
              }
            }, 1000)
          })
          .catch(() => {
            this.disable001 = false
          })
      },
      //密码显示隐藏切换
      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
        this.eye = this.eye === 'icon iconfont icon-biyan' ? 'icon iconfont icon--' : 'icon iconfont icon-biyan';
      },
      submit() {
        window.scrollTo(0, 0);
        if (!publicFun.checkPwd(this.formdata.pwd)) {
          this.$toast({
            message: '请设置6-16位字符的新登录密码',
            duration: 2000
          })
        } else {
          let dataForm = {
            code: this.formdata.code,
            newPwd: md5(md5(md5(this.formdata.pwd))),
            smsSimplify: "Rest_Password_sms_code"
          }
          indexApi.userPasswordRest(dataForm)
          .then(data => {
            this.showDialog = true;
            let userInfo = window.localStorage.getItem('info') && JSON.parse(window.localStorage.getItem('info')) || {}
            let isOpen = userInfo.user && userInfo.user.isOpen
            if (this.$route.query.isPay && isOpen) {
              Toast.loading({
                mask: true,
                duration: 0
              });
              indexApi.resetPassword()
              .then(data => {
                Toast.clear()
                window.history.pushState(null,null,'/my')
                localStorage.setItem("path", this.path)
                sessionStorage.setItem('shanba','pwd_reset')
                publicFun.redirectTripartite(data.result)
              })
              .catch( () => {
                Toast.clear()
              })
            } else {
              Dialog.alert({
                message: '<p style="text-align:center">设置成功</p>'
              }).then(() => {
                this.showDialog = false
                if (this.$route.query.from == 'set_pwd') {
                  this.$router.go(-2)
                } else if (this.$route.query.from == 'my') {
                  this.$router.push('/my')
                } else {
                  this.$router.go(-1)
                }
              });
            }
          })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next( vm => {
        vm.path = from.fullPath
      })
    }
  }

</script>

<style scoped lang='less'>
  .forget_pwd {
    .background {
      position: absolute;
      height: 100%;
      width: 100%;
      background: #fff;
      z-index: -1;
    }

    h1 {
      padding: 100px 0 82px 40px;
      font-size: 60px;
      color: #333;
    }

    .contain {
      padding: 0 80px;

      /deep/.weui-cells {
        margin-top: 0;
      }

      /deep/.weui-cells:before {
        border-top: none;
      }

      .weui-cell {
        padding: 64px 0 40px;
        font-size: 28px;
      }

      .weui-cell::before {
        left: 0;
      }

      /deep/.phoneDeafult {
        .weui-cell__bd {
          input {
            -webkit-text-fill-color: #000 !important;
          }
        }
      }

      /deep/.weui-input:placeholder {
        color: #afb5bc;
      }

      /deep/.weui-icon-warn::before {
        content: "\EA0B";
      }

      .weui-btn_warn {
        margin-top: 120px;
        font-size: 32px;
        height: 88px;
        background: #ff4e30;
      }

      .weui-btn_primary {
        background: transparent;
        font-size: 28px;
        color: #ff4e30;
        padding: 0;
      }

      .weui-btn_primary::after {
        border: none;
      }

      .gary {
        color: #848a93;

      }

      .garybtn {
        color: #fff;
        background: #cfd4da
      }
    }
  }

</style>
