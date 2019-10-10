<template>
    <div class="bank_depository">
        <div class="banner">
            <img src="@/assets/images/Information_disclosure/banner3.png" alt="banner">
        </div>
        <div class="banner_info">
            <p>2019年10月,和掌柜与陕坝银行合作的银行存管系统正式上线。</p>
            <div>
                <img class="previewer-demo-img" v-for="(item, index) in list" :key="index" :src="item.src" width="100" @click="show(index)">
            </div>
            
        </div>
        <div class="contain">
            <div class="mode">
                <header>
                    <div><img src="@/assets/images/Information_disclosure/icon.png" alt="和掌柜银行存管模式"></div>
                    <p>陕坝银行简介</p>
                </header>
                <div class="JC_info">
                    <p>陕坝农商银行是拥有六十多年发展历史，历经两次体制改革组建的股份制商业银行，总部位于内蒙古自治区巴彦淖尔市杭锦后旗陕坝镇。目前下设34家支行，在辖区各行政村设立107个助农服务点，实现助农金融全覆盖，填补农牧区金融服务空白。陕坝农商银行已成为杭锦后旗地区营业网点最多、覆盖面最广、服务客户总量最多的金融机构</p>
                    <p>长期以来，陕坝农商银行深入贯彻落实国家普惠金融、绿色金融理念，坚持“立足社区、面向三农、服务小微”的市场定位，致力于打造“三支银行”。近三年，各项存款增幅保持在25%以上，2016年末全行资产规模突破68亿元，不良贷款率控制在监管要求指标内。陕坝农商银行已经发展成为内蒙古地区一家成长性良好、支持地方经济贡献突出的金融机构。</p>
                </div>                
            </div>
            <div class="mode">
                <header>
                    <div><img src="@/assets/images/Information_disclosure/icon.png" alt="和掌柜银行存管模式"></div>
                    <p>为什么要银行存管？</p>
                </header>
                <div class="JC_info">
                    <p>银行存管是衡量P2P网贷平台是否合规的硬性指标。</p>
                    <p>依据2016年8月24日银监会、工信部、公安部、网信办联合公布的《网络借贷信息中介机构业务活动管理暂行办法》要求，需要互联网金融平台与银行业金融机构对接，对平台资金进行银行存管，具体做法是互联网金融平台在银行业金融机构开设独立账户，用于存放用户的交易资金，银行业金融机构根据用户的指令、合同内容，对用户的交易与资金流水进行划拨和簿记。</p>
                </div>                
            </div>
            <!-- <div class="mode">
                <header>
                    <div><img src="@/assets/images/Information_disclosure/icon.png" alt="和掌柜为什么接入银行存管？"></div>
                    <p>和掌柜为什么接入银行存管？</p>
                </header>
                <div class="hf_why">                    
                    <div class="hf_why_img">
                        <div>
                            <img src="@/assets/images/Information_disclosure/Supervision.png" alt="符合监管要求">
                        </div>
                        <p>符合监管要求</p>                       
                    </div>
                    <p>
                        银行存管是衡量P2P网贷平台是否合规的硬性指标。<br>
                        依据2016年8月24日银监会、工信部、公安部、网信办联合公布的《网络借贷信息中介机构业务活动管理暂行办法》要求，需要互联网金融平台与银行业金融机构对接。对平台资金进行银行存管，具体做法是互联网金融平台在银行业金融机构开设独立账户，用于存放用户的交易资金，银行业金融机构根据用户的指令、合同内容，对用户的交易与资金流水进行划拨和簿记，以保障用户的资金安全。
                    </p>
                    <div class="hf_why_img">
                        <div>
                            <img src="@/assets/images/Information_disclosure/Funds.png" alt="保障用户资金安全">
                        </div>
                        <p>保障用户资金安全</p>                       
                    </div>
                    <p>存管的核心原理是将平台和用户资金进行隔离，用户的资金不再进入平台控制的账户，借款人和出借人之间的交易发生在双方的银行账户之间，平台无法触碰用户资金。</p>
                </div>
            </div> -->
            <div class="mode">
                <header>
                    <div><img src="@/assets/images/Information_disclosure/icon.png" alt="银行存管对用户的好处"></div>
                    <p>银行存管对用户的好处</p>
                </header>
                <ul class="safe">
                    <li>
                        <div>
                            <img src="@/assets/images/Information_disclosure/Securityoffunds.png" alt="资金安全隔离，用户更放心平台资金">
                        </div>
                        <div>
                            <p>资金隔离</p>
                            <p>和用户资金有效隔离，平台不能触碰用户资金。</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src="@/assets/images/Information_disclosure/Real.png" alt="用户授权操作，资金安全有保障">
                        </div>
                        <div>
                            <p>用户授权</p>
                            <p>银行必须根据用户授权操作指令才能进行资金划转。</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src="@/assets/images/Information_disclosure/Transactiontruth.png" alt="交易真实可查，资金流向更透明">
                        </div>
                        <div>
                            <p>交易透明</p>
                            <p>银行根据合同约定及用户发出的交易指令，对交易流程进行管理并记录用户资金流水，交易可查。</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mode">
                <header>
                    <div><img src="@/assets/images/Information_disclosure/icon.png" alt="和掌柜银行存管模式"></div>
                    <p>和掌柜银行存管模式？</p>
                </header>
                <div class="hfIMG">
                    <img src="@/assets/images/Information_disclosure/bg2.png" alt="和掌柜银行存管模式">
                </div>
            </div>
        </div>
        <div v-transfer-dom>
            <previewer :list="list" ref="previewer"></previewer>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Previewer
        },
        methods: {
            show (index) {
                this.$refs.previewer.show(index)
            }
        },
        data () {
            return {
                list: [{
                    src: require('@/assets/images/Information_disclosure/map1.jpg'),
                }],
            }
        }        
    }
</script>

<style scoped lang="less">
.bank_depository{
    .banner{
        img{
            width: 100%;
        }
    }
    .banner_info{
        background: #fff;
        padding: 44px 40px;
        p{
            font-size: 28px;
            color: #848a93;
            line-height: 1.5;
            text-indent: 1em;
            text-align: justify;
        }
        &>div{
            padding: 30px 20px 0;
            img{
                width: 100%;
            }
        }
        
    }
    .contain{         
        .mode{
            margin-top: 20px;
            background: #fff;       
            header{
                display: flex;
                align-items: center;
                line-height: 100px;
                margin: 0 40px;
                border-bottom: 1px solid #F0F1F3;
                div{
                    padding-right: 12px;
                    width: 26px;
                    img{
                        width: 100%;
                    }
                }
                p{
                    font-size: 32px;
                    color: #333;
                }
            }
            .JC_info{
                padding: 40px;
                p{
                    text-indent: 2em;
                    font-size: 28px;
                    text-align: justify;
                    color:#848a93;
                    line-height:1.5
                }
            }
            .hfIMG{
                padding: 60px 32px;
                img{
                    width: 100%;
                }
            }
            .hf_why{
                padding: 40px;
                .hf_why_img{
                    display: flex;
                    align-items: center;
                    &>div{
                        width: 37px;
                        padding-right: 20px;
                        img{
                            width: 100%;
                        }
                    }
                    p{

                        font-size: 28px;
                        color: #333;
                        font-weight: bold;
                    }
                }
                &>p{
                    padding: 30px 0 60px 57px;
                    font-size: 28px;
                    color: #848a93;
                    text-align: justify;
                    line-height: 1.5;
                }
            }
            .safe{
                background: #fff;
                &>li{
                    padding: 56px 54px 0;
                    display: flex;
                    &>div:nth-of-type(1){
                        width: 100px;
                        margin-right: 36px;
                        img{
                            width: 100%;
                        }
                    }
                    div:nth-of-type(2){
                        flex: 1;
                        font-size: 28px;
                        line-height: 1.5;
                        p:nth-of-type(1){                            
                            color: #333;
                            font-weight: bold;
                        }
                        p:nth-of-type(2){
                            color: #848a93;
                        }
                    }
                }
                &>li:last-child{
                    padding-bottom: 56px;
                }
            }
        }
    }
}
.pswp__button{
    width: 100px;
    height: 100px;
}
/deep/.pswp__counter{
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    transform:translateX(-50%);
}
/deep/.pswp__button{
    display: none;
}
/deep/.pswp__top-bar{
    background: transparent;
}
</style>