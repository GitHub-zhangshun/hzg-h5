<template>
  <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
    <div class="index">
      <!-- banner -->
      <div class="banner">
        <img class="bannerShow" :src="require('@/assets/images/banner_place@3x.png')" alt="banner" v-if="showBanner==1">
        <swiper loop auto :list="demo01_list" dots-position="center" v-if="showBanner==2"></swiper>
        <!-- <swiper :options="swiperOption">
                <swiper-slide>1</swiper-slide>
                <swiper-slide>2</swiper-slide>
                <swiper-slide>3</swiper-slide>
            </swiper> -->
      </div>
      <!-- 公告 -->
      <ul class="announcement">
        <li>
          <div><img src="../assets/images/home/notice-icon.png" alt="平台公告"></div>
        </li>
        <li style="justify-content:left">
          <!-- <swiper :options="swiperOption">
                    <swiper-slide>1</swiper-slide>
                    <swiper-slide>2</swiper-slide>
                    <swiper-slide>3</swiper-slide>
                </swiper> -->
          <div class="noAnnouncement" v-if="noAnnouncementFlag==1">暂无公告</div>
          <Swipe :autoplay="3000" vertical :touchable="false" :show-indicators="false" v-if="noAnnouncementFlag==2">
            <SwipeItem v-for="(item, index) in announcementItems" :key="index" @click.native="announcement(item.id)">
              <p>{{item.content}}</p>
            </SwipeItem>
          </Swipe>
        </li>
        <li><i class="icon iconfont icon-shenglvehao" @click="$router.push({path:'/announcement'})"></i></li>
      </ul>
      <!-- 新人优享 -->
      <div class="couple" v-if="newPeople">
        <header>新人优享</header>
        <div class="contain">
          <ul>
            <li class="Annual">
              <p><span>{{rate}}</span>%</p>
              <span>年化利率</span>
            </li>
            <li class="timeLimit">
              <p><span>{{bidLimit}}</span>{{day}}</p>
              <span>持有期限</span>
            </li>
          </ul>
          <button
            @click="$router.push({path:'/product_introduction',query:{id:newpeopleid,userId:xinshouId}})">立即出借</button>
        </div>
      </div>
      <!-- 热门产品 -->
      <div class="hotProducts" v-if="hotProduct">
        <header>热门产品</header>
        <div class="contain"
          @click="$router.push({path:'/product_introduction',query:{id:item.hotproId,userId:item.userId}})"
          v-for="(item, index) in pageIndexBidHot" :key="index">
          <ul>
            <li class="left">
              <div class="triangle"></div>
              <p>{{item.bidName}}</p>
              <ul>
                <li class="Annual">
                  <p><span>{{item.rate}}</span>%</p>
                  <span>年化利率</span>
                </li>
                <li class="timeLimit">
                  <p><span>{{item.bidLimit}}</span>{{item.subhead}}</p>
                  <span>持有期限</span>
                </li>
              </ul>
            </li>
            <li class="right">
              <circleIndex :showStatus="item.showStatus" :proportion='item.proportion'></circleIndex>
              <span>{{item.startMoney}}元起投</span>
            </li>
          </ul>
          <hr>
          <div>
            <span>剩余{{item.canInvestMoney}}元可投</span>
            <button @click.stop="borrow(item.hotproId,item.signType)">立即借出</button>
          </div>
        </div>
      </div>
      
      
      <!-- 稳健运营 -->
      <div class="stableOperation">
        <header>运营数据</header>
        <p class="safeDay">运营时间</p>
        <div class="day">
          <ul>
            <li v-for="(item, index) in runTime" :key="index">{{item}}</li>
          </ul>
          <span>天</span>
        </div>
        <div class="moneyAndPeople">
          <div class="money">
            <p>累计成交金额 (元)</p>
            <span>{{transactionTotal}}</span>
          </div>
          <div class="prople">
            <p>累计注册用户数 (人)</p>
            <span>{{registerTotal}}</span>
          </div>
        </div>
        <!-- <div class="tips">
                <span><i class="icon iconfont icon-gridx"></i>您的资金由晋城银行存管系统存管</span>
            </div> -->
        <div class="iso">
          <ul>
            <li @click="$router.push('/Information_disclosure')">
              <div><img src="../assets/images/home/one.png" alt="信息披露"></div>
              <p>信息披露</p>
            </li>
            <li @click="$router.push('/safe')">
              <div><img src="../assets/images/home/two.png" alt="安全保障"></div>
              <p>监督管理</p>
            </li>
            <li @click="$router.push({path:'/Information_disclosure',query:{index:4}})">
              <div><img src="../assets/images/home/three.png" alt="运营数据"></div>
              <p>运营数据</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 提示 -->
      <div class="cautious"><i class="icon iconfont icon-dengpao"></i>网贷有风险，出借需谨慎</div>


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
  </mescroll-vue>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {
    Swipe,
    SwipeItem,
    Dialog
  } from 'vant';
  import {
    Swiper,
    SwiperItem,
    Tabbar,
    TabbarItem
  } from "vux";
  import {
    indexApi
  } from '@/api/index'
  import {
    publicFun
  } from '@/libs/publicFun'
  // import circleProgress from '@/components/circleProgress'
  import circleIndex from '@/components/circleIndex'
  export default {
    data() {
      return {
        showBanner: 0, //banner占位图
        mescroll: null, // mescroll实例对象
        mescrollDown: {
          use: false
        }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback,
          // warpId:"hotProduct",
          htmlNodata: '<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
        },
        demo01_list: [],
        //公告
        announcementItems: [],
        noAnnouncementFlag: 0,
        registerTotal: "",
        runTime: [],
        transactionTotal: "",
        rate: "",
        bidLimit: "",
        pageIndexBidHot: [],
        newPeople: false,
        hotProduct: false,
        newpeopleid: '',
        xinshouId: '',
        day: '',
        num: 1,
        size: 10,
        //陕坝开户弹窗
        show: false,
        //测评弹窗
        showRisk: false,
        //测评不匹配
        showRiskNo: false,
        //当前用户的类型
        riskLevelTxt: '',
        biaoRiskLevelTxt: '',
        //存量
        // showStock:false     
      };
    },
    components: {
      Swipe,
      SwipeItem,
      Swiper,
      SwiperItem,
      Tabbar,
      TabbarItem,
      circleIndex,
      MescrollVue
    },
    methods: {
      //公告事件
      announcement(index) {
        this.$router.push({
          path: 'announcementDetails',
          query: {
            id: index,
            title: '公告详情'
          }
        })
      },
      //陕坝开户弹窗
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
      //存量弹窗关闭
      // stockClose(a){
      //     this.showStock = a
      // },
      //出借判断
      borrow(id, signType) {
        if (!localStorage.getItem('info')) { //是否登陆
          this.$router.push('/verification_code_login')
          return
        }
        indexApi.investorCurrent().then(data => {
          if (!data.result.attachInfo.isOpen) { //是否开户
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
          } else if (data.result.user.riskLevelInfo == null) { //是否测评
            this.showRisk = true
          } else if (Number(data.result.user && data.result.user.riskLevelInfo && data.result.user.riskLevelInfo
              .money || 0) < Number((signType[0] && signType[0].subhead) || 0)) { //测评等级是否匹配
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
      mescrollInit(mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback(page, mescroll) {
        //首页热门标
        let params = {
          num: page.num, // 页码
          size: page.size // 每页长度
        }
        indexApi.productList(params).then(data => {
          if (data.result.length == 0) {
            this.hotProduct = false
            mescroll.endSuccess(data.result.length)
          } else {
            if (page.num === 1) this.pageIndexBidHot = []
            this.hotProduct = true
            for (var i = 0; i < (data.result && data.result.length) || 0; i++) {
              this.pageIndexBidHot.push({
                subhead: data.result[i].interestType && publicFun.Pl(data.result[i].interestType) && publicFun
                  .Pl(data.result[i].interestType)[0].subhead,
                bidName: data.result[i].name,
                rate: publicFun.toMoney(data.result[i].rate || 0, 1),
                bidLimit: data.result[i].count,
                showStatus: data.result[i].showStatus,
                canInvestMoney: publicFun.toMoney((data.result[i].statisticsInfo && data.result[i]
                  .statisticsInfo.surplusMoney) || 0, 2),
                startMoney: publicFun.toMoney((data.result[i].moneyInfo && data.result[i].moneyInfo.limitMin) ||
                  0, 0),
                hotproId: data.result[i].Id,
                proportion: parseInt((data.result[i].statisticsInfo && data.result[i].statisticsInfo
                  .investMoney * 100) / data.result[i].money),
                hotUserId: data.result[i].userId,
                signType: (data.result[i].attachInfo && data.result[i].attachInfo.riskLevel && publicFun.Pl(data
                  .result[i].attachInfo.riskLevel)) || 0,
                userId: data.result[i].userId
              })
            }
            this.$nextTick(() => {
              mescroll.endSuccess(data.result.length)
            })
          }
        })
      },
    },
    created() {
      //初始化请求数据
      //banner       
      indexApi.banner().then(data => {
        localStorage.setItem('banner', JSON.stringify(data.result))
        let bannerIndex = []
        data.result.map(i => {
          if (i.showType === "d1fe73d7-4614-4cd4-bd40-1b4377eba926") {
            bannerIndex.push({
              url: i.link,
              img: i.imgLink
            })
          }
        })
        if (bannerIndex.length > 0) {
          this.showBanner = 2
          this.demo01_list = bannerIndex
        } else {
          this.showBanner = 1;
        }
      })
      if (this.demo01_list.length == 0) {
        this.showBanner = 1;
      } else {
        this.showBanner = 2
      }
      //公告
      indexApi.articleListByPage().then(data => {
        if (data.result.length == 0) {
          this.noAnnouncementFlag = 1
        } else {
          this.noAnnouncementFlag = 2
          let article = [];
          for (var i = 0; i < data.result.length; i++) {
            article.push({
              content: data.result[i].title,
              id: data.result[i].Id
            })
          }
          this.announcementItems = article;
        }
      })
      //稳健运营  
      indexApi.platformRunData().then(data => {
        this.runTime = data.result.runTime.toString().split("")
        this.registerTotal = publicFun.toMoney(data.result.registerTotal || 0, 0);
        this.transactionTotal = data.result.transactionTotal == null ? '0' :publicFun.toMoney(parseInt(data.result.transactionTotal),0)
      })
      //首页新手标
      indexApi.productInfoByNovice().then(data => {
        console.log('11', data)
        if (data.result == null) {
          this.newPeople = false;
        } else {
          this.newPeople = true
          if (sessionStorage.getItem('dictionaryListByAll') == null) {
            return false
          } else {
            this.day = data.result.interestType && publicFun.Pl(data.result.interestType) && publicFun.Pl(data
              .result.interestType)[0].subhead
          }
          this.newpeopleid = data.result.Id;
          this.xinshouId = data.result.userId;
          this.rate = publicFun.toMoney(data.result.rate, 1);
          this.bidLimit = data.result.count;
        }
      })
    },

  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .mescroll {
    position: absolute;
    top: 0;
    bottom: 0;
    height: auto;
  }

  .index {
    padding-bottom: 100px;

    .banner {
      height: 360px;

      &>img {
        height: 100%;
      }

      /deep/.vux-slider {
        .vux-swiper {
          height: 360px !important;

          .vux-swiper-item {
            a {
              img {
                width: 100%;
                height: 100%;
              }

              .vux-swiper-desc {
                background-image: none;
              }
            }
          }
        }

        .vux-indicator {
          a {
            .vux-icon-dot {
              height: 20px;
              width: 20px;
              border-radius: 20px;
              background-color: rgba(255, 255, 255, .3)
            }

            .active {
              background-color: #fff;
            }
          }
        }
      }
    }

    .announcement {
      background: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;

      li {
        height: 82px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      li:nth-of-type(1) {

        // padding: 0 26px 0 20px;
        div {
          width: 100px;

          img {
            vertical-align: middle;
            height: 100%;
            width: 100%;
          }
        }
      }

      li:nth-of-type(2) {
        justify-content: left;
        width: 70%;

        .van-swipe {
          height: 82px;
          width: 100%;

          .van-swipe__track {
            .van-swipe-item {
              display: flex;
              justify-content: flex-start;
              align-items: center;

              p {
                padding-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 28px;
                color: #32363c;
              }
            }
          }
        }

        .noAnnouncement {
          font-size: 28px;
        }
      }

      li:nth-of-type(3) {
        color: #404d5c;
      }
    }

    .stableOperation {
      margin: 20px 0;
      background: #fff;
      padding-top: 38px;

      header {
        font-size: 32px;
        padding-left: 12px;
        margin-bottom: 30px;
        color: #32363c;
        border-left: 4px #5988f6 solid;
        font-weight: bold;
      }

      .safeDay {
        text-align: center;
        font-size: 28px;
        color: #969090;
      }

      .day {
        margin-top: 26px;
        display: flex;
        justify-content: center;
        color: #32363c;

        ul {
          display: flex;
          font-size: 42px;

          li {
            width: 60px;
            height: 54px;
            background-color: #eff4ff;
            text-align: center;
            line-height: 56px;
            margin-right: 20px;

            &:last-child {
              margin-right: 0;
            }
          }
        }

        span {
          font-size: 28px;
          line-height: 54px;
          margin-left: 16px;
        }
      }

      .moneyAndPeople {
        margin-top: 36px;
        margin-bottom: 36px;
        display: flex;
        justify-content: space-around;

        p {
          font-size: 24px;
          color: #848a93;
          text-align: center;
        }

        span {
          margin-top: 22px;
          display: inline-block;
          font-size: 42px;
          color: #32363c;
          text-align: center;
          width: 100%;
        }
      }

      // .tips {
      //     width: 640px;
      //     height: 30px;
      //     margin: 36px auto;
      //     // background-color: #f0f4ff;
      //     border-radius: 50px;
      //     font-size: 24px;
      //     color: #739cf7;
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //     i {
      //         margin-right: 10px;
      //         vertical-align: middle;
      //     }
      // }
      hr {
        border: 0.5px solid #f0f4ff;
        margin: 0;
      }

      .iso {
        padding: 36px 0;
        border-top: 1px solid #f0f4ff;

        ul {
          display: flex;
          justify-content: space-around;

          li {
            div {
              display: inline-block;
              margin-bottom: 14px;
              width: 110px;
              height: 110px;

              img {
                width: 100%;
                height: 100%;
              }
            }

            p {
              text-align: center;
              font-size: 24px;
              color: #848a93;
            }
          }
        }
      }
    }

    .couple {
      background: #fff;
      padding-top: 36px;
      margin-top: 18px;
      header {
        font-size: 32px;
        padding-left: 12px;
        margin-bottom: 64px;
        color: #32363c;
        border-left: 4px #ff4e30 solid;
        font-weight: bold;
      }

      .contain {
        text-align: center;
        background: url('../assets/images/bj@2x.png') center center no-repeat;
        background-size: 750px 454px;

        ul {
          display: flex;
          align-items: baseline;
          justify-content: space-around;
          margin-bottom: 46px;

          .Annual {
            p {
              font-size: 32px;
              color: #ff4e30;
              margin-bottom: 24px;

              span {
                font-size: 76px;
                margin-right: 16px;
                color: #ff4e30;
              }
            }

            &>span {
              font-size: 24px;
              color: #848a93;
              display: inline-block;
              width: 100%;
              text-align: center;
            }
          }

          .timeLimit {
            p {
              font-size: 28px;
              color: #32363c;
              margin-bottom: 24px;

              span {
                font-size: 50px;
                color: #32363c;
              }
            }

            &>span {
              font-size: 24px;
              color: #848a93;
              display: inline-block;
              width: 100%;
              text-align: center;
            }
          }
        }

        button {
          text-align: center;
          width: 274px;
          height: 80px;
          background-color: #ff4e30;
          font-size: 32px;
          border-radius: 50px;
          color: #fff;
          margin-bottom: 36px;
          box-shadow: 0 5.8vw 12vw -3vw #f5ccc5;
        }
      }
    }

    .hotProducts {
      padding-bottom: 40px;

      header {
        font-size: 32px;
        padding-left: 12px;
        margin: 32px 0 30px;
        color: #32363c;
        border-left: 4px #ff4e30 solid;
        font-weight: bold;
      }

      .contain {
        width: 710px;
        background: #fff;
        border-radius: 10px;
        margin: 0 auto 18px;

        ul {
          display: flex;
          justify-content: space-between;

          .left {
            flex: 1;
            position: relative;
            padding-bottom: 34px;

            .triangle {
              width: 0;
              height: 0;
              border-top: 15px solid #f5f7fb;
              border-right: 15px solid transparent;
              border-left: 15px solid transparent;
              position: absolute;
              top: 0;
              right: -16px;
            }

            &>p {
              font-size: 28px;
              color: #32363c;
              padding-top: 42px;
              padding-left: 52px;
              padding-bottom: 32px;
            }

            ul {
              display: flex;
              align-items: baseline;
              justify-content: space-around;

              .Annual {
                p {
                  font-size: 26px;
                  color: #ff4e30;

                  span {
                    font-size: 66px;
                  }

                  margin-bottom: 14px;
                }

                &>span {
                  font-size: 20px;
                  color: #848a93;
                }
              }

              .timeLimit {
                p {
                  font-size: 26px;
                  color: #32363c;

                  span {
                    font-size: 36px;
                  }

                  margin-bottom: 14px;
                }

                &>span {
                  font-size: 20px;
                  color: #848a93;
                }
              }
            }
          }

          .right {
            padding-bottom: 34px;
            width: 210px;
            border-left: 1px dashed #e2e2e2;
            padding-top: 55px;
            text-align: center;
            color: #848a93;
            font-size: 20px;


          }
        }

        hr {
          border-top: 1px solid #e2e2e2;
          margin: 0;
        }

        &>div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          line-height: 84px;
          padding: 0 30px 0 52px;

          span {
            color: #848a93;
            font-size: 24px;
          }

          button {
            width: 160px;
            height: 50px;
            font-size: 26px;
            color: #ff4e30;
            background-color: transparent;
            border: 1px solid #ff4e30;
            border-radius: 50px;
          }
        }
      }

      .contain:last-child {
        margin-bottom: 0;
      }
    }

    .cautious {
      font-size: 22px;
      color: #848a93;
      line-height: 100px;
      text-align: center;

      i {
        margin-right: 10px;
        color: #848a93;
        font-size: 22px;
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
  }

</style>
