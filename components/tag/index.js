// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */

  // 启用插槽
  options: {
    multipleSlots: true
  },
  //接收外部传来的wcss样式，这里的tag-class随意写，类似于标签的class名
  // externalClasses: ['tag-class'],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event) {
      this.triggerEvent("tapping", {
        text: this.properties.text
      })
    }
  }
})