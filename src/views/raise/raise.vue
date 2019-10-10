<template>
  <div class="raise">
    <div class="novice_exclusive" v-if="isFirst">新手专享</div>
    <div class="header">
      <!-- 进度条 -->
      <div class="progress">
        <canvas id="myCanvas">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <span class="prenctSpan">{{prenct}}%</span>
        <div class="rate">
          <p>参考年回报率</p>
          <p>{{rate}}<span>%</span></p>
        </div>
      </div>
      <!-- 起投 -->
      <ul class="cast">
        <li>{{startMoney}}元起投</li>
        <li>持有期限<span class="time">{{bidLimit}}</span><span class="day">{{unit}}</span></li>
        <li>剩余{{canInvestMoney}}元</li>
      </ul>
    </div>
    <div class="contain">
      <ul>
        <li>
          <span>标的总额</span>
          <span>{{bidAmount}}元</span>
        </li>
        <li>
          <span>截止时间</span>
          <span>{{raiseEndTime}}</span>
        </li>
        <li>
          <span>起息日</span>
          <span>{{repayDate}}</span>
        </li>
        <li>
          <span>计息方式</span>
          <span>{{interestTypeChi}}</span>
        </li>
        <li>
          <span>还款方式</span>
          <span>{{repaymentChi}}</span>
        </li>
        <!-- <li>
                    <span>风险类型</span>
                    <span>{{riskLevel}}</span>
                </li> -->
      </ul>
    </div>

    <van-tabs style="z-index:21" :line-width='27' :offset-top="0" sticky color="#ff4e30" @click="toggleTab">
      <van-tab v-for="(item, index) in list4" :key="index" :title="item.name"></van-tab>
      <alive :key="'live'+tabCount" :is='currentTab' keep-alive :productInfo='productInfo' :dynamic='dynamic'></alive>
    </van-tabs>

    <footer>
      <x-button type="warn" style="z-index:22" v-if="showStatusChi=='立即借出'" @click.native="borrow(productId,signType)">
        立即借出</x-button>
      <x-button type="warn" style="z-index:22" v-if="showStatusChi=='该产品已截止募集，请点击查看其它产品'"
        @click.native="$router.push('/product_list')">该产品已截止募集，请点击查看其它产品</x-button>
      <x-button type="warn" style="z-index:22" v-if="showStatusChi=='您已经不是新手了，请点击查看其它产品'"
        @click.native="$router.push('/product_list')">你不是新手,请点击查看其它产品</x-button>
    </footer>
    <!-- 存管 -->
    <Dialogalert v-if="show" @childClose='close'></Dialogalert>
    <!-- 存量 -->
    <!-- <StockDialog v-if="showStock" @stockClose="stockClose"></StockDialog> -->
    <!-- 测评 -->
    <riskDialog v-if="showRisk" @RiskClose='riskClose'></riskDialog>
    <!-- 测评不匹配 -->
    <RiskNoMatch v-if="showRiskNo" :riskLevelTxt="riskLevelTxt" :biaoRiskLevelTxt="biaoRiskLevelTxt"
      @RiskNoMatchShow='RiskNoMatchShow'></RiskNoMatch>
  </div>
</template>

<script>
  import {
    XButton
  } from 'vux'
  import {
    indexApi
  } from '@/api/index'
  import {
    publicFun
  } from '@/libs/publicFun'
  import {
    Dialog
  } from 'vant';
  import alive from './product_introduction'
  import livelive from './authority_card_information'
  import blive from './history_reimbursement'
  import clive from './repayment_history'
  import dlive from './lend_record'
  import {
    setTimeout
  } from 'timers';
  export default {
    data() {
      return {
        // showStock:false,
        signType: '',
        riskLevel: '',
        currentTab: 'alive',
        productId: this.$route.query.id,
        isFirst: '',
        list4: [],
        startMoney: "",
        bidLimit: "",
        unit: "",
        canInvestMoney: "",
        bidAmount: "",
        raiseEndTime: "",
        repayDate: "募集完成次日开始计息",
        interestTypeChi: "",
        repaymentChi: "",
        showStatusChi: '',
        //产品介绍父传子
        productInfo: [],
        //动态模块数据
        dynamic: '',
        mescroll: null,
        mescrollDown: {
          use: false
        },
        mescrollUp: {
          callback: this.upCallback,
        },
        tabCount: 0,
        //陕坝开户弹窗
        show: false,
        //测评弹窗
        showRisk: false,
        //测评不匹配
        showRiskNo: false,
        //当前用户的类型
        riskLevelTxt: '',
        biaoRiskLevelTxt: '',
        //进度百分比
        prenct: '',
        //年化利率
        rate: '',
        //标的颜色判断
        color: ''
      }
    },
    components: {
      XButton,
      alive,
      livelive,
      blive,
      clive,
      dlive,
    },
    created() {
      indexApi.productDetailById(this.productId).then(data => {
        //进度条百分比
        this.prenct = Math.floor((data.result.statisticsInfo.investMoney * 100) / data.result.money)
        //年化利率
        this.rate = data.result.rate.toFixed(1)
        //标的风险
        this.signType = (data.result.attachInfo && data.result.attachInfo.riskLevel && publicFun.Pl(data.result
            .attachInfo.riskLevel)) || 0,
          //是否是新手标
          this.isFirst = publicFun.Pl_simplify(data.result.productType) == 'bid_type_novice' ? true : false;
        //起投金额
        this.startMoney = data.result.moneyInfo.limitMin;
        //持有期限数字
        this.bidLimit = data.result.count;
        //持有期限单位
        this.unit = data.result.interestType && publicFun.Pl(data.result.interestType)[0].subhead;
        //剩余金额
        this.canInvestMoney = publicFun.toMoney(data.result.statisticsInfo && data.result.statisticsInfo
          .surplusMoney || 0, 0);
        //标的总额
        this.bidAmount = publicFun.toMoney(data.result.money || 0, 0);
        //截止时间
        this.raiseEndTime = data.result.timeInfo && publicFun.timestampToTimesfs(data.result.timeInfo.raiseComplete,
          "-") || publicFun.timestampToTimesfs(data.result.timeInfo.raiseExpectEnd, "-") || '未获取数据';
        //计息方式
        this.interestTypeChi = publicFun.Pl_title(data.result.interestType);
        //还款方式
        this.repaymentChi = publicFun.Pl_title(data.result.repayment);
        //风险类型
        this.riskLevel = `"${publicFun.Pl_title(data.result.attachInfo.riskLevel)}"及以上` || "无"
        //tab菜单
        for (let i = 0; i < (data.result.discloseGroupList && data.result.discloseGroupList.length) || 0; i++) {
          this.list4.push(data.result.discloseGroupList[i])
        }
        //产品介绍内容（父传子）
        this.productInfo.push({
          //借款方
          jkf: data.result.isEnterprise && data.result.isEnterprise == true ? data.result.userInfo && data
            .result.userInfo.enterpriseName : data.result.userInfo && data.result.userInfo.realName,
          //本期借款金额
          money: data.result.money,
          //发布时间
          data: data.result.timeInfo && data.result.timeInfo.publish,
          //年化利率
          rate: data.result.rate,
          //借款用途
          borrowCause: data.result.borrowCause,
          //保障方式
          repaymentSource: data.result.repaymentSource,
          //借款人描述
          pledgeDetail: data.result.pledgeDetail

        })
        //标进度条的颜色
        let biaoStatus = publicFun.Pl_simplify(data.result.showStatus)
        if (biaoStatus == 'bid_product_show_raise_underway') {
          this.color = '#ff4e30'
        } else if (biaoStatus == "bid_product_show_over") {
          this.color = "#b3b6b9"
        } else {
          this.color = "#67ccb7"
        }
        //按钮判断
        if (publicFun.Pl_simplify(data.result.showStatus) == 'bid_product_show_raise_underway') {
          let a = ''
          if (localStorage.getItem("info") == null) {
            a = true
          } else {
            a = JSON.parse(localStorage.getItem("info")).user.isNew
          }
          if (data.result.productType && publicFun.Pl_simplify(data.result.productType) == 'bid_type_novice' && a !=
            true && localStorage.getItem('token') != null) {
            this.showStatusChi = '您已经不是新手了，请点击查看其它产品'
          } else {
            this.showStatusChi = '立即借出'
          }
        } else {
          this.showStatusChi = '该产品已截止募集，请点击查看其它产品'
        }
      })
    },
    methods: {
      //存量弹窗关闭
      // stockClose(a){
      //     this.showStock = a
      // },
      toggleTab(index, title) {
        this.tabCount++;
        switch (this.list4.filter(item => {
          return item.name == title
        })[0].showType) {
          case "show_product_detail":
            this.currentTab = 'alive'
            break;
          case "show_product_history_loan":
            this.currentTab = 'blive'
            break;
          case "show_product_refund_log":
            this.currentTab = 'clive'
            break;
          case "show_product_invest_log":
            this.currentTab = 'dlive'
            break;
          default:
            this.currentTab = 'livelive'
            this.dynamic = this.list4[index].itemList
        }
      },
      borrow(id, signType) {
        if(!localStorage.getItem('info')){//是否登陆
          this.$router.push('/verification_code_login')
          return
        }
        indexApi.investorCurrent().then(data => {
          if (!data.result.attachInfo.isOpen) {
            this.show = true
            // this.$router.push('/step')
          } else if (data.result.user && data.result.user.bankCardInfo && data.result.user.bankCardInfo.cardNo ==
            "") { //是否绑定银行卡
            Dialog.confirm({
              title: '提示',
              message: '您还未绑定存管银行卡，请先绑卡'
            }).then(() => {
              this.$router.push('/my_bank_card')
            }).catch(() => {
              // on cancel
            })
          } else if (data.result.user.riskLevelInfo == null) {
            this.showRisk = true
          } else if (Number(data.result.user && data.result.user.riskLevelInfo && data.result.user.riskLevelInfo
              .money || 0) < Number((signType[0] && signType[0].subhead) || 0)) {
            this.riskLevelTxt = data.result.user.riskLevelInfo.riskLevelTxt || 0
            this.biaoRiskLevelTxt = (signType[0] && signType[0].title) || 0
            this.showRiskNo = true
          }
          // else if(!data.result.user.personalAttestation){//存量
          //     this.showStock = true
          // }
          else {
            this.$router.push({
              path: '/lend_confirmation',
              query: {
                id: id
              }
            })
          }
        })
      },
      //陕坝开户弹窗关闭
      close(a) {
        this.show = a
      },
      //测评弹窗
      riskClose(a) {
        this.showRisk = a
      },
      //测评不匹配弹窗
      RiskNoMatchShow(a) {
        this.showRiskNo = a
      },
    },
    watch: {
      prenct() {
        var prenct = this.prenct
        var color = this.color
        var canvas = document.getElementById('myCanvas'), //获取canvas元素
          context = canvas.getContext('2d'), //获取画图环境，指明为2d
          centerX = canvas.width / 2, //Canvas中心点x轴坐标
          centerY = canvas.height - 10, //Canvas中心点y轴坐标
          rad = Math.PI * 1 / 100, //将360度分成100份，那么每一份就是rad度
          speed = 0, //加载的快慢就靠它了 
          R = 130 //半径 

        //白色外圈
        function whiteCircle() {
          context.save();
          context.beginPath();
          context.lineWidth = 6; //设置线宽
          context.strokeStyle = "#f5f7fb";
          context.lineCap = "round"
          context.arc(centerX, centerY, R, 1 * Math.PI, 0);
          context.stroke();
          context.restore();
        }
        //红圈
        function blueCircle(n) {
          context.save();
          context.strokeStyle = color; //设置描边样式
          context.lineWidth = 6; //设置线宽
          context.beginPath(); //路径开始
          context.lineCap = "round"
          context.arc(centerX, centerY, R, 1 * Math.PI, 1 * Math.PI + n *
            rad) //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
          context.stroke(); //绘制
          context.restore();
        }
        //动画循环
        (function drawFrame() {
          window.requestAnimationFrame(drawFrame);
          context.clearRect(0, 0, canvas.width, canvas.height);
          whiteCircle();
          blueCircle(speed);
          if (speed > prenct) {
            return
          } else {
            speed += 1;
          }
        }());
      }
    }
  }

</script>

<style scoped lang='less'>
  @import '~vux/src/styles/1px.less';

  .raise {
    padding-bottom: 100px;
    position: relative;

    .novice_exclusive {
      width: 128px;
      height: 46px;
      border-radius: 46px;
      background-color: #e7f1fd;
      position: absolute;
      line-height: 46px;
      text-align: center;
      font-size: 26px;
      color: #ff4e30;
      top: 10px;
      right: 56px;
    }

    .header {
      margin: 0 auto 18px;
      padding-top: 18px;
      background-image: url("../../assets/images/raise/yecard@2x.png");
      background-size: 100% 100%;

      .progress {
        width: 600px;
        margin: 0 auto;
        position: relative;

        #myCanvas {
          width: 100%;
        }

        .prenctSpan {
          font-size: 24px;
          position: absolute;
          right: -30px;
          bottom: 10px;
        }

        .rate {
          position: absolute;
          left: 50%;
          bottom: -10%;
          transform: translate(-50%, -50%);
          text-align: center;

          p:nth-of-type(1) {
            font-size: 26px;
            color: #848a93;
            margin-bottom: 30px;
          }

          p:nth-of-type(2) {
            font-size: 90px;
            color: #ff4e30;

            span {
              font-size: 46px;
            }
          }
        }
      }

      .cast {
        padding: 0 58px 60px;
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        color: #848a93;
        line-height: 48px;

        li:nth-of-type(2) {
          align-items: center;
          width: 224px;
          border-radius: 50px;
          text-align: center;
          background-color: #f1f4fb;
          align-items: baseline;

          .time {
            display: inline-block;
            padding-left: 16px;
            font-size: 36px;
            color: #32363c;
          }

          .day {
            font-size: 24px;
            color: #32363c;
          }
        }
      }
    }

    .contain {
      padding: 60px 40px;
      background: #fff;
      margin-bottom: 18px;

      ul {
        li {
          display: flex;
          justify-content: space-between;
          font-size: 28px;
          padding-bottom: 46px;

          span:nth-of-type(1) {
            color: #848a93;
          }

          span:nth-of-type(2) {
            color: #32363c;
          }
        }

        li:last-child {
          padding-bottom: 0;
        }
      }
    }

    /deep/.van-tabs--line {
      padding-top: 100px;

      .van-tabs__wrap {
        height: 88px;
        overflow: hidden;

        .van-tabs__nav {
          padding-bottom: 0;
          height: 98px;

          .van-tabs__line {
            bottom: 18px;
          }

          .van-tab {
            font-size: 30px;
            color: #333;

            span {
              overflow: visible !important;
            }
          }

          .van-tab--active {
            color: #ff4e30;
          }
        }
      }
      .van-tabs__content{
        min-height: calc(100vh - 200px)
      }
    }

    /deep/.van-dialog {
      .van-dialog__content {
        button {
          display: flex;
          margin: 0 auto 60px;
          justify-content: center;
          align-content: center
        }
      }
    }

    /deep/footer {
      button {
        line-height: 100px;
        height: 100px;
        font-size: 32px;
        background-color: #ff4e30;
        border-radius: 0;
        position: fixed;
        bottom: 0;
      }

      button:after {
        border: none;
      }
    }

  }

</style>
