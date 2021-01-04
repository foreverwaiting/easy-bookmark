# 模块化开发与构建工具

## JS模块化

### AMD CMD

- 异步模块定义，RequireJS就是AMD的代表。AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。
- 通用模块定义，SeaJS就是CMD的代表。CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。

区别：
1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.

2. CMD 推崇依赖就近，AMD 推崇依赖前置。
```js
// CMD
define(function(require, exports, module) {   
    var a = require('./a')   
    a.doSomething()   
    // 此处略去 100 行   
    var b = require('./b') 
    // 依赖可以就近书写   
    b.doSomething()   
    // ... 
})
// AMD 默认推荐的是
define(['./a', './b'], function(a, b) {  
    // 依赖必须一开始就写好    
    a.doSomething()    
    // 此处略去 100 行    
    b.doSomething()    
    ...
})
```
3. AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。

### CommonJS规范

- 是通过module.exports定义的，在前端浏览器里面并不支持module.exports,通过node.js后端使用的。Nodejs端是使用CommonJS规范的，前端浏览器一般使用AMD、CMD、ES6等定义模块化开发的。适用于node.js,在服务端进行使用

### ES6特性

- 模块化---export/import对模块进行导出导入的

## css module

## es6 module

## common js

## require js/ AMD

## webpack Gulp Grunt Jenkins

- [AMD 和 CMD 的区别有哪些？](https://www.zhihu.com/question/20351507)
- [AMD](https://github.com/seajs/seajs/issues/277)