/**
 * 请求接口
 */
import { X_TOKEN, X_AUTH } from '../utils/request/makeHeaders'
import request_api from '../utils/request'

export const authService = {
  /**
   * 微信授权码登录
   */
  wxLogin (code) {
    return request_api({
        api: 'client.auth.wx_login',
        data: { code },
        auth_type: X_AUTH,
      })
  },
}

export const pileService = {
  /**
   * 获取电桩列表
   */
  fectchPileList({ city_code, longitude, latitude, keyword = '' }={}) {
    return request_api({
      api: 'client.pile.record_list',
      auth_type: X_TOKEN,
      data: { city_code, longitude, latitude, keyword }
    })
  },
}