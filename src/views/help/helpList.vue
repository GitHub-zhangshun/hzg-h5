<template>
    <Collapse v-model="activeName" accordion>
        <CollapseItem v-for="(item, index) in list" :key="index" :title="item.title" :name="index" >
            <div v-html="item.content"></div>
        </CollapseItem>
    </Collapse>
        
</template>

<script>
import {help} from '@/libs/help'
import { Collapse, CollapseItem } from 'vant';
    export default {
        data(){
            return{
                list:[],
                activeName: '0'
            }
        },
        components:{
            Collapse,
            CollapseItem
        },
        mounted(){
            let index = this.$route.query.type
            this.list = help[index]
            document.title = this.$route.query.title
        }
    }
</script>

<style scoped lang='less'>
/deep/.van-collapse-item__content{
   background: transparent !important; 
   div{
       font-size: 24px;
       line-height: 1.5;
       text-align: justify;
       p{
           font-size: 24px;
           text-align: justify;
       }
   }
}
/deep/.van-collapse-item__wrapper{
    transition: all .3s;
    // transition: none
    // -webkit-transition: height .3s;
}
</style>