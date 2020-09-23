var total=function(obj){
    var arr=[];
    var length=Math.max(...Object.keys(obj));
    for(var i=1;i<length+1;i++){
        if(i in obj){
            arr.push(obj[i]);            
        }
        else{
            arr.push(0);
        }
    }    
    return arr;
}

var result=total({"1":123,"2":456,"8":234});
console.log(result);
