<template>
    <div class="circle-box">
        <div class="circle">
            <div class="big">
                <div class="small" :style="{color:fillStyle}">{{proportion}}%</div>
            </div>
            <div class="colorDiv" :style="{height:proportion+'%',background:fillStyle}"></div>        
        </div>
    </div>   
</template>

<script>
import {publicFun} from '@/libs/publicFun'
    export default {
        data(){
            return{
                fillStyle:''
            }
        },
        props:{
            showStatus:String,
            proportion:Number,
        },
        mounted(){
            switch(publicFun.Pl_simplify(this.showStatus)){
                case "bid_product_show_raise_underway":
                this.fillStyle = '#ff4e30'
                break;
                case "bid_product_show_raise_finish":
                this.fillStyle = '#6cc9b6'
                break;
                case "bid_product_show_repayment_underway" || "bid_product_show_repayment_underway":
                this.fillStyle = '#f09421'
                break;
                default:
                this.fillStyle = '#b3b6b9'
            }
        }
    }
</script>

<style scoped lang='less'>
.circle-box{
    width: 108px;
    height: 108px;
    border-radius: 100%;
    margin:0 auto 16px;
    overflow: hidden;
}
.circle{
    
    width: 108px;
    height: 108px;
    background: #c7c7c7;
    border-radius: 100%;
    position: relative;
    .big{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 94px;
        height: 94px;
        border: 4px solid #fff;
        background: transparent;
        border-radius: 100%;   
        z-index: 1;
        .small{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            width: 70px;
            height: 70px;
            background: #fff;
            border-radius: 100%;
            font-size: 24px;
            line-height: 70px;
            text-align: center;
        }    
    }    
    .colorDiv{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 108px;
        background: #ff4e30;
        // border-radius: 100%;
    }   
}
</style>