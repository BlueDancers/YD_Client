module.exports = {
  "plugins": {
    "postcss-pxtorem": {
      rootValue: 32, // Vant 官方根字体大小是 37.5
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}