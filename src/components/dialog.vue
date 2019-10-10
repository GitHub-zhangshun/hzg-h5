<template>
<!-- 陕坝 -->
    <van-dialog v-model="show" :lock-scroll='true' :show-confirm-button='false'>
        <i class="icon iconfont icon-guanbi" @click='closeClick'></i>
        <div><img src="../assets/images/register-success.png"></div>
        <h1>和掌柜已接入陕坝银行资金存管</h1>
        <!-- <p>为了保证您的资金安全，您需要先开通银行存管账户，才能出借、充值、提现哦~<br><span>支持银行：{{bankList}}</span></p> -->
        <p>为了保证您的资金安全，您需要先开通银行存管账户，才能出借、充值、提现哦~</p>
        <button @click='open'>立即开通</button>
    </van-dialog>
</template>

<script>
import {indexApi} from'@/api/mine'
import { publicFun } from "@/libs/publicFun";
import { Toast } from "vant"
    export default {
        data() {
          return {
            show:true,
            // bankList:''
          };
        },       
        methods: {
          closeClick(){
            this.$emit('childClose',false)
          },
          open(){
            Toast.loading({
              mask: true,
              duration:0
            });
            indexApi.openAccountShanBa()
            .then(data=>{
              Toast.clear()
              sessionStorage.setItem('shanba','openAccount')
              localStorage.setItem("path",this.$route.fullPath)
              publicFun.redirectTripartite(data.result)                  
            })
            .catch( ()=>{
              Toast.clear()
              this.$emit('childClose',false)
            })
          }
        },
        mounted(){
          // indexApi.bankListByOperation().then(data=>{
          //     if(data.code==0){
          //         let a = ''
          //         for(let i = 0;i<data.result.length;i++){
          //             if(data.result[i].isShow){
          //                 a=a+`、${data.result[i].name}`
          //             }                        
          //         }
          //         this.bankList= a.slice(1)
          //     }
          // })
        }
    }
</script>

<style scoped lang='less'>
.van-dialog{
    width: 570px;   
    .van-dialog__content{
        position: relative;
        i{
            position: absolute;
            right: 20px;
            top: 20px;
            font-size:45px;
            color: #e3e3e3; 
        }
        &>div{
            padding: 80px 70px;
            border-bottom: none;
            img{
                width: 100%
            }
        }
        h1{
            font-size: 30px;
            color: #333;
            text-align: center;
        }
        p{
            margin: 36px 0;
            padding: 0 47px;
            color: #848a93;
            font-size: 28px;
            line-height: 1.5;
            text-align: left;
            max-height: 300px;
            overflow-y:auto;
            span{
                color: #000;
                font-weight: bold;
            }
        }
        button{
            margin-bottom: 60px;
            color: #fff;
            font-size: 32px;
            background: #ff4d2f;
            width: 490px;
            height: 88px;
            border-radius: 88px;
        }
    }     
}
</style>