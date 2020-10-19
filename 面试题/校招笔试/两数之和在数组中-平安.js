function getSumNum( arr ,  sum ) {
    // write code here
    const obj = {};
    let result = [];

    for(let i = 0, len = arr.length; i < len; i++){
        const curNum = arr[i];
        if(obj[curNum] === undefined){
            obj[sum - curNum] = i;
        } else {
            console.log(obj);
            delete obj[curNum];
            result.push(Math.min(curNum, sum - curNum) + '&' + Math.max(curNum, sum - curNum));
        }
    }
    result.sort((a,b) => a.split('&')[0] - b.split('&')[0])

    return result;
}

const result = getSumNum([5, 6, 2, 11, -1, 7, 9, 4, 8, 3, 5, 1, 0, 10],10);
console.log(result);

