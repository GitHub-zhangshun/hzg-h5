<template>
    <div class="limit_info">
        <ul class="header" v-for="(item, index) in list" :key="index">
            <li><div><img :src="item.icoLink"></div></li>
            <li>
                <p><span>{{item.bankFname}}</span></p>
                <p>{{item.singleQuota}}{{item.dayQuota}}{{item.monthQuota}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import {indexApi} from "@/api/mine"
    export default {
        data(){
            return{
                list:[],
            }
        },
        mounted(){
            indexApi.bankListByOperation().then(data=>{
                for(let i = 0;i<data.result.length;i++){
                    this.list.push({
                        bankFname :data.result[i].name,
                        icoLink :data.result[i].icoLink,
                        dayQuota :Number(data.result[i].dayQuota)>=10000?`，单日限额${Number(data.result[i].dayQuota)/10000}万元`:`，单日限额${data.result[i].dayQuota}元`,
                        singleQuota :Number(data.result[i].singleQuota)>=10000?`单笔限额${Number(data.result[i].singleQuota)/10000}万元`:`单笔限额${data.result[i].singleQuota}元`,
                        monthQuota:data.result[i].monthQuota && (Number(data.result[i].monthQuota)>=10000?`，单月限额${Number(data.result[i].monthQuota)/10000}万元`:`，单月限额${data.result[i].monthQuota}元`) || '' 
                    })
                }
            })
        }
    }
</script>

<style scoped lang='less'>
.limit_info{
    margin-top: 18px;
    .header{
        background: #fff;
        border-bottom: 1px solid rgb(242,242,244);
        padding: 30px 0 30px 40px;
        display: flex;
        justify-content: space-between;
        li:first-child{
            div{
                padding-right: 40px;
                width: 72px;
                height: 72px;
                img{
                    width: 100%;
                    height: 100%;
                    
                }
            }
            
        }
        li:last-child{
            flex: 1;
            p:first-child{
                padding-bottom: 22px;
                font-size:  32px;
                display: inline-block;
                display: flex;
                padding-right: 40px;
                span{
                    font-weight: bold;
                    padding-right: 46px;
                }
            }
            p:last-child{
                font-size: 24px;
                color: #848a93;
            }
        }
    }  
}
</style>