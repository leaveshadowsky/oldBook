import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js';

const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示loading状态，问题在于何时取消loading状态，若是在发送请求1的then里发送请求2，这是
    //串行请求，效率更慢，而我们这里是并行请求，同时发送请求。而promise就可以解决这个问题
    wx.showLoading()
    //接收用户点击传来的book_id，组件接收参数是放在properties，页面接收
    //参数是放在页面的onLoad函数中，如下(这是获取promise)
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    //这里调用Promise的all方法，作用是当子promise全部成功返回结果后才会触发回调函数，
    //返回一个promise携带所有子函数返回的promise结果
    //而此时就可以接收这个返回的promise，然后写相关逻辑(取消loading)
    //用了Promise.all后，则下面的子promise可以注销。
    //而Promise.race则是任何一个子promise成功返回后则立刻触发回调函数。
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })
    //获取到了promise，再调用then来获取数据，更新数据
    // detail.then(res => {
    //   console.log(res)
    //   this.setData({
    //     book: res
    //   })
    // })
    // comments.then(res => {
    //   console.log(res)
    //   this.setData({
    //     comments: res.comments
    //   })
    // })
    // likeStatus.then(res => {
    //   console.log(res)
    //   this.setData({
    //     likeStatus: res.like_status,
    //     likeCount: res.fav_nums
    //   })
    // })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    //因为这两个只会其中一个有值，所以用||来表达，则不需要用if else来判断
    const comment = event.detail.text || event.detail.value
    // const commentInput = event.detail.value
    if (!comment) {
      wx.showToast({
        title: "你还没输入东西呢",
        icon: "none"
      })
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: "短评最多为12个字",
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment)
      //成功调用api后
      .then(res => {
        wx.showToast({
          title: "+1",
          icon: "none"
        })
        //unshift可以将新增加元素添加至数组首位
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  },
  onPressMask(event) {
    this.setData({
      posting: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})