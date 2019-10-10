<template>
    <div class="login">
        <h1>欢迎回来</h1>
        <x-input placeholder="请输入手机号/用户名" v-model="formdata.phone" type="text" :max="12"></x-input>
        <x-input placeholder="请输入登录密码" :type='pwdType' v-model="formdata.pwd">
            <i :class="eye" slot="right" @click="changeType"></i>
        </x-input>
        <ForgetPwd></ForgetPwd>
        <div class="btn">
            <x-button type="warn" @click.native="login" :show-loading="show_loading" :disabled="disabled" :class="disabled==true?'gary':''">登录</x-button>
        </div>
        <p class="registered"><span @click="$router.push('/register')">暂无账号，立即注册</span></p>
        <div class="verification_code">
            <button class="verification_code" @click="$router.push('/verification_code_login')">验证码登录 <i class="icon iconfont icon-qianjin1"></i> </button>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton } from 'vux'
import { Dialog } from 'vant' 
import{indexApi} from '@/api/mine'
import md5 from 'blueimp-md5'
import{publicFun} from '@/libs/publicFun'
import { setTimeout } from 'timers';
    export default {
         components: {
            XInput,
            XButton,
            Group,
        },
        data(){
            return{
                eye:'icon iconfont icon-biyan',
                pwdType:'password',
                formdata:{
                    phone:'',
                    pwd:'',
                },               
                disabled:true,
                show_loading:false
            }
        },
        watch:{
            formdata:{
                deep:true,
                handler(){
                    if(this.formdata.phone==''||this.formdata.pwd==''){
                        this.disabled = true
                    }else{
                        this.disabled = false
                    }               
                } 
            }
        },
        methods:{
            changeType(){
                this.pwdType = this.pwdType==='password'?'text':'password';
                this.eye = this.eye==='icon iconfont icon-biyan'?'icon iconfont icon--':'icon iconfont icon-biyan';
            },
            login(){
                window.scrollTo(0, 0);
                this.disabled = true
                this.show_loading = true
                let form={phone:this.formdata.phone,pwd:md5(md5(md5(this.formdata.pwd)))};
                indexApi.investorLogin(form)
                .then(data =>{
                    this.disabled = false
                    this.show_loading = false
                    localStorage.setItem("token",data.result && data.result.token)
                    if(data.result.attachInfo && data.result.attachInfo.isInitPassword){
                      this.$store.commit('loginPwd',true)
                    }
                    this.$router.push('/my')                          
                })
                .catch(()=>{
                    this.disabled = false
                    this.show_loading = false
                })
            }
        },
        created(){
            if(localStorage.token){
              this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang='less'>
.login{
    min-height: 100vh;
    background: #fff;
    h1{
        font-size: 60px;
        color: #333;
        font-weight: bold;
        padding: 66px 0 82px 40px;        
    }
    /deep/.weui-cell{
        border-bottom: 1px solid #eff2f7;
        padding: 66px 0 40px;
        margin: 0 40px;
        font-size: 30px;
        .weui-cell__ft{
            .weui_icon_clear{
                font-size: 30px !important;
            }
        }
    }
    .weui-cell:before{
        border-top: none;
    }
    .forger_pwd{
        padding: 48px 40px 88px;
        text-align: right;
        font-size: 26px;
        color: #ff4e30;
    }
    .btn{
        padding: 0 40px;
        .weui-btn{
            height: 88px;
            background: #ff4e30;
            font-size: 32px;
        }
        .weui-btn:after{
            border: none;
        }
        .gary{
            background: #cfd4da;
            color: #fff;
        }
        /deep/.weui-loading{
            width: 40px;
            height: 40px;
        }
    }
    .registered{
        text-align: center;
        line-height: 100px;
        color: #ff4e30;
        font-size: 30px;
    }
    .verification_code{
        text-align: center;
        margin-top: 100px;
        button{  
            margin-top: 0;  
            width: 420px;
            height: 88px;
            font-size: 30px;
            border-radius: 88px;
            position: relative;
            background-color: transparent;
            border: 2px solid #e3e3e3;
            i{
                font-size: 40px;
                position: absolute;
                right: 60px;
                bottom:13px;
            }
        }        
    }
}
</style>