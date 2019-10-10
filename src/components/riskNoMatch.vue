<template>
   <van-dialog v-model="riskNoMatch" :lock-scroll='true' :show-confirm-button='false'>
        <i class="icon iconfont icon-guanbi" @click='closeClick'></i>
        <div><img src="../assets/images/my/riskNoMatch.png"></div>
        <h1>风险测评提示</h1>
        <p> 您当前的风险测评结果为{{riskLevelTxt}}，该产品须出借人的风险测评等级为{{biaoRiskLevelTxt}}及以上才能出借，您可以重新测评后进行出借。</p>
        <button @click='open'>去测评</button>
    </van-dialog>
</template>

<script>
import { indexApi } from '@/api/mine'
    export default {
        data() {
            return {
                riskNoMatch:true,
            };
        },
        props:{
            riskLevelTxt:String,
            biaoRiskLevelTxt:String
        },
        mounted(){
        },
        methods: {
            closeClick(){
                this.$emit('RiskNoMatchShow',false)
            },
            open(){
                indexApi.investorRiskEvaluateCount()
                .then((data)=>{
                    if(data.result==0){
                        this.$router.push({path:"/riskResult",query:{type:1}})
                    }else{
                        //页面跳转
                        this.$router.push({path:"/goRisk",query:{type:1}})
                    }
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