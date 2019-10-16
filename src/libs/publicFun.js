/* eslint-disable camelcase */
import {
  Decimal
} from 'decimal.js'
let publicFun = {
  // 格式化数字
  toMoney(num, n) {
    if (num != null) {
      if (n) {
        return num.toFixed(n).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
      } else {
        return num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
      }
    }
  },
  // 转化时间（年月日）
  timestampToTime(timestamp, a) {
    if (!timestamp) {
      return null
    }
    var date = new Date(timestamp)
    var Y = date.getFullYear() + a
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + a
    var D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() + ' '
    return Y + M + D
  },
  // 转化时间（年月）
  timestampToTimes(timestamp, a) {
    if (!timestamp) {
      return null
    }
    var date = new Date(timestamp)
    var Y = date.getFullYear() + a
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    return Y + M
  },
  // 转化时间（年月日时分秒）
  timestampToTimesfs(timestamp, a) {
    if (!timestamp) {
      return null
    }
    var date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + a
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + a
    var D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate() + ' '
    var h = (date.getHours() >= '10' ? `${date.getHours()}` : `0${date.getHours()}`) + ':'
    var m = date.getMinutes() >= '10' ? date.getMinutes() : `0${date.getMinutes()}`
    return Y + M + D + ' ' + h + m
  },
  // 手机正则
  checkPhone(phone) {
    if (!(/^((1[2-9]))\d{9}$/.test(phone))) {
      return false
    } else {
      return true
    }
  },
  // 密码
  checkPwd(pwd) {
    if (!(/^([a-zA-Z0-9!@#$%^&*`:"<>?,./;'`]){6,16}$/.test(pwd))) {
      return false
    } else {
      return true
    }
  },
  // 预期利息
  lx(limitUnit, money, rate, bidLimit) {
    console.log(limitUnit, money, rate, bidLimit)
    // eslint-disable-next-line eqeqeq
    if (limitUnit == 'interest_rate_month') {
      // 预期利息=出借本金 * (年利率/12) * 月数
      return (money * ((rate * 0.01) / 12) * bidLimit).toFixed(2)
    } else {
      // 预期利息=出借本金 * 年利率 * (持有天数/365)
      return (money * (rate * 0.01) * (bidLimit / 365)).toFixed(2)
    }
  },
  // 检查金额格式
  checkMoney(data) {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    return reg.test(data)
  },
  /**
   * 字典匹配
   * b:需要匹配的值 
   * return []
   * @param {*} b 
   */
  Pl(b) {
    const dic = sessionStorage.getItem('dictionaryListByAll') && JSON.parse(sessionStorage.getItem('dictionaryListByAll'))
    return dic.filter(item => {
      return item.Id == b
    })
  },
  /**
   * 字典匹配
   * b:需要匹配的值 
   * return {}
   * @param {*} b 
   */
  Pl_obj(b) {
    const dic = sessionStorage.getItem('dictionaryListByAll') && JSON.parse(sessionStorage.getItem('dictionaryListByAll'))
    return dic.find(item => {
      return item.Id == b
    })
  },
  /**
   * 字典匹配
   * b:需要匹配的值 
   * return title
   * @param {*} b 
   */
  Pl_title(b) {
    return b && this.Pl_obj(b) && this.Pl_obj(b).title || '--'
  },
  /**
   * 字典匹配
   * b:需要匹配的值 
   * return simplify
   * @param {*} b 
   */
  Pl_simplify(b) {
    return b && this.Pl_obj(b) && this.Pl_obj(b).simplify || ''
  },
  // 加法精度
  numAdd() {
    let som = 0
    for (let index = 0; index < arguments.length; index++) {
      som = new Decimal(arguments[index]).add(new Decimal(som)).toNumber().toFixed(2)
    }
    return som
  },
  // eslint-disable-next-line camelcase
  number_format(number, noToDouble) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    let str = number.toLocaleString('en-US')
    let subStr = str.split('.')
    if (subStr && subStr.length === 1) {
      str = `${str}.00`
    } else if (subStr && subStr.length > 1) {
      let _str = subStr[1]
      _str.length === 1 && (str = `${str}0`)
    }
    return str

    // number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    // // eslint-disable-next-line one-var
    // var n = !isFinite(+number) ? 0 : +number,
    //   prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    //   sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    //   dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    //   s = '',
    //   toFixedFix = function (n, prec) {
    //     var k = Math.pow(10, prec)
    //     return '' + Math.round(n * k) / k
    //   }
    // debugger
    // s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    // var re = /(-?\d+)(\d{3})/
    // while (re.test(s[0])) {
    //   s[0] = s[0].replace(re, '$1' + sep + '$2')
    // }

    // if ((s[1] || '').length < prec) {
    //   s[1] = s[1] || ''
    //   s[1] += new Array(prec - s[1].length + 1).join('0')
    // }
    // debugger
    // return s.join(dec)
  },
  /**
   * 对象取值 基础方法 不对外调用
   * @param {*} obj
   * @param {*} str
   */
  _getObjValBase(obj, str, objV) {
    if (isNullOrUndefined(obj) || isNullOrUndefined(str)) {
      return
    }
    const realKeys = str.split('_')
    let count = realKeys.length
    for (let index = 0; index < realKeys.length; index++) {
      count--
      if (count === 0) {
        objV['val'] = obj[realKeys[index]]
      } else {
        if (!isNullOrUndefined(obj[realKeys[index]])) {
          this._getObjValBase(obj[realKeys[index]], str.substr(str.indexOf('_') + 1, str.length), objV)
        }
        break
      }
    }
  },
  /**
   * 对象取值自动判断空指针带数据格式转换 对外方法
   * @param {*} obj 数据源 对象
   * @param {*} str 参数层级 e.g.: user_info_amount
   * @param {*} type 转换类型或者自定义默认值
   * nf/nf_t(number_format)金额格式化(nf: 只格式化/nf_t: 格式化并保留两位小数)
   * t_y|t_s时间格式化(_y: yyyy-MM-dd/_s: yyyy-MM-dd hh:mm:ss)
   * 如果type不给默认返回空字符串 如果给的值为nf/t_y/t_s则自动匹配类型 如果给其他值则为自定义默认值 e.g.:'---'
   * user_stats_money
   * getObjVal(res, 'user_stats_money')
   */
  getObjVal(obj, str, type) {
    const objV = {}
    this._getObjValBase(obj, str, objV)
    let val = objV.val
    switch (type) {
      case 'nf':
        val = this.number_format(val, true)
        break
      case 'nf_t':
        val = this.number_format(val)
        break
      case 't_y':
        val = this.getTime(val, '{y}-{m}-{d}')
        break
      case 't_s':
        val = this.getTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
        break
      default:
        val = val || type || ''
        break
    }
    return val
  },
  // 三方跳转
  redirectTripartite(val) {
    let body = document.body
    let formDiv = document.createElement('div')
    formDiv.setAttribute('id', 'form')
    body.appendChild(formDiv)
    document.getElementById('form').innerHTML = val
    document.forms['form'].submit()
    setTimeout(() => {
      formDiv.remove()
    }, 1000)
  }
}
export {
  publicFun
}
