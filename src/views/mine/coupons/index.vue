<template>
<!-- 我的优惠卷 -->
    <div class="my_coupons">
        <div class="top">
            <van-tabs v-model="active" sticky color="#ff4e3c" title-active-color="#ff4e3c" :line-width="28" @click="onClick">
                <van-tab v-for="(item, index) in tabs" :key="index" :title="item.title" ></van-tab>
            </van-tabs>
            <p class="instructions" @click="directions ">使用说明</p>
        </div>
        
        <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
            <ul>
                <li v-for="(item, index) in dataList" :key="index" :class="(item.status=='uc_coupon_unused' && item.couponType==1)?'red':(item.status=='uc_coupon_unused'&&item.couponType==2?'yellow':'gary')">
                    <div class="top">
                        <div class="left">
                            <p>{{item.couponVal}}<span>{{item.couponType==1?'元':'%'}}</span></p>
                            <span>{{item.typeTxt}}</span>
                        </div>
                        <div class="center">
                            <p>{{item.minMoney}}</p>
                            <p>使用项目期限{{item.limitTime==""?"无限制":`≥${item.limitTime}天`}}</p>
                            <p>有效期：{{item.time}}</p>
                        </div>
                        <div class="right">
                            <button @click="$router.push('/product_list?type=product_list')" :disabled="item.status=='uc_coupon_unused'?false:true">{{item.status=="uc_coupon_unused"?'使用':item.status=="uc_coupon_use"?'已使用':'已过期'}}</button>
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
import { Tab, Tabs } from 'vant'
import { indexApi } from '@/api/mine'
import { publicFun } from '@/libs/publicFun'
    export default {
        components:{
            'van-tab':Tab,
            'van-tabs':Tabs,
            MescrollVue
        },
        data(){ 
            return{
                active:0,
                mescroll: null, // mescroll实例对象
                mescrollUp: {
                    use: true, // 是否初始化上拉加载; 默认true
                    auto: false, // 是否在初始化时以上拉加载的方式自动加载第一页数据; 默认true
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
                dataList: [], // 列表数据
                tabs:[],
                dataId:''
            }
        },
        methods:{
            onClick(index, title) {
                this.dataId = this.tabs[index].Id
                this.dataList = []
                this.mescroll.resetUpScroll() // 刷新列表数据
            },
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit (mescroll) {
                this.mescroll = mescroll
            },
            // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback (page, mescroll) {
                // 模拟联网    
                indexApi.couponListByPage({dataId:this.dataId,num:page.num,size:page.size})    
                .then( data => {
                    // 如果是第一页需手动制空列表
                    let arr = data.result
                    if (page.num === 1) this.dataList = []
                    let dir = JSON.parse(sessionStorage.getItem('dictionaryListByAll')) 
                    // 把请求到的数据添加到列表
                    data.result.forEach( item => {
                        this.dataList.push({
                            couponVal:item.couponVal,
                            typeTxt:item.typeTxt,
                            limitTime:item.limitTime,
                            minMoney:item.minMoney == 0?`单笔出借金额无限制`:item.minMoney>= 10000?`单笔出借满${item.minMoney/10000}万元`:`单笔出借满${item.minMoney}元`,
                            time:`${publicFun.timestampToTime(item.createAt,"-")}至${publicFun.timestampToTime(item.validTime,"-")}`,
                            bidType:item.bidType==""?'无限制':item.bidType.split(',').map( i => { 
                              return publicFun.Pl_title(i)
                            }).toString().replace(',','、'),

                            status:dir.find(i => { return i.Id===item.status }).simplify,
                            couponType:item.couponType
                        })
                        item.bidType.split(',').map( i => { 
                          console.log(publicFun.Pl_title(i))
                          return publicFun.Pl_simplify(i)
                        })
                    })
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        mescroll.endSuccess(arr.length)
                    })                   
                }) 
                .catch(()=>{
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr()
                })     
            },
            // 使用说明
            directions(){
                indexApi.platformConfig().then(data=>{
                    this.$router.push({path:'/announcementDetails',query:{id:data.result.couponInstructions ,title:'使用说明'}})
                })
            }
        },
        async created(){
            await indexApi.statusListByTypeSimplify_coupon()
            .then( data => {
                data.result.forEach( item => {
                    this.tabs.push(item)
                })
                this.dataId = data.result[0].Id
            })
            this.mescroll.resetUpScroll() // 刷新列表数据            
        }
    }
</script>

<style scoped lang="less">
.my_coupons{
    &>.top{
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .instructions{
            font-size: 30px;
            padding-right: 30px;
        }
        /deep/.van-tabs{
            width: 60%;
            .van-tabs__wrap{
                z-index: 0;
                .van-tabs__nav{
                    // width: 60%;
                    padding-bottom: 0;
                    .van-tabs__line{
                        bottom: 10px;
                    }
                    .van-tab--active{
                        color: #ff4e3c!important;
                    }
                    .van-tab{
                        color: #000;
                    }
                }
            }
        }
    }  
    .mescroll {
        position: absolute;
        top: 0;
        bottom: 0;
        height: auto;
        ul{
            margin-top: 88px;
            padding: 30px 32px;
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
                background: url("../../../assets/images/my_coupons/bg1.png") center center no-repeat;
                background-size: 100% 100%;
                button{
                    color: #fd576e;
                }
            }
            .yellow{
                background: url("../../../assets/images/my_coupons/bg2.png") center center no-repeat;
                background-size: 100% 100%;
                button{
                    color: #fea41a;
                }
            }
            .gary{
                background: url("../../../assets/images/my_coupons/bg3.png") center center no-repeat;
                background-size: 100% 100%;
                button{
                    color: #848A93;
                }
            }
        }
    }   
}
</style>