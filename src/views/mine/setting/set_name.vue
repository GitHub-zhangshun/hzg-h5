<template>
    <div class="to_bind">
        <group>
            <x-input title="昵称" placeholder="请设置1-10个字符的昵称" v-model="value" :max="10"></x-input>
        </group>
        <div class="btn">
            <x-button type="warn" @click.native="getValid" :disabled='disabled' :class="disabled==true?'gary':''">确定</x-button>
        </div>
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
                if(this.value==''){
                    this.disabled = true
                }else if(this.value.length>10){
                    this.$toast('超出10个字符长度')
                }else{
                    this.disabled = false
                }
            }
        },
        methods:{
            getValid () {
                indexApi.userEditNickName(this.value).then(data =>{
                    let info = JSON.parse(localStorage.getItem("info"))
                    info.user.nickName = this.value
                    localStorage.setItem("info",JSON.stringify(info))
                    this.$toast("昵称修改成功")
                    this.$router.go(-1)                                           
                })             
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
}
</style>