import oImgSrc from '../img/01.wb.png'
import '../css/img.css'


function packImg() {
  // 01 创建一个容器元素
  const oEle = document.createElement('div')

  // 02 创建 img 标签，设置 src 属性
  const oImg = document.createElement('img')
  oImg.width = 600
  // oImg.src = require('../img/01.wb.png').default
  // oImg.src = require('../img/01.wb.png')
  oImg.src = oImgSrc
  oEle.appendChild(oImg)

  // 03 设置背景图片
  const oBgImg = document.createElement('div')
  oBgImg.className = 'bgBox'
  oEle.appendChild(oBgImg)

  return oEle
}

document.body.appendChild(packImg())
