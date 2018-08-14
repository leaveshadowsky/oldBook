import {
  config
} from '../config.js'

const err_tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000: '期刊不存在'
}

class HTTP {
  //处理异步的方案，如下三种：
  //1、纯粹的callback，剥夺了函数return的能力，所以会陷入回调地狱。request是一个异步函数，所以我们必须要在调用时在参数中传递一个回调函数
  //2、promise 区别就在于它不需要层层传递callback(具有return能力)
  //3、async和await 目前小程序不支持
  //Promise: 它是对象(对象可以保存状态)，而不是函数
  // 如何使用，在book.js中有注解使用
  request(params) {
    // params中有url,data,method等
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      method: params.method,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
      },
      success: (res) => {
        //回调函数获取返回的http状态码,返回的是数字，所以要类型转换成字符串
        const code = res.statusCode.toString()
        //startWith,endWith,状态码以2开头
        if (code.startsWith('2')) {
          //将请求得到的res.data返回给调用方
          params.success && params.success(res.data)
        } else {
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
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