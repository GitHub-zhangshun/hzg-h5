<template>
    <div class="safe">
        <div class="banner">
            <img src="@/assets/images/Information_disclosure/banner1.png" alt="banner">
        </div>
        <div class="supervision">
            <header>
                <div class="left"><img src="@/assets/images/Information_disclosure/left.png" alt="左边"></div>
                <span>监督管理</span>
                <div class="right"><img src="@/assets/images/Information_disclosure/right.png" alt="左边"></div>
            </header>
            <div class="content">
                <div class="list">
                    <img width="100%;" src="@/assets/images/Information_disclosure/cunguan.png">
                </div>
                <div class="font">
                    <p>银行存管 资金去向可查</p>
                    <p>和掌柜与陕坝银行合作的银行存管系统，实现资金分账管理，资金去向可追踪。</p>
                </div>
            </div>
            <div class="content">
                <div class="fontInfo">
                    <p>实名认证</p>
                    <p>和掌柜进行实名校验认证，多重手段核查借贷双方身份信息</p>
                </div>
                <div class="listInfo">
                    <img src="@/assets/images/Information_disclosure/toumin.png">
                </div>                
            </div>
            <div class="content">
                <div class="list">
                    <img src="@/assets/images/Information_disclosure/shimin.png">
                </div>
                <div class="font">
                    <p>小额分散</p>
                    <p>和掌柜出借项目主要以小额借款项目为主，严格按照《网络借贷信息中介机构业务活动管理暂行办法》的规定执行：同一自然人在和掌柜平台的借款余额上限不超过人名币20万元；同一法人或其他组织在和掌柜平台的借款余额上限不超过人民币100万元。</p>
                </div>
            </div>
        </div>
        <!-- <div class="control">
            <header>
                <div class="left"><img src="@/assets/images/Information_disclosure/left.png"></div>
                <span>严格风控</span>
                <div class="right"><img src="@/assets/images/Information_disclosure/right.png"></div>
            </header>
            <div class="controlContent">
                <div class="left">
                    <div class="leftImg"><img src="@/assets/images/Information_disclosure/fenkon.png"></div>                    
                </div>
                <ul class="right">
                    <li>
                        <h1><i class="icon iconfont icon-lingxing"></i>严格风控</h1>
                        <p>平台标的经多重审核，无抵押不贷款，足额抵/质押 ，有效降低坏账风险。</p>
                    </li>
                    <li>
                        <h1><i class="icon iconfont icon-lingxing"></i>项目透明</h1>
                        <p>所有标的一一对应，信息披露公开透明 ，保障标的真实性。</p>
                    </li>
                    <li>
                        <h1><i class="icon iconfont icon-lingxing"></i>小额分散</h1>
                        <p>产品主要以小额借款标的为主，在分散出借时能有效降低风险。</p>
                    </li>
                </ul>
            </div>
        </div> -->
        <div class="security">
            <header>
                <div class="left"><img src="@/assets/images/Information_disclosure/left.png"></div>
                <span>技术保障</span>
                <div class="right"><img src="@/assets/images/Information_disclosure/right.png"></div>
            </header>
            <div class="securityContent">
                <ul>
                    <li>
                        <div class="left">
                            <div><img src="@/assets/images/Information_disclosure/baozhang1.png" ></div>
                        </div>
                        <p class="right">
                            和掌柜严格按照国家相关法律法规要求，进行平台数据信息加密保管，保障信息安全。
                        </p>
                    </li>
                    <li>
                        <div class="left">
                            <div><img src="@/assets/images/Information_disclosure/baozhang2.png" ></div>
                        </div>
                        <p class="right">
                            和掌柜系统均为自主研发，配置完善防黑体系及灾备系统，符合国家标准要求。
                        </p>
                    </li>
                    <li>
                        <div class="left">
                            <div><img src="@/assets/images/Information_disclosure/baozhang3.png" ></div>
                        </div>
                        <p class="right">
                            用户每一笔交易与还款操作均有存证和具有法律效力， 所有出借也都有免证效力的电子合同。
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
.safe{
    .banner{
        width: 750px;
        height: 360px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .supervision,
    .control,
    .security{
        background: #fff;
        margin-bottom: 20px;
        header{
            display: flex;
            justify-content: center;
            padding-top: 80px;
            padding-bottom: 72px;
            align-items: center;
            .left,.right{
                width: 88px;
                height: 14px;               
                img{
                    width: 100%;
                    height: 100%;
                    vertical-align: top;

                }
            }
            span{
                padding: 0 20px;
                font-size: 46px;
                color: #45b8ee;
            }
        }        
    }
    .supervision{
        .content{
            display: flex;
            padding: 0 40px 80px;
            .list{
                width: 200px;
                height: 185px;
                margin: 0 20px;
               img{
                   width: 100%;
                   height: 100%;
               }
            }
            .listInfo{
                width: 230px;
                height: 187px;
                text-align: center;
                padding: 0 27px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .fontInfo{
                flex: 1;
                p:nth-of-type(1){
                    font-size: 32px;
                    color: #333;
                    padding-bottom:26px; 
                }
                p:nth-of-type(2){
                    font-size: 28px;
                    color: #848a93;
                    line-height: 1.5
                }
            }
            .font{
                flex:1;
                p:nth-of-type(1){
                    font-size: 32px;
                    color: #333;
                    padding-bottom:26px; 
                }
                p:nth-of-type(2){
                    font-size: 28px;
                    color: #848a93;
                    line-height: 1.5;
                }
            }
        }
    }
    .control{
        .controlContent{
            padding-right: 40px;
            display: flex;
            div{
                padding-right: 15px;
                .leftImg{
                    width: 255px;
                    height: 317px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            
            .right{
                flex: 1;
                li{
                    h1{
                        font-size: 32px;
                        color: #333;
                        padding-bottom: 20px;
                        i{
                            font-size: 12px;
                            color: #878B94;
                            vertical-align: middle;
                        }
                    }
                    p{
                        font-size: 28px;
                        color: #848a93;
                        line-height: 1.5;
                        padding-bottom: 40px;
                    }
                }
                li:last-child{
                    padding-bottom: 70px;
                }
            }
        }
    }
    .security{
        .securityContent{
            padding: 0 40px 70px;
            ul{
                li{
                    display: flex;
                    margin-bottom: 20px;
                    .left{
                        div{
                            width: 260px;
                            height: 200px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .right{
                        flex: 1;
                        padding: 26px 30px 0;
                        background: #F1FAE9;
                        font-size: 28px;
                        color: #848a93;
                        line-height: 1.5;
                        font-weight: bold;
                    }
                }
                li:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>