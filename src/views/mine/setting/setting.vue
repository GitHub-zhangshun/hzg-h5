<template>
    <div class="setting">
        <ul>
            <li class="touch" @click="headImg">
                <span>设置头像</span>
                <div class="head_portrait">
                    <div class="headerDiv">
                        <img :src="info.user&&info.user.headImg||img" >
                    </div>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
            <li @click="$router.push('/set_name')" class="touch">
                <span>设置昵称</span>
                <div class="head_portrait">
                    <span>{{info.user&&info.user.nickName||"去设置"}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
            <li @click="info.user && info.user.accountInfo&&info.user.accountInfo.account==null?$router.push('/set_user_name'):''" class="touch">
                <span>我的用户名</span>
                <div class="head_portrait">
                    <span>{{info.user && info.user.accountInfo && info.user.accountInfo.account||"去设置"}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin" v-if="info.user && info.user.accountInfo&&info.user.accountInfo.account==null?true:false"></i>
            </li>
        </ul>
        <ul>
            <li @click="$router.push('/change_phone')" class="touch">
                <span>修改登录手机号码</span>
                <div class="head_portrait">
                    <span>{{info.user&&info.user.phone}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
            <li @click="$router.push('/set_pwd')" class="touch">
                <span>修改登录密码</span>
                <div class="head_portrait">
                    <span></span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
        </ul>
        <ul>
            <!-- <li class="touch" @click="openAccount" v-if="show">
                <span>开通账户</span>
                <div class="head_portrait">
                    <span>{{info.user&&info.user.isOpen==true?"":"去开通"}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li> -->
            <li class="touch" @click="myCard">
                <span>我的银行卡</span>
                <div class="head_portrait">
                    <span>{{info.user&&info.user.isOpen==true?"":"请先开通银行存管账户"}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
            <li class="touch" @click="editPassword">
                <span>修改交易密码</span>
                <div class="head_portrait">
                    <span>{{info.user&&info.user.isOpen==true?"":"请先开通银行存管账户"}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
            <li class="touch" @click="resetPassword">
                <span>重置交易密码</span>
                <div class="head_portrait">
                    <span>{{info.user&&info.user.isOpen==true?"":"请先开通银行存管账户"}}</span>
                </div>                
                <i class="icon iconfont icon-qianjin"></i>
            </li>
        </ul>
        <div class="btn">
            <x-button type="warn" @click.native="logout">安全退出</x-button>
        </div>
        <div class="cancellation">
            <x-button type="warn" @click.native="cancellation">申请注销账户</x-button>
        </div>
        <Dialogalert v-if="show" @childClose='close'></Dialogalert>
    </div>
</template>

<script>
import{indexApi} from '@/api/mine'
import { Dialog, Toast} from 'vant' 
import {XButton} from 'vux'
import { publicFun } from '@/libs/publicFun'
    export default {
        data(){
            return{
                info:'',
                userImg:'',
                img: require('@/assets/logo.png'),
                show:false,
            }
        },
        components: {
            XButton,
        },
        methods:{
            //重置
            resetPassword(){
                Toast.loading({
                    duration:0,
                    mask:true
                });
                if(this.info && this.info.attachInfo && !this.info.attachInfo.isOpen){
                    this.show = true
                }else{
                    indexApi.resetPassword()
                    .then( data => {
                      Toast.clear()
                        localStorage.setItem('path',this.$route.fullPath)
                        sessionStorage.setItem('shanba','pwd_reset')
                        publicFun.redirectTripartite(data.result)
                    })
                    .catch( () => {
                      Toast.clear()
                    })
                }
            },
            // 修改
            editPassword(){
                Toast.loading({
                    duration:0,
                    mask:true
                });
                if(this.info && this.info.attachInfo && !this.info.attachInfo.isOpen){
                    this.show = true
                }else{
                    indexApi.editPassword()
                    .then( data => {
                      Toast.clear()
                        localStorage.setItem('path',this.$route.fullPath)
                        sessionStorage.setItem('shanba','pwd_editor')
                        publicFun.redirectTripartite(data.result)
                    })
                    .catch( () => {
                      Toast.clear()
                    }) 
                }
            },
            // 我的银行卡
            myCard(){
                if(this.info && this.info.attachInfo && !this.info.attachInfo.isOpen){
                    this.show = true
                }else{
                    this.$router.push('/my_bank_card')
                }
            },
            headImg(){
                this.$toast({message:"请在和掌柜APP上进行头像修改",duration:2000})
            },
            logout(){
                Dialog.confirm({
                    message: '确定要退出当前账号吗？'
                }).then(() => {
                    localStorage.clear();
                    this.$router.replace('/my')
                }).catch(()=>{

                })                
            },
            close(a){
                this.show = a
            },
            cancellation(){
                Dialog.confirm({
                    message: '注销后所有数据将无法找回，确认要申请注销账户吗？'
                }).then(() => {
                    Toast.loading({
                        duration:0,
                        mask: true,
                    });
                    indexApi.userApplyCancel()
                    .then(data=>{
                      Toast.clear()
                        if(this.info.user && this.info.user.isOpen){
                            sessionStorage.setItem('shanba','delete_account')
                            publicFun.redirectTripartite(data.result)
                        }else{
                            Toast.clear()
                            localStorage.clear()
                            sessionStorage.clear()
                            this.$router.replace('/my')
                        }
                    })
                    .catch( () => {
                      Toast.clear()
                    }) 
                })
            },
            // 富有开户
            // // 开户
            // openAccount(){
            //     if(this.info && (!this.info.attachInfo.isOpen || !this.info.user.signFlag || !this.info.user.withdrawAuthFlag)){
            //         this.$router.push('/step')
            //     }                   
            // },
            // // 我的银行卡
            // myCard(){
            //     if(!this.info.attachInfo.isOpen || !this.info.user.signFlag || !this.info.user.withdrawAuthFlag){
            //         this.$router.push('/step')
            //     }else{
            //         this.$router.push('/my_bank_card')
            //     }
            // }
        },
        async created(){
            await indexApi.investorCurrent().then(data =>{
                this.info = data.result
                localStorage.setItem("info",JSON.stringify(data.result))
                // if(!this.info.attachInfo.isOpen){
                //     this.show = true
                // }
            })   
        },
    }
</script>

<style scoped lang='less'>
.setting{
    ul{
        margin-top: 18px;
        background: #fff;
        li{
            display: flex;
            justify-content: space-between;
            line-height: 100px;
            padding: 0 40px;
            border-bottom: 1px solid #eff2f7;
            span{
                font-size: 28px;
            }
            .head_portrait{
                flex: 1;
                text-align: right;
                padding-right: 20px;
                .headerDiv{
                    width: 84px;
                    height: 84px;
                    margin-left:calc(100%-84px);
                    img{
                        width: 100%;
                        height: 100%;    
                        border-radius: 100%;                
                    }
                }               
                span{
                    color: #848a93;
                }
            }
            
        }
    }
    .btn{
        padding: 80px 40px 36px;
        .weui-btn{
            height: 88px;
            background: #ff4e30;
            font-size: 32px;
        }
        .weui-btn:after{
            border: none;
        }
    }
    .cancellation{
        padding: 0 40px 50px;
        .weui-btn{
            height: 88px;
            background: #fff;
            font-size: 32px;
            color: #000;
        }
        .weui-btn:after{
            border: none;
        }
    }
    /deep/.van-dialog{
        .van-dialog__content{
            button{
                margin-left: 40px;
            }
        }
    }
}
</style>