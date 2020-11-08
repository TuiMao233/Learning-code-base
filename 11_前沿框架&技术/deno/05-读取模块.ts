// 除了ES6的读取模块方式, deno还支持url引入
import math from "./04-定义模块.ts"
import {add, multiply} from "https://x.nest.land/ramda@0.27.0/source/index.js";

console.log(math.add(123, 123))