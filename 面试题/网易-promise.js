var pro=new Promise((reslove,reject)=>{
    console.log(1);
    reject(1);
    throw new Error('error'); 
    // reject('text')
    // console.log(2);
}).then(()=>{
    console.log(3);
}).then(()=>{
    console.log(5);
}).catch((text)=>{
    console.log(4);
    console.log(text);
})