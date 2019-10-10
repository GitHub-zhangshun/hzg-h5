<template>
    <van-dialog v-model="riskShow" :lock-scroll='true' :show-confirm-button='false'>
        <i class="icon iconfont icon-guanbi" @click='closeClick'></i>
        <div><img src="../assets/images/my/risk.png"></div>
        <h1>风险测评提示</h1>
        <p>网络出借可能获得比较高的出借收益，但也存在比较大的出借风险，请您根据自身的风险承受能力，审慎作出出借决定。为了便于您了解自身的风险承受能力，选择合适的出借标的和服务，请您填写以下风险承受能力评估问卷。下列问题可协助评估您对出借标的和服务的风险承受能力，请您根据自身情况认真选择。评估结果仅供参考，不构成出借建议。为了及时了解您的风险承受能力，我们建议您持续做好动态评估。我们承诺对您的所有个人资料保密。</p>
        <button @click='open'>去测评</button>
    </van-dialog>
</template>

<script>
    export default {
        data() {
            return {
                riskShow:true,
            };
        },       
        methods: {
            closeClick(){
                this.$emit('RiskClose',false)
            },
            open(){
                //页面跳转
                this.$router.push({path:"/goRisk",query:{type:1}})
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
            padding: 60px 55px 30px;
            margin: 0 auto;
            border-bottom: none;
            text-align: center;
            width: 130px;
            height: 119px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        h1{
            font-size: 30px;
            font-weight: bold;
            color: #333;
            text-align: center;
        }
        p{
            margin: 36px 47px 60px;
            height: 306px;
            overflow-y:auto;
            color: #848a93;
            font-size: 26px;
            line-height: 1.5;
            text-align: left;
        }
        button{
            margin-bottom: 46px;
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