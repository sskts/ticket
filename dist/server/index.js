"use strict";
/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const http = require("http");
const app = require("./app/app");
process.env.VERSION = JSON.parse(fs.readFileSync(`${__dirname}/../../package.json`, 'utf8')).version;
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT === undefined ? '8080' : process.env.PORT);
// tslint:disable-next-line:no-backbone-get-set-outside-model
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const radix = 10;
    // tslint:disable-next-line:no-shadowed-variable
    const port = parseInt(val, radix);
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
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    // tslint:disable-next-line:no-unused-variable
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    // tslint:disable-next-line:no-unused-expression
    bind;
}
