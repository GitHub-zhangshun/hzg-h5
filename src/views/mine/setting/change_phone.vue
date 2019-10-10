<template>
    <div class="set_pwd">
        <header> <p>验证登录密码</p> </header>
        <div class="contain">
            <group class="pwd">
                <x-input :type='pwdType' placeholder="请输入登录密码" v-model="pwd"><i :class="eye" slot="right" @click="changeType"></i> </x-input>
            </group>
        </div>
        <div class="btn">
            <x-button type="warn" @click.native="submit" :disabled="disable" :class="disable==true?'gary':''">下一步</x-button>
        </div>
        <ForgetPwd></ForgetPwd>
    </div>
</template>

<script>
import { XInput, Group,XButton} from 'vux'
import {indexApi} from '@/api/mine'
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
                pwd:'',
                disable:true
            }
        },
        watch:{
            pwd(){
                if(this.pwd==''){
                    this.disable=true
                }
                this.disable=false
            }
        },
        methods:{
            changeType(){
                this.pwdType = this.pwdType==='password'?'text':'password';
                this.eye = this.eye==='icon iconfont icon-biyan'?'icon iconfont icon--':'icon iconfont icon-biyan';
            },
            submit(){           
                indexApi.userPasswordVerify(md5(md5(md5(this.pwd)))).then((data)=>{
                    this.$router.push('/change_new_phone')                 
                })
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
</style>