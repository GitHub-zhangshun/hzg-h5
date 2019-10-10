<template>   
    <div class="lend">
        <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="showtips"
        @load="onLoad"
        >
            <ul class="lend_record">
                <li v-if="flag==1" class="noList">暂无数据~</li>       
                <li v-for="(item, index) in list" :key="index" v-if="flag==0">
                    <div class="head_portrait"><img :src="item.url"></div>
                    <div class="name_time">
                        <p class="phone">{{item.phone}}</p>
                        <p class="time">{{item.time}}</p>
                    </div>
                    <div class="money">{{item.money}}</div>
                </li>
            </ul>   
        </van-list>
    </div>
    
    
</template>

<script>
import { List } from 'vant';
import {indexApi} from '@/api/index'
import {publicFun} from '@/libs/publicFun'
    export default {
        components:{
            'van-list':List
        },
        data(){
            return{
                list: [],
                loading: false,
                finished: false,
                defaultImg: require('@/assets/logo.png'),
                flag:-1,
                num:1,
                showtips:''
            }
        },
        methods: {
            onLoad() {
            // 异步更新数据
            setTimeout(() => {
                indexApi.productInvestListByBid({num:this.num,size:10,dataId:this.$route.query.id})
                .then(data => {
                    if(data.total==0){
                        this.flag=1
                        this.loading = false;
                        // 数据全部加载完成
                        if (this.list.length == data.total) {
                            this.finished = true;
                        }
                        return
                    }
                    if(data.total==0){
                        this.showtips = '暂无数据~'
                    }else{
                        this.showtips = '没有更多了'
                    }
                    this.flag = 0
                    for(let i = 0; i<data.result.length; i++){
                        this.list.push({
                            url:(data.result[i].investorInfo && data.result[i].investorInfo.headImg) || this.defaultImg,
                            phone:data.result[i].investorInfo && data.result[i].investorInfo.phone,
                            time:data.result[i].createAt && publicFun.timestampToTimesfs(data.result[i].createAt,"/"),
                            money:data.result[i].money && publicFun.toMoney(data.result[i].money,2)
                        })
                    }
                    // 加载状态结束
                    this.num++
                    this.loading = false;
                    // 数据全部加载完成
                    if (this.list.length == data.total) {
                        this.finished = true;
                    }                                        
                }) 
            }, 500);
            }
        },
    }
</script>

<style scoped lang='less'>
.lend{
    min-height: calc(100vh-218px);
}   
.lend_record{   
    margin-bottom: 18px;
    .noList{
        padding-top: 20px;
        font-size: 26px;
        color: #848a93;
        border-bottom: none;
        justify-content: center;
        background: transparent;
    }
    li{
        background: #fff;
        border-bottom: 1px solid #eff2f7;
        padding: 0 40px;
        display: flex;   
        justify-content: space-between;         
        .head_portrait{
            width: 84px;
            height: 84px;
            line-height: 150px;
            margin-right: 18px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }
        .name_time{
            flex: 1;
            padding-top: 37px;
            .phone{
                font-size: 30px;
                color: #32363c;
                margin-bottom: 30px;
            }
            .time{
                font-size: 26px;
                color: #848a93;
            }
        }
        .money{
            line-height: 150px;
            font-size: 38px;
            color: #e0634e;
        }
    }
}
</style>