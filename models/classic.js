import {
  HTTP
} from '../utils/http.js'

//封装了请求相应功能api的功能的方法
class ClassicModel extends HTTP {
  //获取最新期刊
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallBack(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  //获取期刊
  getClassic(index, nextOrPrevious, sCallBack) {
    //确定期刊的key
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    //从缓存中寻找这个key
    let classic = wx.getStorageSync(key)
    if (!classic) {
      // 若没有找到key，则再发请求
      this.request({
        //模板字符串:用反引号括起来，将变量用${}括起来
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          //写入缓存
          wx.setStorageSync(this._getKey(res.index), res)
          sCallBack(res)
        }
      })
    } else {
      //如果找到了这个key，则直接调用回调函数
      sCallBack(classic)
    }
  }

  //判断是否是first
  isFirst(index) {
    return index == 1 ? true : false
  }
  //判断是否是latest
  isLatest(index) {
    //比较传入的index和latestIndex是否相等
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  //定义私有方法，将最新期刊的index存入storage
  _setLatestIndex(index) {
    //存入的值的形式是key-value，这里的key是latest
    wx.setStorageSync('latest', index)
  }
  //从storge中取出存入的latestIndex
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }
  //自定义获取key的方法(写入缓存中时，每个期刊都要有个key)
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

export {
  ClassicModel
}