const demo = {a: false, b: undefined, c: null};
const {a = 1, b = 2, c = 3} = demo;

console.log(a, b, c); // false 2 null