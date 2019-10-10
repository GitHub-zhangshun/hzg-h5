/* eslint-disable no-unreachable */
import md5 from 'blueimp-md5'
import axios from 'axios'
import { getToken } from './auth'
// eslint-disable-next-line node/no-deprecated-api
import { isString } from 'util'
import router from '@/router/index'
import { Dialog, Toast } from 'vant'

// 创建axios实例
const request = axios.create({
  baseURL: process.env.BASE_API, // api的 base_url
  timeout: 3000 * 1000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

/**
 * 参数加签
 * @param {*} privateKey
 * @param {*} timestamp
 * @param {*} data
 */
function getSign (privateKey, timestamp, data) {
  //
  privateKey = privateKey || process.env.PRIVATE_KEY
  // 非string 转换string
  if (!isString(data)) {
    data = JSON.stringify(data)
  }
  // 转换data为 string 去除\r \n 以及带长度空字符串
  data = data.replace(/[\r\n]/g, '').replace(/\s+/g, '')
  let dataStrByUrl = encodeURIComponent(data)
  dataStrByUrl = dataStrByUrl.replace(/\(/g, '%28')
  dataStrByUrl = dataStrByUrl.replace(/\)/g, '%29')
  dataStrByUrl = dataStrByUrl.replace(/\!/g, '%21')
  dataStrByUrl = dataStrByUrl.replace(/\'/g, '%27')
  dataStrByUrl = dataStrByUrl.replace(/\~/g, '%7E')
  // dataStrByUrl = dataStrByUrl.replace(/\*/g, '%2A')
  // 加签 私钥+时间戳+请求文本  以md5方式进行加密
  return md5(privateKey + timestamp + dataStrByUrl)
}
// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();
// request拦截器
request.interceptors.request.use(config => {
  config.method = 'post' // 默认请求post
  // 添加API header
  const timestamp = new Date().getTime().toString() // 当前时间戳
  config.headers['mid'] = process.env.MID // 开发者证书
  config.headers['timestamp'] = timestamp // 时间错
  config.headers['sign'] = getSign('', timestamp, config.data || 'no data') // 签名
  // 如果为空data 加一个非空字符
  if (!config.data) {
    config.data = 'no data'
  }
  if (localStorage.getItem('token')) {
    config.headers['token'] = getToken() // 请求携带自定义token
  }
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
request.interceptors.response.use(
  response => {
    let responseURL = response.request.responseURL.split('/')
    const res = response.data
    if (res.code !== '0') {
      switch (res.code) {
        case '10003':
          Dialog.alert({
            title: '失效提醒',
            message: `<p style="text-align:center">你的账号登录状态已失效，请重新登录</p>`
          }).then(() => {
            localStorage.clear()
            router.push({path: '/my'})
          })
          return Promise.reject(res)
          break
        case '10001':
          Dialog.alert({
            title: '失效提醒',
            message: `<p style="text-align:center">你的账号登录状态已失效，请重新登录</p>`
          }).then(() => {
            localStorage.clear()
            router.push({path: '/my'})
          })
          return Promise.reject(res)
          break
        case '24024':
          Dialog.alert({
            message: `<p style="text-align:center">${res.message}</p>`
          }).then(() => {})
          return Promise.reject(res)
          break
        case '0001':
          if (responseURL[responseURL.length - 1] === 'recharge' || responseURL[responseURL.length - 1] === 'withdraw') {
            return Promise.resolve(res)
          } else {
            Toast({message: res.message || '网络异常，请稍后再试', duration: 2000})
            return Promise.reject(res)
          }
          break
        case '5557':
          if (responseURL[responseURL.length - 1] === 'recharge' || responseURL[responseURL.length - 1] === 'withdraw') {
            Dialog.confirm({
              message: '您的账户还未授权此功能',
              cancelButtonText: '关闭',
              confirmButtonText: '去授权'
            }).then(() => {
              location.href = process.env.domain + '/v1/fin/account/appAuth?token=' + localStorage.getItem('token')
            }).catch(() => { })
            return Promise.reject(res)
          } else {
            Toast({message: res.message || '网络异常，请稍后再试', duration: 2000})
            return Promise.reject(res)
          }
          break
        case '3018':
          if (responseURL[responseURL.length - 1] === 'withdraw') {
            this.$toast({message: '余额不足', duration: 2000})
            return Promise.reject(res)
          } else {
            Toast({message: res.message || '网络异常，请稍后再试', duration: 2000})
            return Promise.reject(res)
          }
          break
        default:
          if (responseURL[responseURL.length - 1] === 'productInvest') {
            return Promise.resolve(res)
          } else {
            Toast({message: res.message || '网络异常，请稍后再试', duration: 2000})
            return Promise.reject(res)
          }
      }
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    const response = error.response
    // 存在响应
    // eslint-disable-next-line eqeqeq
    if (response.status != 200 || response.status != 403) {
      // 跳页面
      router.push('/page403')
    }
    return Promise.reject(error)
  }
)

export { request, axios }
