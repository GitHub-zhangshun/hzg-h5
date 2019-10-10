<template>
    <!-- 公告详情 -->
    <div class="announcementDetails">
        <h1 v-if="(this.$route.query.title==='用户协议' || this.$route.query.title==='出借协议')?true:false">{{title}}</h1>
        <div class="content" v-html="content" :class="this.$route.query.title==='用户协议'?'padding':''">{{content}}</div>
    </div>
</template>

<script>
import {indexApi} from "@/api/index"
    export default {
        data(){
            return{
                title:"",
                content:""
            }
        },
        created(){
            document.title = this.$route.query.title
        },
        mounted(){            
            indexApi.articleInfo(this.$route.query.id).then(data=>{
                this.title=data.result.title;
                this.content= data.result.content;              
            })
        }
    }
</script>

<style scoped lang='less'>
.announcementDetails{
    margin-top: 18px;
    background: #fff;
    padding-bottom: 20px;
    h1{
        padding: 42px 0 50px;
        text-align: center;
        color: #32363c;
        font-size: 32px;
    }
    .padding{
        padding-top: 50px !important;
    }
    .content{
        padding: 0 44px;
        font-size: 28px;
        color: #848a93;
        line-height: 1.5;
        /deep/p{
            img{
                width: 100%!important;
            }
        }
    }
}

</style>