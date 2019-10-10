<template>
    <div class="step">
        <div class="layer"></div>
        <h1>完成以下3步，即可前往出借</h1>
        <!-- 步骤三 -->
        <div class="step3">
            <ul @click="step3">
                <li><img src="../assets/images/my/step3.png"></li>
                <li>
                    <p>开通银行存管账户</p>
                    <p>账户隔离，资金更安全</p>
                </li>
                <li v-if="step3_btn==0"><i class="icon iconfont icon-qianjin2"></i></li>
                <li v-if="step3_btn==1"><i class="icon iconfont icon-gouxuan"></i></li>
            </ul>
        </div>
        <!-- 步骤二 -->
        <div class="step2">
            <ul @click="step2">
                <li><img src="../assets/images/my/step2.png"></li>
                <li>
                    <p>银行卡签约</p>
                    <p>快捷支付，抢标快人一步</p>
                </li>
                <li v-if="step2_btn==0"><i class="icon iconfont icon-qianjin2"></i></li>
                <li v-if="step2_btn==1"><i class="icon iconfont icon-gouxuan"></i></li>
            </ul>
        </div>
        <!-- 步骤一 -->
        <div class="step1">
            <ul @click="step1">
                <li><img src="../assets/images/my/step1.png"></li>
                <li>
                    <p>委托充值授权</p>
                    <p>快捷支付，抢标快人一步</p>
                </li>
                <li v-if="step1_btn==0"><i class="icon iconfont icon-qianjin2"></i></li>
                <li v-if="step1_btn==1"><i class="icon iconfont icon-gouxuan"></i></li>
            </ul>
        </div>
        <p @click='back'>暂不开通,返回<span>上一页</span></p>
    </div>
</template>

<script>
import  { indexApi } from '@/api/mine'
import { Toast } from 'vant';

    export default {
        data(){
            return{
                step3_btn:-1,
                step2_btn:-1,
                step1_btn:-1,
            }
        },
        created(){
            indexApi.investorCurrent()
            .then(data =>{
                if(data.result.attachInfo.isOpen){
                    this.step3_btn = 1
                }else{
                    this.step3_btn = 0
                }   
                if(data.result.user.signFlag){
                    this.step2_btn = 1
                }else{
                    this.step2_btn = 0
                } 
                if(data.result.user.withdrawAuthFlag){
                    this.step1_btn = 1
                }else{
                    this.step1_btn = 0
                }              
            })
            .catch( () => {})
        },
        methods:{
            step3(){
                if(this.step3_btn==0){
                    this.$router.push('/no_bank_deposit_account')
                }
            },
            step2(){
                if(this.step3_btn==0){
                    Toast({message:'请先完成第一步操作',duration:2000})
                    return
                }
                if(this.step2_btn==0){
                    location.href = process.env.domain+'/v1/fin/account/appSignCard?token='+localStorage.getItem('token')
                }
            },
            step1(){
                if(this.step3_btn==0 || this.step2_btn==0){
                    Toast({message:'请先完成前两步操作',duration:2000})
                    return
                }
                if(this.step1_btn==0){
                    location.href = process.env.domain+'/v1/fin/account/appAuth?token='+localStorage.getItem('token')
                }
            },
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang='less'>
.step{
    
    .layer{
        position: absolute;
        left: 0;
        top: 0;
        width:100%;
        height: 100%;
        background: #fff;
        z-index: -1;
    }
    h1{
        padding: 76px 40px 0;
        font-size: 50px;
        font-weight: bold;
        padding-bottom: 100px;
    }
    .step3,.step2,.step1{
        padding: 60px 40px 50px;
        border-bottom: 2px solid #f2f2f4;
        &>P{
            font-size: 28px;
            padding-bottom: 48px;
        }
        ul{
            display: flex;
            justify-content: space-between;
            li{
                img{
                    width: 112px;
                    height: 90px;
                    padding-right: 50px;
                }
                .icon-qianjin2{
                    font-size: 72px;
                    color: #ff4e30;
                }
                .icon-gouxuan{
                    font-size: 80px;
                    color: #C7CBD7;
                }
            }
            li:nth-of-type(2){
                flex: 1;
                p:first-child{
                    font-size: 32px;
                    font-weight: bold;
                    padding-bottom: 26px;
                }
                p:last-child{
                    font-size: 28px;
                    color: #848a93;
                }
            }
        }
    }
    &>P{
        font-size: 26px;
        text-align: center;
        padding-top:200px;   
        color: #848a93;
        span{
            color: #333;
        }
    }
}
</style>