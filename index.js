const http = require('http');
const fibonachhi = require('./fibonachhi');
const { Worker } = require('worker_threads');

const server = http.createServer((request, response) => {

    /**
     * Calculates 45th number of the Fibonachhi Sequence with main thread.
     * Took 20 seconds in my pc. Varies according to the machine.
     */
    if (request.url == '/fibonachhi') {

        const fibonachhiNumber = fibonachhi(45);

        response.write(`Fibonacchi for 45: ${fibonachhiNumber}`);
        response.end();

    /**
     * Calculates 45th number of the Fibonachhi Sequence through worker.
     * Took 20 seconds in my pc. Varies according to the machine.
     */
    } else if (request.url == '/fibonachhiasync') {

        const worker = new Worker(__dirname + '/worker.js', {
            workerData: { number: 45 },
        });

        worker.on('message', (result) => {
            console.log('Thread worker successfully calcuated the 45th number of the fibonachhi series.');
            const fibonachhiNumber = result;
            response.write(`Fibonacchi for 45: ${fibonachhiNumber}`);
            response.end();
        });

        worker.on('error', () => {
            console.log('There was some error while calculating 45th number of fibonachhi series through thread worker.');
            response.writeHead(500);
            response.write(`Could not calculate the 45th number fibonachhi series.`);
            response.end();
        });

        worker.on("exit", code  => {
            console.log('Thread worker terminated.')
        });

    } else {
        response.write("Hello World");
        response.end();
    }

});

server.listen(5000, () => {
    console.log('server running at port : 5000');
})