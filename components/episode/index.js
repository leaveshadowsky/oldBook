Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      //监听函数:当这个值改变时，自动调用这个函数，可以获取到改变后的值
      observer: function (newVal, oldVal, changePath) {
        let val = newVal < 10 ? "0" + newVal : newVal
        //这里若setData是index:val则会造成无限递归调用observer函数。所以在数据更新时，不要更新被监听
        //的这个值，而是用一个别的值代替它，如下面data中的_index。这个问题可以用wxs更好的解决
        this.setData({
          // index:val
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    //给data中的变量赋初值时不可像properties中直接赋数据类型，应该像下面这样
    year: 0,
    month: "",
    _index: "",
  },

  //生命周期函数，加载节点树时执行
  attached: function () {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    this.setData({
      year,
      month: this.data.months[month]
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})