const a={
    age:1,
    printOne:function(){
        console.log(this.age);
    },
    printTwo:()=>{
        console.log(this.age);
    }
}

a.printOne();
a.printOne.call({age:2});
a.printTwo();
a.printTwo.bind(a)();  // undefined
