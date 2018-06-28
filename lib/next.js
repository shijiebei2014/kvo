const util = require('./util')

const isPostiveInteger = key => /^[1-9]\d*$/.test(key)

const after = (fn, postFn) => {
  // var self = this
  var self = fn
  return function() {
    const ret = self.apply(this, arguments)
    // console.log('ret:', ret)
    if (ret === 'next') {
      return postFn.apply(this, arguments)
    }
    return ret
  }
}

const isObject = (context, key) => {
  return util.isObject(context) ? context[key] : 'next'
}

const isArray = (context, key) => {
  return util.isArray(context) && isPostiveInteger(key) && memo.length > Number(key) ? context[Number(key)] : 'next'
}

const isUndefined = (context, key) => undefined

module.exports = function(context, key) {
  return after(isObject, after(isArray, isUndefined)).apply(this, arguments)
}
