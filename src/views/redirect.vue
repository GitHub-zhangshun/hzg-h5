<template>
  <div class="backGround"></div>
</template>

<script>
  import {
    indexApi
  } from '@/api/mine'
  import {
    Dialog,
    Toast
  } from 'vant'
  export default {

    data() {
      return {
        code: '',
        msg: '',
        bCode: ''
      }
    },
    mounted() {
      this.code = this.$route.query.retCode
      if (this.$route.query.retCode == '0') {
        this.msg = null
      } else if (this.$route.query.retCode == '406') {
        this.msg = '处理中'
      } else {
        this.msg = !this.$route.query.retMsg || this.$route.query.retMsg === 'null' || (this.$route.query.retMsg ===
          this.$route.query.retCode) ? '处理失败' : this.$route.query.retMsg
      }
      this.bCode = this.$route.query.bCode
      if (window.AndroidApp !== undefined) {
        // 安卓
        try {
          window.AndroidApp.callBackResult(this.code, this.msg)
        } catch (error) {

        }
      } else if (window.webkit !== undefined && window.webkit.messageHandlers != undefined && window.webkit
        .messageHandlers.k_jsbankinfo !== undefined) {
        // IOS
        try {
          window.webkit.messageHandlers.k_jsbankinfo.postMessage({
            status: this.code,
            msg: this.msg
          });
        } catch (error) {

        }
      } else {
        let path = localStorage.path || '/my'
        if (this.code === '0') {
          // if (this.code === '0' && this.bCode === 'OpenAccount') {
          //   Toast({
          //     message: '开户成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && this.bCode === 'EntrustRecharge') {
          //   Toast({
          //     message: '充值成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && (this.bCode === 'T0CashOut' && this.bCode === 'T1CashOut')) {
          //   Toast({
          //     message: '提现成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && (this.bCode === 'ModifyPassWord' && this.bCode === 'ReSetPassWord')) {
          //   Toast({
          //     message: '修改成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && this.bCode === 'UndoCard') {
          //   Toast({
          //     message: '解绑银行卡成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && this.bCode === 'BindCard') {
          //   Toast({
          //     message: '绑定银行卡成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && this.bCode === 'BuyBid') {
          //   Toast({
          //     message: '出借成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     this.$router.replace(path)
          //   }, 2000)
          // } else if (this.code === '0' && this.bCode === 'CancelAccount') { //销户
          //   Toast({
          //     message: '注销成功',
          //     duration: 2000
          //   })
          //   setTimeout(() => {
          //     localStorage.clear()
          //     sessionStorage.clear()
          //     this.$router.replace('/my')
          //   }, 2000)
          // }else{
          //   this.$router.replace(path)
          // }
          if(sessionStorage.shanba === 'recharge'){
            this.public('充值成功',path)
          }else if(sessionStorage.shanba === 'openAccount'){
            this.public('开户成功',path)
          }else if(sessionStorage.shanba === 'pwd_reset'){
            this.public('修改成功',path)
          }else if(sessionStorage.shanba === 'buy_bussiness'){
            this.public('购买成功',path)
          }else if(sessionStorage.shanba === 'bind_card'){
            this.public('绑定成功',path)
          }else if(sessionStorage.shanba === 'remove_card'){
            this.public('解绑成功',path)
          }else if(sessionStorage.shanba === 'pwd_editor'){
            this.public('修改成功',path)
          }else if(sessionStorage.shanba === 'delete_account'){
            Toast({
              message: '注销成功',
              duration: 2000
            })
            setTimeout(() => {
              localStorage.clear()
              sessionStorage.clear()
              this.$router.replace('/my')
            }, 2000)
          }else if(sessionStorage.shanba === 'without_money'){
            this.public('提现成功',path)
          }else{
            sessionStorage.removeItem('shanba');
            this.$router.replace(path)
          }
        } else {
          Dialog.alert({
            title: '温馨提示',
            message: this.msg
          }).then(() => {
            sessionStorage.removeItem('shanba');
            this.$router.replace(path)
          });
        }
      }
    },
    methods:{
      public(name,path){
        Toast({
          message: name,
          duration: 2000
        })
        setTimeout(() => {
          sessionStorage.removeItem('shanba');
          this.$router.replace(path)
        }, 2000)
      }
    },
    destroyed() {
      localStorage.removeItem('path')
    }
  }

</script>

<style scoped lang='less'>
</style>
