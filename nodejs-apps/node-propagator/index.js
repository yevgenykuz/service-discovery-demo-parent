const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const END_POINTS = {
    service1Url: process.env.NODEJS_REST_ENTRY_POINT_EXAMPLE_URL || 'http://localhost:5010',
    service2Url: process.env.NODEJS_REST_PROPAGATOR_EXAMPLE_URL || 'http://localhost:5011',
    service3Url: process.env.NODEJS_REST_SINK_EXAMPLE_URL || 'http://localhost:5012'
};

app.use(bodyParser.json());

app.post('/sendToService3', (req, res) => {
    console.log('Got request to sendToService3');
    const sanitized = req.body.id.replace("'", "");
    http.get(END_POINTS.service3Url + '/mysql?id=' + sanitized, svc3res => {
        console.log('Got response from service 3');
        res.send('Got response from service 3');
    });
});

const server = app.listen(5011);
server.on('listening', () => {
    console.log(new Date().toISOString() + ' App ready and listening to port ' + server.address().port);
});
