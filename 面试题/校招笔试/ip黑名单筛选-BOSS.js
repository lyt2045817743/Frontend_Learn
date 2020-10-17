function isBlackIp( ipArr ,  blackIpArr ) {
    // write code here
    return ipArr.map((item)=>{
        return blackIpArr.indexOf(item)!==-1;
    })
}

let result=isBlackIp(["192.168.1.1","192.168.0.2"],['192.168.1.21','192.168.1.4','192.168.1.1']);
console.log(result);
