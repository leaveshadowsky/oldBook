import {
  HTTP
} from '../../utils/http.js'

const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    hasMore() {
      if (this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.data.total = total
    },
    initialize() {
      this.data.dataArray = []
      this.data.total = null
    },

  }
})


export {
  paginationBev
}