var express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    handlebars = require("express-handlebars").create({
        defaultLayout: 'main'
    }),
    exec = require('child_process').exec;

app.set('port', process.env.PORT);
app.set('ip', process.env.IP);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyparser.urlencoded());

app.get('/', function(req, res) {
    res.render('home');
});

app.post('/process', function(req, res) {
    debugger;

    var command = 'grep "{rid}" -r ./data/'.replace('{rid}', req.body.rid);
    var grep = exec(command,
        function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                return;
            }

            console.log('stdout: ' + stdout);
    
            if (!res.locals.records) res.locals.records = [];
            res.locals.records = stdout
                .split('\n')
                .filter(function notEmpty(value) {
                    return value.length > 0;
                }).map(function removePrefix(value) {
                    return value.split(':')[1]
                });
            res.render('result');
        });

    grep.on('exit', function(code) {
        console.log('Child process exited with exit code ' + code);
    });
});

// 404
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
    // next();  // end the pipeline
});

// Define error-handling middleware like other middleware, except with four arguments instead of three, specifically with the signature (err, req, res, next)
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
    // next();  // end the pipeline
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Express started on ' + process.env.IP + ':' + process.env.PORT);
});