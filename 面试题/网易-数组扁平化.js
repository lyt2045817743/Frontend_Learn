Array.prototype.flat=function(){
    let newArr=[];

    for(let i=0;i<this.length;i++){
        if(typeof this[i] === "number"){
            newArr.push(this[i]);
        }
        if(this[i] instanceof Array){
            let item;
            item=this[i].flat();
            newArr=newArr.concat(item);
        }
    }

    return newArr;
}

let result=[1,[2,3,[4]],5].flat();
console.log(result);
