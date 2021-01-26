const http = require('http');
const fibonachhi = require('./fibonachhi');
const { Worker } = require('worker_threads');

const server = http.createServer(async (request, response) => {

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

        const fibonachhiNumber = fibonachhiAsync(45);

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



/**
 * Uses the thread workers manually to calculate the nth term of the Fibonachhi sequence.
 * @param {*} number 
 */
const fibonachhiAsync = async (number) => {

    return new Promise( (resolve, reject) => {

        const worker = new Worker(__dirname + '/fibonachhiWorker.js', {
            workerData: { number: number },
        });

        worker.on('message', (result) => {
            console.log('Thread worker calcuated the 45th number of the fibonachhi series.');
            const fibonachhiNumber = result;
            resolve(fibonachhiNumber);
        });

        worker.on('error', () => {
            console.log('There was some error while calculating 45th number of fibonachhi series through thread worker.');
            reject();
        });
    
        worker.on("exit", code  => {
            console.log('Thread worker terminated.')
        });

    });
}