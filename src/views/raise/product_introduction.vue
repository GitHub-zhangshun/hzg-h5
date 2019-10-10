<template>
    <div class="product_info">
        <div class="details">        
            <header><span>标的详情</span></header>
            <ul class="underlying_details">
                <li>
                    <span>借款方：</span>
                    <span>{{borrowName}}</span>
                </li>
                <li>
                    <span>本期借款金额：</span>
                    <span>{{bidAmount}}元</span>
                </li>
                <li>
                    <span>发布日期：</span>
                    <span>{{releaseDate}}</span>
                </li>
                <li>
                    <span>起息日：</span>
                    <span>{{repayDate}}</span>
                </li>
                <li>
                    <span>参考年回报率：</span>
                    <span>{{rate}}%</span>
                </li>
                <li>
                    <span>借款用途：</span>
                    <span>{{borrowUse}}</span>
                </li>
                <li v-if="bidInfoOrigin != ''">
                    <span>保障方式：</span>
                    <span>{{bidInfoOrigin}}</span>
                </li>
            </ul>
        </div>
        <div class="details" v-if="bidInfoIntroduce != ''">        
            <header><span>借款人描述</span></header>
            <div class="borrower_description">
                <p>{{bidInfoIntroduce}}</p>  
            </div>
        </div>
    </div>
</template>

<script>
import {indexApi} from '@/api/index'
import {publicFun} from '@/libs/publicFun'
    export default {
        data(){
            return{
                borrowName:"",
                bidAmount:"",
                releaseDate:"",
                repayDate:"募集完成次日开始计息",
                rate:"",
                borrowUse:"",
                bidInfoOrigin:"",
                bidInfoIntroduce:"",
            }
        },
        props:{
            productInfo:Array
        },
        methods:{
            content(a){
                this.borrowName = a[0].jkf;
                this.bidAmount = publicFun.toMoney(a[0].money,0);
                this.releaseDate = publicFun.timestampToTime(a[0].data,'-');
                this.rate = a[0].rate;
                this.borrowUse = a[0].borrowCause;
                this.bidInfoOrigin = a[0].repaymentSource;
                this.bidInfoIntroduce = a[0].pledgeDetail;
            }
        },
        mounted(){
            if(this.productInfo && this.productInfo.length > 0){
                this.content(this.productInfo)
            }
            
        },
        watch:{
            productInfo(){
                this.content(this.productInfo)
            }
        }
    }
</script>

<style scoped lang='less'>
    .product_info{     
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
                padding: 32px 40px 46px;
                li{
                    // margin-bottom: 42px;
                    line-height: 2.5;
                    font-size: 28px;
                    span:nth-of-type(1){
                        color: #848a93;
                        font-size: 28px;
                        display: inline-block;
                        // line-height: 1.5;
                    }
                    span:nth-of-type(2){
                        color: #32363c;
                    }
                }
                
            }
            .borrower_description{
                padding: 32px 40px 46px;
                color: #848a93;
                font-size: 28px;
                p{
                    line-height: 54px;
                }
            }
        }
        
    }
</style>