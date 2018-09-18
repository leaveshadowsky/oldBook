import {
  HTTP
} from '../utils/http-p.js'
class KeywordModel extends HTTP {
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }
  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 如果超过最大长度，则将数组末尾元素删除，再将keyword添加到数组第一位
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export {
  KeywordModel
}