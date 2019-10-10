<template>
    <div class="borrow_result">
        <div class="img">
            <img :src="url">
        </div>
        <div class="font">
            <p v-if="result=='0'">出借成功!</p>
            <div v-if="result=='1'">
                <p>非常抱歉，出借失败</p>
                <p>失败原因：{{mess}}</p>
            </div>
        </div>
       <div class='btn' v-if="result=='0'">
            <x-button type="warn" @click.native="$router.push('/borrow_list')">查看记录</x-button>
            <x-button type="warn" @click.native="$router.push('/product_list')">继续出借</x-button>
        </div>
        <div class='btn' v-if="result=='1'">
            <x-button type="warn" @click.native="$router.push('/product_list')">查看其它产品</x-button>
            <x-button type="warn" @click.native="$router.go(-1)">重新出借</x-button>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import {XButton } from 'vux'
import { setTimeout } from 'timers';
    export default {
        data(){
            return{
                result:'',
                loading:true,
                mess:'',
                url:''
            }
        },
        components:{
            XButton
        },
        mounted(){
            if(this.$route.query.code==0){
                this.url = require('@/assets/images/icon_Success@2x.png')
                this.result = '0'
            }else{
                this.url = require('@/assets/images/icon_Failure@2x.png')
                this.result = '1'
                this.mess = this.$route.query.message
            }
        }
    }
</script>

<style scoped lang='less'>
.borrow_result{
    text-align: center;
    .img{
        width: 126px;
        height: 126px;
        margin: 126px auto 46px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .font{
        padding-bottom: 100px;
        &>p{
            font-size: 32px;
            color: #333;
            font-weight: bold;
        }
        &>div{
            p:first-child{
                font-size: 32px;
                color: #333;
                font-weight: bold;
                padding-bottom: 26px;
            }
            p:last-child{
                color: #848a93;
            }
        }
    }
    .btn{
        margin: 0 80px;
        display: flex;
        justify-content: space-between;
        .weui-btn{
            width: 274px;
            height: 88px;
            margin: 0;
            font-size: 32px;
        }
        .weui-btn:first-child{
            background: #cfd4da;
        }
        .weui-btn:last-child{
            background: #ff4e30;
        }
        .weui-btn:after{
            border:none;
        }
    }
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>