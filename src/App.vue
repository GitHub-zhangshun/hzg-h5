<template>
  <div id="app">
    <router-view></router-view>
    <van-popup v-model="show">
      <div class="close" @click="close">
        <img src="@/assets/images/icon_Close.png" alt="">
      </div>
      <p>和掌柜平台已升级至陕坝银行存管系统<span>为保障您账户安全，请先重置您的</span>登录密码<span>和</span>支付密码。</p>
      <van-button type="default" round @click="goForgetPwd" class="acount_pwd">确定</van-button>
    </van-popup>
  </div>
</template>


<script>
  import {
    publicFun
  } from '@/libs/publicFun'
  import {
    Popup,
    Button
  } from 'vant';
  export default {
    name: 'App',
    components: {
      'van-popup': Popup,
      'van-button': Button
    },
    data() {
      return {
        show: false
      }
    },
    computed: {
      loginPwd() {
        return this.$store.getters.loginPwd || false
      }
    },
    watch: {
      loginPwd(n) {
        this.show = n
      }
    },
    methods: {
      goForgetPwd() {
        this.$router.push({
          path: '/forget_pwd_login',
          query: {
            from: 'my',
            type: 'new',
            isPay: true
          }
        })
        this.$store.commit('loginPwd', false)
      },
      close() {
        this.$store.commit('loginPwd', false)
      }
    },
  }

</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  .clearfix:after {
    content: "";
    height: 0;
    line-height: 0;
    display: block;
    visibility: hidden;
    clear: both
  }

  .clearfix {
    zoom: 1;
  }

  .van-dialog{
    width: 74%;
    border-radius: 24px;
  }

  .van-dialog__confirm{
    color: rgb(255,78,48);
    border-top: 1px solid #e2e2e2 !important;
  }
  .van-dialog__message {
    font-size: 30px;
    text-align: center;
    padding: 60px;
  }

  .van-popup {
    width: 570px;
    height: 684px;
    background: url('./assets/images/bg.png') center center no-repeat;
    background-size: 100% 100%;

    .close {
      position: relative;
      top: 20px;
      left: calc(100% - 65px);
      width: 45px;
      height: 45px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    p {
      padding: 333px 28px 55px;
      font-size: 28px;
      color: #000000;
      text-indent: 1em;
      line-height: 1.5;

      span {
        color: #838889;
      }
    }

    .acount_pwd {
      width: 492px;
      height: 90px;
      background: #05a765;
      color: #fff;
      display: flex;
      justify-content: center;
      margin: 0 auto;
    }
  }

</style>
