function repStr(str){
    
    let rep=/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![\W]+$)(?![^0-9a-zA-Z\W]+$).{8,16}$/;
    // return rep.test(str);  
    let rep2=/(..)(?!\1+)/
    console.log(rep2.exec(str));
      
}
repStr('A1A211');