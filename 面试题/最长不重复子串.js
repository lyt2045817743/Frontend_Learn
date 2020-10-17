function maxStr(str){
    let maxLength=0;
    let curSubStr='';
    let i=0;
    while(i<str.length){
      let curChar=str.charAt(i);
      console.log(curChar);
      
      
      let otherIndex=curSubStr.indexOf(curChar);

      console.log(otherIndex);
      
    //   console.log(otherIndex,i,maxLength);
      
      
      if(otherIndex===-1){
        curSubStr+=curChar;
        i++;
      }
      else{
          console.log('else');
          
        maxLength=maxLength<curSubStr.length?curSubStr.length:maxLength;
        curSubStr='';
        i=otherIndex+1;
        console.log(maxLength,curSubStr,i);
        break;
      }
    }
    return maxLength;
  }

  let result=maxStr('abcabcbb');
  console.log(result);
  