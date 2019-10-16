<template>
  <div>
    <div v-if="history_show == 1" class="history_tips">历史借款维护中...</div>
    <div class="history_reimbursement" v-if="history_show == 2">
      <p>待还总额：<span>{{stayMoney}}元</span> </p>
      <van-list v-model="loading" :finished="finished" :finished-text="showtips" @load="onLoad" v-if="showList">
        <ul class="contain">
          <li v-if="flag==1" class="noList">暂无数据~</li>
          <li v-for="(item, index) in list" :key="index" v-if="flag==0">
            <div class="header">
              <p><span style="color: #333;margin-right: 24px;">{{item.name}}</span>借款时间：{{item.createAt}}</p>
              <p :style="item.simplay=='bid_product_show_repayment_underway'?'color:rgb(240, 148, 33)':''">
                {{item.showStatusChi}}</p>
            </div>
            <div class="details">
              <ul>
                <li>
                  <p>{{item.bidAmount}}</p>
                  <span>借款金额(元)</span>
                </li>
                <li>
                  <p>{{item.bidLimit}}{{item.unit}}</p>
                  <span>期限</span>
                </li>
                <li>
                  <p>{{item.stayMoney1}}</p>
                  <span>待还金额(元)</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </van-list>

    </div>
  </div>
</template>

<script>
  import {
    List
  } from 'vant';
  import {
    indexApi
  } from '@/api/index'
  import {
    publicFun
  } from '@/libs/publicFun'
  export default {
    components: {
      'van-list': List
    },
    data() {
      return {
        stayMoney: '0.00',
        list: [],
        flag: -1, //1:无数据 0:有数据  
        loading: false,
        finished: false,
        num: 1,
        showtips: '',
        showList: true,
        history_show: 0
      }
    },
    mounted() {
      if (!this.$route.query.userId) {
        this.showList = false
        return
      }
      this.history_show = 2
      indexApi.loanStatisticsByUserId(this.$route.query.userId).then((data) => {
        if (data.code == 0) {
          this.stayMoney = publicFun.toMoney(Number(data.result.waitDamages || 0) + Number(data.result
            .waitInterest || 0) + Number(data.result.waitPrincipal || 0) + Number(data.result
            .waitServiceCharge || 0), 2)
        } else if (data.code === "10001") {
          this.$router.push('/verification_code_login')
        } else {
          this.$toast({
            message: data.message,
            duration: 2000
          })
        }
      })
    },
    methods: {
      onLoad() {
        // 异步更新数据
        indexApi.productListByBorrow({
            num: this.num,
            size: 10,
            dataId: this.$route.query.userId
          })
          .then(data => {
            if(data.total ==null ){
              data.total = 0
            }
            if (data.total == 0) {
              this.flag = 1
              this.loading = false;
              // 数据全部加载完成
              if (this.list.length == data.total) {
                this.finished = true;
              }
              return
            }
            if (data.total == 0) {
              this.showtips = '暂无数据~'
            } else {
              this.showtips = '没有更多了'
            }
            this.flag = 0
            let a = data.result
            for (let i = 0; i < a.length; i++) {
              this.list.push({
                name: a[i].name,
                simplay: publicFun.Pl_simplify(a[i].showStatus),
                createAt: publicFun.timestampToTime(a[i].createAt, "-"),
                showStatusChi: publicFun.Pl_title(a[i].showStatus),
                bidAmount: publicFun.toMoney(a[i].money, 2),
                bidLimit: a[i].count,
                unit: publicFun.Pl(a[i].interestType)[0] && publicFun.Pl(a[i].interestType)[0].subhead,
                stayMoney1: publicFun.toMoney(a[i] && a[i].statisticsInfo && (Number(a[i].statisticsInfo
                  .stayDamages) + Number(a[i].statisticsInfo.stayFee) + Number(a[i].statisticsInfo
                  .stayInterest) + Number(a[i].statisticsInfo.stayPrincipal)) || 0, 2),
              })
            }
            // 加载状态结束
            this.num++
            this.loading = false;
            // 数据全部加载完成
            if (this.list.length == data.total) {
              this.finished = true;
            }
          })
      }
    },
  }

</script>

<style scoped lang='less'>
  .history_tips{
      padding-top: 80px;
      text-align: center;
      color: #848a93;
      font-size:28px; 
    }
  .history_reimbursement {
    min-height: calc(100vh-218px);
    &>p {
      padding-left: 40px;
      line-height: 62px;
      font-size: 28px;
      color: #848a93;

      span {
        color: #32363c;
      }
    }

    .contain {
      .noList {
        font-size: 26px;
        text-align: center;
        color: #848a93;
        background: transparent;
      }

      li {
        background: #fff;
        margin-bottom: 18px;

        .header {
          display: flex;
          justify-content: space-between;
          line-height: 88px;
          padding: 0 40px;
          border-bottom: 1px solid #eff2f7;

          p:nth-of-type(1) {
            font-size: 26px;
            color: #848a93;
          }

          p:nth-of-type(2) {
            font-size: 28px;
          }
        }

        .details {
          padding: 46px 40px;

          ul {
            display: flex;
            justify-content: space-between;

            li {
              text-align: center;

              p {
                font-size: 32px;
                color: #32363c;
                padding-bottom: 20px;
                font-weight: bold;
              }

              span {
                font-size: 24px;
                color: #848a93;
              }
            }
          }
        }
      }
    }
  }

</style>
