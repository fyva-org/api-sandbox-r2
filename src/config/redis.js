const Redis = require('ioredis');

let redis;

redis = new Redis(process.env.REDIS_LOCAL);

redis.on('error', (err) => {
    console.error(err);
});
redis.on('connect', () => {
    console.log('Connected to Redis');
});

module.exports = redis;