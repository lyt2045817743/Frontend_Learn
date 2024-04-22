function copy(target) {
    console.log(target);
    if (typeof target === 'number'
        || typeof target === 'string'
        || typeof target === 'boolean'
        || typeof target === 'undefined'
        || target === null
    ) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.valueOf());
    }
    if (typeof target === 'object') {
        const result = target instanceof Array ? [] : {};
        for (let key in target) {
            result[key] = copy(target[key]);
        }
        return result;
    }
}
// const target = new Date();
// const target = { a: 1, b: { c: 25 }}
const target = [1, [2, 3, [3]]]
const result = copy(target);
console.log(target, result, target === result);