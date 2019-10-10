<template>
    <ul>
        <li class="touch" v-for="(item, index) in list" :key="index" @click="$router.push({path:'/helpList',query:{type:item.query,title:item.title}})">
            <p>{{item.title}}</p>
            <i class="icon iconfont icon-qianjin"></i>
        </li>
    </ul>
</template>

<script>
    export default {
        data(){
            return{
                list:[
                    {
                        title:'注册与开户',
                        query:'registerAndSigning'
                    },
                    {
                        title:'充值与提现',
                        query:'topAndWithdrawal'
                    },
                    {
                        title:'账户与密码',
                        query:'accountSecurity'
                    },
                    {
                        title:'其他问题',
                        query:'otherProblems'
                    }
                ]
            }
        }
    }
</script>

<style scoped lang='less'>
ul{
    // margin-top: 20px;
    li{
        background: #fff;       
        padding: 40px;
        border-bottom: 1px solid #eff2f7;
        display: flex;
        p{
            flex:1;
            font-size: 28px;
        }
        i{
            color: #75889e;
        }
    }
}
</style>