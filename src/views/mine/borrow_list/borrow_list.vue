<template>
    <div>
        <div class="tab">
            <van-tabs  :line-width='27' color='#ff4e30' @click ='onclick' v-model="active">
                <van-tab v-for="(item, index) in list" :key="index" :title="item.title" ></van-tab>                       
            </van-tabs> 
        </div>        
        <borrowAll :key="index"></borrowAll>       
    </div>
</template>

<script>
import borrowAll from './borrow_all'
import{indexApi} from '@/api/mine'
   export default {
        components: {
            borrowAll,
        },
        data(){
            return{
                index:'',
                list:[],
                active: this.$route.query.index,
            }
        },
        created(){ 
            indexApi.statusListByTypeSimplify().then(data =>{ 
                this.list.push({title:"全部",id:1})
                for(let i = 0;i<data.result.length;i++){
                    this.list.push({
                        id:data.result[i].Id,
                        title:data.result[i].title,
                    });                
                }              
            })                         
        },
        methods:{
            onclick(index,title){
                this.index = title
                this.$router.replace({query:{id:this.list[index].id,index:index}})
            }
        },
    }
</script>

<style scoped lang='less'>
.tab{
    position: fixed;
    top: 0;
    height: 88px;
    width: 100%;
    z-index: 2
}
/deep/.van-tabs--line{
    // padding-top: 88px;
    .van-tabs__wrap{
        height: 88px;
        overflow: hidden;
        .van-tabs__nav{
            padding-bottom: 0;
            height: 88px;
            .van-tabs__line{
                bottom: 20px;
            }
            .van-tab{
                font-size: 30px; 
                color: #333;              
            }
            .van-tab--active{
                color: #ff4e30;
            }
        }
    }
}
</style>