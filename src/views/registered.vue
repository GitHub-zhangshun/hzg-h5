<template>
    <div class="registered">
        <div class="background"></div>
        <h1>注册成功</h1>
        <p class="welcome">欢迎成为和掌柜大家庭{{count}}成员。<br/>为保证资金安全，请开通你的银行存管账户</p>
        <div class="backImg"><img src="../assets/images/register-success.png"></div>
        <x-button type="warn" @click.native="openAccount" :show-loading="show_loading" :disabled="disabled">前往开通</x-button>
        <p @click="$router.push('/my')" class="toIndex">暂不开通</p>
    </div>
</template>

<script>
import { XButton} from 'vux'
import {indexApi} from '@/api/mine'
import { publicFun } from '@/libs/publicFun'
    export default {
        components: {
            XButton,
        },
        data(){
            return{
                count:'',
                show_loading:false,
                disabled:false
            }
        },
        methods:{
            openAccount(){
                this.show_loading = true
                this.disabled = true
                indexApi.openAccountShanBa()
                .then( data => {
                    this.show_loading = false
                    this.disabled = false
                    sessionStorage.setItem('shanba','openAccount')
                    publicFun.redirectTripartite(data.result)
                })
                .catch( () => {
                    this.show_loading = false
                    this.disabled = false
                })
            }
        },
        mounted(){
            indexApi.investorRegisterCount().then((data)=>{
                this.count = data.result?`第${data.result}位`:''
            })
        },
    }
</script>

<style scoped lang='less'>
.registered{
    .background{
        position: absolute;
        height: 100%;
        width: 100%;
        background: #fff;
        z-index: -1;
    }
    h1{
        padding: 100px 0 40px 40px;
        font-size: 60px;
        color: #333;
    }
    .welcome{
        font-size: 30px;
        color: #565c63;
        padding: 0 40px 184px 40px;
        line-height: 1.5;
    }
    .backImg{
        padding: 0 70px 188px;
        img{
            width: 100%;
            height: 100%;
            
        }
    }
    .weui-btn{
        height: 88px;
        width: 670px;
        font-size: 32px;;
        color: #fff;
        background: #ff4e30;
    }
    /deep/.weui-loading{
        width: 40px;
        height: 40px;
    }
    .toIndex{
        padding-top: 40px;
        color: #848a93;
        font-size: 28px;
        text-align: center;
        span{
            color: #363739;
        }
    }
}

</style>