<template>
<!-- 充值结果 -->
    <div class="recharge_result">
        <div class="img">
            <img src="@/assets/images/my/succeed.png" alt="">
        </div>
        
        <p>充值成功</p>
        <div class="btn">
            <van-button plain type="primary" @click="$router.push('/product_list?type=product_list')">立即出借</van-button>
            <van-button plain type="primary" @click="$router.push('/my')">查看账户</van-button>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant';
    export default {
        components:{
            'van-button':Button
        },
    }
</script>

<style scoped lang="less">
.recharge_result{
    display: flex;
    flex-flow: column;
    align-items: center;
    .img{
        margin-top: 152px;
        margin-bottom: 38px;
        width: 140px;
        height: 140px;
        img{
            width: 100%;
            height: 100%;
            
        }
    }
    
    p{
        font-size: 30px;
    }
    .btn{
        padding-top: 122px;
        button{ 
            height: 86px;
            width: 318px;
            border-radius: 10px;
        }
        button:nth-of-type(1){
            border: 2px solid #ff4e3c;
            margin-right: 32px;
            color:#ff4e3c;
        }
        button:nth-of-type(2){
            border: 2px solid #d0d2d7;
            color:#000;
        }
        button:active::before{
            opacity: 0;
        }
    }
}
</style>