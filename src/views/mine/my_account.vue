<template>
    <div class="my_account">
        <div class="header">
            <header>账户总额（元）&emsp;<i class="icon iconfont icon-wenhao" style="color:#848a93;" @click="question_mark"></i></header>
            <span>{{total}}</span>
        </div>
        <ul class="money_list">
            <li>
                <span>账户余额</span>
                <span>{{usable}}</span>
            </li>
             <li>
                <span>在投金额</span>
                <span>{{investment}}</span>
            </li>
             <li>
                <span>预计待收收益</span>
                <span>{{expectIncome}}</span>
            </li>
             <li>
                <span>已收收益</span>
                <span>{{totalIncome}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import {publicFun} from "@/libs/publicFun"
import {indexApi} from "@/api/mine"
    export default {
        data(){
            return{
                total:'',
                expectIncome:"",
                investment:"",
                usable:"",
                totalIncome:"",
            }
        },
        mounted(){
            indexApi.accountInfo().then(data=>{
                this.expectIncome = publicFun.toMoney(data.result.expectIncome||0,2)
                this.investment = publicFun.toMoney(data.result.investment||0,2)
                this.usable = publicFun.toMoney(data.result.usable||0,2)
                this.totalIncome = publicFun.toMoney(data.result.totalIncome||0,2)
                this.total = publicFun.toMoney((Number(data.result.usable||0)+Number(data.result.investment||0)),2)          
            })
        },
        methods:{
            question_mark(){
                this.$dialog.alert({
                    message: `<p> 1.账户总额=账户余额+在投金额</p>
                              <p></br></p>
                              <p> 2.账户余额：可进行提现、出借操作的金额</p>
                              <p></br></p>
                              <p> 3.在投金额：正在出借中的本金金额</p>`,
                    confirmButtonText:'我知道了'
                });
            }
        }
    }
</script>

<style scoped lang='less'>
.my_account{
    .header{
        background-image: url('../../assets/images/my/myReward-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 84px 0 36px 40px;
        color: #ff4e30;
        header{
            font-size: 28px;
            padding-bottom: 38px;
        }
        span{
            font-size: 60px;
        }
    }
    .money_list{
        background: #fff;
        margin-top: 18px;        
        li{
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            border-bottom: 1px solid #eff2f7;
            line-height: 100px;
        }
    }
}
</style>