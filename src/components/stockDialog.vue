<template>
<!-- 存管 -->
    <van-dialog v-model="show" :lock-scroll='true' :show-confirm-button='false'>
        <i class="icon iconfont icon-guanbi" @click='closeClick'></i>
        <div><img src="../assets/images/register-success.png"></div>
        <h1>和掌柜已接入陕坝银行资金存管</h1>
        <p>为了保证您的资金安全，您需要先进行认证，才可以出借、充值、提现哦~</p>
        <button @click='open'>立即认证</button>
    </van-dialog>
</template>

<script>
import {indexApi} from'@/api/mine'
    export default {
        data() {
            return {
                show:true,
            };
        },       
        methods: {
            closeClick(){
                this.$emit('stockClose',false)
            },
            open(){
                indexApi.openAccount().then(data=>{
                    if(data.result.message==""){
                        this.$toast({message:"跳转银行失败，请稍后重试或联系客服电话400-020-0178",duration:2000})
                        return  
                    } 
                    localStorage.setItem("path",this.$route.fullPath)
                    window.location.href = data.result.code                 
                })
            }
        },
    }
</script>

<style scoped lang='less'>
.van-dialog{
    width: 570px;   
    .van-dialog__content{
        position: relative;
        i{
            position: absolute;
            right: 20px;
            top: 20px;
            font-size:45px;
            color: #e3e3e3; 
        }
        &>div{
            padding: 80px 55px 46px;
            border-bottom: none;
            img{
                width: 100%
            }
        }
        h1{
            font-size: 30px;
            color: #333;
            text-align: center;
        }
        p{
            padding: 36px 47px 60px;
            color: #848a93;
            font-size: 28px;
            line-height: 1.5;
            text-align: left;
        }
        button{
            margin-bottom: 60px;
            color: #fff;
            font-size: 32px;
            background: #ff4d2f;
            width: 490px;
            height: 88px;
            border-radius: 88px;
        }
    }     
}
</style>