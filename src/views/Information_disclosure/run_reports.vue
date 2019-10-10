<template>
    <div class="run_reports">
        <ul>
            <li>
                <div class="img"><img src="../../assets/images/Information_disclosure/Report1.png" alt="5月报告"></div>
                <p><span>2018年5月运营报告</span><i class="icon iconfont icon-shuangjiantouyou"></i></p>
            </li>
            <li @click="$router.push('/runReports186')">
                <div class="img"><img src="../../assets/images/Information_disclosure/Report2.png" alt="6月报告"></div>
                <p><span>2018年6月运营报告</span><i class="icon iconfont icon-shuangjiantouyou"></i></p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
.run_reports{
    ul{
        li{
            padding: 20px 20px 0;
            background: #fff;
            margin-top: 20px;
            .img{
                width: 710px;
                height: 260px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            p{
                line-height: 80px;
                display: flex;
                span{
                    font-size: 28px;
                }
                i{
                    flex: 1;
                    text-align: right;
                    padding-right: 20px;
                }
            }
        }
    }
}
</style>