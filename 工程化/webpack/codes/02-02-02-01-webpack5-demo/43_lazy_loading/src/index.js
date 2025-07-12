const oBtn = document.createElement('button')
oBtn.innerHTML = '点击加载元素'
document.body.appendChild(oBtn)

// 按需加载
oBtn.addEventListener('click', () => {
  import('./utils').then(({ default: element }) => {
    console.log(element)
    document.body.appendChild(element)
  })
})