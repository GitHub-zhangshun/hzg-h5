<template>
<!-- 福利中心 -->
    <div class="welfare_centre">
        <ul>
            <li v-if="flag == 2" v-for="(item, index) in list" :key="index" @click="jump(item.link)">
                <div class="img">
                    <img :src="item.banner" alt="">
                </div>
                <div class="right">
                    <div class="content">
                        <p>{{item.name}}</p>
                        <p>{{item.describe}}</p>
                    </div>
                    <i class="icon iconfont icon-qianjin"></i>
                </div>
            </li>
            <li class="no_list" v-if="flag == 1">
                <div>
                    <img src="@/assets/images/my/no_welfare.png" alt="">
                </div>
                <p>暂无活动，敬请期待~~</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { indexApi } from '@/api/mine'
    export default {
        data(){
            return{
                list:[],
                flag:0
            }
        },
        created(){
            indexApi.activityListByWhere()
            .then( data => {
                if(data.result.length == 0){
                    this.flag = 1
                }else{
                    this.flag = 2
                    data.result.forEach(item => {
                        this.list.push({
                            name:item.name,
                            describe:item.describe,
                            link:item.h5Link,
                            banner:item.banner,
                        })
                    })
                }
                
            })
        },
        methods:{
            jump(n){
                window.location.href = n
            }
        }
    }
</script>

<style scoped lang="less">
.welfare_centre{
    ul{
        li{
            display: flex;
            justify-content: space-between;
            padding-left: 30px;
            padding-top: 36px;
            .img{
                width: 104px;
                height: 104px;
                margin-right: 22px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                flex: 1;
                display: flex;
                justify-content: space-between;
                border-bottom: 2px solid #e3e3e3;
                // align-items: center;
                padding-right: 21px;
                .content{
                    padding-right: 30px;
                    p:nth-of-type(1){
                        padding-bottom: 24px;
                        font-size: 32px;
                        font-weight: bold;
                    }
                    p:nth-of-type(2){
                        font-size: 26px;
                        color: #83878b;
                        line-height: 1.5;
                        padding-bottom: 27px;
                    }
                }
                i{
                    padding-top: 54px;
                }
            }
        }
        .no_list{
            padding-left: 0;
            display: flex;
            flex-flow: column;
            align-items: center;
            div{
                margin-top: 44px;
                width: 353px;
                height: 412px;
                margin-bottom: 60px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            p{
                color: #333333;
                font-size: 32px;
            }
        }
    }
}
</style>