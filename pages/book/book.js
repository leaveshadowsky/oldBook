import {
  BookModel
} from '../../models/book.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //使用Promise(通过对象的方式保存了异步调用的结果，而这个结果可以传递给任何地方，不需要带任何的回调函数
    // //当需要从promise中取异步调用结果的时候，才需要带回调函数)
    // //1、实例化Promise
    // //2、将要处理的异步代码写在Promise函数中(即写在箭头函数中)
    // //3、通过promise的then方法获取结果
    // const promise = new Promise((resolve, reject) => {
    //   //Promise对象可以保存状态，有三种状态1:pending(进行中) 2:fulfilled(已成功) 3:rejected(已失败)
    //   //通过resolve可以将pending修改成fulfilled，在success中进行
    //   //通过reject可以将pending修改成rejected，在fail中进行
    //   //promise修改了状态以后就凝固了，不可再修改
    //   //new promise对象有什么用？可随时通过promise对象来拿到异步调用的结果
    //   wx.getSystemInfo({
    //     success: (res) => {
    //       //pending修改成fulfilled
    //       resolve(res)
    //     },
    //     fail: (error) => {
    //       //pending修改成rejected
    //       reject(error)
    //     }
    //   })
    // })
    // //通过promise的then方法，参数是两个回调函数，一个是已成功，一个是已失败(两个不是必须都要填，但顺序不能变)
    // promise.then((res) => {
    // }, (error) => {
    // })

    //promise的错误用法:
    // const hotList = bookModel.getHotList()
    // //拿到服务器返回的数据，并编写相关业务逻辑
    // hotList.then(
    //   res => {
    //     console.log(res)
    //     //此时若要链式调用，则在调用第一个API1返回的箭头函数直接使用then调用第二个API2(这是promise错误用法)如下
    //     //这个是在回调函数中调用回调函数,是错误用法
    //     bookModel.getMyBookCount().then(res => {
    //       console.log(res)
    //     })
    //   }
    // )

    //promise正确用法:不要在第一次调用API后的回调函数中直接.then，而是应该return这个promise
    //在外面再用.then 形式如下
    //调用API1
    bookModel.getHotList()
      .then(res => {
        //调用API2后的逻辑代码(继续调用API2))
        // return bookModel.getMyBookCount()
        //获取服务器返回数据后更新data中的books
        this.setData({
          books: res
        })
      })
    //调用API2后等return上一次promise再在外部.then()，即在第一个then的外部.then(),
    //而不是在return promise实例后.then()
    // .then(res => {
    //   // console.log(res)
    //   //调用API3...像这样，可平行调用API
    // })

    // // 处理异步最终方案
    // // 使用async和await处理异步
    // // async和await一定要搭配使用
    // // 定义delay函数作为演示async和await
    // function delay(word) {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resovle(word)
    //     }, 2000)
    //   })
    // }
    // async可以认为定义一个等待执行的函数，等待await后接函数执行后promise状态改变再执行
    // async function start() {
    //   //可以理解成await是等待的意思，await等待一个函数的执行，然后执行相应的逻辑
    //   //这里word1接收delay函数resolve出来的word，await会等到指定函数执行完毕
    //   //promise状态改变才会执行
    //   const word1 = await delay("aaa")
    //   //这里写上一级函数执行完毕后，promise状态改变后执行的逻辑
    //   console(word1)
    //   const word2 = await delay("bbb")
    //   console(word2)
    // }
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