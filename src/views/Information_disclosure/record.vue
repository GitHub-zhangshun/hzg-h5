<template>
    <ul>
        <li>
            <p>备案登记地方金融监管部门</p>
            <p>天府新区成都管委会财政金融局</p>
        </li>
        <li>
            <p>备案登记时间</p>
            <p>备案完成后披露</p>
        </li>
        <li>
            <p>备案登记编号</p>
            <p>备案完成后披露</p>
        </li>
        <li>
            <p>电信业务经营许可信息</p>            
            <div>
                <div>
                    <img src="@/assets/images/Information_disclosure/info.png" alt="电信业务经营许可信息"  @click="show(0)">
                    <div v-transfer-dom>
                        <previewer :list="list" ref="previewer"></previewer>
                    </div>
                </div>                
            </div>
        </li>
        <li>
            <p>资金存管信息</p>
            <p>资金存管银行：陕坝银行<br>
                资金存管签约时间：2019-08-02 <br>
                资金存管全量业务上线时间：2019-10-09
            </p>
        </li>
        <li>
            <p>网站备案图标及编号</p>
            <p>备案完成后披露</p>
        </li>
        <li>
            <p>ICP备案图标及编号</p>
            <p>备案完成后披露</p>
        </li>
    </ul>
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
                    src: require('@/assets/images/Information_disclosure/info.png'),
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
 
<style scoped lang="less">
ul{
    margin-top: 20px;
    background: #fff;
    padding: 0 20px;
    li{
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 26px 0;
        p:nth-of-type(1){
            padding: 0 20px;
            width: 185px;
            line-height: 1.5;
            color:#888f97;
        }
        p:nth-of-type(2){
            flex: 1;
            text-align: left;
            line-height: 1.5;
        }
        &>div{
            flex: 1;
            div {
                width: 220px;
                img{
                    width: 100%;
                }
            }
            
        }
    }
    li:nth-of-type(2n){
        background-color: #f8f7f5;
    }
}




</style>