import {
  classicBeh
} from "../classic-beh.js"

//定义一个音乐管理对象，可以管理音乐播放
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    // img: String,
    // content: String
    //绑定hidden，让自定义组件可以使用hidden属性
    // hidden: Boolean
    songSrc: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    musicPlaying: "images/player@play.png",
    musicPause: "images/player@pause.png",
    musicImg: "images/music@tag.png"
  },

  attached: function () {
    //最好不要在生命周期钩子中写业务，用一个私有方法封装逻辑再调用
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function () {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function (event) {
      //切换播放状态
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.songSrc
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    //定义私有方法，音乐组件在切换时判断当前播放音乐和当前期刊的音乐是否相同，若是
    //则显示pause，若不是，则显示play
    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.songSrc) {
        this.setData({
          playing: true
        })
      }
    },
    //为了解决系统总控开关可以控制我们的音乐组件
    _monitorSwitch: function () {
      //onPlay接收一个回调函数，所以这里写一个箭头函数作为参数传入onPlay中，当
      //用户播放音乐时，会自动执行箭头函数。
      //音乐管理对象mMgr对应的四个方法，我们只需要在用户使用总控开关时调用之前封装的recoverStatus()
      //即可实现音乐图标同步更新
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})