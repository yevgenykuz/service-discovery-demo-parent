const express = require('express');
const http = require('http');
const url = require('url');

const app = express();
const END_POINTS = {
    service1Url: process.env.NODEJS_REST_ENTRY_POINT_EXAMPLE_URL || 'http://localhost:5010',
    service2Url: process.env.NODEJS_REST_PROPAGATOR_EXAMPLE_URL || 'http://localhost:5011',
    service3Url: process.env.NODEJS_REST_SINK_EXAMPLE_URL || 'http://localhost:5012'
};

app.get('/sendToService2', (req, res) => {
    console.log('Got request to sendToService2');
    const postData = JSON.stringify({ id: req.query.id });
    const urlObj = url.parse(END_POINTS.service2Url);
    const options = {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: '/sendToService3',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    const svc2req = http.request(options, svc2res => {
        svc2res.setEncoding('utf8');
        svc2res.on('data', (chunk) => {});
        svc2res.on('end', () => {
            console.log('Got response from service 2');
            res.send('Got response from service 2');
        });
    });

    svc2req.write(postData);
    svc2req.end();
});

app.get('/sendToService3', (req, res) => {
    console.log('Got request to sendToService3');
    http.get(END_POINTS.service3Url + '/mysql?id=' + req.query.id, svc3res => {
        console.log('Got response from service 3');
        res.send('Got response from service 3');
    });
});

const server = app.listen(5010);
server.on('listening', () => {
    console.log(new Date().toISOString() + ' App ready and listening to port ' + server.address().port);
});
