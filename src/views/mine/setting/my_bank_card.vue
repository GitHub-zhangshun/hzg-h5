<template>
  <div class="bank_deposit_account">
    <div class="card_show" v-if="card==1">
      <header>
        <div class="top">
          <div><img :src="bankIcon"></div>
          <span>{{bankFname}}</span>
        </div>
        <p>{{cardNo}}</p>
      </header>
      <ul>
        <li v-if="showSingleQuota">
          <span>单笔充值限额</span>
          <span>¥{{singleQuota}}元</span>
        </li>
        <li v-if="showDayQuota">
          <span>单日充值限额</span>
          <span>¥{{dayQuota}}元</span>
        </li>
        <li v-if="showMonthQuota">
          <span>单月充值限额</span>
          <span>¥{{monthQuota}}元</span>
        </li>
      </ul>
      <van-button type="danger" @click="changeCard(2)" :loading="loading">解绑银行卡</van-button>
    </div>
    <div class="card_hidden" v-if="card==2">
      <p>你暂未绑定银行卡，为了您的资金安全，请前往绑定</p>
      <van-button type="danger" @click="changeCard(1)" :loading="loading">绑定银行卡</van-button>
    </div>
    <div class="tips">
      <p>为了您的账户安全，仅支持绑定1张银行卡进行提现和充值</p>
      <p>如有疑问，请联系客服电话400-020-0178</p>
    </div>
  </div>
</template>

<script>
  import {
    indexApi
  } from '@/api/mine'
  import {
    publicFun
  } from '@/libs/publicFun'
  import {
    Button,
    Toast
  } from 'vant';
  export default {
    components: {
      'van-button': Button
    },
    data() {
      return {
        card: 0,
        loading: false,
        bankFname: '',
        cardNo: '',
        singleQuota: '',
        dayQuota: '',
        monthQuota: '',
        bankIcon: '',
        showSingleQuota: true,
        showDayQuota: true,
        showMonthQuota: true,
        bankList: ''
      }

    },
    methods: {
      changeCard(val) {
        this.loading = true
        if (val === 1) {
          // 绑定
          indexApi.changeCard(1)
            .then(data => {
              this.loading = false
              localStorage.setItem('path', this.$route.fullPath)
              sessionStorage.setItem('shanba','bind_card')
              publicFun.redirectTripartite(data.result)
            })
            .catch(err => {
              this.loading = false
            })
        }
        if (val === 2) {
          // 解绑
          indexApi.changeCard(2)
            .then(data => {
              this.loading = false
              localStorage.setItem('path', this.$route.fullPath)
              sessionStorage.setItem('shanba','remove_card')
              publicFun.redirectTripartite(data.result)
            })
            .catch(err => {
              this.loading = false
            })
        }
      },
    },
    created() {
      Toast.loading({
        duration: 0,
        mask: true,
      });
      indexApi.userGetBank().then(data => {
        Toast.clear()
        if (data.result) {
          this.card = 1
          this.showSingleQuota = data.result.singleQuota == null ? false : true
          this.showDayQuota = data.result.dayQuota == null ? false : true
          this.showMonthQuota = data.result.monthQuota == null ? false : true
          this.bankFname = data.result.name
          this.cardNo = data.result.cardNo
          this.singleQuota = data.result.singleQuota && publicFun.toMoney(data.result.singleQuota)
          this.dayQuota = data.result.dayQuota && publicFun.toMoney(data.result.dayQuota)
          this.monthQuota = data.result.monthQuota && publicFun.toMoney(data.result.monthQuota)
          this.bankIcon = data.result.icoLink
        } else {
          this.card = 2
        }
      })
    }
  }

</script>

<style scoped lang='less'>
  .bank_deposit_account {
    .card_show {
      header {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background: #fff;
        margin: 18px 20px;
        padding: 39px 0 46px 20px;

        .top {
          line-height: 54px;
          padding-bottom: 52px;
          display: flex;

          &>div {
            width: 72px;
            height: 72px;
            padding-right: 30px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          span {
            font-size: 36px;
            font-weight: bold;
            vertical-align: middle;
          }
        }

        &>p {
          font-size: 40px;
          color: #adafb1;
        }
      }

      ul {
        background: #fff;

        li {
          display: flex;
          border-bottom: 1px solid #eff2f7;
          justify-content: space-between;
          padding: 0 40px;
          line-height: 100px;

          span {
            font-size: 28px;
          }

          span:nth-of-type(2) {
            color: #848a93;
          }
        }
      }

      button {
        position: relative;
        left: 50%;
        transform:translateX(-50%);
        margin-top: 100px;
        width: 70%;
        height: 88px;
        border: none;
      }
    }

    .card_hidden {
      min-height: 90vh;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      p {
        width: 70%;
        text-align: center;
        font-size: 28px;
        line-height: 1.5;
      }

      button {
        margin-top: 20px;
        width: 70%;
        height: 88px;
        border: none;
      }
    }

    .tips {
      text-align: center;
      position: absolute;
      bottom: 30px;
      font-size: 24px;

      p {
        color: #848a93;
        display: inline-block;
        line-height: 1.5;
      }
    }
  }

</style>
