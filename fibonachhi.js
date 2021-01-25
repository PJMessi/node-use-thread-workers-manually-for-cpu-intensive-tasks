const fibonachhi = (number) => {
    if (number <= 1) return number;
    return fibonachhi(number-1) + fibonachhi(number-2) 
}

module.exports = fibonachhi;