# 每日

日益增长

## 2021-09

### 2021-09-08

...

### 2021-09-07

- RPC 介绍 https://mp.weixin.qq.com/s/Ky6SoWJv85orqYioihTRqg

  - 日志分析：traceId RPC 等等

- js 类型转化 https://mp.weixin.qq.com/s/NN8DiH9ATZ2RuaDjlls-aw

- 预渲染 Next.js https://mp.weixin.qq.com/s/tDPkTwrR031CjsWbiVTVGw

- 白屏监控： https://mp.weixin.qq.com/s/q1oXKJCAW7NQjaF0MP3vuA

- css: width:fit-content 可以实现元素收缩效果的同时，保持原本的 block 水平状态，于是，就可以直接使用 margin:auto 实现元素向内自适应同时的居中效果了

- css: :not 伪类,用来匹配不符合一组选择器的元素。 :not(a):not(.disabled) {}

  - 0 级指没有优先级，1 级是标签选择器，10 级是类选择器，属性选择器，100 级是 ID 选择器。
  - CSS 伪类的优先级: 0 级和 10 级
  - 逻辑伪类的优先级都是 0。例如：:not()，:is()，:where()等
  - 无效： :not(.disabled, .read-only) {} /_ 无效，不支持 _/ 、:not(a.disabled) {} /_ 无效，不支持 _/

- :where() CSS 伪类函数接受选择器列表作为它的参数，将会选择所有能被该选择器列表中任何一条规则选中的元素
  - :where() 和 :is() 的不同之处在于，:where() 的优先级总是为 0 ，但是 :is() 的优先级是由它的选择器列表中优先级最高的选择器决定的。

### 2021-09-06

- Vite 中大量运用 magic-string 这个库做一些字符串的魔术替换，这个库的目的就是在一些轻量级替换源代码的场景中替代 AST 这种过于庞大的解决方案。

- 用 fast-glob 去实现 Vite 中好用的 Glob Import 批量导入语法

- https://github.com/sindresorhus： Promise 相关的模块

  - p-reduce 适用于需要根据异步资源计算累加值的场景

  ```js
  // p-reduce/p-reduce.test.js
  import delay from 'delay'
  import pReduce from 'p-reduce'

  const inputs = [Promise.resolve(1), delay(50, { value: 6 }), 8]

  async function main() {
    const result = await pReduce(inputs, async (a, b) => a + b, 0)
    console.dir(result) // 输出结果：15
  }

  main()
  ```

  - p-map 可以控制并发，也可以决定是否在出现错误时停止迭代

  ```js
  // p-map/p-map.test.js

  // options: object
  // - concurrency: number —— 并发数，默认值 Infinity，最小值为 1；
  // - stopOnError: boolean —— 出现异常时，是否终止，默认值为 true。

  import delay from 'delay'
  import pMap from 'p-map'

  const inputs = [200, 100, 50]
  const mapper = value => delay(value, { value })

  async function main() {
    console.time('start')
    const result = await pMap(inputs, mapper, { concurrency: 1 })
    console.dir(result) // 输出结果：[ 200, 100, 50 ] concurrency控制并发数量，越大time越短
    console.timeEnd('start')
  }
  main()
  ```

  - p-filter 对返回的结果进行过滤的场景

  ```js
  // p-filter/p-filter.test.js

  // options: object
  // - concurrency: number —— 并发数，默认值 Infinity，最小值为 1
  import pFilter from 'p-filter'

  const inputs = [Promise.resolve(1), 2, 3]
  const filterer = x => x % 2

  async function main() {
    const result = await pFilter(inputs, filterer, { concurrency: 1 })
    console.dir(result) // 输出结果：[ 1, 3 ]
  }

  main()
  ```

  - p-waterfall 适用于串行执行 「promise-returning」 或 「async」 函数，并把前一个函数的返回结果自动传给下一个函数的场景
  - p-forever 适用于需要重复不断执行 「promise-returning」 或 「async」 函数，直到用户终止的场景。该模块默认导出了一个 「pForever」 函数
  - p-times 适用于显式指定 「promise-returning」 或 「async」 函数执行次数的场景

- [Object.keys() 的顺序是如何定义的](https://mp.weixin.qq.com/s/6RrGm4HletEtohPkGz1_pQ)

  - 1、定义变量 keys 为空列表
  - 2、对于入参 O 的每一个符合 【array index】 定义的属性，【升序】排列后添加到 keys 列表
  - 3、对于入参 O 的每一个字符串属性，按照【定义时间顺序升序】排列后添加到 keys 列表
  - 4、对于入参 O 的每一个 【Symbol】 属性，按照【定义时间顺序升序】排列后添加到 keys 列表
  - 5、返回最终得到的 keys 列表

  - array index 定义：An array indexis aninteger indexwhose numeric valueiis in the range +0 ≤i< (2^32- 1).

  ```js
  // 执行环境 node-v14.16.1
  const object = { a: 'x', c: 'x', 55: 'x', 1: 'x', b: 'x' }
  object['-1'] = 'x'
  object[Math.pow(2, 32) - 1] = 'x'
  object[Math.pow(2, 32) - 2] = 'x'

  // 输出 [ '1', '55', '4294967294', 'a', 'c', 'b', '-1', '4294967295' ]
  console.log(Object.keys(object))
  ```
