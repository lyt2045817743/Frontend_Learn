// input: [-2, -3, 0, 1, 0, 2]
// output: [0, 0, -3, -2, 1, 2]

function sort(arr) {
    arr.sort((a, b) => {
        console.log(a, b);
        if (b === 0) {
            return 1;
        }
        if (a === 0) {
            return -1
        }
        return a - b;
    });
    return arr
}

const result = sort([-2, -3, 0, 1, 0, 2]);
console.log(result);