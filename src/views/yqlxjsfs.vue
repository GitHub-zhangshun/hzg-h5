<template>
    <div class="yqlxjsfs">
        <header>预期利息的计算方式</header>
        <ul>
            <li>
                <p>1. 以天数计算的标的</p>
                <span>预期利息=出借本金*年利率*持有天数/365天</span>
            </li>
            <li>
                <p>2. 以月数计算的标的</p>
                <span>预期利息=出借本金*年利率*月数/12</span>
            </li>
            <li>
                <p>3. 如用户出借时，使用了加息券，则预期收益包含加息部分</p>
            </li>
            <li>
                <p>预计收益为参考的收益，不为实际收益。实际收益请查看回款计划表，如有疑问，请联系客服电话400-020-0178</p>
            </li>
        </ul>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
    .yqlxjsfs{
        margin-top: 18px;   
        min-height: calc(100vh-18px); 
        position: relative;  
        header{
            text-align: center;
            font-size: 32px;
            padding: 42px 0 46px;
            background: #fff;
        }
        ul{
            li{
                font-size: 28px;
                color: #848a93;
                padding: 0 45px 60px;
                background: #fff;
                p{
                    line-height: 50px;
                }
                span{
                    line-height: 40px;
                }
            }
        }
        footer{
            position: absolute;
            bottom: 0;
            left:50%;
            transform:translateX(-50%)
        }
    }
</style>