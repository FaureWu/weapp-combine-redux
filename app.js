import zoro, { dispatcher } from './utils/zoro'
import { setStore } from './utils/weapp-redux'
import user from './models/user'

const app = zoro()
app.model(user)
const store = app.start(false)

setStore(store)

//app.js
App({
  onLaunch: function () {
    app.setup()
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    dispatcher.user.login()
    dispatcher.user.getUserInfo()
  },
})