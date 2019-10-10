<template>
    <div>
        <div class="headImg"><img :src="imgUrl"></div>
        <p class="garde">您的风险测评等级为</p>
        <h1>{{riskLevelTxt}}</h1>
        <p class="contain">{{riskLevelRemark}}</p>
        <button class="goBorrow" @click="$router.push('/product_list')">前往出借</button>
        <button class="again" @click="$router.push({path:'/goRisk',query:{type:2}})" v-if="showBtn">重新测评</button>
        <div class="coount">{{lable}}</div>
    </div>
</template>

<script>
import {indexApi} from '@/api/mine'
    export default {
        data(){
            return{
                riskLevelTxt:'',
                riskLevelRemark:'',
                imgUrl:"",
                showBtn:false,
                result:'',    
                lable:'',
                button:''        
            }
        },
        async created(){
            //当前时间
            let data = new Date()
            let presentFirstDay = data.getFullYear()
            let startTime = new Date(`${presentFirstDay}-01-01 00:00:00`).getTime()
            let endTime = data.getTime()
            if(localStorage.getItem('token')){
                indexApi.investorCurrent().then(data=>{
                    this.riskLevelTxt = data.result.user.riskLevelInfo.riskLevelTxt;
                    this.riskLevelRemark = data.result.user.riskLevelInfo.riskLevelRemark
                    switch (data.result.user.riskLevelInfo.riskLevelSimplify){
                        case "risk_level_steady":
                        this.imgUrl = require("../../../assets/images/my/steady.png")
                        break;
                        case "risk_level_keep":
                        this.imgUrl = require("../../../assets/images/my/Conservatism.png")
                        break;
                        case "risk_level_active":
                        this.imgUrl = require("../../../assets/images/my/positive.png")
                        break;
                    }
                })
            }else{
                this.$router.push('/verification_code_login')
            }          
            await indexApi.investorRiskEvaluateCount(startTime,endTime).then(data=>{
                if(data.result>0){
                    this.lable = `您今年还可以测试${data.result}次`
                    this.showBtn = true
                }else{
                    this.lable = `您今年的测评机会已用完，若有疑问请联系客服`
                    this.showBtn = false
                }
            })
        }
    }
</script>

<style scoped lang='less'>
div{
    padding-top: 30px;
    .headImg{
        width: 179px;
        height: 179px;
        margin: 0 auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .garde{
        padding:46px 0 24px 0;
        text-align: center;
        font-size: 26px;
        color: #848a93;
    }
    h1{
        text-align: center;
        font-weight: bold;
        font-size: 50px;
        color:#32363c;
        padding-bottom: 40px;
    }
    .contain{
        padding: 0 40px 60px;
        line-height: 1.8;
        font-size: 28px;
        color: #848a93;
    }
    .goBorrow{
        color:#fff;
        background: #ff4e30;
        width: 670px;
        height: 88px;
        margin: 0 auto 40px;
        font-size: 32px;
        border-radius: 10px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .again{
        border: 1px solid #ccc;
        color:#333;
        background: #fff;
        width: 670px;
        height: 88px;
        margin: 0 auto 40px;
        font-size: 32px;
        border-radius: 10px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
    .coount{
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color:#848a93;
        font-size: 24px;
        width: 100%;
    }
}
</style>