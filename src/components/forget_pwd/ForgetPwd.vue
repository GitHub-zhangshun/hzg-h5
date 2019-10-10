<template>
    <p class="forger_pwd"><span @click="click">忘记密码</span></p>
</template>

<script>
    export default {
        data(){
            return{
                flag:''
            }
        },
        methods:{
            click(){
                if(!localStorage.getItem('token')){
                    this.$router.push('/forget_pwd')
                }else{
                    this.$router.push({path:'/forget_pwd_login',query:{from:this.$route.name}})
                }
            }           
        }
    }
</script>

<style lang='less'>
</style>