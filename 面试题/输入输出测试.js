const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var inputArr = [];
rl.on('line', function (input) {
    inputArr.push(input);
    var nLine = +inputArr[0];
    var line = inputArr[1];
    if(line){
        var tokens = line.split(' ')
        console.log(tokens)
        process.exit()
    }

    // //一行一行的
    // if (inputArr.length == (nLine + 1)) {
    //     var arr = inputArr.slice(1);
    //     console.log(arr);
    //     process.exit();
    //     inputArr = [];
    // }
})