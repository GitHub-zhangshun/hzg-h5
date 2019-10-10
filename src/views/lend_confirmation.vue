<template>
    <div class="lend_confirmation">
        <ul class="header">
            <li>
                <span>标的名称</span>
                <span>{{bidName}}</span>
            </li>
            <li>
                <span>年化利率</span>
                <span>{{rate}}%</span>
            </li>
            <li>
                <span>剩余可投金额</span>
                <span>{{surplusMoney}}元</span>
            </li>
        </ul>
        <ul class="borrow_money">
            <li>
                <span>出借金额</span>
                <div>预期利息&nbsp;<span>{{lx}}</span>&nbsp;<span>元</span><router-link to="/yqlxjsfs"><i class="icon iconfont icon-wenhao"></i></router-link></div>
            </li>
            <li>
                <i class="icon iconfont icon-renminbi"></i>
                <div>
                    <input type="number" v-model="money" @blur="onblur">
                    <span v-if="tips">{{limitMin}}元起投，{{increase}}元递增</span>
                </div>
                
            </li>
            <li>
                <span v-if="moneyIsOk==1">可用余额&nbsp;{{investMonet}}元</span>
                <span style="color:#ff4e30" v-if="moneyIsOk==2">不可低于起投金额{{limitMinFiex}}元</span>
                <span style="color:#ff4e30" v-if="moneyIsOk==3">不可超出剩余可投金额</span>
                <span v-if="moneyIsOk==4">可出借金额不足，还需充值<span style="color:#ff4e30">{{yuan}}</span>元</span>
                <span style="color:#ff4e30" v-if="moneyIsOk==5">单笔出借不可超出{{limitMaxFiex}}元</span>
                <span style="color:#ff4e30" v-if="moneyIsOk==6">出借金额需以{{increaseFiex}}元递增</span>
                <button @click="goRecharge">去充值</button>
            </li>
        </ul>
        <div class="coupons" @click="choose_coupons">
            <p>优惠券{{userd_coupon}}</p>
            <div class="right">
                <span :class="(text_coupon=='暂无优惠券可用' || text_coupon=='不使用优惠券')?'gary':''">{{text_coupon}}</span>
                <i class="icon iconfont icon-qianjin"></i>
            </div>
        </div>
        <x-button type="warn" @click.native='submit' :show-loading='show_loading' :disabled='disabled' :class="disabled==true?'gary':''">{{btn_text}}</x-button>
        <p>已阅读并同意<span @click="varietyAgreement">《出借协议》</span></p>
        <div class="foot">
            <Footer></Footer>
            <div class="cautious"><i class="icon iconfont icon-dengpao"></i>网贷有风险，出借需谨慎</div>
        </div>  
        <!-- <codeDialog :codeDialog_show.sync="codeDialog_show" :couponId="couponId" :amt="money" @clearTimer="clearTimer"></codeDialog>         -->
    </div>  
</template>

<script>
import code_dialog from '@/components/code_dialog'
import { XButton } from 'vux'
import {indexApi} from '@/api/product'
import {publicFun} from '@/libs/publicFun'
import md5 from 'blueimp-md5'
    export default {
        name: 'lend_confirmation',
        data(){
            return{
                coupon:{},//优惠券数据
                // codeDialog_show:false,//验证码弹窗
                couponId:'',//优惠券ID
                //标名
                bidName:'',
                //利率
                rate:'',
                //输入金额
                money:'',
                //可投金额
                surplusMoney:'',
                //递增金额
                increase:'',
                //最低限额
                limitMin:'',
                //最高限额
                limitMax:'',
                //预计利息
                lx:0,
                //投标人的可用金额
                investMonet:'',
                //是否超出可用余额
                moneyIsOk:1,
                //按钮高亮
                disabled:true,
                //还需充值多少元
                yuan:"",
                //标的期限单位的simplify
                limitUnit : '',
                //标的是持有期限
                count:'',
                tips:true,
                userd_coupon:'',//优惠券可用数量
                num_coupon:'',
                text_coupon:'暂无优惠券可用',
                show_loading:false,
                btn_text:'确定',
            }
        },
        components:{
            XButton,
            'codeDialog':code_dialog
        },
        computed:{
            limitMinFiex(){
                return publicFun.toMoney(this.limitMin,2)
            },
            limitMaxFiex(){
                return publicFun.toMoney(this.limitMax,2)
            },
            increaseFiex(){
                return publicFun.toMoney(this.increase,2)
            }
        },
        watch:{
            money(n,o){ 
                this.btn_text = '确定'
                this.text_coupon = '请选择优惠券'
                this.userd_coupon = ''
                this.disabled=true
                this.lx=0
                this.tips = false
                if(this.money==''){
                    this.moneyIsOk = 1
                    this.tips = true
                }else if(Number(this.money) < this.limitMin){
                    this.moneyIsOk = 2
                }else if(Number(this.money)>this.surplusMoney){
                    this.moneyIsOk = 3
                }else if(Number(this.money)>this.investMonet){
                    this.yuan = publicFun.toMoney(this.money - this.investMonet,2) 
                    this.moneyIsOk = 4
                }else if(Number(this.money)>this.limitMax){
                    this.moneyIsOk = 5
                }else if((Number(this.money)-this.limitMin) % this.increase!=0){
                    this.moneyIsOk = 6
                }else{
                    this.lx = publicFun.lx(this.limitUnit,this.money,this.rate,this.count)
                    this.disabled = false
                    this.moneyIsOk =1
                    this.btn_text = `确认支付：${publicFun.number_format(this.money)}元`
                }           
            },
            surplusMoney() {
                if(this.$route.query.money){
                    this.money = this.$route.query.money
                }
            },
            coupon(n){
                if(n){
                    this.text_coupon = `${JSON.parse(localStorage.getItem('coupon')).typeTxt}：${JSON.parse(localStorage.getItem('coupon')).couponVal}${JSON.parse(localStorage.getItem('coupon')).couponType==1?'元':'%'}`
                    this.couponId = JSON.parse(localStorage.getItem('coupon')).id
                    if(JSON.parse(localStorage.getItem('coupon')).couponType==1){
                        let couponVal = JSON.parse(localStorage.getItem('coupon')).couponVal
                        if(Number(couponVal)+Number(this.investMonet)>Number(this.money)){
                            this.lx = publicFun.lx(this.limitUnit,this.money,this.rate,this.count)
                            this.disabled = false
                            this.moneyIsOk =1
                            // this.btn_text = `确认支付：${publicFun.number_format(this.money - Number(couponVal))}元`//确定按钮减满减券的金额
                            this.btn_text = `确认支付：${publicFun.number_format(this.money)}元`
                        }else{
                            // this.yuan = publicFun.number_format(Number(this.money) - this.investMonet - couponVal)//确定按钮减满减券的金额
                            this.yuan = publicFun.number_format(Number(this.money) - this.investMonet)
                            if(this.disabled){
                                this.btn_text = '确定'
                            }else{
                                // this.btn_text = `确认支付：${publicFun.number_format(Number(this.money) - Number(couponVal))}元`//确定按钮减满减券的金额
                                this.btn_text = `确认支付：${publicFun.number_format(Number(this.money))}元`
                            }  
                        }                                              
                    }else{    
                        if(this.disabled){
                            this.btn_text = '确定'
                        }else{
                            this.btn_text = `确认支付：${publicFun.number_format(this.money)}元`
                        }                   
                    }                    
                }else{
                    this.yuan = publicFun.number_format((Number(this.money) - this.investMonet))
                    this.text_coupon = '不使用优惠券'
                    if(this.disabled){
                        this.btn_text = '确定'
                    }else{
                        this.btn_text = `确认支付：${publicFun.number_format(this.money,2)}元`
                    }
                }
                
            },
        },
        async created(){
            await indexApi.accountInfo()
            .then(data=>{
                this.investMonet = data.result.usable || 0
            })
            await indexApi.productInfoById(this.$route.query.id)
            .then(data =>{
                this.bidName = data.result.name;
                this.rate = data.result.rate;
                //标的持有期限
                this.count = data.result.count
                //标的期限单位
                this.limitUnit = publicFun.Pl_simplify(data.result.interestType)
                //该标剩余可投金额
                this.surplusMoney  = data.result.statisticsInfo.surplusMoney;
                //标的递增金额
                this.increase  = data.result.moneyInfo.increase
                //最低起投金额
                this.limitMin = this.surplusMoney<data.result.moneyInfo.limitMin?this.surplusMoney:data.result.moneyInfo.limitMin
                //最高起投金额
                this.limitMax = data.result.moneyInfo.limitMax
                //用户可用余额
            })
            if(localStorage.coupon && this.$route.query.money){
                this.coupon = localStorage.coupon && JSON.parse(localStorage.coupon)
            }
            if(!this.$route.query.money){
                localStorage.removeItem('coupon')
                this.text_coupon = '暂无优惠券可用'
                this.money = ''
            }else{
                this.get_coupon_number()
                if(localStorage.coupon){
                    this.coupon = localStorage.coupon && JSON.parse(localStorage.coupon)
                }else{
                    this.yuan = publicFun.number_format((Number(this.money) - this.investMonet))
                    this.text_coupon = '不使用优惠券'
                    if(this.disabled){
                        this.btn_text = '确定'
                    }else{
                        this.btn_text = `确认支付：${publicFun.number_format(this.money,2)}元`
                    }
                }                
            }
        },
        methods:{
            clearTimer(n){
                window.clearInterval(n)
            },
            choose_coupons(){
                this.onblur()
                if(publicFun.checkMoney(this.money)){
                    this.$router.replace({path:'/choose_coupons',query:{id:this.$route.query.id,money:this.money}})
                }else{
                    this.$toast({message:'金额格式不正确',duration:2000})
                }
            },
            goRecharge(){
                this.onblur()
                localStorage.setItem('path',this.$route.fullPath)                        
                this.$router.push({path:'/recharge'})                           
            },
            get_coupon_number(){
                indexApi.couponUsableCount({bidId:this.$route.query.id,money:this.money})
                .then( data => {
                    if(data.result==0){
                        this.text_coupon = '暂无优惠券可用'
                    }
                    this.num_coupon = data.result
                    if(data.result !=0 ){
                        this.userd_coupon = `(${data.result}张)`
                    }                    
                })
            },
            onblur(){
                if(this.money==''){
                    this.tips = true;
                }else{
                    this.tips = false
                }
                if(!this.disabled){
                    this.get_coupon_number()
                }
                
            },
            submit(){
                this.show_loading = true
                this.disabled = true
                indexApi.productInvest({bidId :this.$route.query.id,money:this.money,couponId:this.couponId})
                .then( data => {
                    this.show_loading = false
                    this.disabled = false
                    localStorage.setItem('path','/my')
                    localStorage.removeItem('coupon')
                    sessionStorage.setItem('shanba','buy_bussiness')
                    publicFun.redirectTripartite(data.result)
                })
                .catch( err => {
                    this.show_loading = false
                    this.disabled = false
                })
                // let formdata = {
                //     bidId:this.$route.query.id,
                //     money:this.money
                // }
                // this.show_loading = true         
                // this.disabled = true

                // indexApi.smsCodeDefaultSend_code('lenders_deal_captcha')
                // .then( data => {
                //     this.show_loading = false
                //     this.disabled = false
                //     this.codeDialog_show = true
                // }) 
                // .catch( (err)=> {
                //     this.show_loading = false
                //     this.disabled = false
                // })
            },
            varietyAgreement(){
                this.onblur()
                indexApi.platformConfig().then(data=>{
                    this.$router.push({path:'/announcementDetails',query:{id:data.result.investAgreementLink,title:'出借协议'}})
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.lend_confirmation{
    .header{
        background: #fff;
        margin-bottom: 18px;
        li{
            line-height: 100px;
            display: flex;
            justify-content: space-between;
            font-size: 28px;
            padding: 0 40px;
            border-top: 1px solid #eff2f7;
        }
    }
    .borrow_money{
        background: #fff;
        margin-bottom: 18px;
        li{
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            padding: 0 40px;
        }
        li:nth-of-type(1){
            font-size: 28px;
            padding-bottom: 46px;
            padding-top: 40px;
            div{
                color: #848a93;
                display: flex;
                align-items: flex-end;
                span:nth-of-type(1){
                    color: #ff4e30;
                }
                span:nth-of-type(2){
                    color: #000;;
                }
                i{
                    color: #000;
                    margin-left: 14px;
                    vertical-align: middle;
                }
            }
        }
        li:nth-of-type(2){          
            padding-left: 74px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eff2f7;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            i{
                font-size: 60px;
                display: inline-block;
            }
            div{
                position: relative;
                margin-left: 24px;
                input{
                    font-size: 50px;
                    width:100%;                   
                }
                span{
                    position: absolute;
                    top: 50%;
                    transform:translateY(-50%);
                    left: 0px;
                    font-size: 28px;
                    color:#c4c7cb
                }
            }
            
        }
        li:nth-of-type(3){
            line-height: 66px;
            span{
                font-size: 26px;
                color:#848a93;
            }
            button{
                background: transparent;
                color: #4e95ff;
                font-size: 28px;
            }
        }
    }
    .coupons{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        height: 102px;
        margin-bottom: 102px;
        background: #fff;
        font-size: 28px;
        .right{
            span{
                color: #ff4e3c;
            }
            .gary{
                color: #c4c7cb;
            }
            display: flex;
            align-items: center;
        }
    }
    &>button{
        background: #ff4e30;
        margin-bottom: 24px;
        font-size: 32px;
        width: 670px;
        height: 88px;
        /deep/.weui-loading{
            width: 40px;
            height: 40px;
        }
    }
    &>.gary{
        background: #cfd4da;
        color: #fff;
    }
    &>p{
        text-align: center;
        font-size: 24px;
        color: #848a93;
        span{
            color: #32363c;
        }
    }
    .foot{
        padding-top: 180px;               
        footer{
            padding: 0;
            margin-bottom: 20px;
            display:flex;
            justify-content: center;
            color: #000;
        }
        .cautious{
            text-align: center;
            color: #848a93;
            i{
                font-size: 14px;
            }
        }
    }
    
}

</style>