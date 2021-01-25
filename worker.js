const { parentPort, workerData } =  require("worker_threads");
const fibonachhi = require('./fibonachhi');

const workerFibonachhi = async () => {
    const { number } =  workerData;
    const fibonachhiNumber = fibonachhi(number);
    parentPort.postMessage(fibonachhiNumber);

}

workerFibonachhi();