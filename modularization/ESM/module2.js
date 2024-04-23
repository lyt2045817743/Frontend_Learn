// module2.js
import { changeMsg } from './module1.js';

function sayHello() {
    changeMsg();
}

sayHello(); // 调用模块1中的函数
