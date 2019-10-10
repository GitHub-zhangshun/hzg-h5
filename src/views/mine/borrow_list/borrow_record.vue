<template>
    <div class="borrow_record">
        <div class="top">
            <ul>
                <li>
                    <p>标的名称</p>
                    <span>{{name}}</span>
                </li>
                <li>
                    <p>参考年回报率</p>
                    <span>{{rate}}%</span>
                </li>
                <li>
                    <p>还款方式</p>
                    <span>{{away}}</span>
                </li>
                <li>
                    <p>状态</p>
                    <span :class="simplify==='bid_product_show_raise_underway'?'statered':simplify==='bid_product_show_raise_finish'?'stategreen':simplify==='bid_product_show_over'?'stateblack':'stateyellow'">{{state}}</span>
                </li>
            </ul>
        </div>
        <div class="myborrow">
            <h2>我的出借记录</h2>
            <ul>
                <li v-for="(item, index) in list" :key="index" @click="$router.push({path:'/borrow_info',query:{id:item.id,isPrepayment:isPrepayment,simplify:simplify,xieyi:xieyi}})" >
                    <div class="left">
                        <span>{{item.money}}</span>
                        <p>{{item.time}}</p>
                    </div>
                    <div class="right">
                        <span>出借详情</span>
                        <i class="icon iconfont icon-qianjin"></i>
                    </div>
                </li>
            </ul>
        </div>
        <footer>
            <x-button type="warn" @click.native="$router.push({path:'/product_introduction',query:{id:$route.query.id,userId:$route.query.userId}})">查看产品详情</x-button>
        </footer>
    </div>
</template>

<script>
import { XButton } from 'vux'
import {indexApi} from '@/api/mine'
import {publicFun} from '@/libs/publicFun'
    export default {
        components: {
            XButton,
        },
        data(){
            return{
                name:'',
                rate:'',
                away:'',
                state:'',
                list:[],
                isPrepayment:'',
                simplify:'',
            }
        },
        async mounted(){
            await indexApi.userProductInfo(this.$route.query.id).then(data=>{
                this.name = data.result.name
                this.rate = data.result.rate
                this.xieyi = data.result.showStatus
                this.simplify = publicFun.Pl_simplify(data.result.showStatus)
                this.away = publicFun.Pl_title(data.result.repayment)
                this.state = publicFun.Pl_title(data.result.showStatus)
                this.isPrepayment = data.result.isPrepayment
                for(var i = 0; i<data.result.investList.length;i++){
                    this.list.push({
                        id : data.result.investList[i].Id,
                        money:publicFun.toMoney(data.result.investList[i].money,2),
                        time:publicFun.timestampToTimesfs(data.result.investList[i].createAt,"/")
                    })
                }                    
            })
        }
    }
</script>

<style scoped lang='less'>
.borrow_record{
    padding-bottom: 100px;
    .top{
        ul{
            background: #fff;
            li{
                line-height: 100px;
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid #eff3f6;
                padding: 0 40px;
                font-size: 28px;
                color: #343434;
                p{
                    color: #848a93;
                }
                .statered{
                    color: #ff4e30;
                }
                .stategreen{
                    color: #67ccb7;
                }
                .stateyellow{
                    color: #f09421;
                }
                .stateblack{
                    color: #b3b6b9;
                }
            }
        }
    }
    .myborrow{
        h2{
            line-height: 72px;
            font-size:30px; 
            padding-left: 40px;
        }
        ul{
            background: #fff;
            li{
                border-top: 2px solid #eff3f6;
                display: flex;
                justify-content: space-between;
                padding: 0 40px;
                .left{
                    padding: 36px 0;
                    span{
                        font-size: 36px;
                        color:#ff4e30;
                        display: inline-block;
                        padding-bottom: 20px;
                        font-weight: bold;
                    }
                    p{
                        font-size: 26px;
                        color: #848a93;
                    }
                }
                .right{
                    line-height: 150px;
                    span{
                        font-size: 28px;
                        padding-right: 20px;
                        display: inline-block;
                        color: #848a93;
                    }
                }
            }
            li:nth-of-type(1){
                border-top: none;
            }
        }
    }
    footer{
        position: fixed;
        bottom:0;
        width: 100%;
        .weui-btn{
            height: 100px;
            font-size: 30px;
            background: #ff4e30;
        }
    }
}
</style>