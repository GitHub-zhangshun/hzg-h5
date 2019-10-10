<template>
  <div :style="{height:height+'px'}">
    <div>
      <img src="@/assets/images/down/first.jpg" alt="下载和掌柜">
      <button @click="downAPP"></button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height: ''
      }
    },
    methods: {
      downAPP() {
        this.$router.push('/download')
      }
    },
    mounted() {
      this.height = document.documentElement.clientHeight
    }
  }

</script>

<style scoped lang="less">
  div {
    background: #fff;

    div {
      width: 100%;

      img {
        width: 100%;
      }

      button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 903px;
        width: 448px;
        border-radius: 80px;
        background: transparent;
        height: 80px;
      }
    }

  }

</style>
