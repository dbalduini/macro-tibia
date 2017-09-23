const secondsToMillis = ms => ms * 1000

// min inclusive, max inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomInterval (callback, seconds) {
  var started = false
  var timeout = null

  let fn = function() {
    const randomSecond = getRandomInt(1, seconds)
    const noise = getRandomInt(0, 300)
    const ms = secondsToMillis(randomSecond) + noise

    if (started) {
      callback(ms)
    } else {
      started = true
    }

    timeout = setTimeout(fn, ms);
  }

  fn()

  return () => {
    clearTimeout(timeout)
  }
}

module.exports = {
  getRandomInt : getRandomInt,
  randomInterval : randomInterval
}
