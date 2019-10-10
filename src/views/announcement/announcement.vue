<template>
    <mescroll-vue ref="mescroll" :up="mescrollUp" @init="mescrollInit">
        <div id='nolist' v-if="flag">
                <div>
                    <img src="@/assets/images/product/product_null.png" alt="暂无数据">
                </div>
                <span>空空如也~</span>
            </div>
        <group class="border" v-else>             
            <cell-box is-link v-for="(item, index) in list" :key="index" @click.native="announcement(item.id)">   
                <ul>                       
                    <li>    
                        <h1>{{item.title}}</h1>    
                        <p>{{item.contain}}</p>    
                        <span>{{item.time}}</span>    
                    </li>   
                </ul>    
            </cell-box>    
        </group>
    </mescroll-vue>
</template>

<script>
import { Group, Cell, CellBox} from 'vux'
import { indexApi } from '@/api/index'
import { publicFun } from '@/libs/publicFun'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
    data() {
        return {
            flag:false,
            list: [],
            mescroll: null,
            mescrollUp: {
                callback: this.upCallback,
                htmlNodata:'<p class="upwarp-nodata">-- 暂无更多数据 --</p>',
            }, 
        }
    },
    components: {
        Group,
        Cell,
        CellBox,
        MescrollVue
    },
    methods: {
        announcement(index) {
            this.$router.push({ path: "/announcementDetails", query: { id: index,title:'公告详情' } })
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback(page) {
            indexApi.articleListByPage()
            .then(data => {
                if(page.num === 1 && data.result.length==0){
                    this.flag = true
                }
                if(page.num==1) this.list =[];
                for (let i = 0; i < data.result.length; i++) {
                    this.list.push({
                        title: data.result[i].title,
                        contain: data.result[i].sketch,
                        time: publicFun.timestampToTimesfs(data.result[i].createAt, "/"),
                        id: data.result[i].Id,
                    })
                }
                this.$nextTick(() => {
                    this.mescroll.endSuccess(data.result.length);
                })                  
            })
            .catch( ()=>{
                // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                mescroll.endErr()
            })           
        }
    },
}
</script>

<style scoped lang='less'>
.mescroll {
    position: absolute;
    top: 0;
    padding-top: 18px;
    bottom: 0;
    // height: auto;
    #nolist{
        margin-top: 20%;
        padding: 50px;
        text-align: center;
        div{
            width: 340px;
            height: 274px;
            margin: 0 auto;
            font-size: 32px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        span{
            line-height: 80px;
            font-size: 28px;
            color: #848a93;
        }
    } 
    .border {        
        /deep/.vux-no-group-title {
            margin-top: 0;
            border: none;
            .weui-cell {
                padding: 30px 40px 32px 42px;
                &::after {
                    margin-right: 40px;
                    width: 20px;
                    height: 20px;
                    content: '';
                    border-color: #75889e;
                }
                &::before {
                    left: 0;
                }
                ul {
                    
                    li {
                        width: 598px;
                        h1 {
                            font-size: 32px;
                            color: #32363c;
                            padding-bottom: 20px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        p {
                            font-size: 26px;
                            color: #848a93;
                            margin-bottom: 12px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }
                        span {
                            font-size: 26px;
                            color: #848a93;
                        }
                    }
                }
            }
        }
        .xs-plugin-pullup-container {
            line-height: 40px;
        }
    }
}

</style>