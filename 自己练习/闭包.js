function outer(){
    let a=0;
    return function(){
        console.log(a++);
    }
}

let a=outer();
console.log(a);

a();
console.log(a);

a();
console.log(a);

let b=outer();
b();
console.log(b);

a();