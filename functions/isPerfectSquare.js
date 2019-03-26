module.exports = function isPerfectSquare(n) {
    return n > 0 && Math.sqrt(n) % 1 === 0;
}
