class AAA {
  constructor(option) {
    this.name = 'AAA';
    this.option = option;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(213123);
      }, 1000);
    });
  }
}

const ins = new AAA({ a: 1, b: 2 });

ins.then(res => {console.log('res===>', res)})