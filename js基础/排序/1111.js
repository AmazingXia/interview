// 1-9 7

function promsall(arrs) {
  if (arrs.length === 0) {
    return
  }

  const results = [];
  let count = 0;

  return new Promise((resolve, reject) => {
    for (let i = 0; i< arrs.length; i++) {
      const val = arr[i];

      Promise.resolve(val).then((res) => {
        results.push(res);
        count++;
      }).catch(err => {
        reject(err);
      })

      if (count === arrs.length) {
        resolve(results);
      }
    }
  })
}