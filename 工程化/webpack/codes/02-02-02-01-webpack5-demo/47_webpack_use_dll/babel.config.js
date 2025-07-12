const presets = [
  ['@babel/preset-env'],
  ['@babel/preset-react'],
]

const plugins = []

// 依据当前的打包模式来决定plugins 的值 
const isProduction = process.env.NODE_ENV === 'production'
if (!isProduction) {
  plugins.push(['react-refresh/babel'])
}

module.exports = {
  presets,
  plugins
}