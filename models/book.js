import {
  HTTP
} from '../utils/http-p.js'

class BookModel extends HTTP {
  //这里不用再传sCallBack回调函数了
  getHotList() {
    // request返回的是promise，所以这里也将其返回
    return this.request({
      url: 'book/hot_list'
    })
  }
  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
}

export {
  BookModel
}