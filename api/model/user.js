var http = require("http"),
    apiPattern = ' http://fg-69c8cbcd.herokuapp.com/user/{{id}}';

exports.findById = function(id) {
    var api = apiPattern.replace('{{id}}', id);

    console.log('access: ' + api);

    http.get(api, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            writeResponse(body);
        });
    }).on('error', function(err) {
        writeError(err);
    });
};

// keep things simple so just use stdout
var writeResponse = function(res) {
    console.log(JSON.parse(res));
};

var writeError = function(err) {
    console.error(err);
}