<template>
    <div class="repayment_history">
        <div class="details">        
            <header><span>还款记录</span></header>
            <ul class="underlying_details">
                <li v-if="repayment_show == 1">还款记录维护中...</li>
                <li v-if="repayment_show == 2">
                    <span>借款人在本平台内历史本息还款次数：</span>
                    <span>{{repayAllCount}}次</span>
                </li>
                <li v-if="repayment_show == 2">
                    <span>历史逾期次数：</span>
                    <span>{{repayInterestOverdueCount}}次</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {indexApi} from '@/api/index'
    export default {
        data(){
            return{
                repayment_show:0,
                repayAllCount:0,
                repayInterestOverdueCount:0,
            }
        },
        mounted(){
            if(!this.$route.query.userId) return
            if(this.$route.query.userId == '26784cf4-97cd-4c0c-b299-9334b8f3f5df'){
              this.repayment_show = 1
              return
            }
            this.repayment_show = 2
            indexApi.loanStatisticsByUserId(this.$route.query.userId || '').then((data)=>{
                this.repayAllCount = data.result.repayCount || 0;
                this.repayInterestOverdueCount = data.result.overdueCount || 0;                 
            })
        }
    }
</script>

<style scoped lang='less'>
    .repayment_history{   
        min-height: calc(100vh-218px);  
        .details{
            background-color: #fff;
            margin-bottom: 18px;
            header{
                line-height: 100px;
                font-size: 32px;
                color: #32363c;
                font-weight: bold;
                border-bottom: 2px solid #eff2f7;
                span{
                    border-left: 4px solid #32363c;
                    padding-left: 36px;
                }
            }
            .underlying_details{
                padding: 32px 40px 60px;
                font-size: 28px;
                color: #848a93;
                li{
                    padding-bottom: 40px;
                    span:nth-of-type(2){
                        color: #32363c;
                    }
                }
                li:last-child{
                    padding-bottom: 0;
                }
            }
        }
        
    }
</style>