var connect = require('connect');
var url = require('url');
var proxy = require('proxy-middleware');

var port = 8080;

var proxyOptions = url.parse('http://blockexplorer.com');
proxyOptions.route = '/blockexplorer';

connect()
.use(proxyOptions)
.use(connect.logger('dev'))
.use(connect.static(__dirname)).listen(port);

console.log('Server started listening on port ' + port);