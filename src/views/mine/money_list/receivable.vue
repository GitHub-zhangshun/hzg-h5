<template>
    <ul class="money_all">
        <li v-for="(item, index) in list" :key="index" @click="$router.push('/money_record')">
            <h1>{{item.date}}</h1>
            <section v-for="(item, index) in item.section" :key="index">
                <div>
                    <span>{{item.title}}</span>
                    <span>{{item.money1}}</span>
                </div>
                <div>
                    <span>{{item.list_date}}</span>
                    <span>账户余额：{{item.money}}</span>
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
                        date:'2018/07',
                        section:[
                            {
                                title:'回款',
                                money1:'+0.12',
                                list_date:'2017/07/12  13:38',
                                money:'896.12'
                            },
                            {
                                title:'回款',
                                money1:'+0.12',
                                list_date:'2017/07/12  13:38',
                                money:'896.12'
                            }
                        ]
                    },
                    {
                        date:'2018/06',
                        section:[
                            {
                                title:'回款',
                                money1:'+0.12',
                                list_date:'2017/07/12  13:38',
                                money:'896.12'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style scoped lang='less'>
.money_all{
    
    li{
        h1{
            padding: 0 40px;
            line-height: 70px;
            font-size: 30px;
        }
        section{
            padding: 36px 40px 30px;
            background: #fff;
            border-bottom: 1px solid #eff2f7;
            div{
                display: flex;
                justify-content: space-between;
            }
            div:nth-of-type(1){
                padding-bottom: 34px;
                span:nth-of-type(1){
                    font-size: 30px;
                }
                span:nth-of-type(2){
                    font-size: 32px;
                    color: #ff4e30;
                }
            }
            div:nth-of-type(2){
                color: #848a93;
                span:nth-of-type(1){
                    font-size: 26px;
                }
                span:nth-of-type(2){
                    font-size: 28px;
                }
            }
        }
    }
}

</style>