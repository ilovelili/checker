var Readline = require("readline"),
    rl = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    result = {};

// jump with least steps
var calculateJump = function(robotLargestJumpDistance, totalDistance) {
    if(!robotLargestJumpDistance) return;
    
    var div = Math.floor(totalDistance / robotLargestJumpDistance),
        rem = totalDistance % robotLargestJumpDistance;

    result[robotLargestJumpDistance] = div;
    calculateJump(robotLargestJumpDistance - 1, rem);
};

rl.question("please enter a jump distance: ", function getUserInfo(answer) {
    var distance = parseInt(answer, 10);
    if (!distance) {
        console.log('format is wrong. Please enter numberic. Bye.');
        return;
    }

    calculateJump(3, answer);
    
    for (var key in result){
        console.log('{{jump}} meter jump: {{times}} times.'.replace('{{jump}}', key).replace('{{times}}', result[key]));
    }
    
    rl.close();
});