<template>
  <div class="money_record">
    <!-- 充值 -->
    <div class="top" v-if="flag=='充值'">
      <ul>
        <li>
          <p>{{title}}</p>
          <span class="money">+{{amount}}</span>
        </li>
        <li>
          <p>银行卡</p>
          <span>{{cardNo}}</span>
        </li>
      </ul>
    </div>
    <!-- 提现 -->
    <div class="top" v-if="flag=='提现'">
      <ul>
        <li>
          <p>{{title}}</p>
          <span class="money">-{{amount}}</span>
        </li>
        <li>
          <p>手续费</p>
          <span>{{serviceCharge || "0.00"}}</span>
        </li>
        <li>
          <p>银行卡</p>
          <span>{{cardNo}}</span>
        </li>
      </ul>
    </div>
    <!-- 出借 -->
    <div class="top" v-if="flag=='出借'">
      <ul>
        <li>
          <p>{{title}}</p>
          <span class="money">- {{amount}}</span>
        </li>
        <li>
          <p>标的名称</p>
          <span>{{bidName}}</span>
        </li>
        <li v-if="coupon_show">
          <p>优惠券</p>
          <span>{{coupon}}</span>
        </li>
      </ul>
    </div>
    <!-- 回款 -->
    <div class="top" v-if="flag=='回款'">
      <ul>
        <li>
          <p>{{title}}</p>
          <span class="money">+ {{amount}}</span>
        </li>
        <li>
          <p>标的名称</p>
          <span>{{bidName}}</span>
        </li>
        <li>
          <p>本金</p>
          <span> + {{principal || "0.00"}}</span>
        </li>
        <li>
          <p>收益</p>
          <span>+ {{numAdd(damages||0,interest||0)}} <i v-if="icon" class="icon iconfont icon-gantanhao"
              style="color:#ff4e30" @click="dialog"></i> </span>
        </li>
        <li>
          <p>管理费</p>
          <span>- {{serviceCharge || "0.00"}}</span>
        </li>
      </ul>
    </div>
    <!--加息收益 -->
    <div class="top" v-if="flag=='加息收益'">
      <ul>
        <li>
          <p>{{title=="--"?'加息':title}}</p>
          <span class="money">+ {{amount}}</span>
        </li>
        <li>
          <p>标的名称</p>
          <span>{{bidName}}</span>
        </li>
      </ul>
    </div>
    <!-- 退款 -->
    <div class="top" v-if="flag=='退款'">
      <ul>
        <li>
          <p>{{title}}</p>
          <span class="money">+ {{amount}}</span>
        </li>
        <li>
          <p>标的名称</p>
          <span>{{bidName}}</span>
        </li>
        <li>
          <p>退款原因</p>
          <span>{{remarks}}</span>
        </li>
      </ul>
    </div>
    <!-- 返利 -->
    <div class="top" v-if="flag=='返利'">
      <ul>
        <li>
          <p>{{title=='--'?'返利':title}}</p>
          <span class="money">+ {{amount}}</span>
        </li>
        <li>
          <p>标的名称</p>
          <span>{{bidName}}</span>
        </li>
      </ul>
    </div>
    <div class="tips">
      <ul>
        <li v-if="txnSsn_show">交易流水号：<span>{{txnSsn}}</span></li>
        <li>完成时间：<span>{{operationAt}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    Dialog
  } from 'vant';
  import {
    indexApi
  } from '@/api/mine'
  import {
    publicFun
  } from '@/libs/publicFun'
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        txnSsn_show:true,
        flag: '',
        amount: '',
        bidName: '',
        remarks: '',
        txnSsn: '',
        operationAt: '',
        principal: '',
        interest: '',
        icon: false,
        cardNo: '',
        damages: '',
        serviceCharge: '',
        coupon_show: false,
        coupon: '',
        increaseInterest: '',
        title:''
      }
    },
    mounted() {
      switch (this.$route.query.typeId && publicFun.Pl_simplify(this.$route.query.typeId)) {
        case 'capital_loss':
          this.flag = '退款'
          break;
        case 'capital_transaction':
          this.flag = '出借'
          break;
        case 'capital_repay':
          this.flag = '回款'
          break;
        case 'capital_recharge':
          this.flag = '充值'
          break;
        case 'capital_withdraw':
          this.flag = '提现'
          break;
        case 'capital_increase_interest':
          this.flag = '加息收益'
          break;
        case 'capital_rebate':
          this.flag = '返利'
          break;
      }
      indexApi.capitalDetail(this.$route.query.logId).then(data => {
        this.title = publicFun.Pl_title(data.result.status)
        this.remarks = data.result.remarks
        this.interest = publicFun.toMoney(data.result.interest || 0, 2)
        this.damages = publicFun.toMoney(data.result.damages || 0, 2)
        this.principal = publicFun.toMoney(data.result.principal || 0, 2)
        if (data.result.damages == null || data.result.damages == 0) {
          this.icon = false
        } else {
          this.icon = true
        }
        this.cardNo = data.result.cardNo
        this.amount = publicFun.toMoney(data.result.amount || 0, 2)
        this.bidName = data.result.bidName
        this.txnSsn = data.result.txnSsn
        this.txnSsn_show = data.result.txnSsn?true:false,
        this.operationAt = publicFun.timestampToTimesfs(data.result.operationAt, '-')
        this.serviceCharge = publicFun.toMoney(data.result.serviceCharge || 0, 2)
        this.increaseInterest = publicFun.toMoney(data.result.increaseInterest || 0, 2)
        let res = data.result
        if (res.fullReduction == 0 || res.fullReduction == null) {
          this.coupon_show = false
        } else {
          this.coupon_show = true
          this.coupon = `返利${res.fullReduction}元`
        }

      })
    },
    methods: Object.assign(publicFun, {
      dialog() {
        Dialog.alert({
          message: `包含借款人提前还款的违约金<span style="color:#ff4e30">${this.damages||0}</span>元`
        }).then(() => {
          // on close
        });
      }



    }),
  }

</script>

<style scoped lang='less'>
  .money_record {
    margin-top: 18px;

    .top {
      background: #fff;

      ul {
        li {
          font-size: 28px;
          padding: 36px 0 36px 40px;
          border-bottom: 2px solid #eff2f7;

          p {
            color: #848a93;
            padding-bottom: 30px;
          }

          span {
            color: #32363c;
          }

          .money {
            font-size: 46px;
            color: #ff4e30;
          }
        }

        li:last-child {
          border-bottom: none;
        }
      }
    }

    .tips {
      background: #fff;
      margin-top: 18px;

      ul {
        padding: 40px 0 40px 40px;

        li {
          font-size: 26px;
          color: #848a93;
          padding-bottom: 23px;

          span {
            color: #32363c;
          }
        }

        li:last-child {
          padding-bottom: 0;
        }
      }
    }
  }

</style>
