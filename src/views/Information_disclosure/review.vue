<template>
    <div class="review">
        <header><span>审计报告</span></header>
        <div class="contain">
            <p class="content">为进一步加强平台透明化建设与信息公示披露，和掌柜依据《中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知》，将我司各项审查报告披露如下，欢迎点击查看。</p>
        </div>
        <header><span>年度年报审计报告</span></header>
        <div class="swiper">
            <swiper :options="swiperOption">
                <swiper-slide>
                    <div>
                        <img class="previewer-demo-img" src="@/assets/images/Information_disclosure/reviewImg/LAC.jpg" @click="show(0)">
                    </div>
                    <p style="text-align:center">2017年度</p>
                </swiper-slide>  
            </swiper>
        </div>
        <header><span>经营合规重点环节的审计结果</span></header>
        <div class="swiper">
            <swiper :options="swiperOption">
                <swiper-slide><p style="text-align:center" class="ongoing">进行中</p></swiper-slide>  
            </swiper>
        </div>
        <header><span>合规性审查报告</span></header>
        <div class="swiper">
            <swiper :options="swiperOption">
                <swiper-slide><p style="text-align:center" class="ongoing">进行中</p></swiper-slide>  
            </swiper>
        </div>
        <div v-transfer-dom>
            <previewer :list="list" ref="previewer"></previewer>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Previewer, TransferDom } from 'vux'
    export default {
        directives: {            
            TransferDom
        },
        components: {
            Previewer,
            swiper,
            swiperSlide,
        },
        methods: {
            show (index) {
                this.$refs.previewer.show(index)
            }
        },
        data(){
            return{
                swiperOption: {
                    slidesPerView: 1.6,
                    spaceBetween: 20,
                    freeMode: true,
                    centeredSlides: true,
                },
                list:[
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0001.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0002.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0003.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0004.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0005.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0006.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0007.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0008.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0009.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0010.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0011.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0012.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0013.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0014.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0015.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0016.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0017.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0018.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0019.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0020.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0021.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0022.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0023.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0024.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0025.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0026.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0027.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0028.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0029.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0030.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0031.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0032.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0033.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0034.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0035.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0036.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0037.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0038.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0039.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0040.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0041.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0042.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0043.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0044.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0045.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0046.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0047.jpg')},
                    {src:require('@/assets/images/Information_disclosure/reviewImg/LAC0048.jpg')},
                ],
            }
        },
    }
</script>

<style scoped lang="less">

.review{
    margin-top: 20px;
    header{        
        background: #fff;
        line-height: 100px;
        border-bottom: 1px solid #F0F1F3;    
        span{
            color:#34373C;
            border-left: 4px solid #323232;
            padding-left: 40px; 
            font-weight: bold;
            font-size: 30px;
        }
    }
    .contain{
        background: #fff;
        margin-bottom: 20px;
        padding: 50px 40px;
        .content{
            text-indent: 56px;
            font-size: 28px;
            color: #868B87;
            line-height: 2;
        }          
    }
    .swiper{
        background: #fff;
        padding: 50px 40px;
        .swiper-container{
            .swiper-wrapper{
                .swiper-slide{   
                    div{
                        width: 400px;
                        height: 560px;
                        border: 1px solid #EFF3F6;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    p{
                        line-height: 2;
                        font-size: 30px;
                    }
                    .ongoing{
                        width: 400px;
                        height: 560px;
                        border: 1px solid #EFF3F6;
                        line-height: 560px;
                        color: #808080;
                    }
                }
            }
        }       
    }
}
.swiper-container{
    z-index: 0;
}
.pswp__button{
    width: 100px;
    height: 100px;
}
/deep/.pswp__counter{
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 50%;
    transform:translateX(-50%);
}
/deep/.pswp__button{
    display: none;
}
/deep/.pswp__top-bar{
    background: transparent;
}

</style>