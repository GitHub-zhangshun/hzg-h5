<template>
    <div>
        <div class="page403"><img src="../assets/images/page_error/page404.png" alt=""></div>
        <p>网页未找到，返回上一页</p>
        <div style="text-align:center">
            <button @click="submit">上一页</button>
        </div>
        
    </div>
</template>

<script>
    export default {
        methods:{
            submit(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang='less'>
div{
    .page403{
        width: 346px;
        height: 228px;
        margin:200px auto 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    p{
        text-align: center;
        font-size: 28px;
        line-height: 100px;
        color: #8d9095;
    }
    button{
        width: 380px;
        height: 80px;
        line-height: 60px;
        border: 1px solid #8d9095;
        font-size: 32px;
        background: transparent;
        border-radius: 60px;
        color: #8d9095;
    }
}

</style>