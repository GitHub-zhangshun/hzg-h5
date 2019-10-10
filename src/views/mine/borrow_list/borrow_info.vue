<template>
    <div class="borrow_info">
        <div class="top">
            <header><h1>出借信息</h1></header> 
            <ul>
                <li>出借金额：<span class="money">{{money}}元</span></li>
                <li>出借时间：{{createAt}}</li>
                <li>出借订单号：{{txnSsn}}</li>
                <li v-if="xieyi">出借协议：<span class="agreement" @click="xieyiLink">《出借协议》</span></li>
                <li v-if="coupon_show">优惠券：{{coupon_text}}</li>
            </ul>           
        </div>
        <div class="plan_list" v-if="flow_standard_flag==true?false:true">
            <header><h1>回款计划表</h1></header> 
            <div class="contain">
                <p class="no_list" v-if="plan_list_flag">暂无回款计划表</p>
                <ul class="list" v-else>
                    <li v-for="(item, index) in plan" :key="index">
                        <div v-if="item.simplify=='repay_plan_advance'?true:false">
                            <p class="advance">提前回款时间：{{item.time}}</p>
                            <span :class="item.simplifyOne=='repayment_plan_waiting'?'receivable':''">{{item.status}}</span>
                        </div>
                        <div v-else>
                            <p>回款时间：{{item.time}}</p>
                            <span :class="item.simplifyOne=='repayment_plan_waiting'?'receivable':''">{{item.status}}</span>
                        </div>
                        <div>
                            <p>回款金额：{{item.money}}元</p>
                        </div>
                        <div>
                            <p>本金：{{item.principal}}元</p>
                        </div>
                        <div>
                            <span>收益：{{item.interest}}元 <i @click="damagesMoney(item.damages)" style="color:#ff4e30;font-size:18px" class="icon iconfont icon-gantanhao" v-if="item.damages==0?false:true"></i> <span style="color:#ff4e3c">{{item.earnings}}</span> </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flow_standard" v-if="flow_standard_flag">出借资金将会尽快退回至您的账户，请注意查看</div>
        <footer v-if="isPrepayment">
            <x-button type="warn" @click.native="$router.push({path:'/isPrepayment',query:{id:$route.query.id}})">查看原回款计划表</x-button>
        </footer>
    </div>
</template>

<script>
import { XButton } from 'vux'
import {indexApi} from '@/api/mine'
import {publicFun} from '@/libs/publicFun'
const Base64 = require('js-base64').Base64
    export default {
        data(){
            return{
                plan_list_flag:'',//无回款计划展示
                plan:[],//回款计划表数据
                flow_standard_flag:this.$route.query.simplify=='bid_product_show_over'?true:false,//出借资金提示是否展示
                isPrepayment:false,//按钮是否显示
                money:'',//出借金额
                createAt:'',//出借时间
                txnSsn:'',//出借订单号
                xieyi:false,//出借协议是否展示
                contractLink:'',//出借协议链接
                coupon_show:false,//优惠券是否展示
                coupon_text:'',//优惠券数据
                earnings:'',//优惠券收益
            }
        },
        components: {
            XButton,
        },
        methods:{
            xieyiLink(){
                if(this.contractLink ==''||this.contractLink==null){
                    this.$toast({message:"电子合同正在签署中",duration:2000})
                }else{
                    this.$router.push({path:'/paymented',query:{contractLink:this.contractLink}})
                }
            },
            damagesMoney(money){                
                this.$dialog.alert({
                    message: `包含借款人提前还款的违约金额<span style="color:#ff4e30">${money}</span>元`,
                    confirmButtonText:'我知道了',
                });
            }
            
        },
        created(){
            this.isPrepayment = this.$route.query.isPrepayment?true:false
        },
        mounted(){   
            if(publicFun.Pl_simplify(this.$route.query.xieyi)==="bid_product_show_repayment_underway" || publicFun.Pl_simplify(this.$route.query.xieyi)==="bid_product_show_repayment_finish"){
                this.xieyi = true
            }else{
                this.xieyi = false
            }
            indexApi.userProductInvestInfo(this.$route.query.id).then(data =>{
                this.money = publicFun.toMoney(data.result.money||0,2)
                this.createAt = publicFun.timestampToTimesfs(data.result.createAt,'-')
                this.txnSsn = data.result.txnSsn
                this.contractLink = data.result.contractLink
                if((data.result.fullReduction==0 || data.result.fullReduction==null) && (data.result.increaseRate==0 || data.result.increaseRate==null)){
                    this.coupon_show = false
                }else{
                    this.coupon_text = data.result.fullReduction!=(0 || null)?`返利${data.result.fullReduction}元`:`加息${data.result.increaseRate}%`
                    this.coupon_show = true
                }
                // this.coupon = (data.result.fullReduction==null && data.result.increaseRate==null)?false:data.result.fullReduction
                if(data.result.repayList.length==0){
                    this.plan_list_flag = true
                }else{
                    this.plan_list_flag = false
                    for(var i =0;i<data.result.repayList.length;i++){
                        let res = data.result.repayList[i]
                        this.plan.push({
                            //提前还款
                            id:res.Id,
                            simplify:publicFun.Pl_simplify(res.type),
                            simplifyOne:res && publicFun.Pl_simplify(res.status),
                            principal:res && publicFun.toMoney(res.principal,2),
                            time : res && publicFun.timestampToTime(res.time,'-'),
                            interest:res && publicFun.toMoney(Number(res.interest)+Number(res.damages),2),
                            money:res && publicFun.toMoney(res.interest+res.principal+res.damages+res.increaseInterest,2),
                            status:res && publicFun.Pl_simplify(res.status)==="repayment_plan_success"?"已回款":"待回款",
                            damages:res && publicFun.toMoney(res.damages,2),  
                            earnings:res && (res.increaseInterest==0 || res.increaseInterest==null)?'':`+加息收益：${res && publicFun.toMoney(res.increaseInterest,2)}元`                                
                        })
                    }
                }
            })
        },
    }
</script>

<style scoped lang='less'>
.borrow_info{
    margin-top: 18px;
    .top{
        background: #fff;
        header{
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
        ul{
            padding: 36px 0 46px 40px;
            font-size: 28px;
            color: #848a93;
            li{
                padding-bottom: 42px;
                .money{
                    color: #ff4e30;
                }
                .agreement{
                    color: #4e95ff;
                }
            }
            li:last-child{
                padding-bottom: 0;
            }
        }
    }
    .plan_list{
        margin-top: 18px;
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
    .flow_standard{
        color: #848a93;
        font-size: 28px;
        padding-top: 60px;
        text-align: center;
    }
    footer{
        position: fixed;
        bottom:0;
        width: 100%;
        .weui-btn{
            height: 100px;
            font-size: 30px;
            background: #ff4e30;
        }
    }
}
</style>