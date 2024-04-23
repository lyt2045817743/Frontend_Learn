let message = "Hello from module1.js";

export function greet() {
  console.log(message);
}

export function changeMsg() {
    message = 'changed message from module1.js';
}