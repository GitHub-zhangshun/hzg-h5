<template>
    <div class="product_info">
        <div class="details" v-for="(item, index1) in list" :key="index1">        
            <header><span>{{item.title}}</span></header>
            <div class="borrower_description">
                <p>{{item.content}}</p> 
                <!-- <swipervue :imgList="item.url"></swipervue>   -->
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(url, index) in item.url" :key="index" @click="looKImg(index1,index)">
                            <img :src="url" style="width:200px;height:100px;border-radius:8px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import { setTimeout } from 'timers';
import { ImagePreview } from 'vant';
export default {
    data(){
        return{    
            list:[],
        }
    },
    props:{
        dynamic:Array
    },
    watch:{
        dynamic(){
            this.info()
        }
    },
    methods:{
        info(){
            this.list =[]
            for(let i = 0; i<this.dynamic.length;i++){
                this.list.push({
                    title : this.dynamic[i].title,
                    content : this.dynamic[i].content,
                    url:this.dynamic[i].imgLinkList,                   
                })  
            }
        },
        looKImg(index1,index){
            ImagePreview([
                this.list[index1].url[index]
            ]);
        }
    },
    mounted(){
        this.info()
        setTimeout(()=>{
            var mySwiper = new Swiper('.swiper-container', {
                slidesPerView: 1.59,
                spaceBetween: 20,
                freeMode: true,
                slidesOffsetAfter : 10,
            })
        },100)
        
    },
}
</script>

<style scoped lang='less'>
@import 'swiper/dist/css/swiper.min.css';
 .product_info{  
    min-height: calc(100vh-218px);
    .details{
        background-color: #fff;
        margin-bottom: 18px;
        header{
            line-height: 100px;
            font-size: 32px;
            color: #32363c;
            font-weight: bold;
            border-bottom: 2px solid #eff2f7;
            span{
                border-left: 4px solid #32363c;
                padding-left: 36px;
            }
        }
        .borrower_description{
            padding: 32px 40px 46px;
            color: #848a93;
            font-size: 28px;
            p{
                line-height: 54px;
            }
            
        }
    }
}
</style>