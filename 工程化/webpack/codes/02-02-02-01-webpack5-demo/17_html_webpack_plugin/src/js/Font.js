import '../font/iconfont.css'
import '../css/index.css'

function packFont() {
  const oEle = document.createElement('div')

  const oSpan = document.createElement('span')
  oSpan.className = 'iconfont icon-linggan lg-icon'
  oEle.appendChild(oSpan)

  return oEle
}

document.body.appendChild(packFont())
