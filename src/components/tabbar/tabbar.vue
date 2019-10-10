<template>
    <div>
        <router-view></router-view>
        <tabbar>
            <tabbar-item :selected="this.$route.path =='/index'" link='/index'>
                <img slot="icon" src="../../assets/images/tabbar/home_icon@2x.png">
                <img slot="icon-active" src="../../assets/images/tabbar/home_icon_select@2x.png">
                <span slot="label" class="active">首页</span>
            </tabbar-item>
            <tabbar-item :selected="this.$route.path =='/product_list'||this.$route.path =='/search_treasure'" :link="{path:'/product',query:{type:'product_list'}}">
                <img slot="icon" src="../../assets/images/tabbar/list_icon@2x.png">
                <img slot="icon-active" src="../../assets/images/tabbar/list_icon_select@2x.png">
                <span slot="label">出借</span>
            </tabbar-item>
            <tabbar-item :selected="this.$route.path =='/my'" link='/my'>
                <img slot="icon" src="../../assets/images/tabbar/mine_icon@2x.png">
                <img slot="icon-active" src="../../assets/images/tabbar/mine_icon_select@2x.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar> 
    </div>  
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
    data(){
        return{

        }
    },
    components: {
        Tabbar,
        TabbarItem,
    },
}
</script>

<style scoped lang='less'>
.weui-tabbar{
    height: 100px;
    position:fixed;
    bottom: 0;
    background: #fff;
    .weui-tabbar__item{
        /deep/.weui-tabbar__icon{
            width: 52px;
            height: 52px;
        }
        .weui-tabbar__label{
            span{
                font-size: 28px;
            }
        }
    }  
    /deep/.weui-bar__item_on{
        .weui-tabbar__label{
            color: #000;
        }
    } 
}
</style>