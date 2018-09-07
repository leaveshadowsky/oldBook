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
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }
  postComment(bid, comment) {
    // 返回调用request后返回的promise
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }
}

export {
  BookModel
}