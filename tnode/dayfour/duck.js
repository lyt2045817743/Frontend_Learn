var Animals=require('./Animals.js');
var util=require('util');
function Duck(){
    Animals.call(this);
    this.say=function(){
        console.log("ga...ga");
    }
}
util.inherits(Duck,Animals);
var duck=new Duck();
module.exports=duck;