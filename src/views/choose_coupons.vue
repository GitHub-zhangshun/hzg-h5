<template>
<!-- 选择优惠券 -->
    <div class="choose_coupons">
        <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
            <button class="no_choose_coupons" @click="not_user_coupon">不使用优惠券</button>
            <ul>
                <!-- <li v-for="(item, index) in dataList" :key="index" :class="(item.status=='uc_coupon_unused' && item.couponType==1)?'red':(item.status=='uc_coupon_unused'&&item.couponType==2?'yellow':'gary')"> -->
                <li v-for="(item, index) in dataList" :key="index" :class="!item.isUsable?'gary':item.couponType==1?'red':'yellow'">
                    <div class="top">
                        <div class="left">
                            <p>{{item.couponVal}}<span>{{item.couponType==1?'元':'%'}}</span></p>
                            <span>{{item.typeTxt}}</span>
                        </div>
                        <div class="center">
                            <p>{{item.minMoney}}</p>
                            <p>使用项目期限{{item.limitTime==""?"无限制":`≥${item.limitTime}天`}}</p>
                            <p>有效期至：<br>{{item.time}}</p>
                        </div>
                        <div class="right">
                            <button :disabled="!item.isUsable?true:false" @click="goBack(item)">{{item.isUsable?'使用':'不可用'}}</button>
                        </div>
                    </div>    
                    <div class="bottom">适用项目：{{item.bidType}} </div>                
                </li>
            </ul>
            <div id="dataList"></div>
        </mescroll-vue>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { indexApi} from '@/api/product' 
import { publicFun } from '@/libs/publicFun'
    export default {
        components: {
            MescrollVue // 注册mescroll组件
        },
        data(){
            return{
                mescroll: null, // mescroll实例对象
                mescrollUp: {
                    callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
                    page: {
                        num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                        size: 20 // 每页数据的数量
                    },
                    noMoreSize: 1, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
                    empty: {
                    // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
                        warpId: 'dataList', // 父布局的id;
                        icon: require('@/assets/images/product/product_null.png'), // 图标,支持网络图
                        tip: '暂无优惠券~', // 提示
                    },
                    htmlNodata:'<p class="upwarp-nodata">-- 无更多优惠券 --</p>'
                },
                dataList: [] // 列表数据
            }
        },
        methods:{
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit (mescroll) {
                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback (page, mescroll) {
                indexApi.couponUsableListByPage({size: page.size,num: page.num,bidId:this.$route.query.id,money:this.$route.query.money})
                .then( data => {
                // 请求的列表数据
                let arr = data.result
                // 如果是第一页需手动置空列表
                if (page.num === 1) this.dataList = []
                let dir = JSON.parse(sessionStorage.getItem('dictionaryListByAll')) 
                // 把请求到的数据添加到列表
                data.result.forEach( item => {
                    this.dataList.push({
                        id:item.Id,
                        couponVal:item.couponVal,
                        typeTxt:item.typeTxt,
                        limitTime:item.limitTime,
                        minMoney:item.minMoney == 0?`单笔出借金额无限制`:item.minMoney>= 10000?`单笔出借满${item.minMoney/10000}万元`:`单笔出借满${item.minMoney}元`,
                        time:`${publicFun.timestampToTimesfs(item.validTime,"-")}`,
                        bidType:item.bidType==""?'无限制':item.bidType.split(',').map( i => { 
                          return publicFun.Pl_title(i)
                        }).toString().replace(',','、'),
                        isUsable:item.isUsable,
                        status:dir.find(i => { return i.Id===item.status }).simplify,
                        couponType:item.couponType
                    })
                })
                // 数据渲染成功后,隐藏下拉刷新的状态
                this.$nextTick(() => {
                    mescroll.endSuccess(arr.length)
                })
                }).catch(() => {
                // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr()
                })
            },
            goBack(val){
                localStorage.setItem('coupon',JSON.stringify(val))
                this.$router.replace({path:'/lend_confirmation',query:{id:this.$route.query.id,money:this.$route.query.money}})
            },
            not_user_coupon(){
                localStorage.removeItem('coupon')
                this.$router.replace({path:'/lend_confirmation',query:{id:this.$route.query.id,money:this.$route.query.money}})
            }
        },
    }
</script>

<style scoped lang="less">
.choose_coupons{
    /*通过fixed固定mescroll的高度*/
    .mescroll {
        position: absolute;
        padding: 0 40px;
        top: 18px;
        bottom: 0;
        height: auto;
        width: calc(100% - 80px);
        .no_choose_coupons{
            height: 86px;
            width: 100%;
            font-size: 32px;
            border: 2px solid #ff4e3c;
            background: transparent;
            color: #ff4e3c;
            margin-bottom: 20px;
        }
        ul{
            li{
                // margin-bottom: 22px;
                min-height: 202px;
                padding-right: 30px;
                display: flex;
                flex-flow: column;
                justify-content: space-around;
                .top{
                    padding-top: 38px;
                    padding-bottom: 32px;
                    display: flex;
                    align-items: center; 
                    .left{
                        width: 260px;
                        text-align: center;
                        p{
                            font-size: 54px;
                            font-weight: bold;
                            color: #fff;
                            padding-bottom: 14px;
                            span{
                                font-size: 30px;                                
                            }
                        }
                        &>span{
                            color: #fff;
                            font-size: 22px;
                        }
                    }
                    .center{
                        width: 290px;
                        p{
                            line-height: 1.5;
                            color: #fff;
                            font-size: 24px;
                        }
                    }
                    .right{
                        p{
                            padding-left: 28px;
                            font-size: 26px;
                            color: #fff;
                            padding-bottom: 24px;
                        }
                        button{
                            font-size: 24px;
                            width: 124px;
                            height: 54px;
                            background: #fff;
                            border-radius: 54px;
                            line-height: 54px;
                        }
                    }
                }
                .bottom{
                    border-top: 2px solid #fff;
                    margin-left: 30px;
                    padding-top: 30px;
                    min-height: 67px;
                    color: #fff;
                    font-size: 24px;
                }
            }
            li:last-child{
                margin-bottom: 0;
            }
            .red{
                background: url("../assets/images/my_coupons/bg1.png") center center no-repeat;
                background-size: 100% 100%;
                button{
                    color: #fd576e;
                }
            }
            .yellow{
                background: url("../assets/images/my_coupons/bg2.png") center center no-repeat;
                background-size: 100% 100%;
                button{
                    color: #fea41a;
                }
            }
            .gary{
                background: url("../assets/images/my_coupons/bg3.png") center center no-repeat;
                background-size: 100% 100%;
                button{
                    color: #848A93;
                }
            }
        }
    }
    
}
</style>