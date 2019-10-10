<template>
    <div class="set_pwd">
        <header> <p>新手机号码</p> </header>
        <div class="contain">
            <group class="pwd">
                <x-input name="mobile" type="tel" v-model="formdata.phone" placeholder="请输入新的手机号码"></x-input>
                <x-input placeholder='请输入验证码' class="weui-vcode" v-model="formdata.code" type="tel">
                    <x-button slot="right" type="primary" :class="disable001==true?'gary':''" mini @click.native="sendMessage" :disabled="disable001">{{word}}</x-button>
                </x-input>
            </group>
        </div>
        <div class="btn">
            <x-button type="warn" @click.native="submit" :disabled="disabled" :class="disabled==true?'gary':''">确&nbsp;定</x-button>
        </div>
        <!-- <ForgetPwd></ForgetPwd> -->
    </div>
</template>

<script>
import { XInput, Group,XButton,XDialog} from 'vux'
import{indexApi} from '@/api/mine'
import{publicFun} from '@/libs/publicFun'
import { setTimeout } from 'timers';
    export default {
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
                    code:''
                },
                word: '发送验证码',
                disable001: false,
                disabled:true
            }
        },
        watch:{
            formdata:{
                deep:true,
                handler(){
                    if(this.formdata.phone==''||this.formdata.code==''){
                        this.disabled = true
                    }else{
                        this.disabled = false
                    }               
                } 
            }
        },
        methods:{
            sendMessage(){
                let checkPhone = publicFun.checkPhone(this.formdata.phone)
                if(checkPhone){
                    this.disable001 = true
                    let time = 60,that=this;
                    indexApi.smsCodeSend1(this.formdata.phone,"false").then(data =>{
                        var sendTimer = setInterval(function(){
                            time--;
                            that.word = time+'S';
                            if(time < 0){
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
                    this.$toast({message:"手机号格式错误",duration:2000}) 
                }
            },
            submit(){
                if(!publicFun.checkPhone(this.formdata.phone)){
                    this.$toast({message:"手机号格式错误",duration:1000})
                }else{
                    let formdata = {
                        smsSimplify:'edit_phone_sms_code',
                        code:this.formdata.code,
                        phone:this.formdata.phone
                    }
                    indexApi.userPhoneEdit(formdata).then((data)=>{
                        this.$toast({message:"更换成功",duration:2000})
                        setTimeout(()=>{
                            this.$router.push('/setting')
                        },2000)
                    })
                }                
            }
        }
    }
</script>

<style scoped lang='less'>
.set_pwd {       
        margin-top: 18px;
        header {
            background: #fff;
            padding: 36px 0 68px;
            font-size: 32px;            
            color: #32363c;            
            font-weight: bold;
            p{
                padding-left: 38px;
                border-left: 4px #333333 solid;
            }
        }
        .contain { 
            background: #fff;           
            .pwd{
                /deep/.weui-cells{
                    margin-top: 0;
                    .vux-x-input{
                        padding: 0 40px;
                        line-height: 100px;
                        font-size: 28px;
                        .weui-cell__ft{
                            .vux-input-icon::before{
                                content: "\EA0B";
                            }
                            .weui-btn_primary{
                                background: #fff;
                                color: #ff4e30;
                                padding: 0;
                                font-size: 28px;
                            }
                            .gary{
                                color: #848a93;
                            }
                            .weui-btn_primary::after{
                                border: none;
                            }
                        }
                        .weui-cell__bd{
                            .weui-input{
                                font-size: 28px;
                            }
                        }
                    }
                }
                /deep/.weui-cells::before{
                    border-top:none; 
                    left: 0;
                }
                /deep/.weui-cells::after{
                    border-bottom:none; 
                }
            }
        }
        .btn{
            padding: 100px 40px 36px;
            .weui-btn{
                height: 88px;
                background: #ff4e30;
                font-size: 32px;
            }
            .weui-btn:after{
                border: none;
            }
            .gary{
                background: #ced3d9;
            }
        }
        &>p{
            padding: 0 40px;
            text-align: right;
            font-size: 26px;
            color: #ff4e30;
        }
}
.vux-alert{
    .vux-x-dialog{
        /deep/.weui-dialog{
            // max-width:108px!important;
            max-width: none;
        }
    }
}
</style>