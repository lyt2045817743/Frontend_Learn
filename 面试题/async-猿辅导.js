let res=""
async function get(){
    const name=await Promise.resolve(1);
    res+=1;
    return name;
}
function run(){
    res+=2;
    get();
    res+=3;
}
run();
console.log(res)