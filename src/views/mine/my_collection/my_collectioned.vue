<template>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="my_collection">
            <header>
                <div>
                    <span>已回本金总额(元)</span>
                    <p>{{principal}}</p>
                </div>
                <div>
                    <span>已回收益总额(元)</span>
                    <p>{{interest}}</p>
                </div>
            </header>       
            <div id='nolist'></div>
            <ul class="contain">
                <li id='nolist' v-if="flag">
                        <div>
                            <img src="@/assets/images/product/product_null.png" alt="暂无数据">
                        </div>
                        <span>空空如也~</span>
                    </li>
                <li v-for="(item, index) in list" :key="index" v-else class="yesList">
                    <header>
                        <h1>{{item.bidName}}</h1>
                        <span>{{item.currentNum}}/{{item.totalNum}}期</span>
                    </header>
                    <section>
                        <p>已回本金：<span>{{item.principal}}</span></p>
                        <p>已回收益：<span>{{item.earnings}}</span><i v-if="item.flag" style="color:#ff4e30" @click="diagol(item.damages)" class="icon iconfont icon-gantanhao"></i><span class="yfj">{{item.increaseInterest==0?'':`+${item.increaseInterest}`}}</span></p>
                        <p>回款日期：<span>{{item.time}}</span></p>
                    </section>
                </li>
            </ul>
        </div>
    </mescroll-vue>
    
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import { Toast } from 'vant';
import { Dialog } from 'vant';
import {indexApi} from "@/api/mine"
import {publicFun} from "@/libs/publicFun"
    export default {
        data(){
            return{
                flag:'',
                principal:'',
                interest:'',
                list:[],
                mescroll: null, // mescroll实例对象
                mescrollDown:{use:false}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
                mescrollUp: { // 上拉加载的配置.
                    callback: this.upCallback,
                }
            }
        },
        components:{
            MescrollVue
        },
        created(){
            indexApi.userRepayStatistics().then(data=>{
                this.interest = publicFun.toMoney(data.result.repayTotalIncome,2)
                this.principal = publicFun.toMoney(data.result.repayPrincipal,2)
            })
        },
        methods:{
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit (mescroll) {
                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
            upCallback (page, mescroll) {
                let formdata = {
                    size:page.size,
                    num:page.num,
                    dataId:this.$route.query.type
                }
                indexApi.userRepayList(formdata).then(data =>{
                    if(data.result.length==0){
                        this.flag = true
                    }
                    if (page.num === 1) this.list = []
                    for(var i = 0; i<data.result.length;i++){
                        let flag = false
                        if(data.result[i].damages){
                            flag = true
                        }
                        this.list.push({
                            flag : flag,
                            bidName:data.result[i].bidName,
                            damages:data.result[i].damages,
                            earnings:publicFun.numAdd(data.result[i].interest||0,data.result[i].damages||0),
                            principal:publicFun.toMoney(data.result[i].principal||0,2),
                            time:publicFun.timestampToTime(data.result[i].time,'-'),
                            currentNum:data.result[i].currentNum,
                            totalNum :data.result[i].totalNum,
                            increaseInterest: (data.result[i].increaseInterest==0 || data.result[i].increaseInterest==null)?0:publicFun.number_format(data.result[i].increaseInterest) 
                        })
                    }
                    this.$nextTick(() => {
                        mescroll.endSuccess(data.result.length)
                    })
                })
            },
            diagol(a){
                Dialog.alert({
                    message: `包含借款人提前还款的违约金额<span style="color:#ff4e30">${a}</span>元。`,
                    confirmButtonText:'我知道了'
                }).then(() => {
                // on close
                });
            }
        }
    }
</script>

<style scoped lang='less'>
.mescroll {
    position: absolute;
    top: 88px;
    bottom: 0;
    height: auto;
}
.my_collection{
    &>header{
        background-image: url('../../../assets/images/my/myReward-bg.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 54px 40px;
        display: flex;
        &>div{
            span{
                font-size: 26px;
                padding-bottom: 30px;
                color: #848a93;
                display: block;
            }
            p{
                font-size: 38px;
                color: #ff4e30;
            }
        }
        div:nth-of-type(1){
            width: 367px;
        }
    }
    .contain{
        padding: 18px 20px 0;
        #nolist{
            padding: 50px;
            text-align: center;
            div{
                width: 340px;
                height: 274px;
                margin: 0 auto;
                font-size: 32px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            span{
                line-height: 80px;
                font-size: 28px;
                color: #848a93;
            }
        }
        .yesList{
            padding: 0 22px 20px;
            margin-bottom: 17px;
            background: #fff;
            border-radius: 5px;
            header{
                font-size: 32px;
                display: flex;
                justify-content: space-between;  
                padding-bottom: 36px;    
                padding-top: 42px;          
                h1{                    
                    font-weight: bold;
                }
                span{
                    color: #ff4e30;
                }
            }
            section{
                p{
                    font-size: 28px;
                    color: #848a93;
                    padding-bottom: 22px;
                    span{
                        color: #32363c;
                    }
                    .yfj{
                        color: #ff4e30;
                    }
                }
            }
        }
    }
}

</style>