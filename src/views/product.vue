<template>
    <div class="product">
        <!-- <div class="product_header" style="z-index:2">
            <div v-for="(item, index) in options" :key="index" :class="$route.path==item.path?'change':''" @click="getIndex(index);$router.push({path:item.path,query:{type:'product_list'}})">{{item.text}}<span></span></div>
            <button class='switch' v-if="showbtn" @click="$router.push('/switch_treasure')">切换宝码</button>
        </div> -->
        <div class="contain">
            <router-view v-on:listenToChildEvent="showMsgfromChild"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                Index:'',
                options:[
                    {text:'出借',path:'/product_list'},
                    // {text:'和宝',path:'/search_treasure'}
                ],
                showbtn:'',
            }
        },
        created(){
            if(localStorage.getItem('treasure_flag')=='yes'){
                this.showbtn=true;
            }
        },
        methods:{
            // getIndex(index){
            //     if(index==0){
            //         this.product_list='yes'
            //     }else{
            //         this.product_list='no'
            //     }
            // }, 
            // 接受子组件传来的值修改状态   
            showMsgfromChild(data){
                // this.showbtn=show;
                this.showbtn = data
            },            
        },
    }
</script>

<style scoped lang='less'>
.product{
    .product_header{
        position: fixed;
        top: 0;
        left: 0;
        padding: 20px 40px 40px;
        border-bottom: 2px solid #eff2f7;
        background: #fff;
        display: flex;
        width: 89.4%;
        justify-content: space-between;
        div{
            font-size: 36px;
            color: #848a93;
            padding-right: 40px;
        }
        div:nth-of-type(2){            
            padding-right: 0;
            flex: 1;
        }
        .switch{
            flex: 1;
            padding-right: 0;
            font-size: 30px;
            color: #32363c;
            background: transparent;
            text-align: right;
        }
        .change{
            font-size: 48px;
            color: #333;
            position: relative;
            span{
                position: absolute;
                border-radius: 200px;
                width: 54px;
                display: inline-block;
                left: 0;
                top: 60px;
                height: 6px;
                background: #ff4e30;
            }
        }
    }
    .contain{
        // padding-top: 107px;
        min-height: calc(100vh-207px)
    }
}
</style>