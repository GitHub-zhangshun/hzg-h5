<template>
    <keep-alive>
        <div class="register">
            <h1>欢迎您加入和掌柜!</h1>
            <div class='contain'>
                <group>
                    <x-input  v-model="formdata.phone" placeholder="注册手机号" type="tel" :max="11"></x-input>
                    <x-input placeholder='短信验证码' class="weui-vcode" v-model="formdata.code" type="tel">
                        <x-button slot="right" type="primary" mini @click.native="sendMessage" :class="disable001==true?'gary':''" :disabled="disable001" ref="code">{{word}}</x-button>
                    </x-input>
                    <x-input :type='pwdType' v-model="formdata.pwd" placeholder="设置6-16字符的登录密码"><i :class="eye" slot="right" @click="changeType"></i> </x-input>
                    <!-- <x-input v-model="formdata.inviterPhone" placeholder="邀请人手机号（选填）" type="tel"></x-input>                 -->
                </group>
                <x-button type="warn" @click.native="register" :show-loading="show_loading" :disabled="disabled" :class="disabled==true?'nogary':''">注册</x-button>
            </div>
            <p>注册代表你已阅读并同意<span @click="agreement">《用户协议》</span></p>
        </div>
    </keep-alive>    
</template>

<script>
import { XInput, Group,XButton,XDialog} from 'vux'
import{indexApi} from '@/api/mine'
import md5 from 'blueimp-md5'
import{publicFun} from '@/libs/publicFun'
import { setTimeout } from 'timers';
    export default {
        name: 'register',
        components:{
            XDialog,
            XInput, 
            Group,
            XButton,          
        },       
        data(){
            return{
                formdata:{
                    phone:'',
                    pwd:'',
                    // inviterPhone:'',
                    code:'',
                },                                          
                word:'获取验证码',
                disable001:false,
                pwdType:'password',
                eye:'icon iconfont icon-biyan',
                disabled:true,
                show_loading:false
            }
        },
        watch:{
            formdata:{
                deep:true,
                handler(){
                    if(this.formdata.phone==''||this.formdata.pwd==''||this.formdata.code==''){
                        this.disabled = true
                    }else{
                        this.disabled = false
                    }               
                }
            }
        },
        methods:{
            //验证码
            sendMessage(){
                let checkPhone = publicFun.checkPhone(this.formdata.phone)
                if(checkPhone){
                    this.disable001 = true
                    let time = 60,that=this;
                    indexApi.smsCodeSend2(this.formdata.phone,"false").then(data =>{
                        var sendTimer = setInterval(function(){
                            time--;
                            that.word = +time+'S';
                            if(time <= 0){
                                that.disable001 = false;
                                clearInterval(sendTimer);
                                that.word = "获取验证码";
                            }
                        },1000)                   
                    })
                    .catch( ()=>{
                        this.disable001 = false
                    })
                }else{
                    this.$toast({message:'手机号格式错误',duration:2000})     
                }
            },
            //密码显示隐藏切换
             changeType(){
                this.pwdType = this.pwdType==='password'?'text':'password';
                this.eye = this.eye==='icon iconfont icon-biyan'?'icon iconfont icon--':'icon iconfont icon-biyan';
            },
            //注册提交
            register(){
                window.scrollTo(0, 0);
                if(!publicFun.checkPhone(this.formdata.phone)){
                    this.$toast({message:"手机号格式不正确",duration:20000})
                }else if(!publicFun.checkPwd(this.formdata.pwd)){
                    this.$toast({message:"密码格式不正确",duration:20000})
                }else{
                    this.disabled = true
                    this.show_loading = true
                    let formdata ={
                        code:this.formdata.code,
                        phone:this.formdata.phone,
                        pwd:md5(md5(md5(this.formdata.pwd))),
                        smsSimplify:"register_sms_code",
                        correlationSimplify:"platform_register_correlation_h5",
                    }
                    indexApi.investorRegister(formdata).then(data =>{
                        this.disabled = false
                        this.show_loading = false
                        this.$toast({message:"注册成功",duration:2000})
                        localStorage.setItem("token",data.result.token)
                        setTimeout(()=>{
                            this.$router.push('/registered')
                        },2000)
                    })
                    .catch( ()=>{
                        this.disabled = false
                        this.show_loading = false
                    })
                }
            },
            //用户协议
            agreement(){
                indexApi.platformConfig().then(data=>{
                    this.$router.push({path:'/announcementDetails',query:{id:data.result.registerAgreementLink,title:'用户协议'}})
                })
            }
        },
        beforeRouteLeave (to, from, next) {
            localStorage.setItem('register_info',JSON.stringify(this.formdata))
            next()
        },
        created(){
            if(localStorage.token){
                this.$router.push('/')
            }
            if(localStorage.register_info){
                this.formdata = JSON.parse(localStorage.register_info)
            }
        }
    }
</script>

<style scoped lang='less'>
.register{
    min-height: 100vh;
    background: #fff;
    h1{
        padding: 100px 0 82px 40px;
        font-size: 60px;
        color: #333;
    }
    .contain{
        padding: 0 80px;
        /deep/.weui-cells{
            margin-top: 0;
        }   
        /deep/.weui-cells:before{
            border-top: none;
        } 
        .weui-cell{
            padding: 64px 0 40px;
            font-size: 28px;
        } 
        .weui-cell::before{
            left: 0;
        }
        /deep/.weui-input:placeholder{
            color: #afb5bc;
        }    
        /deep/.weui-icon-warn::before{
            content: "\EA0B";
        }
        .weui-btn_warn{
            margin-top: 120px;
            font-size: 32px;
            height: 88px;
            background: #ff4e30;
        }
        .weui-btn_primary{
            background: transparent;
            font-size: 28px;
            color: #ff4e30;
            padding: 0;
        }
        .weui-btn_primary::after{
            border:none;
        }
        .gary{
            color: #848a93;
        }
        .nogary{
            background: #cfd4da;
            color: #fff;
        }
        /deep/.weui-loading{
            width: 40px;
            height: 40px;
        }
    }
    &>P{
        font-size: 26px;
        text-align: center;
        line-height: 88px;
        color: #848a93;
        span{
            color: #333;
        }
    }
}
</style>