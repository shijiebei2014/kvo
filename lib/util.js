module.exports = ['Undefined', 'Null', 'Object', 'Array'].reduce((memo, key, index) => {
  memo['is' + key] = val => Object.prototype.toString.call(val) === "[object " + key + "]"
  return memo
}, {})
