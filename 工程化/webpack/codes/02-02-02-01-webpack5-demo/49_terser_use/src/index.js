console.log(111)

const foo = (num1, num2) => {
  return num1 + num2
}

console.log(foo(10, 20))

const obj = {
  say() {
    return 'obj当中的say函数'
  }
}

class Person {
  constructor() {
    this.title = '前端开发'
  }
}

const p1 = new Person()
console.log(p1.title)