const util = require('./lib/util')
const nextFn = require('./lib/next')

const kvo = (context, path, value) => {
  const bailRE = /[^\w.$]/

  if (bailRE.test(path)) {
    return
  }

  const segments = path.split('.')
  const isGetter = util.isUndefined(value)
  return segments.reduce((memo, key, index) => {
    var next = nextFn(memo, key)
    if (segments.length - 1 === index) { // 出口
      if (isGetter) { // getter
        memo = next
      } else { // setter
        if (util.isNull(memo) || util.isUndefined(memo)) {
          memo = {}
        }
        memo[key] = value
      }
    } else {
      if (util.isNull(next) || util.isUndefined(next)) {
          memo[key] = {}
      } else {
          memo[key] = next
      }
      return memo[key]
    }
    return memo
  }, context)
}

module.exports = {kvo: kvo}
