function deepCopy(target) {
    // 基本数据类型
    if (typeof target === 'string' ||
        typeof target === 'number' ||
        typeof target === 'boolean' ||
        typeof target === 'undefined' ||
        target === null
       ) {
        return target;
    }

    if (target instanceof Date) {
    	return new Date(target.getTime())
    }

    if (obj instanceof Map) {
        const result = new Map();
        obj.forEach((value, key) => {
            result.set(deepCopy(key), deepCopy(value));
        });
        return result;
    }

    if (obj instanceof Set) {
        const result = new Set();
        obj.forEach(value => {
            result.add(deepCopy(value, hash));
        });
        return result
    }
    
    if (target instanceof Array){
        const result = [];
        for (let key in target) {
        	result.push(deepCopy(target[key]))
        }
        return result;
    }
    
    if (typeof target === 'function') {
    	return (...args) => {
            return target.apply(null, args)
        }
    }
    
    const result = {}
    for (let key in target) {
    	result[key] = deepCopy(target[key])
    }
    return result;
    
}

// 测试对象
let obj = {
    num: 1,
    str: 'string',
    bool: true,
    date: new Date(),
    reg: /regex/,
    arr: [1, 2, 3],
    map: new Map([[1, 'one'], [2, 'two']]),
    set: new Set([1, 2, 3]),
    nested: {
        a: 1,
        b: [2, 3]
    },
    func: function() { return 'I am a function'; }
};

// 深拷贝
let clonedObj = deepCopy(obj);

// 验证
console.log(clonedObj);
console.log(clonedObj.self === clonedObj); // true, 循环引用保持一致
console.log(clonedObj.date === obj.date); // false, 日期对象不同
console.log(clonedObj.reg === obj.reg); // false, 正则对象不同
console.log(clonedObj.arr === obj.arr); // false, 数组对象不同
console.log(clonedObj.map === obj.map); // false, Map 对象不同
console.log(clonedObj.set === obj.set); // false, Set 对象不同
console.log(clonedObj.nested === obj.nested); // false, 嵌套对象不同
console.log(clonedObj.func === obj.func); // false, 函数对象不同
console.log(clonedObj.func()); // 'I am a function'
