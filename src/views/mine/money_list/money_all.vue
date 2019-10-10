<template>
  <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
    <div id='nolist'></div>
    <ul class="money_all">
      <li id='nolist' v-if="flag">
        <div>
          <img src="../../../assets/images/product/product_null.png" alt="暂无数据">
        </div>
        <span>空空如也~</span>
      </li>
      <li v-else v-for="(item, index) in showList" :key="index">
        <h1>{{item.key}}</h1>
        <section v-for="(item, index) in item.val" :key="index"
          @click="push(item.usable,item.capitalLogId,item.typeId)">
          <div>
            <span>{{item.title}}</span>
            <span>{{item.amount}}</span>
          </div>
          <div>
            <span>{{item.list_date}}</span>
            <span>账户余额：{{item.usable==null?'--':item.money}}</span>
          </div>
        </section>
      </li>
    </ul>
  </mescroll-vue>
</template>

<script>
  import MescrollVue from 'mescroll.js/mescroll.vue'
  import {
    indexApi
  } from '@/api/mine'
  import {
    publicFun
  } from '@/libs/publicFun'
  import groupArray from 'group-array'
  export default {
    data() {
      return {
        flag: '',
        list: [],
        showList: [],
        mescroll: null, // mescroll实例对象
        mescrollUp: { // 上拉加载的配置.
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">-- 无更多数据 --</p>'
        }
      }
    },
    components: {
      MescrollVue
    },
    methods: {
      mescrollInit(mescroll) {
        this.mescroll = mescroll // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback(page, mescroll) {
        let formdata = ''
        if (this.$route.query.id == 1) {
          formdata = {
            num: page.num,
            size: page.size
          }
        } else {
          formdata = {
            num: page.num,
            size: page.size,
            typeId: this.$route.query.id
          }
        }
        indexApi.capitalList(formdata).then(data => {
          if (page.num === 1 && data.result.length == 0) {
            this.flag = true
          }
          if (page.num === 1) this.list = []
          data.result.forEach(item => {
            this.list.push({
              capitalLogId: item.capitalLogId,
              year: publicFun.timestampToTimes(item.createAt || 0, '/'),
              title: publicFun.Pl_title(item.typeId),
              list_date: publicFun.timestampToTimesfs(item.createAt || 0, '/'),
              money: publicFun.toMoney(item.usable || 0, 2),
              amount: (item.flowType == 'out' ? '- ' : '+ ') + publicFun.toMoney(item.amount || 0, 2),
              typeId: item.typeId,
              usable: item.usable
            })
          })
          this.showList = []
          let deepList = groupArray(JSON.parse(JSON.stringify(this.list)), 'year')
          Object.keys(deepList).forEach(i => {
            let obj = {}
            obj['key'] = i
            obj['val'] = deepList[i]
            this.showList.push(obj)
          })
          this.$nextTick(() => {
            mescroll.endSuccess(data.result.length)
          })
        })
        .catch((e) => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr()
        })
      },
      push(usable, capitalLogId, typeId) {
        if (usable == null) {
          return
        }
        let simplify = publicFun.Pl_simplify(typeId)
        if (simplify == 'capital_transaction' || simplify == 'capital_repay' || simplify == 'capital_recharge' ||
          simplify == 'capital_withdraw' || simplify == 'capital_loss' || simplify == 'capital_increase_interest' ||
          simplify == 'capital_rebate') {
          this.$router.push({
            path: '/money_record',
            query: {
              logId: capitalLogId,
              typeId: typeId
            }
          })
        }

      }
    },
  }

</script>

<style scoped lang='less'>
  .mescroll {
    position: absolute;
    top: 88px;
    bottom: 0;
    height: auto;

    .money_all {
      padding: 18px 20px 0;

      #nolist {
        padding: 50px;
        text-align: center;

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
        h1 {
          padding: 0 40px;
          line-height: 70px;
          font-size: 30px;
        }

        section {
          padding: 36px 40px 30px;
          background: #fff;
          border-bottom: 1px solid #eff2f7;

          div {
            display: flex;
            justify-content: space-between;
          }

          div:nth-of-type(1) {
            padding-bottom: 34px;

            span:nth-of-type(1) {
              font-size: 30px;
            }

            span:nth-of-type(2) {
              font-size: 32px;
              color: #ff4e30;
            }
          }

          div:nth-of-type(2) {
            color: #848a93;

            span:nth-of-type(1) {
              font-size: 26px;
              text-align: left;
            }

            span:nth-of-type(2) {
              flex: 1;
              font-size: 28px;
              text-align: right;
            }
          }
        }
      }
    }
  }

</style>
