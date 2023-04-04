// const a = 1;

setTimeout(() => {
  const body = document.getElementsByTagName('body');
  const div = document.createElement('div');
  div.className='box'

  body[0].appendChild(div)
}, 3000)

const right = document.querySelector('.right');
console.log(right);