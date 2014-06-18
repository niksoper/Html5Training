var connect = require('connect');

var port = 8080;

connect()
.use(connect.logger('dev'))
.use(connect.static(__dirname)).listen(8080);

console.log('Server started listening on port ' + port);