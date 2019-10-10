<template>
    <div class="backGround">
        <img src="../assets/images/shareRegister/share.jpg">
        <div class="inputRegister">
            <div class="phone">
                <i class="icon iconfont icon-shouji01"></i>
                <input type="tel" placeholder="请输入手机号" v-model="formdata.phone" max="11">
            </div>           
            <div class="code">
                <div class="left">
                    <i class="icon iconfont icon-yduidunpaishixin"></i>
                    <input type="tel" placeholder="请输入验证码" v-model="formdata.code" >
                </div>           
                <input type="button" :value="word" class="right" @click="sendCode" :disabled="disablebtn" :class="disablebtn==true?'gary':''">
            </div>
            <div class="pwd">
                <i class="icon iconfont icon-suo"></i>
                <input type="password" placeholder="请输入密码" v-model="formdata.pwd">
            </div>
            <div class="check">
                <Checkbox v-model="formdata.checked" shape="square" checked-color="#4b0" :label-disabled='true'>同意并阅读<span style="color:#faa241" @click="agreement">《用户协议》</span></Checkbox>
            </div>
            <input type="button" value="注册并下载和掌柜APP" class="register" @click="submit" :disabled="disabled" :class="disabled==true?'gary':''">
        </div>
    </div>
</template>

<script>
import { Checkbox } from 'vant';
import md5 from 'blueimp-md5'
import { Toast } from 'vant';
import {publicFun} from '@/libs/publicFun'
import {indexApi} from '@/api/mine'
    export default {
        components:{
            Checkbox
        },
        data(){
            return{
                formdata:{
                    phone:'',
                    code:'',
                    pwd:'',
                    checked:true
                },
                disabled:true,
                word:'获取验证码',
                disablebtn:false,
                //邀请人手机号
                inviterPhone:'',
                flag:{
                    phone:'',
                    code:'',
                    pwd:'',
                    checked:''
                },
            }
        },
        watch:{
            formdata:{
                deep:true,
                handler(){
                    if(this.formdata.phone!=''&&this.formdata.code!=''&&this.formdata.pwd!=''&&this.formdata.checked==true){
                        this.disabled = false
                    }else{
                        this.disabled = true
                    }
                    // this.flag.checked = true
                    // if(this.formdata.checked==false){
                    //     this.$toast({duration:2000,message:'请勾选同意协议'})
                    //     this.flag.checked = false
                    // }else{
                        
                    // }
                }
            }
        },
        methods:{
            sendCode(){
                if(!publicFun.checkPhone(this.formdata.phone)){
                    this.$toast({duration:2000,message:'手机号格式不正确'})
                }else{
                    let time = 60,that=this;
                    indexApi.smsCodeSend(this.formdata.phone,"false").then(data =>{
                        if(data.code==0){
                            var sendTimer = setInterval(function(){
                                that.disable001 = true;
                                time--;
                                that.word = +time+'S';
                                if(time < 0){
                                    that.disable001 = false;
                                    clearInterval(sendTimer);
                                    that.word = "获取验证码";
                                }
                            },1000)
                        }else{
                            this.$toast({duration:2000,message:data.message})
                        }                        
                    })
                    .catch( () => {})
                }
            },
            submit(){
                if(!publicFun.checkPhone(this.formdata.phone)){
                    this.$toast({duration:2000,message:'手机号格式不正确'})  
                }else if(!publicFun.checkPwd(this.formdata.pwd)){
                    this.$toast({duration:2000,message:'密码格式为6-16位字符'})
                }else{
                    let formdata = {
                        code:this.formdata.code,
                        inviterPhone:this.inviterPhone?this.inviterPhone:'',
                        phone:this.formdata.phone,
                        pwd:md5(md5(md5(this.formdata.pwd))),
                        smsSimplify:"login_sms_code",
                        correlationSimplify:"platform_register_correlation_h5",
                    }                
                    indexApi.investorRegister(formdata).then(data=>{
                        if(data.code==0){
                            this.$toast({duration:1000,message:data.message})
                            this.$route.push('/download')                            
                        }else{
                            this.$toast({duration:2000,message:data.message})
                        }
                    })
                    .catch( () => {})
                }                
            },
            //用户协议
            agreement(){
                indexApi.platformConfig().then(data=>{
                    if(data.code==0){
                        this.$router.push({path:'/announcementDetails',query:{id:data.result.registerAgreementLink,title:'用户协议'}})
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
                .catch( ()=> {})
            }
        },
        mounted(){
            if(this.$route.query.code){
                indexApi.invitePhoneByCode(this.$route.query.code).then(data=>{
                    if(data.code==0){
                        this.inviterPhone = data.result
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })
                .catch( () => {})
            } 
            
        }
    }
</script>

<style scoped lang='less'>
.backGround{
    position: relative;
    img{
        width: 100%;
        height: 100%;
    }
    .inputRegister{
        margin: 0 auto;
        position: absolute;  
        width: 670px;      
        top: 616px;
        left: 0;
        right: 0;
        .phone,.left,.pwd{
            i{
                vertical-align: middle;
                margin-left: 42px;
                margin-right: 38px;
                display: inline-block;
                font-size: 40px;
                color:#b0b0b0;
            }
            input{
                font-size: 30px;
            }
        }
        .phone,.pwd{
            width: 670px;
            height: 88px;
            background: #fff;
            border-radius: 100px;
            line-height: 88px;
            margin-bottom: 46px;
        }
        .pwd{
            margin-bottom: 24px;
        }
        .code{
            line-height: 88px;
            margin-bottom: 46px;
            display: flex;
            .left{
                background: #fff;
                display: flex;
                width: 440px;
                border-radius: 88px;
                margin-right: 30px;
                input{
                    width: 191px;
                }
            }            
            .right{
                width: 200px;
                border-radius: 88px;
                color: #ff4e30;
                background: #ffedbd;
                font-size: 30px;
                height: 88px;
                line-height: 88px;
            }
        }
        .check{
            padding-left:30px; 
            margin-bottom: 80px;
            /deep/.van-checkbox{
                .van-checkbox__icon{
                    height: 32px;
                    line-height: 32px;
                    .van-icon{
                        width: 32px;
                        border-radius: 10px;
                        height: 32px;
                        border-color: #fff!important;
                        background-color: transparent!important;
                    }
                }
                .van-checkbox__label{
                    height: 38px;
                    color: #fff;
                    font-size: 30px;
                }
            }
        }
        .register{
            width: 670px;
            height: 88px;
            border-radius: 88px;
            font-size: 32px;            
            background:#fff58a;
            color: #ff4e30;
        }
        .gary{
            background-color: #cfd4da!important;
            color: #fff!important;
        }
    }   
}
</style>