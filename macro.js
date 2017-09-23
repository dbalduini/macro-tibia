const robot = require('robotjs')
const rand = require('./rand')

function Macro () {
  this.started = false
  this.cancel = false
  this.debugMode = process.env.NODE_ENV === 'debug'
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

  this.keyTapInterval = function (ms) {
    if (self.debugMode) {
      console.log(self.prettify(), 'executed after', ms, 'ms')
    }
    robot.keyTap(key, modified)
  }
}

Macro.prototype.start = function () {
  const self = this
  const s = this.seconds
  console.log('Executando macro', this.prettify(), 'entre 1 e', s, 'segundos.')
  var cancel = rand.randomInterval(this.keyTapInterval, s)
  this.cancel = cancel;
}

Macro.prototype.stop = function () {
  this.cancel()
}
