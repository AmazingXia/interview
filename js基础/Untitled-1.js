function aa(fn, time) {
  let timer = null
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    fn();
  }, time);
}