import {
  classicBeh
} from "../classic-beh.js"

Component({
  //组件继承classicBeh，所以在这个组件中拥有classicBeh中的各种属性
  behaviors: [classicBeh],

  /**
   * 组件的属性列表
   */
  properties: {
    //由于继承了classicBeh，所以这两个在classicBeh有的属性可以不用写，写了就相当于覆盖
    // img: String,
    // content: String,
    // hidden: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    essayImg: "images/essay@tag.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})