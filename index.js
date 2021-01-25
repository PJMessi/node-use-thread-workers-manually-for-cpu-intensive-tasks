const http = require('http');

const server = http.createServer();

server.listen(5000, () => {
    console.log('server running at port : 5000');
})