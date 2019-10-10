<template>
    <div>
        <div class="tips">
            <van-tabs  :line-width='27' :offset-top="0" sticky color='#ff4e30' @click ='onclick' v-model="active">
                <van-tab v-for="(item, index) in list" :key="index" :title="item.title" ></van-tab>            
            </van-tabs>  
        </div>       
        <moneyAll :key="currentTitle"></moneyAll>      
    </div>
</template>

<script>
import moneyAll from './money_all'
import{indexApi} from '@/api/mine'
   export default {
        components: {
            moneyAll,
        },
        data(){
            return{
                currentTitle:'',
                list:[],
                active: this.$route.query.index,

            }
        },
         created(){ 
            indexApi.capitalTypeList().then(data =>{ 
                this.list.push({title:"全部",id:1})
                for(let i = 0;i<data.result.length;i++){
                  if(data.result[i] && data.result[i].remark!=null){
                    this.list.push({
                        title:data.result[i] && data.result[i].remark,
                        id:data.result[i] && data.result[i].Id,
                        simplify:data.result[i] && data.result[i].simplify
                    });
                  }         
                }               
            })               
        },
        mounted(){
        },
        methods:{
            onclick(index,title){
                this.currentTitle = title
                this.$router.replace({query:{id:this.list[index].id,index:index}})
            }
        },
    }
</script>

<style scoped lang='less'>
.tips{
    position: fixed;
    height: 88px;
    top: 0;
    width: 100%;
    z-index: 2
}
/deep/.van-tabs--line{
    padding-top: 88px;
    .van-tabs__wrap{
        height: 88px;
        overflow: hidden;
        .van-tabs__nav{
            padding-bottom: 0;
            height: 98px;
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