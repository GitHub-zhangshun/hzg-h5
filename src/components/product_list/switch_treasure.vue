<template>
    <!-- 和宝 -->
        <div class="treasure" style="border: 1px solid rgba(0,0,0,0)">
            <div class="treasure_contain">
                <div class="input">
                    <div class="input-wrapper">
                        <input type="number" v-model="treasure_code">
                        <label v-if="placehold">请输入和宝码进行查看</label>
                    </div>
                </div>
                <div class='btn'>
                    <x-button type="warn" @click.native='back'>取消</x-button>
                    <x-button type="warn" @click.native='submit'>确定</x-button>
                </div>
            </div>            
        </div>

</template>

<script>
import { XInput, Group,XButton } from 'vux'
import {indexApi} from '@/api/product'
    export default {
        data(){
            return{
                treasure_code:'',
                key:1,
                placehold:true
            }
        },
        watch:{
            // 检测输入字符的长度
            treasure_code(){
                this.placehold = true
                if(this.treasure_code!=''){
                    this.placehold = false
                }
            }
        },
        methods:{
            // 提交
            submit(){
                var reg = /^\d{6}$/;
                if (reg.test(this.treasure_code)) {
                    indexApi.productListByTreasure(this.treasure_code).then(data =>{
                        if(data.code==0){
                            localStorage.setItem('hebao',this.treasure_code) 
                            this.$router.push('/search_treasure')                          
                        }else{
                            this.$toast({message:data.message,duration:2000})
                        }                        
                    })                   
                } else {
                    this.$toast({message:"请输入6位数字宝码",duration:2000})
                }
            },
            back(){
                this.$router.go(-1);
            }
        },
        components: {
            XInput,
            Group,
            XButton,
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
            display: flex;
            justify-content: space-between;
            .weui-btn{
                width: 274px;
                height: 88px;
                font-size: 32px;
                background: #ff4e30;
                margin: 0;

            }
            .weui-btn:first-child{
                background: #cfd3d9;
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
