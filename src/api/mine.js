/* eslint-disable no-dupe-keys */
import {request, axios} from '@/libs/request'
// eslint-disable-next-line no-trailing-spaces
let indexApi = {
  // 错误信息
  platformErrorLogAdd (data) {
    return request({url: '/v1/cms/op/platformErrorLogAdd', data: data})
  },
  // 短信验证码
  smsCodeSend (phone, a) {
    return request({url: '/v1/cms/core/smsCodeSend', data: {simplify: 'login_sms_code', phone: phone, existUser: a}})
  },
  // 注册验证码
  smsCodeSend2 (phone, a) {
    return request({url: '/v1/cms/core/smsCodeSend', data: {simplify: 'register_sms_code', phone: phone, existUser: a}})
  },
  // 未登录的验证码
  smsCodeSend3 (phone, a) {
    return request({url: '/v1/cms/core/smsCodeSend', data: {simplify: 'Rest_Password_sms_code', phone: phone, existUser: a}})
  },
  // 修改手机号
  smsCodeSend1 (phone, a) {
    return request({url: '/v1/cms/core/smsCodeSend', data: {simplify: 'edit_phone_sms_code', phone: phone, existUser: a}})
  },
  // 找回密码验证码（已登陆）
  smsCodeDefaultSend () {
    return request({url: '/v1/cms/core/smsCodeDefaultSend', data: 'Rest_Password_sms_code'})
  },
  // 充值验证码
  smsCodeDefaultSend_code (data) {
    return request({url: '/v1/cms/core/smsCodeDefaultSend', data: data})
  },
  // 注册
  investorRegister (data) {
    return request({url: '/v1/uc/user/investorRegister', data: data})
  },
  // 当前登录信息
  investorCurrent () {
    return request({url: '/v1/uc/user/investorCurrent'})
  },
  // 登录
  investorLogin (data) {
    return request({url: '/v1/uc/user/investorLogin', data: data})
  },
  // 验证码登陆
  investorSmsLogin (data) {
    return request({url: '/v1/uc/user/investorSmsLogin', data: data})
  },
  // 我的账户
  accountInfo () {
    return request({url: '/v1/fin/capital/accountInfo'})
  },
  // 找回登录密码
  userPasswordRest (data) {
    return request({url: '/v1/uc/user/userPasswordRest', data: data})
  },
  // 修改昵称
  userEditNickName (data) {
    return request({url: '/v1/uc/user/userEditNickName', data: data})
  },
  // 设置用户名
  userAccountEdit (data) {
    return request({url: '/v1/uc/user/userAccountEdit', data: data})
  },
  // 登陆密码修改(已登陆)
  userPasswordEdit (data) {
    return request({url: '/v1/uc/user/userPasswordEdit', data: data})
  },
  // 出借记录tab的ID
  statusListByTypeSimplify () {
    return request({url: '/v1/cms/core/statusListByTypeSimplify', data: 'bid_product_status_show'})
  },
  // 出借记录内容
  userProductList (data) {
    return request({url: '/v1/bid/business/userProductList', data: data})
  },
  // 出借记录标的详情
  userProductInfo (data) {
    return request({url: '/v1/bid/business/userProductInfo', data: data})
  },
  // 出借记录的详情
  userProductInvestInfo (id) {
    return request({url: '/v1/bid/business/userProductInvestInfo', data: id})
  },
  // 资金记录tab
  capitalTypeList () {
    return request({url: '/v1/fin/capital/capitalTypeList'})
  },
  // 资金记录列表
  capitalList (data) {
    return request({url: '/v1/fin/capital/capitalList', data: data})
  },
  // 资金记录列表详情
  capitalDetail (data) {
    return request({url: '/v1/fin/capital/capitalDetail', data: data})
  },
  // 我的回款列表数据
  userRepayList (data) {
    return request({url: '/v1/bid/business/userRepayList', data: data})
  },
  // 我的回款tab的头部数据
  userRepayStatistics () {
    return request({url: '/v1/bid/business/userRepayStatistics'})
  },
  // 设置我的邀请人
  investorSetInviter (data) {
    return request({url: '/v1/uc/user/investorSetInviter', data})
  },
  // 邀请详情
  investorInviteInfo () {
    return request({url: '/v1/uc/user/investorInviteInfo'})
  },
  // 推荐用户列表
  investorByRecommendList (data) {
    return request({url: '/v1/uc/user/investorByRecommendList', data: data})
  },
  // 奖励列表
  investorByAwardList (data) {
    return request({url: '/v1/uc/user/investorByAwardList', data: data})
  },
  // 分享页面加载获取手机号
  invitePhoneByCode (data) {
    return request({url: '/v1/uc/user/invitePhoneByCode', data: data})
  },
  // 风险测评题目
  typeItemList () {
    return request({
      url: '/v1/cms/core/typeItemList',
      data: {
        queryType: 1,
        queryValue: 'investor_risk_evaluation'
      }
    })
  },
  // 风险测评提交
  investorRiskEvaluate (data) {
    return request({
      url: '/v1/uc/user/investorRiskEvaluate',
      data: {itemList: data}
    })
  },
  // 申请注销
  userApplyCancel () {
    return request({url: '/v1/uc/user/userApplyCancel'})
  },
  // 开通存管
  // openAccount (data) {
  //   return request({url: '/v1/fin/account/openAccount', data})
  // },

  // 修改手机号->验证登陆密码
  userPasswordVerify (data) {
    return request({url: '/v1/uc/user/userPasswordVerify', data: data})
  },
  // 修改手机号->修改手机号
  userPhoneEdit (data) {
    return request({url: '/v1/uc/user/userPhoneEdit', data: data})
  },
  // 注册人数
  investorRegisterCount () {
    return request({url: '/v1/uc/user/investorRegisterCount'})
  },
  // 银行卡信息
  userGetBank () {
    return request({url: '/v1/uc/user/userGetBank'})
  },
  // 配置信息
  platformConfig () {
    return request({url: '/v1/cms/op/platformConfig'})
  },
  // 充值
  rechargeJin (data) {
    return request({url: '/v1/fin/recharge/rechargeJin', data})
  },
  // 银行卡限额列表
  bankListByOperation () {
    return request({url: '/v1/cms/op/bankListByOperation'})
  },
  // 提现
  withdrawJin (amt, type) {
    return request({url: '/v1/fin/withdraw/withdrawJin', data: {amt: amt, type: type}})
  },
  // 微信分享
  getWxConfig (data) {
    return request({url: '/v1/cms/op/getWxConfig', data})
  },
  // 分享信息
  invitationInfo () {
    return request({url: '/v1/uc/user/invitationInfo'})
  },
  // 更换银行卡
  changeCard (data) {
    return request({url: '/v1/fin/account/changeCard', data})
  },
  // 重置交易密码
  resetPassword () {
    return request({url: '/v1/fin/account/resetPassword'})
  },
  // 测评次数
  investorRiskEvaluateCount (startTime, endTime) {
    return request({url: '/v1/uc/user/investorRiskEvaluateCount', data: {startTime: startTime, endTime: endTime}})
  },
  // 交易费用配置
  typeItemList1 () {
    return request({url: '/v1/cms/core/typeItemList', data: {'queryType': 0, 'queryValue': 'transaction_rate'}})
  },
  // 原回款计划表
  userProductOldRepayList (data) {
    return request({url: '/v1/bid/business/userProductOldRepayList', data})
  },
  // 配置信息
  platformConfig () {
    return request({url: '/v1/cms/op/platformConfig'})
  },
  // 开户省份
  region () {
    return request({url: '/v1/fin/account/region'})
  },
  // 开户城市
  getAllRegion (id) {
    return request({url: '/v1/fin/account/getAllRegion', data: id})
  },
  // 开户银行
  bankCode () {
    return request({url: '/v1/fin/account/bankCode'})
  },
  // 签约
  appSignCard () {
    return request({url: '/v1/fin/account/appSignCard'})
  },
  // // 充值
  // recharge (data) {
  //   return request({url: '/v1/fin/recharge/recharge', data: data})
  // },
  // 提现
  withdraw (data) {
    return request({url: '/v1/fin/withdraw/withdraw', data: data})
  },
  // 优惠券tab的ID
  statusListByTypeSimplify_coupon () {
    return request({url: '/v1/cms/core/statusListByTypeSimplify', data: 'uc_coupon_status'})
  },
  // 优惠券列表
  couponListByPage (data) {
    return request({url: '/v1/uc/user/couponListByPage', data: data})
  },
  // 出借
  transaction (data) {
    return request({url: '/v1/bid/business/productInvest', data: data})
  },
  // 活动列表
  activityListByWhere () {
    return request({url: '/v1/cms/op/activityListByWhere', data: {}})
  },
  // 陕坝开户
  openAccountShanBa () {
    return request({url: '/v1/fin/account/openAccountShanBa'})
  },
  // 陕坝充值
  recharge (data) {
    return request({url: '/v1/fin/recharge/recharge', data: data})
  },
  // 陕坝修改交易密码
  editPassword () {
    return request({url: '/v1/fin/account/editPassword'})
  },
  // 陕坝重置交易密码
  resetPassword () {
    return request({url: '/v1/fin/account/resetPassword'})
  }
}
export {indexApi, axios}
