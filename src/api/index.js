import {request, axios} from '@/libs/request'
let indexApi ={    
    //banner
    banner(){
        return request({url:"/v1/cms/op/bannerListByValid",data:'banner_show_h5'})
    },
    // 稳健运营
    platformRunData(){
        return request({
            url:"/v1/cms/op/platformRunData",
        })
    },
    //公告
    articleListByPage(){
        return request({
            url:"/v1/cms/op/articleListByPage",
            data:{
                articleType:'platform_article_affiche_sys',
                num:1,
                size:3,
            },
        })
    },
    //公告详情
    articleInfo(formdata){
        return request({url:"/v1/cms/op/articleInfo",data:formdata})
    },
    // 公告列表    
    articleListByPage1(formdata){
        return request({
            url:"/v1/cms/op/articleListByPage",
            data:formdata,
        })
    },
    //首页新手标    
    productInfoByNovice(){
        return request({
            url:"/v1/bid/business/productInfoByNovice",           
        })
    },
    //首页热门标    
    productList(params){
        return request({
            url:"/v1/bid/business/productList",
            data:{
                isHot:true,
                num:params.num,
                size:params.size,
                productStatus:'bid_product_show_raise_underway',
                productTypeList:["bid_type_produce"]
            }
        })
    },
    //标详情   
    productDetailById(id){
        return request({
            url:"/v1/bid/business/productDetailById",  
            data:id         
        })
    },  
    //标详情历史借款->待还总额   
    loanStatisticsByUserId(id){
        return request({
            url:"/v1/bid/business/loanStatisticsByUserId",  
            data:id         
        })
    },
    //标详情历史借款 
    productListByBorrow(formdata){
        return request({
            url:"/v1/bid/business/productListByBorrow",  
            data:formdata         
        })
    },
    //标详情还款记录
    bidBorrowerRepayRecords(id){
        return request({
            url:"/v1/bid/info/bidBorrowerRepayRecords",  
            data:id         
        })
    },       
    //标详情出借记录
    productInvestListByBid(formdata){
        return request({
            url:"/v1/bid/business/productInvestListByBid",  
            data:formdata         
        })
    },    
    //全局字典
    dictionaryListByAll(){
        return request({url:"/v1/cms/core/dictionaryListByAll"})
    },
    //当前登录信息
    investorCurrent(){
        return request({url:"/v1/uc/user/investorCurrent"})
    },
    
}

export {indexApi,axios}