// 实现一个[1,2,[3,5,[4,1,6]]]  去重、排序 和 转一维

function formatArray(arr) {
    const set = new Set();

    function format(arr2) {
        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i] instanceof Array) {
                format(arr2[i]);
            } else {
                set.add(arr2[i]);
            }
        }
    }

    format(arr);
    // console.log(set);

    return Array.from(set).sort();
}

const result = formatArray([1,2,[3,5,[4,1,6]]]);
console.log(result);