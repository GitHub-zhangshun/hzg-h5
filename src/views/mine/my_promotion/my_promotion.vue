<template>
<div>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="my_promotion">
            <header>
                <div>
                    <p>我的邀请人：<span v-if="inviter">未绑定</span> <span v-else>{{inviterPhone}}</span> </p>
                    <x-button mini v-if="inviter" @click.native="goBind">去绑定</x-button>
                </div>
            </header>
            <section>
                <!-- 二维码 -->
                <div class="qr_code" v-if="section_contain=='1'">
                    <p>我的二维码</p>
                    <qrcode :value=value type="img"></qrcode>          
                    <x-button type="warn" @click.native="share">分享给好友</x-button>                
                </div>
                <!-- 没有邀请资格 -->
                <div class="no_invitation" v-if="section_contain=='2'">
                    <div>
                        <img src="../../../assets/images/my/Noauthority.png">
                    </div>                    
                    <p>很遗憾，你暂时没有邀请资格</p>
                    <p>如有疑问，请拨打客服电话400-020-0178询问</p>
                </div>
                <!-- 未开通存款 -->
                <div class="no_deposit" v-if="section_contain=='3'">
                    <div>
                        <img src="../../../assets/images/my/Openstoragetube.png">
                    </div>                    
                    <p>请先开通银行存管账户才可以邀请好友哦~</p>
                    <p>开通后邀请好友，获取更多现金奖励</p>
                    <x-button type="warn" @click.native="submit">去开通</x-button>
                </div>
            </section>
            <!-- 奖励 -->
            <div class="reward">
                <div class="left">
                    <p>奖励总额：<span>{{total_reward}}</span><span>元</span></p>
                    <p>已兑付总额：<span style="color:#000">{{honour}}</span><span>元</span></p>
                </div>
                <div class="right">
                    <x-button mini @click.native="awardClick">奖励规则</x-button>
                </div>
            </div>
            <!--奖励明细 我的好友 -->
            <button-tab v-model="select">
                <button-tab-item @on-item-click="changeTab(0)">奖励明细</button-tab-item>
                <button-tab-item @on-item-click="changeTab(1)">我的好友({{total}})</button-tab-item>
            </button-tab>
            <!-- <div class="nav">
                <button @click="changeTab(0)">全部</button>
                <button @click="changeTab(1)">奶粉</button>
            </div> -->
            <!-- 具体信息 -->
            <div class="info">
                <!-- 我的好友 -->
                <ul class="friends" v-if="pdType==1">
                    <li id="noList"></li>
                    <li v-for="(item, index) in dataList" :key="index">
                        <div class="friends_img"><img :src="item.headImg==null?require('@/assets/logo.png'):item.headImg" alt="好友头像"></div>
                        <div class="friends_info">
                            <p>{{item.phone}}</p>
                            <p>{{item.createAt}}</p>
                        </div>
                    </li>
                </ul>
                <!-- 奖励明细 -->
                <x-table :cell-bordered="false" v-if="pdType==0" style="background-color:#fff;"> 
                    <thead>
                        <tr>
                            <th>我的好友</th>
                            <th>奖励时间</th>
                            <th>奖励金额</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td id='noList' colspan="4"></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-for="(item, index) in dataList" :key="index">
                            <td>{{item.phone}}</td>
                            <td>{{item.time}}</td>
                            <td>{{item.money}}元</td>
                            <td :class="item.status=='已兑换'?'black':'red'">{{item.status}}</td>
                        </tr>                   
                    </tbody>
                </x-table>
                <reward v-if="select==0"></reward>
            </div>
            <!--展示上拉加载的数据列表-->
            <ul v-if="pdType==0">
                <li v-for="(item, index) in dataList" :key="index">{{item.key}}</li>
            </ul>
            <ul v-if="pdType==1">
                <li v-for="(item, index) in dataList" :key="index">{{item.key}}</li>
            </ul>            
        </div>      
    </mescroll-vue>
    <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
        <div class="wrapper">
        <div class="imgWrapper">    
            <img src="@/assets/images/my/share.png" style="max-width:100%">
        </div>
        </div>
        <span>请点击右上方按钮分享页面</span>
    </x-dialog>
</div>
</template>
<script>
import wx from 'weixin-js-sdk'	
import MescrollVue from 'mescroll.js/mescroll.vue'
import { XButton,Qrcode,ButtonTab, ButtonTabItem,XDialog ,XTable } from 'vux'
import {indexApi} from '@/api/mine'
import {publicFun} from '@/libs/publicFun'
export default {
    components: {
            MescrollVue,
            XButton,
            Qrcode,
            ButtonTab, 
            ButtonTabItem,
            XDialog ,
            XTable 
    },
    data () {
        return {
            //分享弹窗
            showHideOnBlur: false,
            // 邀请人和去绑定按钮的flag
            inviter:true,
            //邀请人手机号
            inviterPhone:'',                
            //中间内容的状态
            section_contain:'',
            // 二维码字符串
            value:'',
            //奖励总额
            total_reward:'',
            //已兑付总额
            honour:'',
            //tab切换 
            select:0,  
            userInfo: {},
            otherInfo: {},
            mescroll: null, 
            mescrollDown:{use:false},
            mescrollUp: {
                callback: this.upCallback,
                empty: {
					warpId: "noList", 
					tip: "暂无记录~" 
				}
            },
            dataList: [], // 列表数据
            pdType: 0, // 菜单
            total:'' ,//好友数量
            shareInfo:{}
        }
    },
    methods: {
        goBind(){
            this.$router.push({path:'/to_bind'})
        },
        awardClick(){
            indexApi.platformConfig().then(data=>{
                if(data.code==0){
                    this.$router.push({path:'/announcementDetails',query:{id:data.result.awardRuleLink,title:"奖励规则"}})
                }else{
                    this.$toast({messa:data.message,duration:2000})
                }
            })
        },
        submit(){
            indexApi.openAccount().then(data=>{
                if(data.code==="10001"){
                    this.$router.push('/verification_code_login')
                }else if(data.code==0){
                    localStorage.setItem("path",this.$route.fullPath)
                    window.location.href = data.result.code
                }else{
                    this.$toast({messa:data.message,duration:2000})
                }
                
            })
        },
        mescrollInit (mescroll) {
            this.mescroll = mescroll
        },
        upCallback (page, mescroll) {
            this.getListDataFromNet(this.pdType, page.num, page.size, (arr) => {
                if (page.num === 1) this.dataList = []
                this.dataList = this.dataList.concat(arr)
                this.$nextTick(() => {
                    mescroll.endSuccess(arr.length)
                })
            })
        },
        // 切换菜单
        changeTab (type) {
            if (this.pdType !== type) {
                this.pdType = type
                this.dataList = []
                this.mescroll.resetUpScroll()
            }
        },
        async getListDataFromNet (pdType, pageNum, pageSize, successCallback) {
            let fromdata = {num:pageNum,size:pageSize}
            var listData = []
            if (pdType === 0) { 
                await indexApi.investorByAwardList(fromdata).then(data=>{
                    if(data.code==0){
                        for(var i = 0;i<data.result.length;i++){
                            listData.push({
                                
                            })    
                        }                    
                    }else if(data.code==="10001"){
                        this.$router.push('/verification_code_login')
                    }else{
                        this.$toast({message:data.message,duration:2000})
                    }
                })         
            } else if (pdType === 1) {
                await indexApi.investorByRecommendList(fromdata).then(data=>{
                    if(data.code==0){                     
                        for(var i = 0;i<data.result.length;i++){
                            listData.push({
                                headImg : data.result[i].headImg ,
                                phone  : data.result[i].phone ,
                                createAt : publicFun.timestampToTime(data.result[i].createAt,'/') ,
                            })    
                        }
                    }else if(data.code==="10001"){
                        this.$router.push('/verification_code_login')
                    }else{
                        this.$toast({message:data.message,duration:1000})
                    }
                })
            } 
            successCallback(listData)
        },
        async getUserInfo(){
            await indexApi.investorCurrent().then(data => {
                if(data.code !== '0') {
                    this.$toast({message:data.message,duration:2000})
                }
                if(data.code==="10001"){
                    this.$router.push('/verification_code_login')
                }
                this.userInfo = data.result
            })
        },
        async getOtherInfo(){
            await indexApi.investorInviteInfo().then(data=>{
                if(data.code !== '0'){
                    this.$toast({message:data.message,duration:2000})
                }
                if(data.code==="10001"){
                    this.$router.push('/verification_code_login')
                }
                this.otherInfo = data.result
            })
        },
        share(){
            this.showHideOnBlur = true
        },
        async invitationInfo(){
            await indexApi.invitationInfo().then(data=>{
                if(data.code==0){
                    this.shareInfo = data.result
                }else if(data.code==="10001"){
                    this.$router.push('/verification_code_login')
                }else{
                    this.$toast({message:data.message,duration:2000})
                }
            })
        },
        wechatShare(shareData,inviteUse) {
            let that = this
            return new Promise(async function (resolve, reject) {
            try {
                // let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1 //判断为微信浏览器
                // if (!isWechat) {
                //     that.$toast({message:'请在和掌柜公众号中打开',duration:2000})
                //     return resolve('not weichat')
                // }
                // if (!window.wx) {
                //   console.log('no wx')
                //   getWxChat()
                // }
                let ret = {}
                await indexApi.getWxConfig(window.location.href.split('#')[0]).then(data=>{
                    if(data.code==0){
                        ret = data.result
                    }
                })
                wx.config({
                    debug: false, // 开启调试模式,
                    appId: ret.appid, // 必填，公众号的唯一标识
                    timestamp: ret.timestamp, // 必填，生成签名的时间戳
                    nonceStr: ret.nonceStr, // 必填，生成签名的随机串
                    signature: ret.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline','hideAllNonBaseMenuItem','showAllNonBaseMenuItem']
                })

                wx.ready(function () {
                    if(!inviteUse){
                        wx.hideAllNonBaseMenuItem();
                    }else{
                        wx.showAllNonBaseMenuItem();
                    }
                    wx.onMenuShareTimeline({
                        title: shareData.title,
                        desc: shareData.content,
                        link: shareData.link,
                        imgUrl: shareData.logo,
                        dataUrl: '',
                        success: shareData.success,
                        cancel: function () {}
                    })
                    wx.onMenuShareAppMessage({
                        title: shareData.title,
                        desc: shareData.content,
                        link: shareData.link,
                        imgUrl: shareData.logo,
                        dataUrl: '',
                        success: shareData.success,
                        cancel: function () {}
                    })
                })
            } catch (error) {
                reject(error);
            }
        })
      }
    },
    async created(){
        await this.getUserInfo()
        await this.getOtherInfo()
        await this.invitationInfo()
        let shareData = {
            title: this.shareInfo.title_info,
            content: this.shareInfo.desc_info,
            link: this.shareInfo.url_info,
            logo: this.shareInfo.img_link, //分享出来的图片的
            success: function (res) {},
        }

        let inviteUse = this.otherInfo.inviteUse
        this.wechatShare(shareData,inviteUse)
        this.inviter = this.otherInfo.inviteUserPhone==null?true:false
        this.inviterPhone = this.otherInfo.inviteUserPhone
        this.value = this.otherInfo.inviteUse && this.otherInfo.inviteLink 
        this.total_reward = publicFun.toMoney(this.otherInfo.awardTotal,2)
        this.honour = publicFun.toMoney(this.otherInfo.clearAwardTotal,2)
        // 开户
        if(!this.userInfo.user.isOpen) {
            this.section_contain='3'
            return
        }
        // 邀请资格
        this.section_contain = this.otherInfo.inviteUse ? '1' : '2'
    },
    mounted(){
        let fromdata = {
            num:1,
            size:10
        }
        indexApi.investorByRecommendList(fromdata).then((data)=>{
            if(data.code==0){
                this.total = data.total
            }else if(data.code==="10001"){
                this.$router.push('/verification_code_login')
            }else{
                this.$toast({message:data.message,duration:2000})
            }
        })
        // wx.closeWindow();
    },
    beforeRouteEnter(to, from, next) {
      var u = navigator.userAgent;
      var IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // 修复iOS版微信HTML5 History兼容性问题
      if (IOS && to.path !== location.pathname) {
        // 此处不能用location.replace
        location.assign(to.fullPath)
      } else {
        next()
      }
    },
}

    
</script>



<style scoped lang='less'>
    /*以fixed的方式固定mescroll的高度*/
    .mescroll {
        position: absolute;
        top: 0;
        bottom: 0;
        height: auto;
        .my_promotion{
            background: #f2f2f2;
            width: 100%;
            &>header{
                line-height: 100px;
                background: #fff;        
                padding: 0 40px;         
                &>div{
                    display: flex;      
                    justify-content: space-between;
                    border-bottom: 1px solid #e5ebe8;
                    p{
                        font-size: 30px;
                        color: #848a93;
                        span{
                            color: #32363c;
                        }
                    }
                    .weui-btn{
                        width: 140px;
                        height: 56px;
                        margin: auto 0;
                        border-radius: 100px;
                        font-size: 22px
                    }
                    .weui-btn:after{
                        border-radius: 100px;
                        content: '';
                    }
                }        
            }
            &>section{
                background: #fff;
                padding: 46px 40px 60px;
                margin-bottom: 18px;
                .qr_code{
                    text-align: center;
                    p{
                        padding-bottom: 36px;
                        font-size: 30px;
                    }
                    &>div{
                        width: 400px;
                        height: 400px;
                        margin: 0 auto;
                        /deep/img{
                            width: 100%!important;
                            height: 100%!important;
                        }
                        padding-bottom: 60px;
                    }
                    .weui-btn{
                        height: 88px;
                        background: #ff4e30;
                        font-size: 32px;
                    }
                    .weui-btn:after{
                        border: none;
                    }
                }
                .no_invitation{
                    text-align: center;
                    padding-top:34px;                     
                    div{
                        width: 130px;
                        height: 130px;
                        padding-bottom: 48px;
                        margin:  0 auto;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }                   
                    p{
                        font-size: 26px;
                        padding-bottom: 24px;
                    }
                    p:nth-of-type(2){
                        color: #848a93;
                        padding-bottom: 0;
                    }
                }
                .no_deposit{
                    padding-top: 34px;
                    text-align: center;                    
                    div{
                        width: 132px;
                        padding-bottom: 46px;
                        height: 132px;
                        margin:  0 auto;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    
                    p{
                        font-size: 26px;
                        padding-bottom: 24px;
                    }
                    p:nth-of-type(2){
                        color: #848a93;
                        padding-bottom: 100px;
                    }
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
            .reward{
                background: #fff;
                padding: 40px 40px;
                font-size: 34px;
                display: flex;
                justify-content: space-between;
                .left{
                    p{
                        font-size: 28px;
                        color: #848a93;
                        span:nth-of-type(1){
                            color: #ff4e30;
                            font-size: 34px;
                        }
                        span:nth-of-type(2){
                            color: #000;
                        }
                    }
                    P:nth-of-type(1){
                        padding-bottom: 20px;
                    }
                    P:nth-of-type(2){
                        span{
                            font-size: 28px;
                        }
                    }
                }
                .right{
                    .weui-btn{
                        height: 56px;
                        border-radius: 56px;
                        line-height: 56px;
                        font-size: 26px;
                    }
                    .weui-btn::after{
                        border-radius: 56px;
                        content: '';
                    }
                }
            }
            .vux-button-group{
                padding: 24px 154px;        
                a{
                    padding: 15px 0;
                    color: #000;
                    font-size: 28px;
                }
                a::after{
                    border: none;
                }
                .vux-button-group-current{
                    background: #ff4e30;
                    color: #fff;
                }
            }
            .info{
                background: #fff;
                padding-left:40px; 
                .friends{
                    li{
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid #efefef;
                        .friends_img{                    
                            line-height: 150px;
                            padding-right: 18px;
                            width: 84px;
                            height: 84px;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 100%;                        
                            }
                        }
                        .friends_info{
                            flex: 1;
                            padding: 40px 0;
                            p:nth-of-type(1){
                                padding-bottom: 18px;
                                font-size: 30px;
                            }
                            p:nth-of-type(2){
                                font-size: 26px;
                                color: #848a93;
                            }
                        }
                    }
                    li:last-child{
                        border-bottom: none;
                    }          
                }
                .vux-table{
                    font-size: 26px;
                    thead{
                        line-height: 100px;                
                        tr{
                            th{
                                text-align: left;
                            }
                        }
                    }
                    tbody{
                        line-height: 100px;
                        tr{
                            td{
                                text-align: left;
                            }
                            .red{
                                color: #ff4e30;
                            }
                            .black{
                                color: #000;
                            }
                        }
                        tr:last-child{
                            td::before{
                                border-bottom: none;
                            }
                        }
                    }
                    .norecord{
                        tr{
                            td{
                                text-align: center;
                            }
                        }
                    }
                }
                .vux-table::after{
                    border-top: none;
                }
            }
            
        }
    }
    /deep/.vux-x-dialog{
        .weui-dialog{
            background-color:transparent; 
            width:100%;
            top: 50px;
            margin: 0;
            .wrapper{
                display: flex;
                justify-content: flex-end;
                padding-right: 40px;
                .imgWrapper{
                width: 125px;
                height: 128px;
                img{
                    width: 100%;
                    height: 100%;
                }
                }
                
            }
            span{
                display: block;
                color: #fff;
                font-size: 30px;
            }
        }
    }
    
</style>
