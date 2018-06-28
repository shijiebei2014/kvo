## Install

```
$ npm install --save kvo
```


## Usage

```js
const kvo = require('kvo').kvo

var context = {a: {b: {c: 1}}}
// setter
kvo(context, 'a.b.c', 2)
// getter
console.log(kvo(context, 'a.b.c'))
```
