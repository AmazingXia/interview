// 行内loader  如果有多个loader，可以使用 ! 分隔
// import 'css-loader!../css/login.css'
import '../css/login.css'

function login() {
  const oH2 = document.createElement('h2')
  oH2.innerHTML = '拉勾教育前端'
  oH2.className = 'title'
  return oH2
}

document.body.appendChild(login())
