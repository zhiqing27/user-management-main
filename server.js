var app = require('./start/app');
var exceptionHandler = require("./app/exception/handler");
var Http = require('http');

var port = normalizePort(process.env.PORT || 8080);
app.set('port', port);

var server = Http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onBoot);

function onBoot() {
	var addr = server.address();
	var bind = typeof addr === 'string' ?
		'pipe ' + addr :
		'port ' + addr.port;
	console.log('Listening on ' + bind);
}

function normalizePort(val) {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
		// named pipe
		return val;
	}
	if (port >= 0) {
		// port number
		return port;
	}
	return false;
}

//Event
async function onError(error) {
	await exceptionHandler.handle(error);
}