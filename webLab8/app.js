//
//  app
//  WebLabs
//
//  Created on 17/11/2016
//  Copyright (c) 2016 Brigad. All rights reserved.
//

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const get = require('./api/tasks/get');
const put = require('./api/tasks/id/put');
const del = require('./api/tasks/id/delete');
const post = require('./api/tasks/post');
const getOne = require('./api/tasks/id/get');

const tasks = [];

app.use(bodyParser.json());

app.all('/*',function(req,res,next){
    res.header('Access-Control-Allow-Origin' , '*' );
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/tasks', function(req, res) {
    res.send(get(tasks));
});

app.post('/tasks', function (req, res) {
    res.send(post(req, tasks));
});

app.delete('/tasks/:id', function (req, res) {
    res.send(del(req, tasks));
});

app.get('/tasks/:id', function (req, res) {
    res.send(getOne(req, tasks));
});

app.put('/tasks/:id', function (req, res) {
    res.send(put(req, tasks));
});

const listener = app.listen('5000', function() {
    const host = listener.address().address;
    const port = listener.address().port;
    console.log('Application listening at http://localhost:%s', port);
});


