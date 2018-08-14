import {
  classicBeh
} from "../classic-beh.js"

Component({

  behaviors: [classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    // img: String,
    // content: String
    //绑定hidden，让自定义组件可以使用hidden属性
    // hidden: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    movieImg: "images/movie@tag.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})