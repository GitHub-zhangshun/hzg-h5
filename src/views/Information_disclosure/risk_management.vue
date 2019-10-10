<template>
    <div class="risk">
        <header><span>风险管理构架</span></header>
        <div class="Managementarchitecture">
            <img src="../../assets/images/Information_disclosure/Managementarchitecture.png" alt="风险管理构架">
        </div>
        <header><span>风险评估流程</span></header>
        <div class="Riskassessment">
            <img src="../../assets/images/Information_disclosure/Riskassessment.png" alt="风险评估流程">
        </div>
        <header><span>风险预警管理情况</span></header>
        <div class="RiskWarining">
            <ul>
                <li>
                    <div>
                        <img src="../../assets/images/Information_disclosure/Pre-loanapproval.png" alt="贷前审批">
                    </div>
                    <div>
                        <p>贷前审批</p>
                        <p>风险评估，信用评分/评级，预审/复审</p>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="../../assets/images/Information_disclosure/Creditreview.png" alt="贷中复查">
                    </div>
                    <div>
                        <p>贷中复查</p>
                        <p>尽职调查，限额管理</p>
                    </div>
                </li>
                <li>
                    <div>
                        <img src="../../assets/images/Information_disclosure/Post-loanmanagement.png" alt="贷后管理">
                    </div>
                    <div>
                        <p>贷后管理</p>
                        <p>贷后检查，风险监测，催收管理</p>
                    </div>
                </li>
            </ul>
        </div>
        <header><span>催收方式</span></header>
        <div class="away">
            <span>早期催收</span>
            <div>
                <img src="../../assets/images/Information_disclosure/Arrow.png" alt="">
            </div>
            <span>中期催收</span>
            <div>
                <img src="../../assets/images/Information_disclosure/Arrow.png" alt="">
            </div>
            <span>委外催收</span>
            <div>
                <img src="../../assets/images/Information_disclosure/Arrow.png" alt="">
            </div>
            <span>法律诉讼</span>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
.risk{
    margin-top: 20px;    
    header{  
        background: #fff;      
        line-height: 100px;
        border-bottom: 1px solid #F0F1F3;    
        span{
            color:#34373C;
            border-left: 4px solid #323232;
            padding-left: 40px; 
            font-weight: bold;
            font-size: 30px;
        }
    }
    .Managementarchitecture,
    .Riskassessment,
    .RiskWarining,
    .away{
        background: #fff;
        margin-bottom: 20px;
    }
    .Managementarchitecture{
        padding: 60px 76px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .Riskassessment{
        padding: 60px 35px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .RiskWarining{
        ul{
            li{
                padding: 60px 0 0 56px;
                display: flex;
                div:nth-of-type(1){
                    margin-right: 38px;
                    width: 100px;
                    height: 100px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                &>div:nth-of-type(2){
                    padding-top: 10px;
                    color:#8F919B;  
                    font-size: 28px; 
                    p:nth-of-type(1){
                        margin-bottom: 19px;
                        color:#373737;
                    }
                }
            }
        }

    }
    .away{
        padding: 60px 40px;
        display: flex;
        align-items: center;
        span{
            font-size: 24px;
            width: 130px;
            height: 60px;
            background: #E0634F;
            color:#fff;
            border-radius: 10px;
            line-height: 60px;
            text-align: center;
        }
        div{
            padding:  0 12px;
            width: 26px;
            height: 26px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        
    }
}
</style>