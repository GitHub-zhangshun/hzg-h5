<template>
  <mescroll-vue ref="mescroll" :up="mescrollUp">
    <ul class="borrow_all">
      <li id='nolist' v-if="flag">
        <div>
          <img src="../../../assets/images/product/product_null.png" alt="暂无数据">
        </div>
        <span>空空如也~</span>
      </li>

      <li v-else v-for="(item, index) in list" :key="index"
        @click="$router.push({path:'/borrow_record',query:{id:item.id,userId:item.userId}})">
        <header>
          <div class="title">{{item.title}}</div>
          <span class="time">发布日期:{{item.time}}</span>
        </header>
        <section>
          <div class="left">
            <p>{{item.money}}</p>
            <span>出借总额</span>
          </div>
          <div
            :class="item.simplify=='bid_product_show_raise_underway'?'rightred':item.simplify=='bid_product_show_raise_finish'?'rightgreen':item.simplify=='bid_product_show_over'?'rightblack':'rightyellow'">
            {{item.raise}}
          </div>
        </section>
      </li>

    </ul>
  </mescroll-vue>
</template>

<script>
  import {
    indexApi
  } from "@/api/mine"
  import {
    publicFun
  } from "@/libs/publicFun"
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {
    setTimeout
  } from 'timers';
  export default {
    components: {
      MescrollVue
    },
    data() {
      return {
        flag: '',
        list: [],
        mescroll: null,
        mescrollUp: {
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">-- 无更多数据 --</p>'
        },
      }
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      upCallback(page, mescroll) {
        let formdata = ""
        if (this.$route.query.id == 1) {
          formdata = {
            num: page.num,
            size: page.size
          }
        } else {
          formdata = {
            productStatus: this.$route.query.id,
            num: page.num,
            size: page.size
          }
        }
        indexApi.userProductList(formdata).then(data => {
          if (data.result.length == 0 && page.num == 1) {
            this.flag = true
          }
          if (page.num == 1) this.list = []
          for (var i = 0; i < data.result.length; i++) {
            this.list.push({
              id: data.result[i].Id,
              title: data.result[i].name,
              time: publicFun.timestampToTime(data.result[i].timeInfo.publish, "-"),
              money: publicFun.toMoney(data.result[i].investMoney, 2),
              raise: publicFun.Pl_title(data.result[i].showStatus),
              simplify: publicFun.Pl_simplify(data.result[i].showStatus),
              userId: data.result[i].userId
            })
          }
          this.$nextTick(() => {
            mescroll.endSuccess(data.result.length)
          })
        })
        .catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      }
    },
  }

</script>

<style scoped lang='less'>
  .mescroll {
    position: absolute;
    top: 100px;
    bottom: 0;
    height: auto;

    // z-index: -1;
    .borrow_all {
      padding: 0px 20px 0;

      #nolist {
        padding: 50px;
        text-align: center;
        background-color: transparent;

        div {
          width: 340px;
          height: 274px;
          margin: 0 auto;
          font-size: 32px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        span {
          line-height: 80px;
          font-size: 28px;
          color: #848a93;
        }
      }

      li {
        background: #fff;
        border-radius: 20px;
        margin-bottom: 18px;

        header {
          border-bottom: 1px solid #eff2f7;
          padding: 37px 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .title {
            width: 360px;
            font-size: 32px;
          }

          .time {

            font-size: 24px;
            color: #848a93;
          }
        }

        section {
          padding: 46px 34px;
          display: flex;
          justify-content: space-between;

          .left {
            p {
              font-size: 46px;
              color: #ff4e30;
              padding-bottom: 20px;
            }

            span {
              font-size: 24px;
              color: #848a93;
            }
          }

          .rightred {
            font-weight: bold;
            font-size: 32px;
            line-height: 90px;
            color: #ff4e30;

          }

          .rightgreen {
            font-weight: bold;
            font-size: 32px;
            line-height: 90px;
            color: #67ccb7;
          }

          .rightyellow {
            font-weight: bold;
            font-size: 32px;
            line-height: 90px;
            color: #f09421;
          }

          .rightblack {
            font-weight: bold;
            font-size: 32px;
            line-height: 90px;
            color: #b3b6b9;
          }
        }
      }
    }
  }

</style>
