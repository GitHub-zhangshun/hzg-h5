import {request, axios} from '@/libs/request'
let indexApi ={
    //交易趋势图
    cumulativeTransactionMoney(data){
        return request({url:"/v1/sc/statistics/cumulativeTransactionMoney",data})
    }, 
    //借贷概况
    loanSituation(data){
        return request({url:"/v1/sc/statistics/loanSituation",data})
    }, 
    //性别分布
    userAge(data){
        return request({url:"/v1/sc/statistics/userAge",data})
    }, 
    //逾期数据
    userOverdue(data){
        return request({url:"/v1/sc/statistics/userOverdue",data})
    },  
    //年龄
    userSex(data){
        return request({url:"/v1/sc/statistics/userSex",data})
    },
    //运营时间
    GetStartRunTime(){
        return request({url:"/v1/sc/statistics/GetStartRunTime"})
    }, 
    
    
}
export {indexApi,axios}