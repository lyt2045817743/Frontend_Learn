function printNum( n ,  m ) {
    // write code here
    const result = [];
    for(let i = 1; i <= n; i++){
        if(i % m !== 0){
            result.push(i);
        }
    }
    return result;
}
const result = printNum(20,6);
console.log(result);
