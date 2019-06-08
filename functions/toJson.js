module.exports = function toJson(customObj) {
    return JSON.parse(JSON.stringify(customObj));
}
