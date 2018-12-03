'use strict';

var config = {
  projectName: 'myApp',
  date: '2018-11-13',
  designWidth: 750,
  deviceRatio: {
    '640': 1.17,
    '750': 1,
    '828': 0.905
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: ['transform-class-properties', 'transform-decorators-legacy', 'transform-object-rest-spread']
    }
  },
  defineConstants: {},
  weapp: {},
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      }
    }
  }
};

module.exports = function (merge) {
  if (true) {
    return merge({}, config, require("./dev.js"));
  }
  return merge({}, config, require("./prod.js"));
};