# 其他

### 前端资源加载失败

- 如何监控加载失败？

1、script onerror

给 script 标签添加上 onerror 属性，这样在加载失败时触发事件回调，从而捕捉到异常。`<script onerror="onError(this)"></script>`，或者构建工具 ( 如 webpack 的 script-ext-html-webpack-plugin 插件) ，对所有 script 标签自动化注入 onerror 标签属性。

```js
new ScriptExtHtmlWebpackPlugin({
    custom: {
      test: /\.js$/,
      attribute: 'onerror',
      value: 'onError(this)'
    }
 })
```

2、window.addEventListener

通过捕获的方式全局监控加载失败的错误，虽然这也监控到了脚本错误，但通过 !(event instanceof ErrorEvent) 判断便可以筛选出加载失败的错误。

```js
window.addEventListener('error', (event) => {
  if (!(event instanceof ErrorEvent)) {
    // todo
  }
}, true);
```

- 加载失败如何优化

1、加载失败时，刷新页面 (reload）

当监控到资源加载失败时，我们通过 location.reload(true) 强制浏览器刷新重新加载资源，并且为了防止出现一直刷新的情况，结合了 SessionStorage 限制自动刷新次数。

2、针对加载失败的文件进行重加载

- 替换域名动态重加载：
    - 只对加载失败的文件进行重加载：并且，为了防止域名劫持等导致加载失败的原因，对加载失败文件采用替换域名的方式进行重加载。替换域名的方式可以采用重试多个 cdn 域名，并最终重试到页面主域名的静态服务器上（主域名被劫持的可能性小）
    - js加载变化导致异常bug：顺序失败资源重加载成功后，页面原有的加载顺序可能发生变化，最终执行顺序发现变化也将导致执行异常。
- 保证 JS 按顺序执行：
    - document.write：在不需要考虑兼容性的情况下，资源加载失败时通过 document.write 写入新的 script 标签，可以阻塞后续 script 脚本的执行，直到新标签加载并执行完毕，从而保证原来的顺序。(但它在 IE、Edge 却无法正常工作，满足不了兼容性)
    - 增加 “管理 JS 执行顺序” 的逻辑：需要增加 “管理 JS 执行顺序” 的逻辑。使 JS 文件加载完成后，先检查所依赖的文件是否都加载完成，再执行业务逻辑。当存在加载失败时，则会等待文件加载完成后再执行，从而保证正常执行。
    - webpack模块依赖处理：手动管理模块文件之间的依赖和执行时机存在着较大的维护成本，webpack已经天然的处理好这个问题。通过分析构建后的代码可以发现，构建生成的代码不仅支持模块间的依赖管理，也支持了上述的等待加载完成后再统一执行的逻辑。
    ```js
    // 检查是否都加载完成，如是，则开始执行业务逻辑
    function checkDeferredModules() {
        // ...
        if(fulfilled) {
            // 所有都加载，开始执行
            result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
        }
    }
    ```
    - 最终通过开发 wait-external-webpack-plugin webpack 插件，在构建时分析所依赖的 external，并注入监控代码，等待所有依赖的文件都加载完成后再统一顺序执行。

3、始终加载失败该怎么办

给个友好的提示。。。

- [脚本错误量极致优化-监控上报与Script error](https://github.com/joeyguo/blog/issues/13)
- [Webpack 打包后代码执行时机分析与优化](https://github.com/joeyguo/blog/issues/21)
- [前端资源加载失败优化](http://www.alloyteam.com/2021/01/15358/)


### 提高资源的安全性--SRI（Subresource Integrity）与 CSP（Content Security Policy）

SRI 是用来校验资源是否完整的安全方案

"网页安全政策"Content Security Policy

- [提高资源的安全性](http://www.alloyteam.com/2021/01/sri/)
- [Content Security Policy](http://www.ruanyifeng.com/blog/2016/09/csp.html)



### MySQL

### utf8mb4格式

遇到过一个 bug，管理后台有一个富文本。有一天报了一个 bug，说它复制内容到富文本里面之后保存，总是会缺失一部分内容。刚开始以为是富文本的问题，经过仔细排查之后发现是后端存储的问题。

后端的 MySQL 用的是`utf8`格式的，所以 emoji 根本就存不了，所以导致这个 emoji 之后的内容都丢失了。如果你想让数据库支持 emoji 的话，就需要改成`utf8mb4`。