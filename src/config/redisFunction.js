const redis = require("./redis");

function getFromRedis(key) {
    return redis.get(key);
}

function setToRedis(key, value) {
    return redis.set(key, value);
}

module.exports = {
    getFromRedis,
    setToRedis,
};