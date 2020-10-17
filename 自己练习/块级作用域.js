for(var i=0;i<5;i++){
    let p=new Promise((reslove)=>{
        reslove(i);
    }).then((i)=>{
        console.log(i);
    });
    // const a=(i)=>{
    //     console.log(i);
    // }
    // setTimeout(a.bind(this,i),0)

    (function(i){
        setTimeout(function(){
            console.log(i);
        },0)
    })(i);
}