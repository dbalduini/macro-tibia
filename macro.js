const robot = require('robotjs')

const secondsToMillis = ms => ms * 1000
// const inMinutes = (ms) => inSeconds(ms) * 60

function Macro () {
  this.start = () => {}
  this.stop = () => {}
}

// Factory function to create macros
exports.fromKeypressed  = function (str, key) {
  const macro = new Macro()

  if (typeof key === 'object') {
    macro.shift = key.shift
    macro.ctrl = key.ctrl
    macro.key = key.name || str
  }

  if (macro.key === 'return') {
    macro.key = 'enter'
  }

  return macro;
}

Macro.prototype.prettify = function () {
  let str = '['

  if (this.shift) {
    str += 'SHIFT + '
  } else if (this.ctrl) {
    str += 'CTRL + '
  }
  str += this.key + ']';
  return str;
}

Macro.prototype.registerKeyTapInterval = function (seconds) {
  const modified = []
  const self = this
  const key = this.key

  if (this.shift) {
    modified.push('shift')
  }

  if (this.ctrl) {
    modified.push('ctrl')
  }

  this.seconds = seconds

  // register interval
  this.start = function () {
    let timeout = setInterval(() => {
      robot.keyTap(key, modified)
    }, secondsToMillis(seconds))

    self.stop = () => {
      clearTimeout(timeout)
    }
  }
}
