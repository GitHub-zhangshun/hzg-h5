<template>
    <div v-html="content"></div>
</template>

<script>
import {help} from '@/libs/help'
    export default {
        data(){
            return{
                content:''
            }
        },
        mounted(){
            document.title = this.$route.query.title
            this.content = help[this.$route.query.type][this.$route.query.index].content
        }
    }
</script>

<style scoped lang="less">
div{
    line-height: 1.5;
    padding: 40px 40px 0;
    text-align: justify
}
</style>