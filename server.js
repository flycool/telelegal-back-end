

const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');

const app = express();
app.use(cors()); // this will open our express api to any domain
app.use(express.static(__dirname + '/public'));
app.use(express.json()); // this will allow us to parse json data in the body of requests

const key = fs.readFileSync('./certs/create-cert-key.pem')
const cert = fs.readFileSync('./certs/create-cert.pem');

const expressSerer = https.createServer({ key, cert }, app);
const io = socketio(expressSerer, {
    cors: ['https://localhost:3000', 'https://localhost:3001']
});

expressSerer.listen(9000);

module.exports = { io, expressSerer, app };