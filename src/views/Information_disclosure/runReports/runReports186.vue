<template>
    <!-- swiper -->
    <swiper :options="swiperOption">
        <swiper-slide>
            <div class="theme">
                <img src="@/assets/images/Information_disclosure/runReport/theme.png" alt="主题">
            </div>
            <p class="jiezhi">截至2018年09月05日</p>
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="floor">
                <img src="@/assets/images/Information_disclosure/runReport/floor_1.png" alt="背景">
                <div class="step">
                    <span>STEP 1</span>
                    <span>数据总览</span>
                </div>
                <div class="money">
                    <div class="money_img">
                        和掌柜累计成交额
                    </div>
                    2<span>亿</span>3426<span>万元</span>
                </div>
                <ul class="listTwo">
                    <li>
                        <div>
                            <div class="img">
                                <img src="@/assets/images/Information_disclosure/runReport/Income.png" alt="累计收益">
                            </div>
                            <p>累计为用户赚取收益</p>
                            <span></span>
                            <p>826<span>万元</span></p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div class="img">
                                <img src="@/assets/images/Information_disclosure/runReport/User.png" alt="累计收益">
                            </div>
                            <p>累计注册用户</p>
                            <span></span>
                            <p>4653246</p>
                        </div>
                    </li>
                </ul>                
            </div>    
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>        
        </swiper-slide>
        <swiper-slide>
            <div class="floor">
                <img src="@/assets/images/Information_disclosure/runReport/floor_2.png" alt="背景">
                <div class="step">
                    <span>STEP 2</span>
                    <span>业绩总览</span>
                </div>
                <div class="money">
                    <div class="money_img money_img_five">
                        2018年5月和掌柜累计成交额
                    </div>
                    21<span>亿</span>3426<span>万</span>5226<span>元</span>
                </div>  
                <div class="fbt">
                    <span>2018年5月和掌柜</span>
                    <span>成交地域分布图</span>
                </div>
                <div class="china_map">
                    <ve-map :data="chartData" :settings="chartSettings" :legend-visible="false"></ve-map>                    
                </div>
            </div>    
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="floor">
                <img src="@/assets/images/Information_disclosure/runReport/floor_3.png" alt="背景">  
                <div class="fbt fbt_qx">
                    <span>2018年5月和掌柜</span>
                    <span>不同期限标的成交额占比</span>
                </div>
                <div class="chart">
                    <ve-ring :data="chartData_ring" :colors='color' :settings="chart_ring" height="100%" :tooltip-visible="false" :legend-visible="false"><span class="centerTitle">成交额<br>占比</span></ve-ring>
                </div>
                <div class="identifying">
                    <ul>
                        <li>
                            <span style="background:#A83197"></span>
                            <p><span>180天以上，</span><span>9%</span></p>
                        </li>
                        <li>
                            <span style="background:#E030C6"></span>
                            <p><span>90-180天，</span><span>53%</span></p>
                        </li>
                        <li>
                            <span style="background:#F05EE2"></span>
                            <p><span>31-90天，</span><span>20%</span></p>
                        </li>
                        <li>
                            <span style="background:#FA9BEC"></span>
                            <p> <span>30天及以下，</span> <span>18%</span></p>
                        </li>
                    </ul>
                </div>
                <div class="fbt fbt_qx fbt_sy">
                    <span>2018年5月和掌柜</span>
                    <span>不同收益标的成交额占比</span>
                </div>
                <div class="chart chart_sy">
                    <ve-ring :data="chartData_sy" :colors='color_sy' :settings="chart_ring" height="100%" :tooltip-visible="false" :legend-visible="false"><span class="centerTitle">成交额<br>占比</span></ve-ring>
                </div>
                <div class="identifying identifying_sy">
                    <ul>
                        <li>
                            <span style="background:#E06552"></span>
                            <p><span>6%以下，</span><span>28.5%</span></p>
                        </li>
                        <li>
                            <span style="background:#F9ED1C"></span>
                            <p><span>6%-7%，</span><span>16%</span></p>
                        </li>
                        <li>
                            <span style="background:#32CDE9"></span>
                            <p><span>7%-9%，</span><span>27%</span></p>
                        </li>
                        <li>
                            <span style="background:#A43499"></span>
                            <p> <span>9%及以上，</span> <span>42.5%</span></p>
                        </li>
                    </ul>
                </div>
            </div>  
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="floor">
                <img src="@/assets/images/Information_disclosure/runReport/floor_4.png" alt="背景">
                <div class="step">
                    <span>STEP 3</span>
                    <span>用户总览</span>
                </div>
                <div class="money">
                    <div class="money_img money_img_people">
                        2018年5月和掌柜新增注册用户
                    </div>
                    4<span>万</span>3205<span>人</span>
                </div>
                <ul class="listTwo list_step_3">
                    <li>
                        <div>
                            <div class="chart_ring_3_left">
                                <ve-ring :data="chartData_ring_3_left" :colors='color_step_3_left' :settings="chart_ring_3_left" height="100%" :tooltip-visible="false" :legend-visible="false"></ve-ring>
                            </div>
                            <p>2.46%</p>
                            <span></span>
                            <p>最大单户投资额占比</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div class="chart_ring_3_right">
                                <ve-ring :data="chartData_ring_3_right" :colors='color_step_3_left' :settings="chart_ring_3_left" height="100%" :tooltip-visible="false" :legend-visible="false"></ve-ring>
                            </div>
                            <p>1.57%</p>
                            <span></span>
                            <p>最大10户投资额占比</p>
                        </div>
                    </li>
                </ul>                
            </div>    
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="floor">
                <img src="@/assets/images/Information_disclosure/runReport/floor_5.png" alt="背景">              
                <div class="sex">
                    <p>出借人年龄占比</p>
                </div>
                <div class="big_progress">
                    <div class="left_li">
                        <ul>
                            <li>25岁以下</li>
                            <li>25-35岁</li>
                            <li>36-50岁</li>
                            <li>50岁以下</li>
                        </ul>
                    </div>
                    <div class="center_progress">
                        <ul>
                            <li>
                                <div class="progress">
                                    <span style="background: #E0634F; width:12%"></span>
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span style="background: #F7F01B; width:32%"></span>
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span style="background: #33CEEA; width:18%"></span>
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span style="background: #A83199; width:28%"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="right_li">
                        <ul>
                            <li>12%</li>
                            <li>32%</li>
                            <li>18%</li>
                            <li>28%</li>
                        </ul>
                    </div>
                </div>
                <div class="sex sex_borrow">
                    <p>借款人年龄占比</p>
                </div>
                <div class="big_progress big_progress_borrow">
                    <div class="left_li">
                        <ul>
                            <li>25岁以下</li>
                            <li>25-35岁</li>
                            <li>36-50岁</li>
                            <li>50岁以下</li>
                        </ul>
                    </div>
                    <div class="center_progress">
                        <ul>
                            <li>
                                <div class="progress">
                                    <span style="background: #E0634F; width:12%"></span>
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span style="background: #F7F01B; width:32%"></span>
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span style="background: #33CEEA; width:18%"></span>
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span style="background: #A83199; width:28%"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="right_li">
                        <ul>
                            <li>12%</li>
                            <li>32%</li>
                            <li>18%</li>
                            <li>28%</li>
                        </ul>
                    </div>
                </div>
            </div>    
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="floor">
                <img src="@/assets/images/Information_disclosure/runReport/floor_5.png" alt="背景">              
                <div class="sex">
                    <p>出借人年龄占比</p>
                </div>
                <div>
                    
                </div>
                <div class="sex sex_borrow">
                    <p>借款人年龄占比</p>
                </div>

            </div>    
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            3
            <div class="jiantou">
                <img src="@/assets/images/Information_disclosure/runReport/drop_down.png" alt="向下箭头">
            </div>
        </swiper-slide>
        <swiper-slide>
            3
        </swiper-slide>
    </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            this.chart_ring_3_left = {
                hoverAnimation:false,
                legendHoverLink:false,
                area: true,
                label:"false",
                radius: [10, 40],
                offsetY: 40,
            }
            this.chart_ring = {
                hoverAnimation:false,
                legendHoverLink:false,
                area: true,
                label:"false",
                radius: [40, 60],
                offsetY: 62.5,
            }
            this.chartSettings = {
                position: 'china',
                label: false,
                itemStyle: {                   
                    normal: {
                        borderColor: '#fff',
                        areaColor:"#dedede",
                    },
                },
            }
            return {
                color: ['#A83197','#E030C6','#F05EE2','#FA9BEC'],
                color_sy: ['#E06552','#F9ED1C','#32CDE9','#A43499'],
                color_step_3_left :['#AA2C9C','#E0E0E0'],
                swiperOption: {
                    direction: 'vertical',
                    height :window.innerHeight,
                },
                //第五页最大单户投资额占比数据
                chartData_ring_3_left:{
                    columns: ['天数','占比'],
                    rows: [
                        {'天数': '','占比': 2.46,},
                        {'天数': '','占比': 97.54,},
                    ]
                },
                //第五页最大10户投资额占比数据
                chartData_ring_3_right:{
                    columns: ['天数', '占比'],
                    rows: [
                        { '天数': '', '占比': 1.57,},
                        { '天数': '', '占比': 98.43,},
                    ]
                },
                //第四页不同期限标的成交额占比数据
                chartData_ring: {
                    columns: ['天数', '占比'],
                    rows: [
                        { '天数': '180天以上', '占比': 9,},
                        { '天数': '90-180天', '占比': 53,},
                        { '天数': '31-90天', '占比': 20,},
                        { '天数': '30天及以下', '占比': 18,},
                    ]
                },
                //第四页不同收益标的成交额占比数据
                chartData_sy: {
                    columns: ['天数', '占比'],
                    rows: [
                        { '天数': '6%以下', '占比': 28.5,},
                        { '天数': '6%-7%', '占比': 16,},
                        { '天数': '7%-9%', '占比': 27,},
                        { '天数': '9%及以上', '占比': 42.5,},
                    ]
                },
                //第三页地图数据
                chartData: {
                    columns: ['位置', '人口', '面积'],
                    rows: [
                        { '位置': '吉林','人口': 123, '面积': 92134 },
                        { '位置': '北京','人口': 2123, '面积': 29234 },
                        { '位置': '上海','人口': 1243, '面积': 94234 },
                        { '位置': '浙江','人口': 5123, '面积': 29234 }
                    ]
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
    }
</script>

<style scoped lang="less"> 
.swiper-container{
    .swiper-wrapper{
        .swiper-slide{
            background-image: url('../../../assets/images/Information_disclosure/runReport/bg.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: relative;
            .theme{
                width: 95%;
                margin: 300px auto 350px;
                img{
                    width: 100%;
                }
            }
            .jiezhi{
                font-size: 32px;
                text-align: center;
                color: #000;
            }
            .jiantou{
                position: absolute;
                bottom:50px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                // margin: 30px auto 0;
                img{
                    width: 100%
                }
            }
            .floor{
                position: relative;
                width: 95%;
                top: 100px;
                margin: 0 auto;
                img{
                    width: 100%
                }
                .step{
                    position:absolute;
                    top: 30px;
                    display: flex;
                    width: 100%;
                    align-items: center;
                    span:nth-of-type(1){
                        width: 130px;
                        border-radius: 45px;
                        height: 45px;
                        font-size: 28px;
                        line-height: 45px;
                        color: #fff;
                        text-align: center;
                        display: inline-block;
                        background: #A83198;
                    }
                    span:nth-of-type(2){
                        display: inline-block;
                        flex: 1;
                        font-size: 40px;
                        color: #A83198;
                        padding-left: 150px;

                    }
                }
                .money{
                    position:absolute;
                    top: 180px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #FCF8F7;
                    border-radius: 100px;
                    box-shadow: 0 8px 10px 5px #F6E1E1;
                    width: 80%;
                    height: 180px;
                    font-size: 60px;
                    color: #A83198;
                    text-align: center;
                    line-height: 90px;
                    &>span{
                        font-size: 28px;
                    }
                    .money_img{
                        text-align: center;
                        line-height: 63px;
                        position: relative;
                        color: #fff;
                        font-size: 28px;
                        font-weight: normal;
                        top: -15px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 291px;
                        height: 63px;
                        background-image: url('../../../assets/images/Information_disclosure/runReport/circleRadios.png');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                    }
                    .money_img_five{
                        width: 390px;
                    }
                    .money_img_people{
                        width: 430px;
                    }
                }
                .listTwo{
                    position: absolute;
                    top: 450px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: space-between;
                    width: 598px;
                    li{
                        width: 276px;
                        border: 1px solid #E3E3E3;
                        &>div{                            
                            border-radius: 10px;
                            padding-top: 78px;
                            .img{
                                margin: 0 auto;
                                padding-bottom: 28px
                            }
                            p:nth-of-type(1){
                                font-size: 24px;
                                color: #989898;
                                text-align: center;
                                padding-bottom: 20px;
                            }
                            &>span{
                                border: 2px solid #A82F98;
                                width: 81px;
                                display: block;
                                margin: 0 auto;
                            }
                            p:nth-of-type(2){
                                padding-top: 20px;
                                font-size: 32px;
                                color: #A82F98;
                                text-align: center;
                                padding-bottom: 76px;
                                &>span{
                                    font-size: 24px;
                                }
                            }
                        }
                    }
                    li:nth-of-type(1){
                        &>div{
                            .img{
                                width: 80px;                               
                                img{
                                    width: 100%
                                }
                            }                           
                        }
                    }
                    li:nth-of-type(2){
                        &>div{
                            .img{
                                width: 63px;
                                img{
                                    width: 100%
                                }
                            }
                        }
                    }
                }
                .list_step_3{
                    li{
                        height: 386px;
                        &>div{
                            padding-top:54px; 
                            .chart_ring_3_left,
                            .chart_ring_3_right{
                                margin: 0 auto 28px;
                                width: 160px;
                                height: 160px;
                                /deep/.ve-ring{
                                    &>div{
                                        &>div{
                                            width: 160px!important;
                                            height: 160px!important;
                                            canvas{
                                                width: 160px!important;
                                                height: 160px!important
                                            }
                                        }
                                    }
                                }
                            }
                            &>P:nth-of-type(1){
                                font-size: 28px;
                                color:#353535;
                                font-weight: bold;
                            }
                            span{
                                width: 60px;
                            }
                            &>P:nth-of-type(2){
                                font-size: 24px;
                                color:#7a7b80;
                            }
                        }
                    }
                }
                .fbt{
                    position: absolute;
                    top: 400px;
                    left: 50%;
                    transform: translateX(-50%);
                    height: 50px;
                    width: 316px;
                    border: 1px solid #dddddd;
                    color: #9a3593;
                    span:nth-of-type(1){
                        position: relative;
                        top: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 24px;
                        width: 257px;
                        display: inline-block;
                        text-align: center;
                        background: #fff;
                    }
                    span:nth-of-type(2){
                        position: relative;
                        top: 15px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 26px;
                        width: 222px;
                        display: inline-block;
                        text-align: center;
                        background: #fff;
                        font-weight: bold;
                    }
                }
                .fbt_qx{
                    top: 94px;
                    width: 400px;
                    span:nth-of-type(2){
                        width: 338px;
                    }
                }
                .fbt_sy{
                    top: 540px;
                }
                .china_map{
                    position: relative;
                    top: -550px;
                    /deep/.ve-map{
                        margin: 0 auto;
                        width: 550px!important;
                        height: 500px!important;
                        &>div{
                            width: 550px!important;
                            height: 500px!important;
                            &>div:nth-of-type(1){
                                width: 550px!important;
                                height: 500px!important;
                                canvas{
                                    width: 550px!important;
                                    height: 500px!important;
                                }
                            }
                        }
                    }
                }
                .chart{
                    position: absolute;
                    top: 210px;
                    left: 76px;
                    width: 250px;
                    height: 250px;
                    .ve-ring{
                        position: relative;
                        &>div:nth-of-type(1){
                            width: 250px;
                            height: 250px;
                            canvas{
                                width: 250px;
                                height: 250px;
                            }
                        }
                        .centerTitle{
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%,-50%);
                            text-align: center;
                            font-size: 28px;
                            line-height: 1.3;
                        }
                    }
                } 
                .chart_ring_3_right{
                    left:0;
                }
                .chart_ring_3_right{
                    left:0;
                }
                .chart_sy{
                    top: 660px;
                }
                .identifying{
                    position: absolute;
                    right: 100px;
                    top: 250px;
                    ul{               
                        li{
                            display: flex;
                            align-items: center;
                            &>span:nth-of-type(1){
                                width: 13px;
                                height: 13px;
                                border-radius: 100%;
                                vertical-align: middle;
                                margin-right: 18px;
                            }
                            &>p{
                                text-align: justify;
                                font-size: 26px;
                                line-height: 1.8;
                                color:#87898E;
                                flex: 1;
                                display: flex;
                                justify-content: space-between;
                            }
                        }
                    }
                } 
                .identifying_sy{
                    top: 695px;
                }
                .sex{
                    position: absolute;
                    top: 50px;
                    font-size:38px; 
                    left: 50%;
                    transform: translateX(-50%)
                }
                .sex_borrow{
                    top: 530px;
                }
                .big_progress{
                    width: 85%;
                    height: 280px;
                    display: flex;
                    justify-content:space-between;
                    position: absolute;
                    top: 176px;
                    left: 50%;
                    transform: translateX(-50%);
                    .left_li{
                        ul{
                            height: 100%;
                            display: flex;
                            flex-flow: column;
                            justify-content:space-around;
                            li{
                               text-align: right;
                               font-size: 28px;
                               color: #88898D;
                            }
                        }
                    }
                    .center_progress{
                        flex: 1;
                        padding: 0 16px;
                        ul{
                            height: 100%;
                            display: flex;
                            flex-flow: column;
                            justify-content:space-around;
                            border-bottom: 1px solid #E1E1E1;
                            border-left: 1px solid #E1E1E1;
                            padding-bottom: 10px;
                            li{
                                .progress{
                                    line-height: 3;
                                    width: 100%;
                                    background: #EDF1F2;
                                    height: 30px;
                                    border-top-right-radius: 20px;
                                    border-bottom-right-radius: 20px;
                                    position: relative;
                                    span{
                                        position: absolute;
                                        height: 30px;
                                        display: inline-block;
                                        border-top-right-radius: 20px;
                                        border-bottom-right-radius: 20px;
                                    }
                                }
                            }
                        }
                    }
                    .right_li{
                        ul{
                            height: 100%;
                            display: flex;
                            flex-flow: column;
                            justify-content:space-around;
                            li{
                                font-size: 28px;
                                color: #88898d;
                            }
                        }
                    }
                }
                .big_progress_borrow{
                    top: 650px;
                }
                
            }
        }
    }
}
</style>