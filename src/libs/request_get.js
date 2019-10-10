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
  // eslint-disable-next-line no-useless-escape
  dataStrByUrl = dataStrByUrl.replace(/\!/g, '%21')
  // eslint-disable-next-line no-useless-escape
  dataStrByUrl = dataStrByUrl.replace(/\'/g, '%27')
  // eslint-disable-next-line no-useless-escape
  dataStrByUrl = dataStrByUrl.replace(/\~/g, '%7E')
  // dataStrByUrl = dataStrByUrl.replace(/\*/g, '%2A')
  // 加签 私钥+时间戳+请求文本  以md5方式进行加密
  return md5(privateKey + timestamp + dataStrByUrl)
}
// var CancelToken = axios.CancelToken;
// var source = CancelToken.source();
// request拦截器
request.interceptors.request.use(config => {
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
    const res = response.data
    if (res.code === '10003') {
      Dialog.alert({
        title: '失效提醒',
        message: `<p style="text-align:center">你的账号登陆状态已失效，请重新登录</p>`
      }).then(() => {
      // on close
        localStorage.clear()
        // eslint-disable-next-line no-undef
        router.push({path: '/verification_code_login', query: {redirect: to.fullPath}})
      })
    } else if (res.code === '10001') {
      localStorage.clear()
      // eslint-disable-next-line no-undef
      router.push({path: '/verification_code_login', query: {redirect: to.fullPath}})
    } else if (res.code === '0') {
      return Promise.resolve(res)
    } else if (res.code === '24021') {
      Dialog.alert({
        message: `<p style="text-align:center">${res.message}</p>`
      }).then(() => {
        // on close
      })
    } else {
      Toast({message: res.message, duration: 2000})
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
