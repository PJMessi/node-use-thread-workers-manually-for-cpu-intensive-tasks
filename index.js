const http = require('http');
const fibonachhi = require('./fibonachhi');

const server = http.createServer((request, response) => {

    /**
     * Calculates 45th number of the Fibonachhi Sequence.
     * Took 20 seconds in my pc. Varies according to the machine.
     */
    if (request.url == '/fibonachhi') {

        const fibonachhiNumber = fibonachhi(45);
        
        response.write(`Fibonacchi for 45: ${fibonachhiNumber}`);
        response.end();

    } else {
        response.write("Hello World");
        response.end();
    }

});

server.listen(5000, () => {
    console.log('server running at port : 5000');
})