const keys = require('./keys')

const redis = require('redis')

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
})

const sub = redisClient.duplicate();

const fib = function (n) {
  var x = 0;
  var y = 1;
  if (n <= 2) {
    return n - 1;
  }
  for (var i = 0; i < n - 1; i++) {
    var tempY = y;
    y = tempY + x;
    x = tempY;
  }
  return y;
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
})

sub.subscribe('insert');