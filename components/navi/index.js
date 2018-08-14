// components/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftArrow: 'images/trangle@left.png',
    rightArrow: 'images/trangle@right.png',
    leftArrowDis: 'images/trangledis@left.png',
    rightArrowDis: 'images/trangledis@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听左右箭头并向外触发left，right自定义事件
    onLeft: function (event) {
      if (!this.properties.latest) {
        this.triggerEvent("left", {}, {})
      }
    },
    onRight: function (event) {
      if (!this.properties.first) {
        this.triggerEvent("right", {}, {})
      }
    }
  }
})