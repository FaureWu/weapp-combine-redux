import { dispatcher } from '../../utils/zoro'
import { connect } from '../../utils/weapp-redux'

const config = connect(state => ({
  userInfo: state.user.userInfo,
  hasUserInfo: state.user.hasUserInfo,
}))({
  data: {
    motto: 'Hello World',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function(e) {
    dispatcher.user.update({ userInfo: e.detail.userInfo, hasUserInfo: true })
  }
})

Page(config)