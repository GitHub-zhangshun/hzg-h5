<template>
<!-- 提现结果 -->
    <div class="withdrawal_index_result">
        <div class="img">
            <img src="@/assets/images/my/succeed.png" alt="">
        </div>
        
        <p>您已成功提交提现申请</p>
        <span>预计24小时内到账，具体到账时间以银行为准</span>
        <van-button @click="$router.push('/my')">完成</van-button>
    </div>
</template>

<script>
import { Button } from 'vant';
    export default {
        components:{
            'van-button':Button
        }
    }
</script>

<style scoped lang="less">
.withdrawal_index_result{
    display: flex;
    flex-flow: column;
    align-items: center;
    .img{
        margin-top: 152px;
        width: 140px;
        height: 140px;
        margin-bottom: 38px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    
    p{
        font-size: 30px;
    }
    span{
        font-size: 26px;
        color: #858c91;
        padding-bottom: 82px;
        padding-top: 30px;
    }
    button{
        width: 670px;
        height: 90px;
        background: #ff4e30;
        color: #fff;
        border-radius: 10px;
    }
}
</style>