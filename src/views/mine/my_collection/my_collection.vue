<template>
    <div>
        <tab :line-width=2 active-color='#ff4e30' v-model="index">
            <tab-item @click.native="$router.replace({path:'/my_collectioning',query:{type:'repayment_plan_waiting'}})" :selected="this.$route.path =='/my_collectioning'">待回款</tab-item> 
            <tab-item @click.native="$router.replace({path:'/my_collectioned',query:{type:'repayment_plan_success'}})" :selected="this.$route.path =='/my_collectioned'">已回款</tab-item> 
        </tab>
        <router-view></router-view>
    </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
   export default {
        components: {
            Tab, 
            TabItem,
        },
        data(){
            return{
                index:0,
            }
        },
    }
</script>

<style scoped lang='less'>
.vux-tab-wrap{
    padding-top: 88px;
    /deep/.vux-tab-container{
        position: fixed;
        z-index: 999;
        height: 88px;
        .vux-tab{
            height: 88px;
            .vux-tab-item{
                height: 88px ;
                line-height: 88px!important;
                font-size: 30px!important;
            }
            .vux-tab-ink-bar{
                bottom: 10px;
                width: 56px;
                margin-left: 21%;
            }
        }
    }
}

</style>