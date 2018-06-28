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
    // console.log('key:%s, memo:%j', key, memo)
    var next = nextFn(memo, key)
    // console.log('isGetter:%b, next:%j', isGetter, next)
    if (segments.length - 1 === index) { // 出口
      if (isGetter) { // getter
        memo = next
      } else { // setter
        // console.log('key:%s, memo:%j', key, memo, value)
        if (util.isNull(memo)) {
          memo = {}
        }
        memo[key] = value
        console.log(memo)
      }
    } else {
      memo = next
    }
    return memo
  }, context)
}

module.exports = {kvo: kvo}
