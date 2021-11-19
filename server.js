const MongoClient = require('mongodb').MongoClient;
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;

const express = require('express');
const logger = require('morgan');
//'use strict';
//var http = require('http');
//var port = process.env.NODE_DOCKER_PORT || 8080;

/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);*/

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV == 'production') {
        const secureUrl = 'https://' + req.hostname + req.originalUrl;
        res.redirect(302, secureUrl);
    }
    next();
});

app.use(catchErrors(async function (request, response, next) {
    response.locals.baseUrl = `${request.protocol}://${request.headers.host}`;
    response.locals.locales = [{ code: 'en-US', name: 'U.S. English' }];
    response.locals.currentLocale = response.locals.locales[0];

})

