'use strict';

const express = require('express');
const path = require('path');
const app = express();
const http = require('https');

var api_host = 'www.coinigy.com';
var api_headers = {
  'X-API-KEY': process.env.COINIGY_API_KEY,
  'X-API-SECRET': process.env.COINIGY_API_SECRET,
  'Content-Type': 'application/json'
};

app.use(express.static('public'));

app.get('/:resource', function(req, res) {
  var server_request = http.request({
    host: api_host,
    port: 443,
    path: '/api/v1/' + req.params['resource'],
    method: 'POST',
    headers: api_headers
  }, function(server_response) {
    server_response.setEncoding('utf8');
    res.writeHead(server_response.statusCode);

    server_response.on('data', function(chunk) {
      res.write(chunk);
    });

    server_response.on('end', function() {
      res.end();
    });
  }).on('error', function(e) {
    console.log(e.message);
    res.writeHead(500);
    res.end();
  });

  server_request.end(JSON.stringify(req.query));
});


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;
