import {
  HTTP
} from '../utils/http.js'

class LikeModel extends HTTP {
  //获取服务器中的点赞信息
  like(behavior, artID, category) {
    let url = behavior == 'isLike' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
  //获取点赞状态
  getClassicLikeStatus(artID, category, sCallBack) {
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallBack
    })
  }

}

export {
  LikeModel
}