# review

## HTML 

HTML重点掌握语义化。区分块级和内联标签。还有就是定义 head 里面一些meta 了解下。

MDN多看看

## CSS

重点看盒子模型，定位，层级，过渡，动画和 transform。知道原理和规则。重点学习几种常见的布局。完了之后去搞flex。最后搞下sass、less。

flex  grid  BFC、居中、flex、清浮动、适配

## JS

this 用法，相关原理
原型/原型链
闭包
面向对象相关
同步异步/回调/promise/async、await
模块化 CommonJS, AMD

## ES6

ES6（let、const、promise、async、class、promise 然后问asyc await

style 加 scoped 属性的用途和原理

tcp和udp两个讲点东西，但我更多的时候会问面试者这两者实际的运用场景。Symbol大家都知道es6之后新加的一种基本类型。但你知道为什么要加么？

JSON.parse(JSON.stringify(oldObj))很多人会说使用这种方式，我就会反问它的缺陷是什么，什么场景下它是不是用的。


git 面试
很多人简历上经常讲熟练掌握git操作
至少需要知道 [stackoverflow](https://stackoverflow.com/questions/tagged/git)上前几位最常见的的问题吧。
但很多人其实 git pull git fetch 之间的区别都搞不清楚 怎么删除本地和远程无用的分支也不清楚。
$ git branch -d branch_name
$ git branch -D branch_name
我觉得你至少也要知道git flow的工作流
我经常通过一些场景题来考察面试者的git掌握程度。
我们在工作中 线上bug暂存
提交了错误代码该怎么办

## 浏览器相关知识（强缓存、协商缓存、从输入 URL 到呈现页面过程、cookie、session）

## 编程题(节流防抖、call、bind、new、eventEmitter 、简单的业务实现或者写一个数据处理函数等等)

## 网络（HTTP CODE、https、http2、三次握手与四次挥手）

## 框架

### 了解 Babel 和 webpack

一些原理方面的东西工作中也会用到。babel 里面会有教你如何编译代码。webpack教你如和打包文件。对之后看vue、react源码帮助挺大。

### vue

搞完 Vue 全家桶，去了解下 React，React hooks 学习下新的理念。再回过头来看Vue。你会发现他们是如此的相似去又不同。

### 如何看源码

挑简单的上手。别一开始就搞 vue、react、webpack。太难

按照难易程度，函数库 < 组件库 < 框架 < 工程化 分别典型代表 lodash < vant < vue < webpack

手撸简易模型。像vue, webpack, babel 都有简易项目给你撸。有的创始人（尤哥）还直播手撸。国外的更多，youtube 一搜一大堆。就算不看源码，照着写出了简易 demo 对原理和理解提升都是很大的。

## 前端工程化

重点搞下babel、webpack。 学习下编译，打包的原理。自己配置下 webpack。尝试自己去写下下 webpack 的 loader 和 plugin。学习这些之前要懂一点 node.js， node.js 不需要全部学习。一般就日常用到读写文件fs接口，path 路径接口。这些 api 都不难写几个 demo 就懂了。基本上webpack 里面配置文件也没用到多少 node 的东西。最后自己学会配置webpack的配置文件。如果想深想去优化打包体积和速度，就需要去了解很多webpack插件。webpack 里面最核心的就是插件了。

## 性能优化

## git 命令

## 浏览器再问一遍渲染原理

## web 安全（xss、csrf）

## Event Loop（js、node、宏任务、微任务）

## 构建工具选一个，常用的还是webpack，问你工作原理，写过插件，loader没，webpack-dev-server是怎么工作的，分包又是怎么分的。

## 延伸http缓存问题