Function.prototype.myBind=function(...arg){
    const thisRir=arg.shift();
    const _this=this;
    return function(){
        _this.apply(thisRir,arg);
    }
}

function foo(a,b){
    console.log(this);
    console.log(a,b);
    
}

foo.myBind({x:100},1,2)();