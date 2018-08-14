// components/like/index.js
Component({
  /**
   * 组件的属性列表
   * 一般是组件对外开放的数据，就定义在properties中，每种数据是一个Object类型
   * 有三种属性值可以定义，type(必填)，value(默认为false)，observe
   */
  properties: {
    isLike: {
      type: Boolean,
    },
    likeTimes: {
      type: Number,
    }
  },

  /**
   * 组件的初始数据
   * 一般是组件内部使用的数据，不对外开放
   */
  data: {
    likeImg: "images/like.png",
    dislikeImg: "images/like@dis.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听like组件事件
    pressLike: function (event) {
      let islike = this.properties.isLike
      let liketimes = this.properties.likeTimes
      liketimes = islike ? liketimes - 1 : liketimes + 1
      //setData是为了更新在wxml中绑定的数值，将事件中let定义的值更新后赋给wxml中绑定的值
      this.setData({
        likeTimes: liketimes,
        isLike: !islike
      })
      //激活自定义事件,从而在使用组件的相应页面中监听此事件，便可传递数据到相应页面
      let behavior = this.properties.isLike ? 'isLike' : 'cancel'
      this.triggerEvent("isLike", {
        behavior: behavior
      })
    }
  }
})