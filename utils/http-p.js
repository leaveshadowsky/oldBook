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
    //传入resolve和reject用来改变promise状态,当promise状态改变了就会执行then中的对应的回调函数
    //then方法接收两个参数，分别对应两个状态改变时调用的回调函数,(参数就是两个回调函数)
    //每一个then都会返回一个新的promise实例,所以可以链式调用，下一级的then会在新的promise
    //状态改变后执行新的相应的状态响应函数(resolve(),reject())
    //若then()的回调函数中没有返回promise实例(认为返回一个null)，则立即执行下一级then(),且下一级
    //获取不到上一级传出的值
    //若是返回其他值，则会立即执行下一级then()
    //若是.then()的参数传入的不是一个函数，则这个.then会被忽略，和上一级同时执行
    //promise处理异常有两种:一种是reject("err").then(null,msg=>{})
    //另一种是:throw new Error("err").catch(msg=>{})建议用第二种
    //catch返回的也是promise实例，且其中没有抛出错误，返回的promise实例也是fulfilled则还会继续执行then()
    //建议在所有队列最后都加上catch
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
          //用resolve改变状态,resolve()括号中的值是传出来的值，在then(value=>{})中，value接收
          //resolve或reject传出来的值 value可以在箭头函数中使用
          //一个promise就算是已完成状态，在其之后也可以通过这个已完成的promise实例调用
          //then()还是可以访问到resolve出来的值
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