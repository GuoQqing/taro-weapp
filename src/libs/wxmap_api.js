/**
 * 腾讯地图sdk api Promise
 */
import QQMapWX from './qqmap-wx-jssdk.min';

let qqmapsdk = new QQMapWX({
  key: 'VVVBZ-MIBC2-FJCUU-CSDAA-R2QEJ-OJBWD'
});

export function promisify (fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = (res) => {
        resolve(res)
      }
      obj.fail = (res) => {
        reject(res)
      }
      fn.bind(this)(obj);
    })
  }
}

export const wxmap_reverseGeocoder = promisify(qqmapsdk.reverseGeocoder).bind(qqmapsdk);
export const wxmap_geocoder = promisify(qqmapsdk.geocoder).bind(qqmapsdk);