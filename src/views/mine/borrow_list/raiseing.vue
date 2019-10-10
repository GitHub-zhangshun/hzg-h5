<template>
    <ul class="borrow_all">
        <li v-for="(item, index) in list" :key="index" @click="$router.push('/borrow_record')">
            <header>
                <div class="title">{{item.title}}</div>
                <span class="time">产品发布日期:{{item.time}}</span>
            </header>
            <section>
                <div class="left">
                    <p>{{item.money}}</p>
                    <span>出借余额</span>
                </div>
                <div class="rightred">
                    {{item.raise}}
                </div>
            </section>
        </li>
    </ul>
</template>

<script>
    export default {
        data(){
            return{
                 list:[
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    },
                    {
                        title:'车融宝111号',
                        time:'2018-09-10',
                        money:'1000.00',
                        raise:'募集中'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang='less'>
.borrow_all{
    padding: 18px 20px 0;
    li{
        background: #fff;
        border-radius: 20px;
        margin-bottom: 18px;
        header{
            border-bottom: 1px solid #eff2f7;
            padding: 0 34px;
            display: flex;
            justify-content: space-between;
            line-height: 90px;
            .title{
                font-size: 32px;
            }
            .time{
                font-size: 24px;
                color: #848a93;
            }
        }
        section{
            padding: 46px 34px;
            display: flex;
            justify-content: space-between;
            .left{
                p{
                    font-size: 46px;
                    color: #ff4e30;
                    padding-bottom: 20px;
                }
                span{
                    font-size: 24px;
                    color: #848a93;
                }
            }
            .rightred{
                font-weight: bold;
                font-size: 32px;
                line-height: 90px;
                color: #ff4e30;

            }
        }
    }
}
</style>