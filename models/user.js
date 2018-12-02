import { regeneratorRuntime } from '../utils/zoro'
import { promise } from '../utils/util'

const wxLogin = promise(wx.login)
const wxGetSetting = promise(wx.getSetting)
const wxGetUserInfo = promise(wx.getUserInfo)

export default {
  namespace: 'user',
  state: {
    userInfo: {},
    hasUserInfo: false,
  },
  effects: {
    async login() {
      const { code } = await wxLogin()
      // 发送code到后台服务器中获取openId, sessionKey, unionId
    },
    async getUserInfo(action, { put }) {
      const { authSetting } = await wxGetSetting()
      if (authSetting['scope.userInfo']) {
        const { userInfo } = await wxGetUserInfo()
        put({ type: 'update', payload: { userInfo, hasUserInfo: true } })
      } else {
        put({ type: 'update', payload: { hasUserInfo: false } })
      }
    },
  },
  reducers: {
    update({ payload }, state) {
      return { ...state, ...payload }
    },
  },
}