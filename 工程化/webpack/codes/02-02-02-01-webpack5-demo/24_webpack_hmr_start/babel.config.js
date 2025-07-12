module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // false: 不对当前的JS处理做 polyfill 的填充
        // usage: 依据用户源代码当中所使用到的新语法进行填充
        // entry: 依据我们当前筛选出来的浏览器决定填充什么
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ]
}