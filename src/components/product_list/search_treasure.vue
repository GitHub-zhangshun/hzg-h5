<template>
    <!-- 和宝 -->
        <div class="treasure">
            <div class="treasure_contain" v-if="treasure_flag=='no'" >
                <div class="input">
                    <div class="input-wrapper">
                        <input type="number" v-model="treasure_code">
                        <label v-if="placehold">请输入和宝码进行查看</label>
                    </div>
                </div>
                <div class='btn'>
                    <x-button type="warn" :disabled="disabled" @click.native='submit'>确定</x-button>
                </div>
            </div>
            <list v-if="treasure_flag=='yes'"></list>             
        </div>

</template>

<script>
import { XInput, Group,XButton } from 'vux'
import list from './treasure_list'
import {indexApi} from '@/api/product'
    export default {
        data(){
            return{
                treasure_code:'',
                // 确定按钮禁用
                disabled:true,
                treasure_flag:'',
                showbtn:true,
                placehold:true
            }
        },
        watch:{
            // 检测输入字符的长度
            treasure_code(){
                this.placehold = true
                this.disabled=true;
                if(this.treasure_code!=''){
                    this.placehold = false
                    this.disabled=false;
                }
            }
        },
        created(){            
            if(localStorage.getItem('treasure_flag')==null||localStorage.getItem('treasure_flag')!="yes"){
                this.treasure_flag='no'
            }else{
                this.treasure_flag = localStorage.getItem('treasure_flag')
            }
        },
        methods:{
            // 提交
            submit(){
                indexApi.productListByTreasure(this.treasure_code).then(data =>{
                    if(data.code==0){
                        this.$emit("listenToChildEvent",this.showbtn)
                        this.treasure_flag='yes'
                        localStorage.setItem('treasure_flag',this.treasure_flag)   
                        localStorage.setItem('hebao',this.treasure_code)   
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }                        
                }) 

            },
        },
        components: {
            Group,
            XButton,
            list
        },
    }
</script>

<style scoped lang='less'>
.treasure{
    .treasure_contain{
        margin: 280px 40px 0;
        background: #fff;
        .input{
            padding: 120px 40px 0;            
            .input-wrapper{
                position: relative;
                border-bottom: 1px solid #D3D6DB;
                input{
                    width: 100%;
                    font-size: 60px;
                    color: #333;
                }
                label{
                    font-size: 28px;
                    color: #afb5bc;
                    position:absolute;
                    top: 50%;
                    transform:translateY(-50%)
                }
            }
        }
        &>.btn{
            padding: 80px 40px 40px;
            .weui-btn{
                width: 590px;
                height: 88px;
                font-size: 32px;
                background: #ff4e30;

            }
            .weui-btn::after{
                border: none;
            }
            .weui-btn_disabled{
                background: #cfd4da;
                color: #fff;
            }
        }
    }
}
</style>
