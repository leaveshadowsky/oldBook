import {
  config
} from '../config.js'

const err_tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}
//重构HTTP，将原来用纯粹的callback形式改写成promise形式
class HTTP {
  //对象解构,可将传入url等参数采用对象的形式传入,格式如下
  //request({url, data = {}, method = "GET"})，在之后传参时可采用js熟悉的对象传入
  request({
    //传参的形式以对象传入
    url,
    data = {},
    method = "GET"
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  //传入resolve和reject用来改变promise状态
  _request(url, resolve, reject, data = {}, method = "GET") {
    // params中有url,data,method等
    wx.request({
      url: config.api_base_url + url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
      },
      success: (res) => {
        //回调函数获取返回的http状态码,返回的是数字，所以要类型转换成字符串
        const code = res.statusCode.toString()
        //startWith,endWith,状态码以2开头
        if (code.startsWith('2')) {
          //用resolve改变状态,并将res.data传递给对应的回调方法
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}