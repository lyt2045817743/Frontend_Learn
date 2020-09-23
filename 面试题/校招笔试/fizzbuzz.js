function Solution(num) {
    console.log(Boolean(num));
    if(typeof num=='number'){
        if(num%7==0&&num%9==0){
            return 'fizzbuzz';
        }else if(num%7==0){
            return 'fizz';
        }else if(num%9==0){
            return 'buzz';
        }else{
            return num;
        }
    }
    else if(num===undefined){
        return false;
    }
    else{
        return num;
    }
}
console.log(Solution(''));