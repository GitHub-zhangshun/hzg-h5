<template>
  <div class="withdrawal_index">
    <div class="big_div">
      <ul class="header">
        <li>
          <div><img :src="bankIcon"></div>
        </li>
        <li>
          <p>
            <span>{{bankFname}}</span><span style="color: #848a93;">(尾号{{cardNo}})</span>
            <span @click="$router.push('/limit_info')" style='color:#ff4e30;flex:1;text-align:right'>限额说明</span>
          </p>
          <p>{{singleQuota}}{{dayQuota}}{{monthQuota}}</p>
        </li>
      </ul>
      <ul class="money">
        <!-- <li>充值金额（今日还可充值<span style="color:#ff4e3c">6000</span>元）</li> -->
        <li>充值金额</li>
        <li>
          <span><i class="icon iconfont icon-renminbi"></i></span>
          <div @click="onFocus">
            <input type='text' v-model="amt" id="input" @blur="onblur">
            <label v-if="placehold">请输入充值金额</label>
          </div>
        </li>
        <li v-if="showTips==0">最低充值<span style="color:#ff4e30">{{minChargeShow}}</span>元</li>
        <li v-if="showTips==1" style="color:#ff4e30">不可以低于{{minChargeShow}}元</li>
        <li v-if="showTips==2" style="color:#ff4e30">不可超出银行卡{{singleQuota}}</li>
      </ul>
      <x-button type="warn" @click.native="submit" :disabled='disabled' :show-loading="show_loading"
      :class="disabled==true?'disabled':''">确认充值</x-button>
      <div class="instructions">
        <span>注：每日23:00至次日00:30为系统维护时间，期间暂停快捷充值，网银充值服务</span>
      </div>
    </div>   
    <Footer></Footer>
    <!-- <codeDialog :codeDialog_show.sync="codeDialog_show" :amt="amt" @clearTimer="clearTimer"></codeDialog>         -->
  </div>
</template>

<script>
  // import code_dialog from '@/components/code_dialog'
  import {
    indexApi
  } from '@/api/mine'
  import {
    publicFun
  } from '@/libs/publicFun'
  import {
    XButton
  } from 'vux'
  import {
    numberComma
  } from 'vux'
  import {
    Toast
  } from 'vant';
  export default {
    components: {
      XButton,
      // 'codeDialog':code_dialog
    },
    data() {
      return {
        //短信框
        // codeDialog_show:false,
        amt: '',
        disabled: true,
        show_loading: false,
        placehold: true,
        //银行卡名字
        bankFname: '',
        //银行卡尾号
        cardNo: '',
        //银行卡图片
        bankIcon: '',
        //单笔限额
        singleQuota: '',
        singleQuota_number: '',
        //日限额
        dayQuota: '',
        //月限额
        monthQuota: '',
        //最低充值
        minCharge: '',
        showTips: 0
      }
    },
    computed: {
      minChargeShow() {
        return this.minCharge && publicFun.toMoney(Number(this.minCharge), 2)
      }
    },
    watch: {
      amt() {
        if (!publicFun.checkMoney(this.amt)) {
          this.disabled = true
        } else if (Number(this.amt) < Number(this.minCharge)) {
          this.showTips = 1
          this.disabled = true
        } else if (Number(this.amt) > Number(this.singleQuota_number)) {
          this.showTips = 2
          this.disabled = true
        } else {
          this.showTips = 0
          this.disabled = false
        }
      },
    },
    created() {
      indexApi.userGetBank().then(data => {
        this.bankFname = data.result.name
        this.cardNo = data.result.cardNo && data.result.cardNo.slice(-4) || ''
        this.bankIcon = data.result.icoLink
        this.singleQuota = data.result.singleQuota && (Number(data.result.singleQuota) >= 10000 ?`单笔限额${Number(data.result.singleQuota)/10000}万元` : `单笔限额${data.result.singleQuota}元`) || ''
        this.singleQuota_number = data.result.singleQuota
        this.dayQuota = data.result.dayQuota && (Number(data.result.dayQuota) >= 10000 ?`，单日限额${Number(data.result.dayQuota)/10000}万元` : `，单日限额${data.result.dayQuota}元`) || ''
        this.monthQuota = data.result.monthQuota && (Number(data.result.monthQuota) >= 10000 ?`，单月限额${Number(data.result.monthQuota)/10000}万元` : `，单月限额${data.result.monthQuota}元`) || ''
      })
      indexApi.platformConfig().then(data => {
        this.minCharge = data.result.minCharge
      })
    },
    methods: {
      // 陕坝
      submit() {
        this.show_loading = true
        this.disabled = true
        indexApi.recharge({
            amt: this.amt
          })
          .then(data => {
            this.show_loading = false
            this.disabled = false
            sessionStorage.setItem('shanba', 'recharge')
            publicFun.redirectTripartite(data.result)
          })
          .catch(err => {
            this.show_loading = false
            this.disabled = false
          })
      },
      onFocus() {
        document.getElementById("input").focus();
        this.placehold = false;
      },
      onblur() {
        if (this.amt == '') {
          this.placehold = true;
        } else {
          this.placehold = false
        }
      },
    }
  }

</script>

<style scoped lang='less'>
  .withdrawal_index {

    // position: relative;
    .big_div {
      min-height: calc(100vh - 142px);
      .header {
        margin-top: 18px;
        background: #fff;
        padding: 30px 0 30px 40px;
        display: flex;
        justify-content: space-between;

        li:first-child {
          div {
            width: 72px;
            height: 72px;
            padding-right: 40px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        li:last-child {
          flex: 1;

          p {
            padding-bottom: 22px;
            font-size: 32px;
            display: inline-block;
            display: flex;
            padding-right: 40px;

            span:first-child {
              font-weight: bold;
              padding-right: 46px;
            }
          }

          p:last-child {
            font-size: 24px;
            color: #848a93;
          }
        }
      }

      .money {
        margin-top: 18px;
        background: #fff;

        li:first-child {
          font-size: 28px;
          padding: 28px 0 46px 40px;
        }

        li:nth-of-type(2) {
          padding: 0 40px 30px 40px;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          display: flex;

          span {
            line-height: 1.5;
            font-weight: bold;

            i {
              font-size: 60px;
            }
          }

          &>div {
            flex: 1;
            position: relative;
            padding-left: 20px;

            input {
              height: 100%;
              width: 100%;
              font-size: 60px;
              color: #333;
              z-index: 2;
              background: transparent;
            }

            label {
              position: absolute;
              left: 20px;
              top: 50%;
              transform: translate(0, -50%);
              font-size: 28px;
              color: #c4c7cb;
              z-index: 1;
            }
          }
        }
      }

      li:nth-of-type(3) {
        padding-left: 40px;
        line-height: 100px;
        font-size: 28px;
      }

      /deep/.weui-btn_warn {
        margin-top: 100px;
        background: #ff4e30;
        height: 88px;
        font-size: 32px;
        width: 670px;
        i {
          width: 40px;
          height: 40px;
        }
      }

      .disabled {
        background: #cfd4da;
        color: #fff;
      }
      .instructions{
        padding-top: 40px;
        padding-left: 44px;
        padding-right: 40px;
        span{
          padding-top: 20px;
          font-size: 24px;
          line-height: 1.5;
          color: #848a93;
        }
      }
    }

    footer {
      // position: absolute;
      // bottom: 20px;
      // left: 0;
      // right: 0;
    }
  }

</style>
