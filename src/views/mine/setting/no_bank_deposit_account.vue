<template>
<keep-alive>
    <div class="set_pwd">
        <header> <p>实名信息</p> </header>
        <div class="contain">
            <x-input placeholder="姓名" v-model="custNm"></x-input>
            <x-input placeholder="身份证号" v-model="certifId"></x-input>
        </div>
        <header> <p>银行卡信息</p> </header>
        <div class="contain">
            <span @click="parentBankId_show_click" :style="{color:parentBank_value=='开户银行'?'#757575':'#000'}">{{parentBank_value}}</span>
            <x-input placeholder="卡号" v-model="capAcntNo"></x-input>
            <span @click="proince_show_click" :style="{color:proince_value=='开户省份'?'#757575':'#000'}">{{proince_value}}</span>
            <span @click="city_show_click" :style="{color:city_value=='开户城市'?'#757575':'#000'}">{{city_value}}</span>
            <x-input placeholder="预留手机号码" v-model="mobileNo"></x-input>
        </div>
        <div class="btn">
            <x-button type="warn" @click.native="submit" :disabled="disabled" :show-loading="show_loading">开&nbsp;通</x-button>
        </div>
        <p>开通代表你已阅读并同意 <span @click="agreement('userLicenseAgreement','用户授权协议')">《用户授权协议》</span></p>
        <p><span @click="agreement('fundingAgreement','网贷客户交易结算资金账户三方协议')">《网贷客户交易结算资金账户三方协议》</span></p>
        <van-popup v-model="proince_show" position="bottom">
            <van-picker show-toolbar :loading="pronice_loading" :columns="proince_columns" @cancel="province_Cancel" @confirm="province_Confirm"></van-picker>
        </van-popup>
        <van-popup v-model="city_show" position="bottom">
            <van-picker show-toolbar :loading="city_loading" :columns="city_columns" @cancel="city_Cancel" @confirm="city_Confirm"/>
        </van-popup>
        <van-popup v-model="parentBankId_show" position="bottom">
            <van-picker show-toolbar :loading="parentBankId_loading" :visible-item-count="3" :item-height="60" :columns="parentBankId_columns" @cancel="parentBankId_Cancel" @confirm="parentBankId_Confirm"/>
        </van-popup>
    </div>
    </keep-alive>
</template>

<script>
import{publicFun} from '@/libs/publicFun'
import {indexApi} from '@/api/mine'
import { Popup,Picker,Toast,loading } from 'vant';
import { XInput, Group,XButton,TransferDomDirective as TransferDom,XDialog} from 'vux'
    export default {
        name: 'no_bank_deposit_account',
        directives: {
            TransferDom
        },
        components:{
            XDialog,
            XInput, 
            Group,
            XButton,   
            'van-popup':Popup,
            'van-picker':Picker
        },
        data(){
            return{
                disabled:false,
                show_loading:false,
                parentBankId_show: false,//开户银行弹窗展示
                parentBankId_columns: [],//开户银行数据
                parentBankId_columns_result: [],//开户银行数据
                parentBankId_loading:true,//开户银行数据等待

                proince_show: false,//开户省份弹窗展示
                proince_columns: [],//开户省份数据
                proince_columns_result: [],//开户省份数据
                pronice_loading:true,//开户省份数据等待
                pronice_id:'',//开户省份ID

                city_show: false,
                city_columns:[],
                city_loading:true,
                city_columns_result:[],

                parentBank_value:'开户银行',
                proince_value:'开户省份',
                city_value:'开户城市',

                capAcntNo:'',//开户银行卡号
                cityId:'',//开户行地区代码 ,
                certifId:'',//身份证号 
                custNm:'',//用户姓名
                mobileNo:'',//电话号码 
                parentBankId:''//开户行行别
            }
        },
        methods:{            
            parentBankId_show_click(){
                this.parentBankId_show = true
                indexApi.bankListByOperation()
                .then( data => {
                    data.result.forEach( item => {
                        this.parentBankId_columns.push(`<span><img src="${item.icoLink==null?require('@/assets/images/my/bank_icon@2x.png'):item.icoLink}" alt=""></span>&nbsp;${item.name}<br>单笔${item.singleQuota}元，单日${item.dayQuota}元`)
                        this.parentBankId_columns_result.push(item)
                    })
                    this.parentBankId_loading = false
                })
            },            
            parentBankId_Cancel(value, index) {
                this.parentBankId_show = false
            },
            parentBankId_Confirm(value, index){
                this.parentBank_value = this.parentBankId_columns_result[index].name
                this.parentBankId_show = false
                this.parentBankId = this.parentBankId_columns_result[index].code
            },
            proince_show_click(){
                this.proince_show = true
                indexApi.region()
                .then( data => {
                    this.pronice_loading = false
                    data.result.forEach(item => {
                        this.proince_columns.push(item.parRegionName)
                        this.proince_columns_result.push(item)
                    });
                })        
            },            
            province_Cancel(value, index) {
                this.proince_show = false
            },
            province_Confirm(value, index){
                this.cityId = ''
                this.city_value = '开户城市'
                this.proince_value = value
                this.proince_show = false
                this.pronice_id = this.proince_columns_result[index].parRegionId
            },
            city_show_click(){
                if(this.pronice_id==''){
                    Toast({message:'请先选择开户省份',duration:2000})
                    return
                }
                this.city_show = true
                indexApi.getAllRegion(this.pronice_id)
                .then( data => {
                    this.city_loading = false
                    data.result.forEach(item => {
                        this.city_columns.push(item.regionName)
                        this.city_columns_result.push(item)
                    });
                }) 
            },
            city_Cancel(){
                this.city_show = false
            },
            city_Confirm(value, index){
                this.city_value = value
                this.city_show = false
                this.cityId = this.city_columns_result[index].regionCode
            },
            submit(){
                if(this.custNm==''){
                    Toast({message:'请填写姓名',duration:2000})
                    return
                }
                if(this.certifId ==''){
                    Toast({message:'请填写身份证号',duration:2000})
                    return
                }
                if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(this.certifId)){
                    Toast({message:'身份证号格式不正确',duration:2000})
                    return
                }
                if(this.parentBankId  ==''){
                    Toast({message:'请填写开户银行',duration:2000})
                    return
                }
                if(this.capAcntNo ==''){
                    Toast({message:'请填写卡号',duration:2000})
                    return
                }
                if(this.cityId ==''){
                    Toast({message:'请填写开户城市',duration:2000})
                    return
                }
                if(this.mobileNo ==''){
                    Toast({message:'请填写预留手机号码',duration:2000})
                    return
                }
                if(!publicFun.checkPhone(this.mobileNo)){
                    Toast({message:'预留手机号码格式不正确',duration:2000})
                    return
                }
                this.show_loading = true
                this.disabled = true
                let data ={
                    capAcntNo:this.capAcntNo,
                    certifId :this.certifId ,
                    cityId :this.cityId ,
                    custNm :this.custNm ,
                    mobileNo :this.mobileNo ,
                    parentBankId :this.parentBankId ,
                }
                indexApi.openAccount(data)
                .then( data => {                   
                    this.show_loading = false
                    this.disabled = false
                    localStorage.removeItem('openAcount_info')
                    location.href = process.env.domain+'/v1/fin/account/appSignCard?token='+localStorage.getItem('token')
                })
                .catch( ()=>{
                    this.show_loading = false
                    this.disabled = false
                })   
            },
            agreement(n,b){
                indexApi.platformConfig().then(data=>{
                    let a = data.result
                    if(n == 'userLicenseAgreement'){
                        this.$router.push({path:'/announcementDetails',query:{id:data.result.userLicenseAgreement,title:b}})
                    }
                    if(n == 'fundingAgreement'){
                        this.$router.push({path:'/announcementDetails',query:{id:data.result.fundingAgreement,title:b}})
                    }
                   
                })
            }
        },
        beforeRouteLeave (to, from, next) {
            let formData = {
                custNm:this.custNm,
                capAcntNo : this.capAcntNo,
                cityId : this.cityId,
                certifId : this.certifId,
                mobileNo : this.mobileNo,
                parentBankId : this.parentBankId,
                parentBank_value : this.parentBank_value,
                proince_value : this.proince_value,
                city_value : this.city_value,
            }
            localStorage.setItem('openAcount_info',JSON.stringify(formData))
            next()
        },
        created(){
            if(localStorage.openAcount_info){
                let openAcount_info = JSON.parse(localStorage.openAcount_info)
                this.custNm = openAcount_info.custNm
                this.capAcntNo = openAcount_info.capAcntNo
                this.cityId = openAcount_info.cityId
                this.certifId = openAcount_info.certifId
                this.mobileNo = openAcount_info.mobileNo
                this.parentBankId = openAcount_info.parentBankId
                this.parentBank_value = openAcount_info.parentBank_value
                this.proince_value = openAcount_info.proince_value
                this.city_value = openAcount_info.city_value
            }
        }
    }
</script>

<style scoped lang='less'>
.set_pwd {       
    margin-top: 18px;
    header {
        background: #fff;
        padding: 36px 0 34px;
        font-size: 32px;            
        color: #32363c;            
        font-weight: bold;
        margin-top: 18px;
        p{
            padding-left: 38px;
            border-left: 4px #333333 solid;
        }
    }
    header:first-child{
        margin-top: 0;
    }
    .contain { 
        background: #fff;           
        .weui-cell{
            border-bottom: 1px solid #eff2f7;
            padding: 0 40px;
            font-size: 30px;
            line-height: 100px;
        }
        span{
            display: inline-block;
            width: calc(100% - 80px);
            border-bottom: 1px solid #eff2f7;
            font-size: 30px;
            padding: 0 40px;
            line-height: 100px;
        }
        .weui-cell:before{
            border-top: none;
        }
        /deep/.weui-input::placeholder{
            color: #757575;
        }
    }
    .btn{
        padding: 46px 40px 20px;
        /deep/.weui-btn{
            height: 88px;
            background: #ff4e30;
            font-size: 32px;
            .weui-loading{
                width: 40px;
                height: 40px;
                display: inline-block;
            }
        }
        .weui-btn:after{
            border: none;
        }
    }
    &>p{
        text-align:center;
        font-size: 26px;
        color: #848a93;
        span{
            color: #000;
        }
    }
    &>P:nth-of-type(1){
        padding-bottom: 10px;
    }
    /deep/.van-popup{
        .van-picker{
            .van-picker__columns{
                .van-picker-column{
                    ul{
                        line-height: 60px!important;
                        span{
                            display: inline-block;
                            width: 36px;
                            height: 32px;
                            vertical-align: baseline;
                            img{
                                width: 100%;
                                height: 100%;
                                
                            }
                        }
                        
                    }
                }
            }
        }
    }
}
/deep/.van-picker__cancel,
/deep/.van-picker__confirm{
    font-size: 30px;
}
</style>