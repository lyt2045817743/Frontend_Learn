function parseNumber( num ) {
    // write code here
    let numToStr = num.toString();
    let len = numToStr.length;
    for(let i = len - 4; i >= 0; i-=3){
        numToStr = numToStr.substring(0,i+1)+','+numToStr.substring(i+1,len);
        len++;
    }
    return numToStr;
}

let result = parseNumber(12333355);
console.log(result);


// let str='12345';
// console.log(str.substring(3,4));
