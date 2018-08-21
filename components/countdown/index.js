// components/countdown/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //当前年份
    currentYear: Number,
    //过了多少天
    days: Number,
    //一年的总天数
    dayOfYear: Number,
    //过了一年中的天数百分比
    throughPercent: Number
  },

  attached() {
    this._getYear()
    this._getDays()
    this._getDayOfYear()
    this._getThroughPercent()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isLeapYear() {
      const cYear = new Date().getFullYear()
      if (cYear % 400 === 0) {
        return true
      } else if (cYear % 4 === 0 && cYear % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    //获取一年有多少天
    _getDayOfYear() {
      this.setData({
        dayOfYear: this.isLeapYear() ? 366 : 365
      })
      // return this.isLeapYear() ? 366 : 365
    },
    _getYear() {
      this.setData({
        currentYear: new Date().getFullYear()
      })
    },
    _getDays() {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = new Date().getTime() - start.getTime()
      this.setData({
        days: parseInt(offset / 1000 / 60 / 60 / 24) + 1
      })
    },
    _getThroughPercent() {
      this.setData({
        throughPercent: (this.data.days * 100 / this.data.dayOfYear).toFixed(1)
      })
      // console.log(this.data.throughPercent)
    }
  }
})