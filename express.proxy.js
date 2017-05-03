const express = require('express');
const http = require('http');
const io = require('socket.io');
// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const webpackConfig = require('./webpack.config.ts');

const PORT = 4112;

const app = express();
const server = http.Server(app);
const socket = io(server);

socket.on('connection', (socket) => {
	socket.emit('news', { news: 'new' });
	socket.on('test', function(data) {
		socket.emit('news', { news: 'new' });
	});
	console.log('New socket connection');
});

app.get('/updated', function (req, res) {
	console.log('request');
	res.send('Hello World!');
})

// new WebpackDevServer(webpack(webpackConfig), {
//   hot: false,
//   noInfo: true,
//   quiet: false,
//   publicPath: '/build/',
//   proxy: { '/changed': `http://localhost:${port}` },
//   stats: { colors: true },
// }).listen(8080, 'localhost', err => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Webpack Dev Server listening at 8080');
// });


server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`)
});
