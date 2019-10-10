<template>
    <div class="to_bind">
        <group>
            <x-input title="用户名" placeholder="请设置6-10个字符的用户名" v-model="value" :max="10" :min="6"></x-input>
        </group>
        <div class="btn">
            <x-button type="warn" @click.native="getValid" :disabled='disabled' :class="disabled==true?'gary':''">确定</x-button>
        </div>
        <p>用户名仅支持大小写字母、数字和下划线,设置后不允许修改</p>
    </div>
</template>

<script>
import { XInput, Group, XButton} from 'vux'
import {indexApi} from '@/api/mine'
import { setTimeout } from 'timers';
import indexVue from '../../index.vue';
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
                this.disabled = true
                if(this.value.length>=6){
                    this.disabled = false
                }
            }
        },
        methods:{
            getValid () {
                let a = /^[0-9a-zA-Z_]{1,}$/
                if(a.test(this.value)){
                    indexApi.userAccountEdit(this.value).then(data =>{
                        let info = JSON.parse(localStorage.getItem("info"))
                        info.user.accountInfo.account = this.value
                        localStorage.setItem("info",JSON.stringify(info))
                        this.$toast("用户名设置成功")
                        this.$router.go(-1)                                             
                    }) 
                }else{
                    this.$toast({message:"用户名仅支持大小写字母、数字和下划线",duration:2000})
                }             
            },
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
            .weui-cell__ft{
                .weui_icon_warn{
                    display: none;
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
            background: #ced3d9;
        }
    }
    &>P{
        text-align: center;
        font-size: 22px;
        color: #000;
        padding-top: 60px;
    }
}
</style>