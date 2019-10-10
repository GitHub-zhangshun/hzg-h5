<template>
    <div class="plan_list">
            <header><h1>原回款计划表</h1></header> 
            <div class="contain">
                <ul class="list">
                    <li v-for="(item, index) in plan" :key="index">
                        <div>
                            <p>回款时间：{{item.time}}</p>                            
                        </div>
                        <div>
                            <p>回款金额：{{item.money}}元</p>
                        </div>
                        <div>
                            <p>本金：{{item.principal}}元</p>                            
                        </div>
                        <div>
                            <span>收益：{{item.interest}}元<span style="color:#ff4e3c">{{item.earnings}}</span></span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
import {indexApi} from '@/api/mine'
import {publicFun} from '@/libs/publicFun'
    export default {
        data(){
            return{
                plan:[]
            }
        },
        mounted(){
            indexApi.userProductOldRepayList(this.$route.query.id).then(data=>{
                for(let i = 0;i<data.result.length;i++){
                    let res = data.result[i]
                    this.plan.push({
                        principal:data.result[i] && publicFun.toMoney(data.result[i].principal,2),
                        time : data.result[i] && publicFun.timestampToTime(data.result[i].time,'-'),
                        interest:data.result[i] && publicFun.toMoney(data.result[i].interest,2),
                        money:data.result[i] && publicFun.toMoney(Number(data.result[i].interest)+Number(data.result[i].principal)+Number(data.result[i].damages),2),
                        earnings:res && (res.increaseInterest==0 || res.increaseInterest==null)?'':`+加息收益：${res && publicFun.toMoney(res.increaseInterest,2)}元`
                    })
                }
            })
        }
    }
</script>

<style scoped lang="less">
.plan_list{
        // margin-top: 18px;
        padding-bottom: 118px;
        header{
            background: #fff;
            border-bottom: 2px solid #eff2f7;
            padding: 36px 0 32px;
            h1{
                font-size: 32px;
                color: #32363c;
                font-weight: bold;
                border-left: 4px solid #333;
                padding-left: 40px;
            }
        }    
        .contain{
            .no_list{
                padding-top: 60px;
                color: #848a93;
                font-size: 28px;
                text-align: center;
            }
            .list{
                li{
                    background: #fff;
                    padding: 30px 40px;
                    border-bottom: 2px solid #eff2f7;
                    div{
                        padding-bottom: 40px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 28px;
                        color: #848a93;
                        .receivable{
                            color: #ff4e30;
                        }
                    }
                    div:last-child{
                        padding-bottom: 0;
                    }
                    .advance{
                        color: #ff4e30
                    }
                }
            }
        }
    }
</style>