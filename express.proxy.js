const express = require('express');
const http = require('http');
const io = require('socket.io');
const bodyParser = require('body-parser');

const PORT = 4112;

const app = express();
const server = http.Server(app);
const socket = io(server);

let currentSocket;

socket.on('connection', (socket) => {
	currentSocket = socket;
	console.log('New socket connection');
});

app.use(bodyParser.json());

app.put('/updated', function (req, res) {
  currentSocket.emit('changed', req.body);
  res.send('OK');
});

app.put('/changed', function (req, res) {
  currentSocket.emit('changed', req.body);
  res.send('OK');
});

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
});
