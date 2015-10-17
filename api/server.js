var Readline = require("readline"),
    rl = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    user = require("./model/user");

rl.question("please enter user id: ", function getUserInfo(answer) {
    var id = parseInt(answer, 10);
    if (!id) {
        console.log('your userId format is wrong. Please enter numberic. Bye.');
        return;
    }
    
    user.findById(id);
    rl.close();
});