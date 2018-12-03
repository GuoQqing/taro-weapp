/**
 *  封装请求
 */
import Taro from '@tarojs/taro'
import app_config from '../../config'
import { make_api_headers } from './makeHeaders'

const { url, access_key, secret_key } = app_config;

export default function request_api ({api, data, auth_type, method = 'POST'} = {}) {
  const { access_token } = Taro.getStorageSync('youke_test');
  let headers = make_api_headers({
    cmd: api,
    access_key,
    secret_key,
    access_token,
    auth_type,
  })
  headers[ 'Content-Type' ] = 'application/json';
  return new Promise(function(resolve, reject){
    Taro.request({
      url,
      data,
      method,
      header: headers,
      dataType: 'json'
    }).then((res) => {
      if(res.statusCode === 200) {
        if(res.data.err_code){
          return reject(res.data.err_code);
        }
        return resolve(res.data);
      }
    }).catch((err) => {
      return reject(err);
    })
  })
}