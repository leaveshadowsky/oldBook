import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'


let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //wx.request的网络请求是强制异步，所以不可以let一个data对象去接收请求返回的json数据
    ////可以用回调函数(服务器返回数据后自动触发)如success
    // wx.request({
    //   url: 'http://bl.7yue.pro/v1/classic/latest',
    //   header: {
    //     appkey: "KOLDaSADSDLWWbF"
    //   },
    //   //回调函数success接收返回数据通过res传递过来下面这种方式是老版，回调函数里的this指向null
    //   //原因是作用域发生了改变，es6出现后，用箭头函数来定义回调函数，可使this指向和上面一致
    //   // success: function (res) {}，下面是箭头函数定义的方式(通过回调函数获取异步数据)
    //   success: (res) => {
    //   }
    // })
    //使用下面自定义的模块来代替上面发送的请求
    // http.request({
    //   url: 'classic/latest',
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    //第三种方式：调用models中封装了请求相应功能api的方法,把回调函数当做参数传入getLatest中
    classicModel.getLatest((res) => {
      //通过setData进行数据绑定，这样就可以使用请求api返回的数据
      //并不是通过setData数据绑定后的数据组件才能使用，如上面的data中定义的数据，组件也可以使用
      //setData只是起到数据更新的作用，使用的数据是在data中定义的数据，data中定义的数据要更新也要在setData中更新
      this.setData({
        //data中若没有classic，系统会自动将classic添加至data中，然后在更新
        classic: res,
        //这个getLatest获取的期刊就是最新一期的期刊，所以，可定义两个变量:
        //latestClassic  latestIndex
        //而点击onPrevious时会加载一个classic，这个定义为currentClassic,和currentIndex
        //所以只需要判断currentIndex是否==latestIndex即可判断当前是否是最新一期
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  //写自定义事件点赞，将数据传至服务器
  onLike: function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  //自定义事件，获取下一期内容
  onNext: function (event) {
    this._updateClassic("next")
  },

  //自定义事件，获取上一期内容
  onPrevious: function (event) {
    this._updateClassic("previous")
  },

  //定义私有方法，通过传入next或previous来确定获取的是上一期还是下一期的期刊
  _updateClassic: function (nextOrPrevious) {
    let index = this.data.classic.index
    // console.log(typeof (index))
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      })
    })
  },

  //更新like组件方法
  _getLikeStatus: function (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
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