function Animals(){
    this.say=function(){
        console.log("noting");
    };
    this.eat=function(){
        console.log("eating");
    }
}
Animals.prototype.write=function(){
    console.log("writing");
    
}
module.exports=Animals;