function getStrMax( str ) {
    // write code here
    const len = str.length;
    const totalObj = {};
    let maxVal, maxCount=0;
    for(let i = 0; i < len; i++){
        const curChar = str.charAt(i);
        if(totalObj[curChar]){
            totalObj[curChar]++;
        } else {
            totalObj[curChar] = 1;
        }
        if(totalObj[curChar] > maxCount){
            maxCount = totalObj[curChar];
            maxVal = curChar;
        }
    }
    return maxVal+':'+maxCount;
}

const result = getStrMax('sdddrddddd');
console.log(result);
