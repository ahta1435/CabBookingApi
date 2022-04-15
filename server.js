const http = require("http");

const app = require('./app');
//port at which the project shld run
const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);