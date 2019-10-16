<template>
    <div class="company">
        <header><span>工商信息</span></header>
        <ul class="companyInfo">
            <li>
                <p>公司全称</p>
                <p>成都融证通互联网信息服务有限公司</p>
            </li>
            <li>
                <p>公司简称</p>
                <p>成都融证通</p>
            </li>
            <li>
                <p>统一社会信用代码</p>
                <p>91510100332085768U</p>
            </li>
            <li>
                <p>公司注册资本 </p>
                <p>5000万</p>
            </li>
            <li>
                <p>公司实缴注册资本</p>
                <p>1000万</p>
            </li>
            <li>
                <p>公司注册地</p>
                <p>中国（四川）自由贸易试验区四川省成都市天府新区天府大道南段2028号石化大厦15楼1、2号</p>
            </li>
            <li>
                <p>公司经营地</p>
                <p>四川省成都市双流区天府大道南段2028号石化大厦15楼</p>
            </li>
            <li>
                <p>公司成立时间</p>
                <p>2015年4月16日</p>
            </li>
            <li>
                <p>公司经营期限</p>
                <p>2015年4月16日至永久</p>
            </li>
            <li>
                <p>公司经营状态</p>
                <p>开业</p>
            </li>
            <li>
                <p>公司法定代表人</p>
                <p>林育雄</p>
            </li>
            <li>
                <p>公司经营范围</p>
                <p>信息技术咨询服务；数据处理；计算机技术开发、技术咨询；计算机系统集成服务。<span style="color:#888f97">（依法须经批准的项目，经相关部门批准后方可开展经营活动）</span> </p>
            </li>
            <li>
                <p>联系方式</p>
                <p>地址：四川省成都市天府大道南段2028号石化大厦15层 <br> 电话：400-020-0178 <br> 邮编：610093</p>
            </li>
            <li>
                <p>分支机构</p>
                <p>无</p>
            </li>
            <li>
                <p>股东构成及占比</p>
                <p>四川朗然科技有限公司持有100%工商股份</p>
            </li>
        </ul>
        <header><span>组织架构</span></header>
        <div class="organization_chart">
            <img src="@/assets/images/Information_disclosure/Architecture.png" alt="组织架构">
        </div>
        <header><span>从业人员概况</span></header>
        <div class="cicle">
            <div class="chart">
                <ve-ring :data="chartData1" :colors="color" :settings="chartSettings" height="100%" :tooltip-visible="false" :legend-visible="false"><span class="centerTitle">年龄分布</span></ve-ring>
            </div>
            <div class="identifying">
                <h1>人员总数：37人</h1>
                <ul>
                    <li>
                        <span style="background:#E0634F"></span>
                        <span>20-25岁，12人</span>
                    </li>
                    <li>
                        <span style="background:#E98F85"></span>
                        <span>26-30岁，16人</span>
                    </li>
                    <li>
                        <span style="background:#F8C0B6"></span>
                        <span>30岁以上，9人</span>
                    </li>
                </ul>
            </div>
        </div>
        <header><span>企业高管介绍</span></header>
        <ul class="companyInfo">
            <li>
                <p>法定代表</p>
                <p>林育雄，毕业于北京语言学院，20多年金融行业从业经验，先后曾任深圳中国银行和深圳光大银行主管。</p>
            </li>
            <li>
                <p>监事</p>
                <p>郭安顺，担任过山西省朔州市长华商贸有限公司总经理，有着丰富的管理经验，精通企业管理</p>
            </li>
            <li>
                <p>总经理</p>
                <p>李锦荣，担任过东莞市创荣金属制品有限公司总经理、长扬能源科技有限公司，精通企业管理、营销推广和团队管理经验。</p>
            </li>
            <li>
                <p>风控总监</p>
                <p>秦晓龙，毕业于北京广播电视大学，曾担任过北京伯恩天下信息科技有限公司风控总监、北京京东世纪贸易有限公司风控总监。擅长前中后台管理和研发工作。</p>
            </li>
            <!-- <li>
                <p>技术总监</p>
                <p>黄翔，毕业于四川广播电视大学，前万旗控股CTO、掌寻天下副总经理，搜淘网络、成都利巨人网络CTO，主持开发战略级技术创新产品20项，平台应用级产品10项，擅长人工智能、大数据、应用研发等技术领域；熟悉相关政策法规和数据化运营管理。</p>
            </li> -->
            <!-- <li>
                <p>财务经理</p>
                <p>罗娇，毕业于四川财经职业学院，精通公司全盘帐务处理。</p>
            </li> -->
        </ul>
        <header><span>4.渠道信息</span></header>
        <ul class="companyInfo">
            <li>
                <p>公司官方网址</p>
                <p>www.cd-rzt.com</p>
            </li>
            <li>
                <p>网站或平台上线运营时间</p>
                <p>2015年5月6日</p>
            </li>
            <li>
                <p>APP名称</p>
                <p>和掌柜金融</p>
            </li>
            <li>
                <p>公众号</p>
                <div>
                    <div>
                        <img src="@/assets/images/Information_disclosure/code.png" alt="">
                    </div>
                </div>
            </li>
            <li>
                <p>咨询、投诉、举报联系电话</p>
                <p>400-020-0178</p>
            </li>
            <li>
                <p>咨询、投诉、举报电子邮箱</p>
                <p>service@139lc.com</p>
            </li>
            <li>
                <p>咨询、投诉、举报通讯地址</p>
                <p>四川省成都市天府大道南段2028号石化大厦15层</p>
            </li>
        </ul>
        
        <!-- <header><span>股东信息</span></header>
        <div class="shareholder_info">
            <div class="info">四川朗然科技有限公司持有100%比例股份</div>
            <span>（工商控股）</span>
            <div class="info_img">
                <img src="@/assets/images/Information_disclosure/jiantou1.png" alt="向下箭头">
            </div>
            <div class="info">成都融证通互联网信息服务有限公司</div>
        </div>         -->
        
        <!-- <header><span>平台信息</span></header>
        <ul class="platform_informatiom">
            <li>公司官方网址：<span>www.139lc.com</span></li>
            <li>网站或平台上线运营时间：<span>2015年5月6日</span></li>
            <li>APP名称：<span>和掌柜</span></li>
            <li>公众号：<span>和掌柜金融</span></li>
            <li>咨询、投诉、举报联系电话：<span>400-020-0178</span></li>
            <li>咨询、投诉、举报电子邮箱：<span>service@139lc.com</span></li>
            <li>咨询、投诉、举报通讯地址：<span>四川省成都市双流区天府大道南段2028号石化大厦15楼</span></li>
        </ul> -->
        <header><span>重大事项</span></header>
        <ul class="big_issues">
            <li>
                <p>减资、合并、分立、解散或者申请破产</p>
                <p>无</p>
            </li>
            <li>
                <p>破产程序</p>
                <p>无</p>
            </li>
            <li>
                <p>停业、整顿、关闭</p>
                <p>无</p>
            </li>
            <li>
                <p>从业机构受到刑事处罚</p>
                <p>无</p>
            </li>
            <li>
                <p>重大诉讼或者仲裁事项</p>
                <p>无</p>
            </li>
            <li>
                <p>公司法定代表人、持股5%以上的股东、实际控制人、主要负责人、董事、监事、高级管理人员的变更信息</p>
                <p>无</p>
            </li>
            <li>
                <p>法定代表人、持股5%以上的股东、实际控制人、主要负责人、董事、监事、高级管理人员涉及的重大诉讼、仲裁</p>
                <p>无</p>
            </li>
            <li>
                <p>主要或全部业务陷入停顿</p>
                <p>无</p>
            </li>
            <li>
                <p>损害出借人利益等重大事项</p>
                <p>无</p>
            </li>
        </ul>
        <header><span>资质执照</span></header>
        <div class="company_img">
            <swiper :options="swiperOption">
                <swiper-slide><div><img class="previewer-demo-img" src="@/assets/images/Information_disclosure/map2.png" @click="show(0)"></div></swiper-slide>  
            </swiper>
        </div>
        <div v-transfer-dom>
            <previewer :list="list" ref="previewer"></previewer>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Previewer, TransferDom } from 'vux'
    export default {
        directives: {            
            TransferDom
        },
        data () {
            this.chartSettings = {
                area: true,
                label:"false",
                radius: [50, 70],
                offsetY: 100
            }
            return {
                color:['#E0634F','#E98F85','#F8C0B6'],
                chartData1: {
                    columns: ['年龄区间', '人数'],
                    rows: [
                        { '年龄区间': '20-25', '人数': 12 },
                        { '年龄区间': '26-30', '人数': 16 },
                        { '年龄区间': '30以上', '人数': 9 },
                    ]
                },
                swiperOption: {
                    slidesPerView: 1.6,
                    spaceBetween: 20,
                    freeMode: true,
                    centeredSlides: true,
                },
                list:[{src:require('@/assets/images/Information_disclosure/map2.png')}]
            }
        },
        components: {
            swiper,
            swiperSlide,
            Previewer
        },
        methods:{
            show (index) {
                this.$refs.previewer.show(index)
            }
        },
    }
</script>

<style scoped lang="less">
.company{
    header{    
        margin-top: 20px;    
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
    .companyInfo{
        background: #fff;
        padding: 0 20px 20px;
        li{
            font-size: 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 26px 0;
            p:nth-of-type(1){
                padding: 0 20px;
                width: 185px;
                line-height: 1.5;
                color:#888f97;
            }
            p:nth-of-type(2){
                flex: 1;
                text-align: left;
                line-height: 1.5;
            }
            &>div{
                flex: 1;
                div{
                    width: 194px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        li:nth-of-type(2n){
            background-color: #f8f7f5;
        }
    }
    .company_img{
        text-align: center;
        padding: 60px 0 60px;
        background: #fff;
        &>.swiper-container{
            .swiper-wrapper{
                .swiper-slide{
                    &>div{
                        margin: 0 auto;  
                        width: 400px;
                        img{
                            width: 100%;
                        }
                    }
                    // p{
                    //     line-height: 120px;
                    //     font-size: 30px;
                    // }
                }
            }
        }       
    }
    .shareholder_info{
        background: #fff;
        padding: 80px 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content:center;
        .info{
            font-size: 30px;
            color: #fff;
            padding: 30px;
            border-radius: 40px;
            background: #E0634D;
        }
        span{
            
            padding: 24px 0;
            font-size: 28px;
            color: #333;
        }
        .info_img{
            padding-bottom: 24px;
            width: 38px;
            height: 52px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .organization_chart{
        padding: 40px;
        background: #fff;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .cicle{
        position: relative;
        background: #fff;
        .chart{
            width: 376px;
            height: 376px;
            .ve-ring{
                position: relative;
                .centerTitle{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-40%);
                    text-align: center;
                    font-size: 28px;
                    line-height: 1.3;
                }
            }
        }   
        .identifying{
            position: absolute;
            right: 100px;
            top: 100px;
            h1{
                font-size: 28px;
                line-height: 50px;
            }
            ul{               
                li{
                    display: flex;
                    align-items: center;
                    span:nth-of-type(1){
                        width: 13px;
                        height: 13px;
                        background: red;
                        border-radius: 100%;
                        vertical-align: middle;
                        margin-right: 18px;
                    }
                    span:nth-of-type(2){
                        font-size: 26px;
                        line-height: 2;
                        color:#87898E;
                    }
                }
            }
        }
        
    }  
    .platform_informatiom{
        background: #fff;
        padding: 40px;
        li{
            line-height: 2;
            font-size: 28px;
            color:#9395A0;  
            span{
                color: #333;
            }
        }
    }  
    .big_issues{
        background: #fff;
        padding: 40px;
        li{
            font-size: 28px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            p:nth-of-type(1){
                width: 90%;
                line-height: 2;
            }
            p:nth-of-type(2){
                color:#888E98;
            }
        }
        li:nth-of-type(2n){
            background: #F8F7F5;
        }
    } 
}
.swiper-container{
    z-index: 0;
}
// /deep/.pswp{
//     z-index: 3
// }
// /deep/.swiper-wrapper{
//     z-index: 0;
// }
</style>