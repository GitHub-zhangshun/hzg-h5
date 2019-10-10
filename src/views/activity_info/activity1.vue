<template>
<!-- 活动内页 -->
    <div class="activity">
        <div class="title_img">
            <img src="@/assets/images/activity/title.png" alt="" class="title">            
        </div>
        <div class="activity_bg">
            <div class="activity_bg_img">
                <img src="@/assets/images/activity/one.png" alt="">
            </div>
            <div class="content">
                <div class="activity_content_div">
                    <div class="left">
                        <p>100&nbsp;<span>&yen;</span></p>
                        <p>返利券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                <div class="activity_content_div">
                    <div class="left">
                        <p>1.5&nbsp;<span>%</span></p>
                        <p>加息券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="activity_bg">
            <div class="activity_bg_img">
                <img src="@/assets/images/activity/two.png" alt="">
            </div>
            <div class="content">
                <div class="activity_content_div">
                    <div class="left">
                        <p>200&nbsp;<span>&yen;</span></p>
                        <p>返利券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                <div class="activity_content_div">
                    <div class="left">
                        <p>2.0&nbsp;<span>%</span></p>
                        <p>加息券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="activity_bg">
            <div class="activity_bg_img">
                <img src="@/assets/images/activity/three.png" alt="">
            </div>
            <div class="content">
                <div class="activity_content_div">
                    <div class="left">
                        <p>300&nbsp;<span>&yen;</span></p>
                        <p>返利券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                <div class="activity_content_div">
                    <div class="left">
                        <p>1.5&nbsp;<span>%</span></p>
                        <p>加息券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="activity_bg">
            <div class="activity_bg_img">
                <img src="@/assets/images/activity/four.png" alt="">
            </div>
            <div class="content">
                <div class="activity_content_div">
                    <div class="left">
                        <p>500&nbsp;<span>&yen;</span></p>
                        <p>返利券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                <div class="activity_content_div">
                    <div class="left">
                        <p>1.2&nbsp;<span>%</span></p>
                        <p>加息券</p>
                    </div>
                    <div class="right">
                        <p>用户注册成功后，系统将自动发放优惠券至出借人账户中，发放成功后将通过短信方式通知</p>
                    </div>
                </div>
                
            </div>
        </div>
        <div class="label">
            <img src="@/assets/images/activity/label.png" alt="">
            <span>注意事项</span>
            <img src="@/assets/images/activity/label.png" alt="">
        </div>      
        <div class="text">
            <p>1.加息券和返利券不可同时使用；</p>
            <p>2.每次出借仅限使用一张优惠券；</p>
            <p>3.优惠券不能兑换现金，一经使用，不予退还</p>
            <p>4.优惠券的最终解释权归成都融正通互联网信息服务有限公司所有，如果疑问请联系客服400-020-0178</p>
        </div>        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
.activity{
    min-height: 100vh;
    background: url('../../assets/images/activity/bg.png') center center no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    .title_img{
        margin-top: 116px;
        margin-bottom: 121px;
        width: 674px;
        height: 235px;     
        .title{
            width: 100%;
            height: 100%;        
        }
    }
    
    .activity_bg{
        position: relative;
        width: calc(100% - 74px);
        background: url('../../assets/images/activity/bg1.png') center center no-repeat;
        background-size: 100% 100%;
        padding:90px 37px 62px;
        margin-bottom: 70px;
        .activity_bg_img{
            position: absolute;
            top: -22px;
            left: 50%;
            transform: translateX(-50%);
            width: 509px;
            height: 70px;
            img{                
                width: 100%;
                height: 100%;
                
            }
        }
        
        .content{
            .activity_content_div{
                background: url('../../assets/images/activity/coupon.png') center center no-repeat;
                background-size: 675px 220px;
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                padding: 45px 33px 26px 41px;
                margin-bottom: 42px;
                .left{
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    p:nth-of-type(1){
                        padding-bottom: 21px;
                        font-size: 54px;
                        color: #ff4e3c;
                        display: flex;
                        align-items: baseline;
                        font-weight: bold;
                        span{
                            font-size: 21px;
                        }
                    }
                    p:nth-of-type(2){
                        font-size: 24px;
                        color: #ff4e3c;
                    }
                }
                .right{
                    width: 385px;
                    p{
                        color: #fff;
                        line-height: 1.2;
                        font-size: 25px;
                    }
                }
            }
            .activity_content_div:last-child{
                margin-bottom: 0;
            }
        }
    }
    .label{
        img:nth-of-type(1){
            transform: rotate(180deg)
        }
        img{
            width: 164px;
            height: 23px;
        }
        span{
            color: #fff;
            font-size: 30px;
        }
    }
    .text{
        padding: 40px 30px 60px;
        p{
            line-height: 1.5;
            font-size: 25px;
            color: #fff;
        }
    }
}
</style>