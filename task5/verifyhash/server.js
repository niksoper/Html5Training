var http = require('http');
var url = require("url");
var check = require('./blockcheck');

function textResponse(text, response) {
    response.writeHead(200, { 'Content-type': 'text/plain' });
    response.write(text);
    response.end();
}

function statusResponse(status, response, text) {
    response.writeHead(status, { 'Content-type': 'text/plain' });
    response.write(text);
    response.end();
}

function jsonResponse(data, response) {
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(data);
}

var onRequest = function (request, response) {

    try {
        var path = url.parse(request.url).pathname;
        console.log("Request for " + path + " received.");

        var verifyRegex = /^\/verifyblock/i;

        var requestData = '';
        request.on('data', function (data) {

            requestData += data;

        });

        if (path === '/yo') {

            textResponse('YOYOYOYOYO!!!', response);

        } else if (verifyRegex.test(path)) {

            request.on('end', function () {

                var blockData = JSON.parse(requestData);
                var computedHash = check.GetBlockHash(blockData);
                var verified = computedHash === blockData.hash;

                console.log(verified ? 'Hash was correct' : 'Hash was bad');

                jsonResponse(JSON.stringify(verified), response);

            });

        } else {

            statusResponse(404, response, 'Nothing to see here');

        }
    } catch(error) {

        statusResponse(500, response, error);

    }
};

http.createServer(onRequest).listen(8999);

console.log('Server started...');