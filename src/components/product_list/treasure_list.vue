<template>
    <div class="requestOK">
        <div class="headerImg" :style="{height:bannerHeight+'px'}">
            <img src="../../assets/images/product/banner.jpg" v-if="showBanner">
            <swiper loop auto :list="demo01_list" dots-position="center" v-else></swiper>
        </div> 
        <div class="product_data">
            <!-- 没有数据 -->
            <div class="product_null" v-if="data_list=='no'">
                <div>
                    <img src="../../assets/images/product/product_null.png">
                </div>               
                <p class="null">空空如也~~</p>                                            
            </div>
            <!-- 有数据 -->                
            <div class="hotProducts" v-if="data_list=='yes'">
                <div class="contain" @click="$router.push({path:'/product_introduction',query:{id:item.Id,userId:item.userId}})" v-for="(item, index) in list" :key="index">
                    <ul>
                        <li class="left">
                            <div class="triangle"></div>
                            <p>{{item.bidName}}</p>
                            <ul>
                                <li class="Annual">
                                    <p><span>{{item.rate}}</span>%</p>
                                    <span>年化利率</span>
                                </li>
                                <li class="timeLimit">
                                    <p><span>{{item.bidLimit}}</span>{{item.subhead}}</p>
                                    <span>持有期限</span>
                                </li>
                            </ul>
                        </li>
                        <li class="right">
                            <div class="circle">
                                <div class="big">
                                    <div class="small" :style="{color:item.fillStyle}" v-if="item.jinduperce=='1'">{{item.proportion}}%</div>
                                    <div class="small" :style="{color:item.fillStyle}" v-if="item.jinduperce=='2'">{{item.biaoprece}}</div>
                                    <div class="small" :style="{color:item.fillStyle}" v-if="item.jinduperce=='3'"></div>
                                </div>
                                <div class="colorDiv" :style="{height:item.proportion+'%',background:item.fillStyle}"></div>        
                            </div>
                            <!-- <circleProgress :showStatus="item.showStatus" :id="item.hotproId" :proportion='item.proportion'></circleProgress> -->
                            <span>{{item.startMoney}}元起投</span>
                        </li>
                    </ul>
                    <hr>
                    <div>
                        <span v-if="item.showNo">剩余{{item.canInvestMoney}}元可投</span>
                        <span v-else :style="{color:item.fillStyle}" class="biao">{{item.biaoName}}</span>
                        <button @click.stop="go(item.Id,item.userId,item.signType)" v-if="item.isBuy">立即借出</button>
                        <button class="over" disabled v-else>已结束</button>
                    </div>
                </div>                                                
            </div>                 
            <!-- 提示 -->
        <div class="cautious"><i class="icon iconfont icon-dengpao"></i>网贷有风险，出借需谨慎</div>
        </div> 
        <!-- 存管 -->
        <Dialogalert v-if="show" @childClose='close'></Dialogalert>
        <!-- 存量 -->
        <StockDialog v-if="showStock" @stockClose="stockClose"></StockDialog>  
        <!-- 测评 -->
        <riskDialog v-if="showRisk" @RiskClose='riskClose'></riskDialog>
        <!-- 测评不匹配 -->
        <RiskNoMatch v-if="showRiskNo" :riskLevelTxt="riskLevelTxt" :biaoRiskLevelTxt="biaoRiskLevelTxt" @RiskNoMatchShow='RiskNoMatchShow'></RiskNoMatch> 
    </div>    
</template>

<script>
import circleIndex from '@/components/circleIndex'
import { publicFun } from '@/libs/publicFun'
import {indexApi} from '@/api/product'
import { Swiper, SwiperItem } from "vux";
    export default {
        components:{
            circleIndex,
            Swiper,
            SwiperItem
        },
        data(){
            return{   
                 //和宝banner占位图
                showBanner:'',
                // banner高度
                bannerHeight:'',
                demo01_list:[],             
                //是否有数据标识
                data_list:'',
                //数据
                list:[],
                //用户风险类型
                riskLevelTxt:'',
                //标的分线类型
                biaoRiskLevelTxt:'',
                //存管弹窗
                show:false,
                //测评
                showRisk:false,
                //测评不匹配
                showRiskNo:false,
                //存量
                showStock:false
            }
        },
        mounted(){
            this.bannerHeight = (document.body.clientWidth/375)*80
            if(localStorage.getItem('banner')){
                let banner = []
                let a = JSON.parse(localStorage.getItem('banner'))
                for(let i = 0; i<a.length; i++){
                    if(publicFun.Pl_simplify(a[i].showType)==='banner_show_list'){
                        banner.push({url:a[i].link,img:a[i].imgLink})
                    }
                }
                if(banner.length>0){
                    this.showBanner = false
                }else{
                    this.showBanner = true
                }
                this.demo01_list = banner
            }else{
                this.showBanner = true
            }


            if(localStorage.getItem('hebao')==null){
                this.data_list = 'no'
            }else{
                let hebao = localStorage.getItem('hebao')
                indexApi.productListByTreasure(hebao).then(data =>{
                    if(data.code ==0){
                        if(data.result.length==0){
                            this.data_list = 'no'
                        }else{
                            for(var i= 0; i<data.result.length;i++){  
                                //标的状态
                                let showNO =''
                                let biaoName = ''
                                let fillStyle = ''
                                let isBuy =''
                                let jinduperce ='1'
                                let biaoprece = ''
                                let a = `${data.result[i].statisticsInfo.alsoPeriods||0}/${data.result[i].statisticsInfo.totalPeriods}`
                                let b = `${data.result[i].statisticsInfo.alsoPeriods||0}/${data.result[i].periods}`
                                let showStatus=data.result[i].showStatus
                                switch(publicFun.Pl_simplify(showStatus)){
                                    //募集中
                                    case "bid_product_show_raise_underway":
                                    fillStyle = '#ff4e30'
                                    showNO = true
                                    isBuy = true
                                    break;
                                    //募集完成
                                    case "bid_product_show_raise_finish":
                                    showNO = false
                                    fillStyle = '#6cc9b6'
                                    isBuy = false
                                    biaoName = publicFun.Pl_title(showStatus)
                                    break;
                                    //还款中
                                    case "bid_product_show_repayment_underway":
                                    showNO = false
                                    fillStyle = '#f09421'
                                    isBuy = false
                                    jinduperce='2'
                                    biaoprece = data.result[i].statisticsInfo.totalPeriods > 0?a:b
                                    biaoName = publicFun.Pl_title(showStatus)
                                    break;
                                    //已还款
                                    case "bid_product_show_repayment_finish":
                                    showNO = false
                                    fillStyle = '#f09421'
                                    isBuy = false
                                    jinduperce='2'
                                    biaoprece = data.result[i].statisticsInfo.totalPeriods > 0?a:b
                                    biaoName = publicFun.Pl_title(showStatus)
                                    break;
                                    //已结束
                                    default:
                                    showNO = false
                                    fillStyle = '#b3b6b9'
                                    isBuy = false
                                    jinduperce='3'
                                    biaoName = publicFun.Pl_title(showStatus)
                                }                        
                                this.list.push({
                                    //标名称
                                    bidName:data.result[i].name,
                                    //年化率
                                    rate:publicFun.toMoney(data.result[i].rate||0,1),
                                    //持有期限
                                    bidLimit:data.result[i].count,
                                    //持有期限单位
                                    subhead:publicFun.Pl(data.result[i].interestType)[0].subhead,
                                    //进度球的颜色标识
                                    fillStyle:fillStyle,
                                    //剩余可投金额
                                    canInvestMoney:publicFun.toMoney(data.result[i].statisticsInfo.surplusMoney,2),
                                    //起投金额
                                    startMoney:publicFun.toMoney(data.result[i].moneyInfo.limitMin,0),
                                    //标的ID
                                    Id:data.result[i].Id,
                                    //借款人ID
                                    userId:data.result[i].userId,
                                    //进度球高度
                                    proportion:parseInt((data.result[i].statisticsInfo.investMoney*100)/data.result[i].money),
                                    //标的状态
                                    showNo : showNO,
                                    //标状态名称
                                    biaoName:biaoName,
                                    //按钮状态
                                    isBuy : isBuy,
                                    //还款中，已还款的百分比
                                    jinduperce:jinduperce,
                                    biaoprece:biaoprece,
                                    //标的风险
                                    signType:(data.result[i].attachInfo && data.result[i].attachInfo.riskLevel && publicFun.Pl(data.result[i].attachInfo.riskLevel)) || 0,
                                })
                            }
                            this.data_list = 'yes'
                        }
                        
                    }else{
                        this.$toast({message:data.message,duration:2000})
                        this.data_list = 'no'
                    }
                })
            }        
        },
        methods:{ 
            go(id,signType){
                if(localStorage.getItem('info')==null){
                    this.$router.push({path:'/login'})
                }else{
                    let info = JSON.parse(localStorage.getItem('info'))
                    if(!info.user.isOpen){ //是否开户
                        this.show = true                                               
                    }else if(info.user.riskLevelInfo==null){//是否测评
                        this.showRisk = true
                    }else if(Number(info.user && info.user.riskLevelInfo && info.user.riskLevelInfo.money || 0) < Number((signType[0] && signType[0].subhead) || 0)){//测评等级是否相匹配
                        this.riskLevelTxt = info.user.riskLevelInfo.riskLevelTxt || 0
                        this.biaoRiskLevelTxt = (signType[0]&&signType[0].title) || 0
                        this.showRiskNo = true
                    }else if(!info.user.personalAttestation){//存量
                        this.showStock = true
                    }else{
                        this.$router.push({path:'/lend_confirmation',query:{id:id}})
                    }
                }                             
            },
            // 存管
            close(a){
                this.show = a
            },
            //测评弹窗
            riskClose(a){
                this.showRisk = a
            },
            //存量
            stockClose(a){
                this.showStock = a
            },
            //测评不匹配弹窗
            RiskNoMatchShow(a){
                this.showRiskNo = a
            },
        }
    }
</script>

<style scoped lang='less'>
.requestOK{        
    padding-bottom: 108px;                          
    text-align: center;  
    .headerImg{
        width: 100%;
        height: 160px;
        img{
            width: 100%;
            height: 100%;
        }
        /deep/.vux-slider{
            height: 100%;
            .vux-swiper{
                height: 100%!important;
                .vux-swiper-item{
                    height: 100%;
                    a{
                        div{
                            background-size: 100% 100%;
                        }
                        .vux-swiper-desc{
                            display: none;
                        }
                    }
                }
            }
            .vux-indicator{
                a{
                    .vux-icon-dot{
                        height: 20px;
                        width: 20px;
                        border-radius: 20px;
                        background-color: rgba(255,255,255,.3)
                    }
                    .active{
                        background-color: #fff;
                    }
                }
            }
        }
    }
    .product_data{         
        .product_null{
            min-height:calc(100vh-574px);
            padding-top: 112px;
            margin-top: 18px;            
            div{
                width: 340px;
                height: 274px;
                padding-bottom:46px; 
                margin: 0 auto;
                img{
                    width: 100%;
                    height: 100%;                    
                }
            }
            
            .null{
                font-size: 32px;
                color: #8d9095;
            }                    
        }
            .hotProducts {
                min-height:calc(100vh-462px);
                .contain {
                    width: 710px;
                    background: #fff;
                    border-radius: 10px;
                    margin: 18px auto 0;
                    ul {
                        display: flex;
                        justify-content: space-between;
                        .left {
                            flex: 1;
                            position: relative;
                            padding-bottom: 34px;
                            .triangle {
                                width: 0;
                                height: 0;
                                border-top: 29px solid #f5f7fb;
                                border-right: 29px solid transparent;
                                border-left: 29px solid transparent;
                                position: absolute;
                                top: 0;
                                right: -30px;
                            }
                            &>p {
                                font-size: 28px;
                                color: #32363c;
                                padding: 42px 0 32px 52px;
                                text-align: left;
                                font-weight: bold;
                            }
                            ul {
                                display: flex;
                                align-items: baseline;
                                justify-content: space-around;
                                .Annual {
                                    text-align: left;
                                    p {
                                        font-size: 26px;
                                        color: #ff4e30;
                                        span {
                                            font-size: 66px;
                                        }
                                        margin-bottom: 14px;
                                    }
                                    &>span {
                                        font-size: 20px;
                                        color: #848a93;
                                    }
                                }
                                .timeLimit {
                                    p {
                                        font-size: 26px;
                                        color: #32363c;
                                        span {
                                            font-size: 36px;
                                        }
                                        margin-bottom: 14px;
                                    }
                                    &>span {
                                        font-size: 20px;
                                        color: #848a93;
                                    }
                                }
                            }
                        }
                        .right {
                            padding-bottom: 34px;
                            width: 210px;
                            border-left: 1px dashed #e2e2e2;
                            padding-top: 55px;
                            text-align: center;
                            color: #848a93;
                            font-size: 20px;
                            .circle{
                                margin:0 auto 16px;
                                width: 108px;
                                height: 108px;
                                background: #c7c7c7;
                                border-radius: 100%;
                                position: relative;
                                overflow: hidden;
                                .big{
                                    position: absolute;
                                    left: 5px;
                                    top: 4px;
                                    width: 68px;
                                    height: 68px;
                                    border: 4px solid #fff;
                                    background: transparent;
                                    border-radius: 100%;  
                                    padding: 12px;  
                                    z-index: 1;
                                    .small{
                                        width: 68px;
                                        height: 68px;
                                        background: #fff;
                                        border-radius: 100%;
                                        font-size: 24px;
                                        line-height: 68px;
                                        text-align: center;
                                    }    
                                }    
                                .colorDiv{
                                    position: absolute;
                                    bottom: 0;
                                    width: 108px;
                                    // height: 54px;
                                    background: #ff4e30
                                }   
                            }
                        }
                    }
                    hr {
                        border-top: 1px solid #e2e2e2;
                        margin: 0;
                    }
                    &>div {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        line-height: 84px;
                        padding: 0 30px 0 52px;
                        span {
                            color: #848a93;
                            font-size: 24px;
                        }
                        .biao{
                            font-size: 30px;
                        }
                        button {
                            width: 160px;
                            height: 50px;
                            font-size: 26px;
                            color: #ff4e30;
                            background-color: transparent;
                            border: 1px solid #ff4e30;
                            border-radius: 50px;
                        }
                        .over{
                            color: rgb(160,161,165);
                            border: none;
                            background:rgb(232,232,232);
                        }
                    }
                }
                .contain:last-child {
                    margin-bottom: 0px;
                } 
            }
        .cautious {
            line-height: 80px;
            margin: 0 auto;
            font-size: 22px;
            color: #848a93;
            text-align: center;
            i {
                margin-right: 10px;
                color: #848a93;
                font-size: 22px;
            }
        } 
    }                       
}
</style>