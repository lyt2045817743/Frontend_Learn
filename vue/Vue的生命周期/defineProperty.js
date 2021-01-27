// 定义两个看起来没什么关系的变量
const obj = {};
let name = "xiaoming";

// 产生联系
Object.defineProperty(obj, "name", {
    set(newVal){
        console.log('set 设置');
        name = newVal
    },
    get(){
        console.log('get 获取');
        return name
    }
})

// 测试
console.log(obj.name, name);
obj.name = "zhangsan"
console.log(obj.name, name);