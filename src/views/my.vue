<template>
  <div class="mine">
    <header>
      <!-- 未登录 -->
      <div v-if="flag" class="nologoin">
        <div>
          <img src="../assets/logo.png">
        </div>
        <button @click="$router.push('/verification_code_login')">登录/注册</button>
      </div>
      <!-- 已登录 -->
      <div v-else class="login">
        <div class="login_head">
          <div class="img">
            <div>
              <img src="../assets/logo.png" v-if="img">
              <img :src="headImg" v-else>
            </div>
            <span>{{phone}}</span>
          </div>
          <ul class="account_money">
            <li>账户总额(元)</li>
            <li>
              <i :class="registration_data.class" @click="change()"></i>
            </li>
          </ul>
          <p class="money">
            <router-link to="/my_account">{{money}}</router-link>
          </p>
          <div class="money_info">
            <ul>
              <li>
                <div>
                  <span>账户余额</span>
                </div>
                <div>
                  <router-link to="/my_account">{{can_carry}}</router-link>
                </div>
              </li>
              <li>
                <div>
                  <span>在投金额</span>
                </div>
                <div>
                  <router-link to="/my_account">{{vote_again}}</router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 开通存管-->
        <div class="step3" v-if="step==3" @click="openAccount">
          <!-- <p>距离财富还剩3步</p> -->
          <ul>
            <li>
              <div>
                <img src="../assets/images/my/step3.png">
              </div>
            </li>
            <li>
              <p>立即开通存管账户</p>
              <p>通过存管账户交易，资金更安全</p>
            </li>
            <li>
              <i class="icon iconfont icon-qianjin2"></i>
            </li>
          </ul>
        </div>
        <!-- 富有开户 -->
        <!-- <div class="step3" v-if="step==2" @click="step2">
          <p>距离财富还剩2步</p>
          <ul>
            <li>
              <div>
                <img src="../assets/images/my/step2.png">
              </div>
            </li>
            <li>
              <p>银行卡签约</p>
              <p>快捷支付，抢标快人一步</p>
            </li>
            <li>
              <i class="icon iconfont icon-qianjin2"></i>
            </li>
          </ul>
        </div>
        <div class="step3" v-if="step==1" @click="step1">
          <p>距离财富还剩1步</p>
          <ul>
            <li>
              <div>
                <img src="../assets/images/my/step1.png">
              </div>
            </li>
            <li>
              <p>委托充值授权</p>
              <p>快捷支付，抢标快人一步</p>
            </li>
            <li>
              <i class="icon iconfont icon-qianjin2"></i>
            </li>
          </ul>
        </div> -->
      </div>
      <!-- 提现充值 -->
      <tab :line-width="0" v-if="tx">
        <!-- <tab :line-width="0"> -->
        <tab-item @click.native="withdrawalAndRecharge(1)">提现</tab-item>
        <span></span>
        <tab-item style="color:#ff4e30" @click.native="withdrawalAndRecharge(2)">充值</tab-item>
      </tab>
    </header>
    <div class="contain">
      <ul>
        <!-- <li @click="$router.push({path:'/borrow_list',query:{type:'全部'}})"> -->
        <li class="touch" @click="$router.push({path:'/borrow_list',query:{id:1}})">
          <div>
            <img src="../assets/images/my/listIcon/icon-brorrow.png">
          </div>
          <span>出借记录</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <li class="touch" @click="$router.push({path:'/money_list',query:{id:1}})">
          <div>
            <img src="../assets/images/my/listIcon/icon-record.png">
          </div>
          <span>资金记录</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <li
          class="touch"
          @click="$router.push({path:'/my_collection',query:{type:'repayment_plan_waiting'}})"
        >
          <div>
            <img src="../assets/images/my/listIcon/icon-reward.png">
          </div>
          <span>我的回款</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <!-- <li class="touch" @click="$router.push('/my_promotion')">
                    <div><img src="../assets/images/my/listIcon/icon-promote.png"></div>
                    <span>我的推广</span> 
                    <i class="icon iconfont icon-qianjin"></i>    
        </li>-->
      </ul>
      <ul>
        <li class="touch" @click="$router.push('/welfare_centre')">
          <div>
            <img src="../assets/images/my/listIcon/flzx.png">
          </div>
          <span>福利中心</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <li class="touch" @click="$router.push('/my_coupons')">
          <div>
            <img src="../assets/images/my/listIcon/yhj.png">
          </div>
          <span>优惠券</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <li class="touch" @click="risk">
          <div>
            <img src="../assets/images/my/listIcon/fenxian.png">
          </div>
          <span>风险测评</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
      </ul>
      <ul>
        <li class="touch" @click="$router.push('/Information_disclosure')">
          <div>
            <img src="../assets/images/my/listIcon/icon-about.png">
          </div>
          <span>关于我们</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <li class="touch" @click="$router.push('/help')">
          <div>
            <img src="../assets/images/my/listIcon/icon-help.png">
          </div>
          <span>帮助中心</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
        <li class="touch" @click="$router.push('/setting')">
          <div>
            <img src="../assets/images/my/listIcon/icon-setting.png">
          </div>
          <span>设置</span>
          <i class="icon iconfont icon-qianjin"></i>
        </li>
      </ul>
      <Footer></Footer>
    </div>

    <!-- <Dialogalert v-if="show" @childClose="close"></Dialogalert> -->
    <RiskDialog v-if="riskShow" @RiskClose="riskClose"></RiskDialog>
    <!-- 存量 -->
    <!-- <StockDialog v-if="showStock" @stockClose="stockClose"></StockDialog> -->
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import { Dialog,Toast} from 'vant';
import { indexApi } from "@/api/mine";
import { publicFun } from "@/libs/publicFun";
export default {
  data() {
    return {
      // 登录flag
      flag: true,
      // 三个步骤
      step: 0,
      // 充值/提现
      tx: false,
      registration_data: {
        class: "icon iconfont icon--"
      },
      colorFlag: "",
      // 登录信息
      phone: "",
      //默认头像切换
      img: true,
      headImg: "../assets/logo.png",
      money: "",
      can_carry: "",
      vote_again: "",
      // show: true,
      riskShow: false,
      info: "",
      // showStock: false
    };
  },
  components: {
    Tab,
    TabItem
  },
  methods: {
    //陕坝开户
    openAccount(){
      Toast.loading({
        mask: true,
        duration:0
      })
      indexApi.openAccountShanBa()
      .then(data => {
        Toast.clear()
        sessionStorage.setItem('shanba','openAccount')
        publicFun.redirectTripartite(data.result)
      })
      .catch( err => {
        Toast.clear()
      })
    },






    //存量弹窗关闭
    // stockClose(a) {
    //   this.showStock = a;
    // },
    // open() {
    //   this.show = true;
    // },
    // close(a) {
    //   this.show = a;
    // },
    riskClose(a) {
      this.riskShow = a;
    },
    risk() {
      if (localStorage.getItem("token") && localStorage.getItem("info")) {
        let info = JSON.parse(localStorage.getItem("info"));
        info.user.riskLevelInfo == null? (this.riskShow = true):this.$router.push("/riskResult");
      } else {
        this.$router.push("/verification_code_login");
      }
    },
    // 眼睛打开关闭
    change() {
      this.registration_data.class =
        this.registration_data.class == "icon iconfont icon--"
          ? "icon iconfont icon-biyan"
          : "icon iconfont icon--";
      if (this.registration_data.class == "icon iconfont icon-biyan") {
        this.money = "--";
        this.can_carry = "--";
        this.vote_again = "--";
      } else {
        this.can_carry = publicFun.toMoney(
          JSON.parse(localStorage.getItem("accountInfo")).usable || 0.00,
          2
        );
        this.vote_again = publicFun.toMoney(
          JSON.parse(localStorage.getItem("accountInfo")).investment || 0.00,
          2
        );
        this.money = publicFun.toMoney(
          Number(JSON.parse(localStorage.getItem("accountInfo")).usable || 0) +
            Number(JSON.parse(localStorage.getItem("accountInfo")).investment || 0),
          2
        );
      }
    },
    // 充值提现
    withdrawalAndRecharge(index) {
      if(this.info && this.info.user && this.info.user.bankCardInfo && this.info.user.bankCardInfo.cardNo == ""){
        Dialog.confirm({
          title: '提示',
          message: '您还未绑定存管银行卡，请先绑卡'
        }).then(() => {
          this.$router.push('/my_bank_card')
        }).catch(() => {
          // on cancel
        })
        return
      }

      // if (!JSON.parse(localStorage.getItem("info")).user.personalAttestation) {
      //   this.showStock = true;
      //   return;
      // }
      localStorage.setItem("path", "/my");
      if (index === 1) {
        this.$router.push("/withdrawal_index");
      }
      if (index === 2) {
        this.$router.push("/recharge");
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.flag = false;
      indexApi.investorCurrent()
        .then(data => {
          localStorage.setItem("info", JSON.stringify(data.result));
          this.info = data.result;
          // 手机号
          if (data.result.user.nickName != "") {
            this.phone = data.result.user.nickName;
            // return
          } else {
            this.phone = data.result.user.phone;
          }
          // 头像
          if (data.result.user.headImg == null) {
            this.img = true;
          } else {
            this.img = false;
            this.headImg = data.result.user.headImg;
          }
          // 陕坝开户
          if (data.result.user.isOpen){
            this.tx = true
            this.step = 0
          }else{
            this.tx = false
            this.step = 3
          }
        })
      indexApi.accountInfo()
        .then(data => {
          localStorage.setItem("accountInfo", JSON.stringify(data.result))
          this.can_carry = publicFun.toMoney(data.result.usable||0, 2)
          this.vote_again = publicFun.toMoney(data.result.investment||0, 2)
          this.money = publicFun.toMoney(
            Number(data.result.usable) + Number(data.result.investment),2)
        })
    } else {
      this.flag = true;
    }
  }
};
</script>

<style scoped lang='less'>
.mine {
  padding-bottom: 100px;
  header {
    .nologoin {
      background-image: url("../assets/images/my/account-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding: 140px 0 164px;
      text-align: center;
      div {
        padding-bottom: 30px;
        width: 100px;
        height: 100px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      button {
        margin: 0 auto;
        color: #ff4e30;
        width: 284px;
        height: 86px;
        display: block;
        line-height: 86px;
        font-size: 36px;
        border-radius: 86px;
        background: #fff;
      }
    }
    /deep/.vux-tab-wrap {
      padding-top: 100px;
      .vux-tab-container {
        height: 100%;
        .vux-tab {
          height: 100%;
          span {
            height: 36px;
            display: inline-block;
            margin: auto;
            border-left: 2px solid #cfd3d9;
          }
          .vux-tab-item {
            color: #333;
            font-size: 32px;
            line-height: 100px;
            background: none;
          }
          .vux-tab-selected {
            color: #ff4e30;
          }
        }
      }
    }
    .login {
      .login_head {
        background-image: url("../assets/images/my/account-bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        color: #fff;
        padding: 82px 40px 46px;
        .img {
          padding-bottom: 46px;
          display: flex;
          justify-content: space-between;
          line-height: 90px;
          margin-right: 24px;
          & > div {
            width: 90px;
            height: 90px;
            padding-right: 20px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
          span {
            font-size: 32px;
            flex: 1;
          }
        }
      }
      .account_money {
        display: flex;
        justify-content: space-between;
        padding-bottom: 30px;
        li:nth-of-type(1) {
          font-size: 28px;
          margin-right: 10px;
        }
      }
      .money {
        a {
          font-size: 60px;
          color: #fff;
        }
        padding-bottom: 60px;
      }
      .money_info {
        ul {
          display: flex;
          li:nth-of-type(1) {
            min-width: 380px;
            padding-right: 10px;
          }
          li {
            div:nth-of-type(1) {
              span {
                font-size: 26px;
                display: inline-block;
                padding-right: 10px;
                padding-bottom: 24px;
              }
              i {
                vertical-align: middle;
              }
            }
            div:nth-of-type(2) {
              a {
                color: #fff;
              }
              font-size: 40px;
            }
          }
        }
      }
    }
    .step3 {
      background: #fff;
      padding: 0 54px 36px 40px;
      // & > p {
      //   line-height: 100px;
      //   font-size: 28px;
      // }
      ul {
        padding-top: 50px;
        display: flex;
        justify-content: space-between;
        li {
          div {
            width: 90px;
            height: 80px;
            padding-right: 50px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          i {
            font-size: 72px;
            color: #ff4e30;
          }
        }
        li:nth-of-type(2) {
          flex: 1;
          p:first-child {
            font-size: 32px;
            font-weight: bold;
            padding-bottom: 26px;
          }
          p:last-child {
            font-size: 28px;
            color: #848a93;
          }
        }
      }
    }
  }
}
.contain {
  margin-top: 18px;
  ul {
    background: #fff;
    line-height: 100px;
    li {
      padding: 0 40px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eff2f7;
      div {
        width: 34px;
        height: 36px;
        padding-right: 28px;
        // line-height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      span {
        flex: 1;
        font-size: 28px;
      }
      i {
        color: #75889e;
      }
    }
  }
  ul:nth-of-type(2) {
    margin-top: 18px;
  }
  ul:nth-of-type(3) {
    margin-top: 18px;
  }
}
/deep/.van-dialog {
  .van-dialog__content {
    button {
      margin-left: 40px;
    }
  }
}
</style>