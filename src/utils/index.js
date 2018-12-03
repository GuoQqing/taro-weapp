import Taro from '@tarojs/taro';

// 数据缓存
function setStorage (params) {
  Taro.getStorage({ key: params.key }).then(
    (res) => {
      const data = {
        ...res.data,
        ...params.data
      };
      Taro.setStorage({ key: params.key, data });
    },
    (err) => {
      const data = params.data;
      Taro.setStorage({ key: params.key, data });
      console.debug(err);
    }
  )
}

export default {
  setStorage
}