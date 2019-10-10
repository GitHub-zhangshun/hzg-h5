<template>
    <div class="to_bind">
        <group>
            <x-input title="邀请人手机号" placeholder="请输入邀请人手机号" v-model="value" type="tel"></x-input>
        </group>
        <div class="btn">
            <x-button type="warn" @click.native="getValid" :disabled="disabled" :class="disabled==true?'gary':''">确定</x-button>
        </div>
        <p>绑定之后您的邀请人可能会知悉您的部分购买信息</p>
    </div>
</template>

<script>
import { XInput, Group, XButton} from 'vux'
import { publicFun } from '@/libs/publicFun'
import { indexApi } from '@/api/mine'
import { setTimeout } from 'timers';
    export default {
        components: {
            XInput,
            XButton,
            Group,
        },
        data(){
            return{
                value:'',
                disabled:true
            }
        },
        watch:{
            value(){
                if(this.value==''){
                    this.disabled = true
                }else{
                    this.disabled = false
                }
            }
        },
        methods:{
            getValid(){
                if(!publicFun.checkPhone(this.value)){
                    this.$toast({message:'手机号格式不正确',duration:1000})
                }else{
                    indexApi.investorSetInviter(this.value).then(data=>{
                        if(data.code==0){
                            this.$toast({message:'绑定成功',duration:2000})
                            this.$router.go(-1)
                        }else{
                            this.$toast({message:data.message,duration:1000})
                        }
                    })
                }               
            }
            
        }
    }
</script>

<style scoped lang='less'>
.to_bind{
    margin-top: 18px;
    /deep/.weui-cells{
        line-height: 100px;
        padding: 0 40px;
        margin-bottom: 100px;
        .vux-x-input{
            .weui-cell__hd{
                .weui-label{
                    font-size: 28px;
                }
            }
            .weui-cell__primary{
                .weui-input{
                    font-size: 28px;
                }
            }
        }
    }
    .btn{
        padding: 0 40px;
        .weui-btn{
            height: 88px;
            background: #ff4e30;
            font-size: 32px;
        }
        .weui-btn:after{
            border: none;
        }
        .gary{
            color: #fff;
            background: #cfd4da;
        }
    }
    &>P{
        text-align: center;
        font-size: 26px;
        padding-top: 46px;
        color: #848a93;
    }
}
/deep/.vux-input-icon::before{
    content: "\EA0B"!important
}
</style>