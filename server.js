
var express = require('express');
var request = require('request');
var clone = require('clone');
var methodOverride = require('method-override');
var global_config = require('./config/general');
var request_config = require('./config/request');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index.html',{
        host: global_config.hostURL
    })
});

app.use(methodOverride('X-HTTP-Method')); // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override')); // IBM


app.all('/users/*', function (req, res) {
    var config = clone(request_config);
    var r = null;
    config.uri = config.GITAPI.URI + req.url;

    debugLog("---------------------");
    debugLog(req.method + " Request Received...");
    debugLog("URI: " + config.uri);

    if (req.method === 'POST') {
        debugLog('Request params: ');
        debugLog(req.body);

        r = request.post({
            uri: config.uri,
            json: req.body
        });
    } else {
        r = request(config.uri);
    }

    req.pipe(request(r)).pipe(res);
    debugLog(req.method + ' Request to ' + config.uri + ' completed.');
});

var port = 1345;

app.listen(port, function() {
    console.log('server running on port ', port || 'local');
});

function debugLog(msg) {
        console.log(msg);
}

