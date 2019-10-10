<template>
    <div class="set_pwd">
        <header> <p>找回交易密码</p> </header>
        <div class="contain">
            <p>手机号码：183****6893</p>
            <group class="pwd">
                <x-input placeholder='请输入验证码' class="weui-vcode" v-model="code">
                    <x-button slot="right" type="primary" mini @click.native="sendMessage" :class="disable001==true?'gary':''" :disabled="disable001">{{word}}</x-button>
                </x-input>
                <x-input type="password" placeholder="请设置6位纯数字的新交易密码" v-model="password"></x-input>
                <x-input v-model="password2" type="password" placeholder="请再次输入新交易密码"></x-input>
            </group>
        </div>
        <div class="btn">
            <x-button type="warn" @click.native="sure">确&nbsp;定</x-button>
        </div>
    </div>
</template>

<script>
import { XInput, Group,XButton,XDialog,} from 'vux'
    export default {
        components:{
            XInput, 
            Group,
            XButton,   
            XDialog                  
        },
        data(){
            return{
                code:'',
                password:'',
                password2:'',
                disable001:false,
                word:'发送验证码',
            }
        },
        methods:{
            sure(){
                var patrn = /^[0-9]{6}$/;
                if(this.code==''||this.password==''||this.password2==''){
                    alert('信息填写不完整')
                    // this.$vux.alert.show({
                    //     content: '信息填写不完整',
                    //     dialogTransition:'',
                    // })
                }else if (!patrn.test(this.password)) {
                    alert('交易密码为六位的纯数字')
                    // this.$vux.alert.show({
                    //     content: '交易密码为六位的纯数字',
                    //     dialogTransition:'',
                    // })
                }else if(this.password!=this.password2){
                    alert('两次密码不一致')
                    // this.$vux.alert.show({
                    //     content: '两次密码不一致',
                    //     dialogTransition:'',
                    // })
                }
            },
            sendMessage(){
                let time = 60,that=this;
                var sendTimer = setInterval(function(){
                    that.disable001 = true;
                    time--;
                    that.word = +time+'S';
                    if(time < 0){
                        that.disable001 = false;
                        clearInterval(sendTimer);
                        that.word = "获取验证码";
                    }
                },1000)
            }
        }
    }
</script>

<style scoped lang='less'>
.set_pwd {       
    margin-top: 18px;
    header {
        background: #fff;
        padding: 36px 0 68px;
        font-size: 32px;            
        color: #32363c;            
        font-weight: bold;
        p{
            padding-left: 38px;
            border-left: 4px #333333 solid;
        }
    }
    .contain { 
        background: #fff;       
        &>p{
            padding-left: 40px;
            line-height: 100px;
            border-bottom: 1px solid #eff2f7;
            font-size: 26px;
        }    
        .pwd{
            /deep/.weui-cells{
                margin-top: 0;
                .weui-cell:before{
                    left: 0;
                }
                .vux-x-input{
                    padding: 0 40px;
                    line-height: 100px;
                    font-size: 28px;
                    .weui-cell__ft{
                        .vux-input-icon::before{
                            content: "\EA0B";
                        }
                        .weui-btn_primary{
                            background: #fff;
                            color: #ff4e30;
                            padding: 0;
                            font-size: 28px;
                        }
                        .weui-btn_primary::after{
                            border: none;
                        }
                        .gary{
                            color: #848a93;
                        }
                    }
                    .weui-cell__bd{
                        .weui-input{
                            font-size: 28px;
                        }
                    }
                }
            }
            /deep/.weui-cells::before{
                border-top:none; 
                left: 0;
            }
            /deep/.weui-cells::after{
                border-bottom:none; 
            }
        }
    }
    .btn{
        padding: 100px 40px 36px;
        .weui-btn{
            height: 88px;
            background: #ff4e30;
            font-size: 32px;
        }
        .weui-btn:after{
            border: none;
        }
    }
}
</style>
