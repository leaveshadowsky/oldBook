import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  //组件使用行为
  behaviors: [paginationBev],
  properties: {
    //接收页面传来的属性
    more: {
      type: String,
      observer: "loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    // dataArray: [],
    searching: false,
    //用锁来避免同时发送多个请求
    loading: false
  },

  attached() {
    //这里为了增加组件的复用性，其实应该在page页面中写调用服务器的相关数据的方法，然后在
    //页面中用数据绑定的方式将数据传入组件，但是在这里还是直接写，方便一点
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
    this.setData({
      historyWords: keywordModel.getHistory()
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //向服务器加载更多数据函数，依然调用的事search方法，只是参数start设置为上一次
    //获取到的数据存入的数组的长度
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this._isLocked()) {
        return
      }
      const length = this.getCurrentStart()
      if (this.hasMore()) {
        this._locked()
        bookModel.search(length, this.data.q).then(res => {
          //then中将两个数组合并
          this.setMoreData(res.books)
          this._unLocked()
        }, () => {
          //请求失败也要解锁
          this._unLocked()
        })
      }
    },
    onDelete(event) {
      this._closeResult()
    },
    onCancel(event) {
      this.triggerEvent("cancel", {}, {})
    },
    onConfirm(event) {
      this._showResult()
      this.initialize()
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          // dataArray: res.books
          q
        })
        keywordModel.addToHistory(q)
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        q: null,
        searching: false
      })
    },
    _isLocked() {
      return this.data.loading ? true : false
    },
    _locked() {
      this.data.loading = true
    },
    _unLocked() {
      this.data.loading = false
    }
  }
})