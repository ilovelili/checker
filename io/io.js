var Readline = require("readline"),
    rl = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

rl.question("please enter something like hoge{a,b,c}fuga: ", function formatInput(answer) {
    var pattern = /(.*){(.+)}(.*)/;
    if (pattern.test(answer)) {
        var matches = pattern.exec(answer),
            prefix = matches[1],
            content = matches[2].split(','),
            suffix = matches[3];

        content = content.map(function(element, index) {
            return prefix + element + suffix;
        });

        console.log('the output is: ' + content.join(','));
    }
    else {
        console.log('your input format is not correct, Bye.');
    }

    rl.close();
});