<template>
  <div class="withdrawal_index">
    <ul class="header">
      <li>
        <div><img :src="bankIcon"></div>
        <p><span>{{bankFname}}</span><span>(尾号{{cardNo}})</span></p>
      </li>
    </ul>
    <ul class="money">
      <li>提现金额</li>
      <li>
        <span><i class="icon iconfont icon-renminbi"></i></span>
        <div @click="onFocus">
          <input type='text' v-model="money" id="input" @blur="onblur">
          <label v-if="placehold">{{minWithdraw}}元起</label>
        </div>
      </li>
      <li>
        <p v-if="show">账户余额 <span>{{usableString}}</span>元</p>
        <p style="color:#ff4e30" v-else>{{tips}}</p>
        <button @click="all">全部提现</button>
      </li>
    </ul>
    <ul class="inputRadio">
      <li v-for="(item, index) in withDarwalList" :key="index">
        <div>
          <input type="radio" :id="`option${index}`" name="mode" v-model="type" :value=index class="option-radio" />
          <label class="firstLabel" :for="`option${index}`">
            <p class="">{{item.title}}</p>
            <p>预计<span>{{item.subhead}}</span>到账，手续费{{item.first}}元</p>
          </label>
          <i class="icon iconfont icon-gantanhao" @click="normal(index)"></i>
        </div>
      </li>
    </ul>
    <x-button type="warn" :disabled='disabled' :show-loading="show_loading" :class="disabled==true?'disabled':''"
      @click.native="submit">确认提现</x-button>
    <p class="tips" v-if="this.withDarwalList.length==0">预计1-2个工作日到账，具体到账时间以银行为准</p>
    <div class="instructions">
      <p>提现额度说明:</p>
      <p>单笔提现限额20万，单日提现限额T+0：200万，T+1:100万。</p>
      <span>注：每日23:00至次日00:30为系统维护时间，期间暂停快捷充值，网银充值，T0提现服务
</span>
    </div>
    <Footer></Footer>
    <codeDialog :codeDialog_show.sync="codeDialog_show" :amt="money" @clearTimer="clearTimer"
      :withDarwalList_away_id='withDarwalList_away_id'></codeDialog>
  </div>
</template>

<script>
  import code_dialog from '@/components/code_dialog'
  import {
    XButton
  } from 'vux'
  import {
    indexApi
  } from '@/api/mine'
  import {
    publicFun
  } from '@/libs/publicFun'
  import {
    Dialog
  } from 'vant'
  export default {
    components: {
      XButton,
      'codeDialog': code_dialog
    },
    data() {
      return {
        codeDialog_show: false,
        show_loading: false,
        show: true,
        disabled: true,
        money: '',
        bankFname: '',
        cardNo: '',
        bankIcon: '',
        placehold: true,
        // 提现列表数据
        withDarwalList: [],
        //体现方式
        type: "0",
        usable: '',
        //多少元起
        minWithdraw: '',
        //提示
        tips: '',
        withDarwalList_away_id: ''
      }
    },
    computed: {
      usableString() {
        return publicFun.toMoney(Number(this.usable), 2)
      },
    },
    watch: {
      money(n) {
        !n && (this.money = "")
        if (!publicFun.checkMoney(this.money)) {
          this.disabled = true
        }
        if (Number(this.money) > Number(this.usable)) {
          this.show = false
          this.tips = `不可超出可提现金额${this.usableString}元`
          this.disabled = true
        } else if (Number(this.money) < Number(this.minWithdraw)) {
          this.show = false
          this.disabled = true
          this.tips = `不可低于起提金额${this.minWithdraw}元`
        } else {
          this.show = true
          this.disabled = false
        }
        this.withDarwalList.forEach(item => {
          item.first = (Number(item.extend[0]) + Number(this.money) * Number(item.extend[1])).toFixed(2)
        });
      }
    },
    async mounted() {
      await indexApi.typeItemList1()
        .then((data) => {
          for (let i = 0; i < data.result.length; i++) {
            if (data.result[i].simplify == 'minimum_cash_withdrawal') {
              this.minWithdraw = data.result[i].subhead
            } else if (data.result[i].simplify != 'minimum_cash_withdrawal' && data.result[i].isUse) {
              this.withDarwalList.push({
                Id: data.result[i].Id,
                extend: data.result[i].extend.split("|"),
                first: data.result[i].extend.split("|")[0],
                isUse: data.result[i].isUse,
                remark: data.result[i].remark,
                subhead: data.result[i].subhead,
                title: data.result[i].title
              })
            }
          }
        })
      indexApi.userGetBank()
        .then(data => {
          this.bankFname = data.result.name
          this.cardNo = data.result.cardNo && data.result.cardNo.slice(-4) || ''
          this.bankIcon = data.result.icoLink
        })
        .catch(() => {})
      indexApi.accountInfo()
        .then(data => {
          this.usable = data.result.usable;
        })
    },
    methods: {
      clearTimer(n) {
        window.clearInterval(n)
      },
      normal(index) {
        Dialog.alert({
          title: `${this.withDarwalList[index].title}`,
          message: `<p style="text-align:center">${this.withDarwalList[index].remark}</p>`
        }).then(() => {
          // on close
        });
      },
      onFocus() {
        document.getElementById("input").focus();
        this.placehold = false;
      },
      onblur() {
        if (this.money == '') {
          this.placehold = true;
        } else {
          this.placehold = false
        }
      },
      all() {
        this.money = this.usable.toString()
        this.placehold = false
      },
      submit() {
        this.show_loading = true
        this.disabled = true
        let data = {
          amt: this.money,
          type: this.withDarwalList[this.type].Id
        }
        indexApi.withdraw(data)
          .then(data => {
            this.show_loading = false
            this.disabled = false
            sessionStorage.setItem('shanba','without_money')
            publicFun.redirectTripartite(data.result)
          })
          .catch(err => {
            this.show_loading = false
            this.disabled = false
          })
      }
    }
  }

</script>

<style scoped lang='less'>
  .withdrawal_index {
    position: relative;

    .header {
      margin-top: 18px;
      background: #fff;
      padding: 44px 0 44px 40px;
      display: flex;
      justify-content: space-between;

      li {
        display: flex;
        align-items: center;

        div {
          width: 72px;
          height: 72px;
          padding-right: 40px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        p {
          font-size: 32px;

          span:first-child {
            font-weight: bold;
            padding-right: 46px;
          }

          span:last-child {
            color: #848a93;
          }
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
            top: 50%;
            left: 20px;
            transform: translate(0, -50%);
            font-size: 28px;
            color: #c4c7cb;
            z-index: 1;
          }
        }
      }

      li:nth-of-type(3) {
        line-height: 66px;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;

        p {
          font-size: 24px;

          span {
            color: #ff4e30;
          }
        }

        button {
          background: transparent;
          color: #4e95ff;
          font-size: 24px;
        }
      }
    }

    .inputRadio {
      margin-top: 18px;
      background: #fff;

      li {
        div {
          padding: 40px 20px;
          display: flex;
          align-items: flex-end;

          .option-radio {
            display: none;
          }

          .option-radio+label {
            padding-right: 20px;
            display: block;
            text-indent: 50px;
            background: url("../assets/images/my/no_select.png") no-repeat left top;
            background-size: 30px 30px;
          }

          .option-radio:checked+label {
            background: url("../assets/images/my/select.png") no-repeat left top;
            background-size: 30px 30px;
          }

          .firstLabel {
            align-items: flex-start;

            p:nth-of-type(1) {
              padding-bottom: 20px;
              font-size: 28px;
              color: #333;
              font-weight: bold;
            }

            p:nth-of-type(2) {
              font-size: 24px;
              color: #848a93;

              span {
                color: #ff4e30;
              }
            }
          }

          i {
            color: #ff4e30;
          }
        }
      }
    }

    .weui-btn_warn {
      margin-top: 100px;
      background: #ff4e30;
      height: 88px;
      font-size: 32px;
      width: 670px;

      /deep/i {
        width: 40px;
        height: 40px;
      }
    }

    .disabled {
      background: #cfd4da;
      color: #fff;
    }

    .tips {
      padding: 36px 40px 0;
      line-height: 1.3;
      color: #848a93;
      text-align: center;
      font-size: 24px;
    }
    .instructions{
      padding-top: 40px;
      padding-left: 44px;
      p:first-child{
        font-size: 26px;
        color: #000000;
      }
      p:nth-of-type(2){
        padding-top: 20px;
        padding-bottom: 10px;
        font-size: 24px;
        color: #000000;
      }
      span{
        font-size: 24px;
        line-height: 1.5;
        color: #848a93;
      }
    }

    footer {
      padding-top: 60px
    }
  }

</style>
