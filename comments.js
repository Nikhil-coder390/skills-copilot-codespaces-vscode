// create a web server
// create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var pathName = parsedUrl.pathname;
    if (pathName === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                res.end('404 not found');
            } else {
                res.end(data);
            }
        });
    } else if (pathName === '/post') {
        fs.readFile('./post.html', function(err, data) {
            if (err) {
                res.end('404 not found');
            } else {
                res.end(data);
            }
        });
    } else if (pathName.indexOf('/public/') === 0) {
        fs.readFile('.' + pathName, function(err, data) {
            if (err) {
                res.end('404 not found');
            } else {
                res.end(data);
            }
        });
    } else if (pathName === '/comments') {
        var json = JSON.stringify(comments);
        res.end(json);
    } else if (pathName === '/comment') {
        var comment = parsedUrl.query;
        comments.push(comment);
        res.end('success');
    } else {
        fs.readFile('.' + pathName, function(err, data) {
            if (err) {
                res.end('404 not found');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(3000, function() {
    console.log('server is listening at port 3000');
});