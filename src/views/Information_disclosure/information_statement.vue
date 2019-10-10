<template>
    <div class="Information_disclosure">
        <img class="previewer-demo-img" v-for="(item, index) in list" :key="index" :src="item.src" width="100" @click="show(index)">
        <div v-transfer-dom>
            <previewer :list="list" ref="previewer"></previewer>
        </div>
    </div>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
    export default {
        directives: {
            TransferDom
        },
        components: {
            Previewer
        },
        methods: {
            show (index) {
                this.$refs.previewer.show(index)
            }
        },
        data(){
            return{
                list: [{
                    src: require('@/assets/images/Information_disclosure/shenmin.jpg'),
                }],
                options: {
                    getThumbBoundsFn (index) {
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        let rect = thumbnail.getBoundingClientRect()
                        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
                    }
                }
            }
        },
    }
</script>

<style scoped lang='less'>
.Information_disclosure{
    padding: 0 40px;
    background: #fff;
    height: calc(100vh - 88px);
    img{
        width: 100%;
        height: 100%;
    }
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