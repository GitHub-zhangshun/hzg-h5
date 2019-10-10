<template>
    <div class="requestOK">
        <mescroll-vue ref="mescroll" :up="mescrollUp">
            <div class="headerImg" :style="{height:bannerHeight+'px'}">
                <img src="../../assets/images/product/banner.jpg" v-if="showBanner">
                <swiper loop auto :list="demo01_list" dots-position="center" v-else></swiper>
            </div>        
            <div class="product_data">
                <!-- 没有数据 -->
                <div class="product_null" v-if="data_list=='no'">
                    <div><img src="../../assets/images/product/product_null.png"></div>
                    <p class="null">空空如也~~</p>                                            
                </div>
                <!-- 有数据 -->                
                <div class="hotProducts" v-if="data_list=='yes'">
                    <div class="contain" @click="go_datil(item.Id,item.userId)" v-for="(item, index) in list" :key="index">
                        <ul>
                            <li class="left">
                                <div class="triangle"></div>
                                <p class="BidName">{{item.bidName}}<span v-if="item.productType=='bid_type_novice'">新手专享</span> </p>
                                <ul>
                                    <li class="Annual">
                                        <p><span>{{item.rate}}</span>%</p>
                                        <span>参考年回报率</span>
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
                                    <div class="colorDiv" :style="{height:`${item.proportion}%`,background:item.fillStyle}"></div>        
                                </div>
                                <!-- <circleProgress :showStatus="item.showStatus" :id="item.hotproId" :proportion='item.proportion'></circleProgress> -->
                                <span>{{item.startMoney}}元起投</span>
                            </li>
                        </ul>
                        <hr>
                        <div>
                            <span v-if="item.showNo">剩余{{item.canInvestMoney}}元可投</span>
                            <span v-else :style="{color:item.fillStyle}" class="biao">{{item.biaoName}}</span>
                            <button @click.stop="go(item.Id,item.signType,item.productType)" v-if="item.isBuy">立即出借</button>
                            <button class="over" disabled v-else>已结束</button>
                        </div>
                    </div>                                                
                </div> 
                <div class="cautious"><i class="icon iconfont icon-dengpao"></i>网贷有风险，出借需谨慎</div>                
                
            </div> 
        </mescroll-vue>
        <!-- 存管 -->
        <Dialogalert v-if="show" @childClose='close'></Dialogalert> 
        <!-- 存量 -->
        <!-- <StockDialog v-if="showStock" @stockClose="stockClose"></StockDialog>   -->
        <!-- 测评 -->
        <riskDialog v-if="showRisk" @RiskClose='riskClose'></riskDialog>
        <!-- 测评不匹配 -->
        <RiskNoMatch v-if="showRiskNo" :riskLevelTxt="riskLevelTxt" :biaoRiskLevelTxt="biaoRiskLevelTxt" @RiskNoMatchShow='RiskNoMatchShow'></RiskNoMatch>
    </div>  
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { Swiper, SwiperItem } from "vux";
import { Dialog } from 'vant';
import { indexApi } from '@/api/product'
import { publicFun } from '@/libs/publicFun'
    export default {
        components:{
            MescrollVue ,
            Swiper,
            SwiperItem
        },
        data(){
            return{
                //产品banner占位图
                showBanner:true,
                // banner高度
                bannerHeight:'',
                demo01_list:[],
                //用户风险类型
                riskLevelTxt:'',
                //标的风险类型
                biaoRiskLevelTxt:'',
                //是否有数据标识
                data_list:'',
                //数据
                list:[],
                //陕坝开户验证弹窗
                show:false,
                //测评
                showRisk:false,
                //测评不匹配
                showRiskNo:false,
                //存量
                // showStock:false,
                mescroll: null,
                mescrollUp: {
                    callback: this.upCallback,
                    htmlNodata:'<p class="upwarp-nodata">-- 无更多数据 --</p>',
                    noMoreSize: 3,
                }
            }
        },

        methods:{
          go_datil(id,userid){
            this.$router.push({path:'/product_introduction',query:{id:id,userId:userid}})
          },
            mescrollInit (mescroll) {
                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            upCallback (page, mescroll) {
                this.banner()
                indexApi.productList(page.num,page.size).then(data =>{
                    if(page.num==1) this.list=[]
                    if(page.num==1&&data.result.length==0){
                        this.data_list = "no"
                    }else{
                        this.data_list ="yes"
                        for(var i= 0; i<data.result.length;i++){  
                            //标的状态
                            let showNO =''
                            let biaoName = ''
                            let fillStyle = ''
                            let isBuy =''
                            let jinduperce ='1'
                            let biaoprece = ''
                            let proportion = 0
                            let a = `${data.result[i].statisticsInfo.alsoPeriods||0}/${data.result[i].statisticsInfo.totalPeriods}`
                            let b = `${data.result[i].statisticsInfo.alsoPeriods||0}/${data.result[i].periods}`
                            let showStatus=data.result[i].showStatus
                            switch(publicFun.Pl_simplify(showStatus)){
                                //募集中
                                case "bid_product_show_raise_underway":
                                fillStyle = '#ff4e30'
                                showNO = true
                                isBuy = true
                                proportion = parseInt((data.result[i].statisticsInfo.investMoney*100)/data.result[i].money)
                                break;
                                //募集完成
                                case "bid_product_show_raise_finish":
                                showNO = false
                                fillStyle = '#6cc9b6'
                                isBuy = false
                                biaoName = publicFun.Pl_title(showStatus)
                                proportion = parseInt((data.result[i].statisticsInfo.investMoney*100)/data.result[i].money)
                                break;
                                //还款中
                                case "bid_product_show_repayment_underway":
                                showNO = false
                                fillStyle = '#f09421'
                                isBuy = false
                                jinduperce='2'
                                biaoprece = data.result[i].statisticsInfo.totalPeriods > 0?a:b
                                proportion = parseInt((data.result[i].statisticsInfo.alsoPeriods)/(data.result[i].statisticsInfo.totalPeriods>0?data.result[i].statisticsInfo.totalPeriods:data.result[i].periods))*100
                                biaoName = publicFun.Pl_title(showStatus)
                                break;
                                //已还款
                                case "bid_product_show_repayment_finish":
                                showNO = false
                                fillStyle = '#f09421'
                                isBuy = false
                                jinduperce='2'
                                biaoprece = data.result[i].statisticsInfo.totalPeriods > 0?a:b
                                proportion = parseInt((data.result[i].statisticsInfo.alsoPeriods)/(data.result[i].statisticsInfo.totalPeriods>0?data.result[i].statisticsInfo.totalPeriods:data.result[i].periods))*100
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
                                subhead:publicFun.Pl(data.result[i].interestType) && publicFun.Pl(data.result[i].interestType)[0].subhead,
                                //进度球的颜色标识
                                fillStyle:fillStyle,
                                //剩余可投金额
                                canInvestMoney:publicFun.toMoney(data.result[i].statisticsInfo.surplusMoney,0),
                                //起投金额
                                startMoney:publicFun.toMoney(data.result[i].moneyInfo.limitMin,0),
                                //标的ID
                                Id:data.result[i].Id,
                                //借款人ID
                                userId:data.result[i].userId,
                                //进度球高度
                                proportion:proportion,
                                //标的状态
                                showNo : showNO,
                                //标状态名称
                                biaoName:biaoName,
                                //按钮状态
                                isBuy : isBuy,
                                //还款中，已还款的百分比
                                jinduperce:jinduperce,
                                biaoprece:biaoprece,
                                //是否新手标
                                productType: publicFun.Pl_simplify(data.result[i].productType),
                                //标的风险
                                signType:(data.result[i].attachInfo && data.result[i].attachInfo.riskLevel && publicFun.Pl(data.result[i].attachInfo.riskLevel)) || 0,
                            })
                        }              
                    }
                    this.$nextTick(() => {
                        mescroll.endSuccess(data.result.length)
                    })                    
                })
                .catch( ()=>{
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr()
                })
            },
            //banner
            banner(){
                this.demo01_list = []
                indexApi.banner().then(data =>{      
                    let bannerIndex = []
                    data.result.map(i => {
                        if(publicFun.Pl_simplify(i.showType)==='banner_show_list'){
                            bannerIndex.push({url:i.link,img:i.imgLink,sort:i.sort})
                        }                   
                    })   
                    if(bannerIndex.length==0){
                        this.showBanner = true
                    }else{
                        this.demo01_list = bannerIndex
                        this.showBanner = false
                    }

                })
            },
            //出借按钮事件
            go(id,signType,productType){
                if(!localStorage.getItem('info')){//是否登陆
                  this.$router.push({path:'/verification_code_login'})
                }else{
                    let info = JSON.parse(localStorage.getItem('info'))                   
                    if(!info.attachInfo.isOpen){ //是否开户
                        this.show = true   
                        // this.$router.push('/step')                                            
                    }else if(info && info.user && info.user.bankCardInfo && info.user.bankCardInfo.cardNo == ""){ //是否绑定银行卡
                        Dialog.confirm({
                        title: '提示',
                        message: '您还未绑定存管银行卡，请先绑卡'
                        }).then(() => {
                        this.$router.push('/my_bank_card')
                        }).catch(() => {
                        // on cancel
                        })
                    }else if(info.user.riskLevelInfo==null){  //是否评测
                        this.showRisk = true
                    }else if(Number(info.user && info.user.riskLevelInfo && info.user.riskLevelInfo.money || 0) < Number((signType[0] && signType[0].subhead) || 0)){ //评测等级是否标小于标的等级
                        this.riskLevelTxt = info.user.riskLevelInfo.riskLevelTxt || 0
                        this.biaoRiskLevelTxt = (signType[0]&&signType[0].title) || 0
                        this.showRiskNo = true
                    }
                    // else if(!info.user.personalAttestation){//存量
                    //     this.showStock = true
                    // }
                    else if(productType==="bid_type_novice" && !info.user.isNew){//判断用户是否是新手，标时候是新手标（非新手用户不能出借新手标）
                        Dialog.alert({
                            title:'您已经不是新手了哟~',
                            message: "<p style='text-align:center'>首次出借才可出借新手产品</p>",
                            confirmButtonText:'我知道了'
                        }).then(() => {
                        // on close
                        });
                    }else{
                        this.$router.push({path:'/lend_confirmation',query:{id:id}})
                    }
                }                             
            },
            //陕坝开户
            close(a){
                this.show = a
            },
            //存量
            // stockClose(a){
            //     this.showStock = a
            // },
            //测评弹窗
            riskClose(a){
                this.showRisk = a
            },
            //测评不匹配弹窗
            RiskNoMatchShow(a){
                this.showRiskNo = a
            },
        },
        created(){
            this.bannerHeight = (document.body.clientWidth/375)*80         
        }
    }
</script>

<style scoped lang='less'>
.requestOK{                                  
    text-align: center;  
    .mescroll {
        position: absolute;
        top: 0;
        bottom: 100px;
        height: auto;
        .headerImg{
            width: 100%;
            // height: 160px;
            img{
                height: 100%;
                width: 100%;
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
            // padding-bottom: 100px;
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
                                    border-top: 15px solid #f5f7fb;
                                    border-right: 15px solid transparent;
                                    border-left: 15px solid transparent;
                                    position: absolute;
                                    top: 0;
                                    right: -16px;
                                }
                                .BidName {
                                    line-height: 48px;
                                    font-size: 28px;
                                    color: #32363c;
                                    padding: 42px 0 32px 52px;
                                    text-align: left;
                                    font-weight: bold;
                                    span{
                                        display: inline-block;
                                        font-size: 26px;
                                        width: 118px;
                                        height: 44px;
                                        margin-left: 24px;
                                        background: #e7f1fd;
                                        text-align: center;
                                        border-radius: 44px;
                                        color:#e0634e;
                                        font-weight: normal;
                                    }
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
                                            margin-bottom: 18px;
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
                                    margin:20px auto 20px;
                                    width: 108px;
                                    height: 108px;
                                    background: #c7c7c7;
                                    border-radius: 100%;
                                    position: relative;
                                    overflow: hidden;
                                    .big{
                                        position: absolute;
                                        left: 50%;
                                        top: 50%;
                                        transform: translate(-50%,-50%);
                                        width: 94px;
                                        height: 94px;
                                        border: 4px solid #fff;
                                        background: transparent;
                                        border-radius: 100%;   
                                        z-index: 1;
                                        .small{
                                            position: absolute;
                                            left: 50%;
                                            top: 50%;
                                            transform: translate(-50%,-50%);
                                            width: 70px;
                                            height: 70px;
                                            background: #fff;
                                            border-radius: 100%;
                                            font-size: 24px;
                                            line-height: 70px;
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
                margin: 0 auto;
                font-size: 22px;
                color: #848a93;
                line-height: 82px;
                text-align: center;
                i {
                    margin-right: 10px;
                    color: #848a93;
                    font-size: 22px;
                }
            } 
        } 
        /deep/.mescroll-upwarp{
            p{
                font-size: 22px;
            }
        }
    }          
              
}
</style>