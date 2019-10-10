<template>
    <van-popup v-model="show" :close-on-click-overlay="false">
        <i class="icon iconfont icon-guanbi" @click="close"></i>
        <p>请完成信息验证</p>
        <p>已向您{{phone}}的手机号发送验证码</p>
        <div class="code-input-main">
            <div class="code-input-main-item">{{code[0]}}</div>
            <div class="code-input-main-item">{{code[1]}}</div>
            <div class="code-input-main-item">{{code[2]}}</div>
            <div class="code-input-main-item">{{code[3]}}</div>
            <div class="code-input-main-item">{{code[4]}}</div>
            <div class="code-input-main-item">{{code[5]}}</div>
            <input class="code-input-input" @blur="scroll" v-model="code" maxlength="6" type="tel"/>
        </div>
        <p @click="code_again" :class="!canClick?'again_code_color':''">{{content}}</p>
        <van-button @click="submit" :disabled="disabled" :loading="loading" :class="disabled?'gary':''">确认</van-button>
    </van-popup>
</template>

<script>
import { Button,Popup,Toast,Dialog } from 'vant';
import {indexApi} from '@/api/mine'
import { setTimeout, clearInterval } from 'timers';
    export default {
        components:{
            'van-button':Button,
            'van-popup':Popup
        },
        data() {
            return {
                code: '',//验证码
                show:false,
                phone:'',
                loading:false,
                disabled:true,
                content: '发送验证码',
                totalTime: 60,
                canClick: true, //添加canClick
                clock:null,
                typeId:''
            };
        },
        props:{
            codeDialog_show:{
                type:Boolean
            },
            amt:{
                type:String
            },
            couponId:{
                type:String
            },
            withDarwalList_away_id:{
                type:String
            }
        },
        watch:{
            codeDialog_show(n){
                if(n){
                    this.timer()                
                }
                this.code=''
                this.loading=false
                this.disabled=true
                this.show = n
            },
            code(){
                if(this.code.length<6){
                    this.disabled = true
                }else{
                    this.disabled = false
                }
            },
            withDarwalList_away_id(n){
                this.typeId = n
            }
        },
        methods:{
            timer(){
                if (!this.canClick) return  //改动的是这两行代码
                this.canClick = false
                this.content = this.totalTime + '秒'
                this.clock = window.setInterval(() => {
                    this.totalTime--
                    this.content = this.totalTime + '秒'
                    if (this.totalTime < 0) {                           
                        window.clearInterval(this.clock)
                        this.content = '重新获取'
                        this.totalTime = 60
                        this.canClick = true  //这里重新开启
                    }
                },1000) 
            },
            send_code(n){
                indexApi.smsCodeDefaultSend_code(n)
                .then( data => {
                    this.timer()
                    Toast({message:'发送成功',duration:2000})
                })
            },
            scroll(){
                window.scrollTo(0,0)
            },
            close(){
                this.show = false
                this.$emit('update:codeDialog_show', false)
                this.$emit('clearTimer',this.clock)
                this.totalTime = 60
                this.canClick = true
            },
            code_again(){
                if (!this.canClick) return
                if(this.$route.fullPath=='/withdrawal_index'){
                    this.send_code('Cash_withdrawal_sms_code')
                }
                if(this.$route.fullPath=='/recharge'){
                    this.send_code('replenish_sms_code')
                }   
                if(this.$route.path=='/lend_confirmation'){
                    this.send_code('lenders_deal_captcha')
                }                               
            },
            submit(){
                this.loading = true
                this.disabled = true
                //提现
                if(this.$route.fullPath=='/withdrawal_index'){                    
                    indexApi.withdraw({amt:this.amt,code:this.code,smsSimplify:'Cash_withdrawal_sms_code',type:this.typeId})
                    .then( data => {
                        this.loading = false
                        this.disabled = false
                        this.$router.push('/withdrawal_index_result')
                    })
                    .catch( () => {
                        this.loading = false
                        this.disabled = false
                    })
                }
                //充值
                if(this.$route.fullPath=='/recharge'){
                    indexApi.recharge({amt:this.amt,code:this.code,smsSimplify:'replenish_sms_code'})
                    .then( data => {
                        this.loading = false
                        this.disabled = false
                        this.$router.push('/recharge_result')
                    })
                    .catch( () => {
                        this.loading = false
                        this.disabled = false
                    })
                }
                //出借
                if(this.$route.path=='/lend_confirmation'){                   
                    indexApi.transaction({bidId :this.$route.query.id,code:this.code,smsSimplify:'lenders_deal_captcha',money:this.amt,couponId:this.couponId})
                    .then( data => {
                        this.loading = false
                        this.disabled = false
                        localStorage.removeItem('coupon')
                        if(JSON.parse(localStorage.getItem('info')) && JSON.parse(localStorage.getItem('info')).user && JSON.parse(localStorage.getItem('info')).user.isNew){
                            let old = JSON.parse(localStorage.getItem('info'))
                            old.user.isNew = false
                            localStorage.setItem('info',JSON.stringify(old))
                        }
                        if(data.code==0){
                            this.$router.push({path:'/borrow_result',query:{code:data.code,message:data.message}})
                        }else if(data.code=='17007') {
                            Toast({message:data.message,duration:2000})
                        }else if(data.code=='22041' || data.code=='22042'){ 
                            Dialog.confirm({
                            message:data.message
                            }).then(() => {
                                if (localStorage.getItem("token") && localStorage.getItem("info")) {
                                    let info = JSON.parse(localStorage.getItem("info"));
                                    info.user.riskLevelInfo == null? this.$router.push({path:'goRisk',query:{type:1}}):this.$router.push("/riskResult");
                                } else {
                                    this.$router.push("/verification_code_login");
                                }
                            }).catch(() => {});
                        }else if( data.code=='22040'){
                            Dialog.alert({
                            confirmButtonText:'我知道了',
                            message: data.message
                            }).then(() => {})
                        }else{
                            this.$router.push({path:'/borrow_result',query:{code:data.code,message:data.message}})
                        }         
                        
                    })
                }
            }
        },
        created(){
            this.phone = JSON.parse(localStorage.getItem("info")) && JSON.parse(localStorage.getItem("info")).user &&JSON.parse(localStorage.getItem("info")).user.phone            
        }
    }
</script>

<style scoped lang="less">
.van-popup{  
    width: 572px;
    overflow: hidden;    
    border-radius: 10px;   
    i{
        width: calc(100% - 22px);
        display: inline-block;
        text-align: right;
        font-size: 47px;
        color: #e2e2e2;
        padding: 21px 22px 16px 0;
    }
    p:nth-of-type(1){
        font-size: 32px;
        color: #000;
        text-align: center;
        padding-bottom: 36px; 
    }
    p:nth-of-type(2){
        font-size: 26px;
        text-align: center;
        color: #8f9292;
        padding-bottom: 49px; 
    }
    .code-input-main {
        display: flex;
        justify-content: space-between;
        padding: 0 38px 31px;
        .code-input-main-item {
            width: 66px;
            height: 66px;
            line-height: 66px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 40px;
            border-radius: 10px;
            opacity: 0.6;
            color: #000;
        }
        .code-input-input {
            outline: none;
            height: 66px;
            position: absolute;
            background: transparent;
            color: transparent;
            text-shadow: 0 0 0 transparent;
            text-indent: -999em; /*文本向左缩进*/
            margin-left: -100%; /*输入框光标起始点向左左移*/
            width: 200%; /*输入框增大一倍*/ 
            opacity: 0;    
        }
    }
    p:nth-of-type(3){
        font-size: 26px;
        color: #ff4e3c;
        text-decoration: underline;
        text-align: center;
        padding-bottom: 62px; 
    }
    .again_code_color{
        color: #8f9292!important
    }
    .van-button{
        width: 492px;
        height: 90px;
        background: #ff4e3c;
        color: #fff;
        border-radius: 90px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        margin-bottom: 82px;
        
    }
    .van-button.gary {
        background:#8f9292;
    }
}

</style>