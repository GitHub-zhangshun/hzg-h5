<template>
    <div class="set_pwd">
        <header> <p>修改登录密码</p> </header>
        <div class="contain">
            <group class="pwd">
                <x-input type='password' placeholder="请输入原密码" v-model="list.oldPwd"></x-input>
                <x-input :type='pwdType' placeholder="请输入6-16字符的登录密码" v-model="list.newPwd"><i :class="eye" slot="right" @click="changeType"></i> </x-input>
            </group>
        </div>
        <div class="btn">
            <x-button type="warn" @click.native='submit' :disabled="disabled" :class="disabled==true?'gary':''">确认修改</x-button>
        </div>
        <ForgetPwd></ForgetPwd>
    </div>
</template>

<script>
import { XInput, Group,XButton} from 'vux'
// import { Toast } from 'vant';
import {indexApi} from '@/api/mine'
import {publicFun} from '@/libs/publicFun'
import md5 from 'blueimp-md5'
    export default {
        components:{
            XInput, 
            Group,
            XButton,
        },
        

        data(){
            return{
                eye:'icon iconfont icon-biyan',
                pwdType:'password',
                list:{
                    oldPwd:'',
                    newPwd:'',
                },                
                disabled:true,
                flag:''
            }
        },
        watch:{
            list:{
                deep:true,
                handler(){
                    if(this.list.oldPwd==''||this.list.newPwd==''){
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
            submit(){
                if(!publicFun.checkPwd(this.list.newPwd)){
                    this.$Toast({message:'请设置6-16位字符的新登录密码',duration:1000})
                }else{
                    let formData = {oldPwd:md5(md5(md5(this.list.oldPwd))),newPwd:md5(md5(md5(this.list.newPwd)))}
                    indexApi.userPasswordEdit(formData).then(data =>{        
                        this.$toast({message:"密码修改成功",duration:2000})
                        setTimeout(()=>{
                            this.$router.go(-1)
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
                background: #cfd4da;
                color: #fff;
            }
        }
        &>p{
            padding: 0 40px;
            text-align: right;
            font-size: 26px;
            color: #ff4e30;
        }
    }
</style>