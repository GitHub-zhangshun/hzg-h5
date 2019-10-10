<template>
  <div>
    <div class="guide" v-if="show=='guide_img'">
    <!-- <div class="guide" v-if="false"> -->
      <img src="@/assets/images/down/two.jpg" alt="引导">
    </div>
    <div class="IOS" v-if="show=='IOS'">
    <!-- <div class="IOS" v-if="false"> -->
      <img src="@/assets/images/down/download.jpg" alt="IOS操作">
      <div class="down">
        <button @click="downApp('IOS')">下载和掌柜APP</button>
      </div>
    </div>
    <div class="android" v-if="show=='android'">
      <div>
        <img src="@/assets/images/down/first.png" alt="安卓下载">
      </div>
      <button @click="downApp('android')">立即下载</button>
    </div>
  </div>
</template>

<script>
  import {
    indexApi
  } from '@/api/mine'
  export default {
    data() {
      return {
        show: '',
      }
    },
    methods: {
      downApp(val) {
        indexApi.platformConfig()
        .then(data => {
          if(val === 'android'){
            window.location.href = data.result.androidLink
          }
          if(val === 'IOS'){
            window.location.href = data.result.iOSLink
          }
        })
      }
    },
    mounted() {
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //安卓
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let ua = u.toLowerCase()
      if(isAndroid){
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          this.show = 'guide_img'
        }else{
          this.show = 'android'
          // this.downApp('android')
        }   
      }
      
      if(isIOS){
        if(u.indexOf("Safari") > -1){
          this.show = 'IOS'
          this.downApp('IOS')
        }else{
          this.show = 'guide_img'
        }
      }
    },
  }

</script>

<style scoped lang="less">
  div {
    background: #fff;

    .guide {
      width: 750px;
      height: 100vh;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .IOS {
      width: 100%;

      img {
        width: 100%;
      }

      .down {
        background: transparent;
        width: 90%;
        position: absolute;
        top: 220px;
        left: 50%;
        transform: translateX(-50%);

        button {
          width: 100%;
          border-radius: 80px;
          height: 92px;
          font-size: 30px;
          background: #FFF58B;
          color: #ff4e3c
        }
      }
    }

    .android {
      height: 100vh;
      width: 100%;
      background: #ffffff;
      position: relative;
      display: flex;
      align-items: center;
      flex-flow: column;
      div{
        margin-top: 100px;
        width: 598px;
        height: 671px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      
      button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 904px;
        font-size: 30px;
        color: #fff;
        width: 422px;
        border-radius: 80px;
        background: #f42539;
        height: 82px;
        letter-spacing: 4px;
        box-shadow: 0 0 10px #f42539;
      }
    }
  }

</style>
