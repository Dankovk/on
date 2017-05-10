const express = require('express');
const http = require('http');
const path = require('path');
const io = require('socket.io');
const bodyParser = require('body-parser');

const PORT = 4112;

const app = express();
const server = http.Server(app);
const socket = io(server);

let currentSocket;

socket.on('connection', (sock) => {
	currentSocket = sock;
	// eslint-disable-next-line no-console
	console.log('New socket connection');
});

app.use(bodyParser.json());

app.put('/updated', (req, res) => {
	currentSocket.emit('changed', req.body);
	res.send('OK');
});

app.put('/changed', (req, res) => {
	currentSocket.emit('changed', req.body);
	res.send('OK');
});

app.get('/theatre.json', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/theatre/theatre.json'));
});

app.use('/components', express.static('dist/theatre/components'));

server.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server is listening on port ${PORT}`);
});
