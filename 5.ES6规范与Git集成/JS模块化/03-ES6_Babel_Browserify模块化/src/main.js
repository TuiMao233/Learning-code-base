import $ from 'jquery'

import {fun1,fun2} from './commt/module1'
import {foo,arr} from './commt/module2'
import module3 from './commt/module3'

fun1();fun2();
console.log(arr)
console.log(module3)

$('body').append($('div'))
console.log($('body'))