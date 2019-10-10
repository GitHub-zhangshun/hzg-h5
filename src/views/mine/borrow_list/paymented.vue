<template>
    <div>
        <img v-for="(item, index) in list" :key="index" :src="item.src" alt='合同详情' @click="show(index)">
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
                    src: '',
                }]
            }
        },
        mounted(){
            this.list[0].src = this.$route.query.contractLink
        }
    }
</script>

<style scoped lang='less'>
div{
    width: 100%;
    img{
        width: 100%;
    }
}
/deep/.pswp__top-bar{
    display: none;
}
</style>