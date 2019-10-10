import { request } from '@/libs/request'
let indexApi = {
  banner () {
    return request({url: '/v1/cms/op/bannerListByValid', data: 'banner_show_h5'})
  },
  // 和宝码
  productListByTreasure (data) {
    return request({ url: '/v1/bid/business/productListByTreasure', data: data })
  },
  // 产品
  productList (a, b) {
    return request({
      url: '/v1/bid/business/productList',
      data: {
        num: a,
        size: b,
        productTypeList: ['bid_type_novice', 'bid_type_produce'],
      }
    })
  },
  // 出借界面标的数据
  productInfoById (formdata) {
    return request({
      url: '/v1/bid/business/productInfoById',
      data: formdata
    })
  },
  // 我的账户
  accountInfo () {
    return request({ url: '/v1/fin/capital/accountInfo' })
  },
  // 出借确认
  transactionJin (data) {
    return request({ url: '/v1/fin/transaction/transactionJin', data: data })
  },
  // 出借结果
  productInvest (data) {
    return request({ url: '/v1/bid/business/productInvest', data: data })
  },
  // 配置信息
  platformConfig () {
    return request({ url: '/v1/cms/op/platformConfig' })
  },
  // 文章详情
  articleInfo (formdata) {
    return request({ url: '/v1/cms/op/articleInfo', data: formdata })
  },
  // 优惠券可用数量
  couponUsableCount (formdata) {
    return request({ url: '/v1/uc/user/couponUsableCount', data: formdata })
  },
  // 优惠券可用列表
  couponUsableListByPage (formdata) {
    return request({ url: '/v1/uc/user/couponUsableListByPage', data: formdata })
  },
  // 出借短信验证码
  smsCodeDefaultSend_code (data) {
    return request({ url: '/v1/cms/core/smsCodeDefaultSend', data: data })
  }
}
export { indexApi }
