function wordRuleJudge(ruleStr,targetStr){
    let ruleArr=ruleStr.split(''),len=ruleArr.length;
    let ruleObj={};
    let positionArr=[];// 用于标记该位置与前面哪个位置相同，没有为-1
    try {
        for(let i=0;i<len;i++){
            if(ruleObj[ruleArr[i]]===undefined){
                ruleObj[ruleArr[i]]=i;
            }
        }
        for(let i=0;i<len;i++){
            let target=ruleArr[i];
            let position=ruleObj[target];
            positionArr[i]=position!==i?position:-1;
        }
        // console.log(positionArr);
    
        let targetArr=targetStr.split(' ');
        let targetLen=targetArr.length;

        if(targetLen!==len){  
            if(targetArr.indexOf('')>0){
                return -1;
            }
            return 0; 
        }
    
        let rep=/^[A-Za-z]+$/;
        for(let i=0;i<len;i++){
            if(!rep.test(targetArr[i])){
                return -1;
            }
        }
    
        for(let i=0;i<len;i++){
            let samePosition=positionArr[i];
            if(samePosition===-1 || targetArr[i]===targetArr[samePosition]){
                let lastSamePosition=targetArr.indexOf(targetArr[i]);
                if(samePosition===-1 && lastSamePosition!==i){ return 0;}
                if(i===len-1){ return 1; }
            }else{
                return 0;
            }
        }
    } catch (error) {
        return -1;
    }
    
}

let result=wordRuleJudge('ABCD','xiao xin yi yiq');
console.log(result);
