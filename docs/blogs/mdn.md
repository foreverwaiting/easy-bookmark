# MDN JavaScript

- [多看看MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [奇舞团](https://github.com/roger-hiro/BlogFN)

## Observer API现代浏览器观察者

### IntersectionObserver：交叉观察者【计算Web页面的元素的位置】

IntersectionObserver接口，提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法，祖先元素与视窗(viewport)被称为根(root)

- 1、创建观察者
```js
const options = {
    root: document.querySelector('.scrollContainer'), // 指定一个根元素
    rootMargin: '0px', // 使用类似于设置CSS边距的语法来指定根边距（根元素的观察影响范围）
    threshold: [0.3, 0.5, 0.8, 1] } // 阈值，可以为数组。[0.3]意味着，当目标元素在根元素指定的元素内可见30%时，调用处理函数。
const observer = new IntersectionObserver(handler, options)
```

- 2、定义回调事件
```js
function handler (entries, observer) { 
    entries.forEach(entry => { 
    // 每个成员都是一个IntersectionObserverEntry对象。
    // 举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
    // entry.boundingClientRect 目标元素的位置信息
    // entry.intersectionRatio 目标元素的可见比例
    // entry.intersectionRect 交叉部分的位置信息
    // entry.isIntersecting 
    // entry.rootBounds 根元素的位置
    // entry.target 
    // entry.time 时间戳
    }); 
}
```

- 3、定义要观察的目标对象
```js
const target = document.querySelector(“.targetBox”); 
observer.observe(target);
```
- 4、调用.observer(target)方法来观察

- 5、停止监听
```js
// 停止对某目标的监听
observer.unobserve(target)
// 终止对所有目标的监听
observer.disconnect()
```

- 6、可用实例

图片懒加载、兴趣埋点、控制动画/视频 执行

### Mutation Observer：变动观察者【异步、监听目标DOM下子元素的变更记录】

接口提供了监视对DOM树所做更改的能力。它被设计为旧的MutationEvents功能的替代品，该功能是DOM3 Events规范的一部分。

- 1、创建观察者
```js
let observer = new MutationObserver(callback);
```

- 2、定义回调事件
```js
// 两个参数，第一个是变动数组，第二个是观察器实例
function callback (mutations, observer) {
  // 每个mutation都对应一个MutationRecord对象，记录着DOM每次发生变化的变动记录  
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});
```

- 3、定义要观察的目标对象
```js
// 第一参数：被观察的DOM节点。
// 第二参数：配置需要观察的变动项options。
MutationObserver.observe(dom, options)

mutationObserver.observe(content, {
    attributes: true, // Boolean - 观察目标属性的改变
    characterData: true, // Boolean - 观察目标数据的改变(改变前的数据/值)
    childList: true, // Boolean - 观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
    subtree: true, // Boolean - 目标以及目标的后代改变都会观察
    attributeOldValue: true, // Boolean - 表示需要记录改变前的目标属性值
    characterDataOldValue: true, // Boolean - 设置了characterDataOldValue可以省略characterData设置
    // attributeFilter: ['src', 'class'] // Array - 观察指定属性
});
```

- 4、停止监听
```js
// 停止观察。调用后不再触发观察器，解除订阅
MutationObserver.disconnect()
// 清除变动记录。即不再处理未处理的变动。该方法返回变动记录的数组，注意，该方法立即生效。
MutationObserver.takeRecords()
```

- 5、可用实例

监听文本变化、小游戏、输入框的热点话题搜索，当输入“#”号时，启动搜索框预检文本或高亮话题。聊天的气泡框彩蛋，检测文本中的指定字符串/表情包，触发类似微信聊天的表情落下动画。

### ResizeObserver，视图观察者【监听某个元素的变化、监听一个 div 的尺寸变化】

细颗粒度的DOM元素观察，而不是window。没有额外的性能开销，只会在绘制前或布局后触发调用

- 1、创建观察者
```js
let observer = new ResizeObserver(callback);
```

- 2、定义回调事件
```js
// contentRect位置信息
const callback = entries => {
    entries.forEach(entry => {
 
    })
}
```

- 3、定义要观察的目标对象
```js
observer.observe(document.body)
```

- 4、停止监听
```js
// 取消单节点观察
observer.unobserve(document.body)
// 取消所有节点观察
observer.disconnect(document.body)
```

- 5、可用实例

缩放渐变背景、响应式Vue 组件

### `PerformanceObserver`：性能观察者【获取性能参数及指标】

浏览器和Node.js 里都存在的API、采用相同W3C的Performance Timeline规范。获取到当前页面中与性能相关的信息，获得某项页面加载性能记录，获得执行效率

- 1、创建观察者
```js
let observer = new PerformanceObserver(callback);
```

- 2、定义回调事件
```js
// 每一个list都是一个完整的PerformanceObserverEntryList对象
const callback = (list, observer) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
    console.log(“Name: “ + entry.name + “, Type: “ + entry.entryType + “, Start: “ + entry.startTime + “, Duration: “ + entry.duration + “\n”); });
}
```

- 3、定义要观察的目标对象
```js
// observer.observe(...)方法接受可以观察到的有效的入口类型。这些输入类型可能属于各种性能API，比如User tming或Navigation Timing API。
observer.observe({entryTypes: ["entryTypes"]});
```

- 4、可用实例

静态资源监控、


### 参考

- 资源监控 
- Media Queries Based on Element Width with MutationObserver
- 以用户为中心的性能指标 
- A Few Functional Uses for Intersection Observer to Know When an Element is in View
- Getting To Know The MutationObserver API
- Different Types Of Observers Supported By Modern Browsers
- THE RESIZE OBSERVER EXPLAINED
- A Look at the Resize Observer JavaScript API