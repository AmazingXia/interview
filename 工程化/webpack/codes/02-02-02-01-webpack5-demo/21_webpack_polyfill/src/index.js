import "core-js/stable";
import "regenerator-runtime/runtime"

const title = '前端'
const foo = () => {
  console.log(title)
}

const p1 = new Promise((resolve, reject) => {
  console.log(111)
})
console.log(p1)

foo()


/**
 * polyfill是什么：
 * @babel/polyfill
 * core-js
 * regenerator-runtime
 */