let str = require('./a.js')

console.log(str)

require('./index.css')

require('./index.less')

let fn = () => {
    console.log('aadfdsfs')
}

fn()

@log
class A{
    a = 1
}

let a = new A()
console.log(a.a)

function log(target) {
    console.log(target, 'dfdsfsf')
}