<template>
    <div class="forget_pwd">
        <h1>找回登录密码</h1>
        <div class='contain'>
            <group>
                <x-input  v-model="formdata.phone" placeholder="请输入手机号码" type="tel" :max="11"></x-input>
                
                <x-input placeholder='短信验证码' class="weui-vcode" v-model="formdata.code" type="tel">
                    <x-button slot="right" type="primary" mini @click.native="sendMessage" :class="disable001==true?'gary':''" :disabled="disable001">{{word}}</x-button>
                </x-input>
                <x-input :type='pwdType' v-model="formdata.pwd" placeholder="设置6-16字符的新登录密码"><i :class="eye" slot="right" @click="changeType" ></i> </x-input>
            </group>
            <x-button type="warn" @click.native="submit" :disabled="disabled" :class="disabled?'garybtn':''">确定</x-button>
        </div>
    </div>
</template>

<script>
import { XInput, Group,XButton,XDialog} from 'vux'
import{indexApi} from '@/api/mine'
import md5 from 'blueimp-md5'
import{publicFun} from '@/libs/publicFun'
import { Dialog } from 'vant';
    export default {
         components:{
            XInput, 
            Group,
            XButton,          
        },
        data(){
            return{
                formdata:{
                    phone:'',
                    pwd:'',
                    code:'', 
                },        
                disabled:true,                 
                word:'获取验证码',
                disable001:false,
                pwdType:'password',
                eye:'icon iconfont icon-biyan',
            }
        },
        watch:{
            formdata:{
                deep:true,
                handler(){
                    if(this.formdata.phone==""||this.formdata.pwd==""||this.formdata.code==""){
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
                    indexApi.smsCodeSend3(this.formdata.phone,"true").then(data =>{
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
                    })  
                    .catch( ()=>{
                        this.disable001 = false
                    })                  
                }else{
                    this.$toast('请输入正确的手机号码')               
                }
            },
            //密码显示隐藏切换
             changeType(){
                this.pwdType = this.pwdType==='password'?'text':'password';
                this.eye = this.eye==='icon iconfont icon-biyan'?'icon iconfont icon--':'icon iconfont icon-biyan';
            },
            submit(){
                window.scrollTo(0, 0);
                if(!publicFun.checkPhone(this.formdata.phone)){
                    this.$toast({message:'请输入正确的手机号码',duration:2000})
                }else if(!publicFun.checkPwd(this.formdata.pwd)){
                    this.$toast({message:'请设置6-16位字符的新登录密码',duration:2000})
                }else{
                    let formdata ={code:this.formdata.code,phone:this.formdata.phone,newPwd:md5(md5(md5(this.formdata.pwd))),smsSimplify:'Rest_Password_sms_code'}
                    indexApi.userPasswordRest(formdata).then(data=>{
                        Dialog.alert({
                            message: '<p style="text-align:center">设置成功</p>'
                        }).then(() => {
                            localStorage.clear()
                            this.$router.push('/verification_code_login')
                        });                                                
                    })
                }
                
            }
        }
    }
</script>

<style scoped lang='less'>
.forget_pwd{
    background: #fff;
    min-height: 100vh;
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
            left:0!important;
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
        .garybtn{
            color: #fff;
            background: #cfd4da
        }
    }
}
</style>