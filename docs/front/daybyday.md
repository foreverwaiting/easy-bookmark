# 每日

日益增长

## 2021-09

### 2021-09-27

- [在项目中实现大文件分片上传，暂停续传的](https://mp.weixin.qq.com/s/b1_6xlBxPmfQOMCtXiIlkw)
- [Promise.allSettled 的作用，如何自己实现一个 Promise.allSettled](https://mp.weixin.qq.com/s/xmFvgkmm1OdydLU6ingnWw)
- [Promise.allSettled 的作用，如何自己实现一个 Promise.allSettled](https://mp.weixin.qq.com/s/xmFvgkmm1OdydLU6ingnWw)

### 2021-09-25

- 代码截图：https://carbon.now.sh

#### Vue3.0

https://mp.weixin.qq.com/s/l9MyfE4sMJTbsOsboYdvIQ

一、Composition API：vue2 的的痛点之一，要在 data、methods、computed 以及 mounted 中反复的跳转，虽然可用 Mixin 解决，但会有命名冲突等问题，所以 vue3 的 Composition API 应运而生。将零散分布的逻辑组合在一起来维护，并且还可以将单独的功能逻辑拆分成单独的文件。

- Composition API：
  - reactive
  - ref
  - toRefs
  - watch
  - watchEffect
  - computed
  - 生命周期钩子

1、setup：

- 组件内使用 Composition API 的入口，执行时机是在`beforeCreate之前`，故`不可访问this`
- setup(props, context) {}，两个参数：
  - props：组件传入的属性，响应式的，传入新的 props 会更新，但由于是响应式的， 所以不可以使用 ES6 解构，解构会消除它的响应式。
  ```js
  import { defineComponent, reactive, ref ,toRefs} from "vue";
  // 如下会消除name的响应式：
  setup(props, context) {
    const { name } = props;
    console.log(name)
  }
  ```
  \*【想要使用解构，还能保持 props 的响应式：toRefs】
  - context：context 中提供了 this 中最常用的三个属性：attrs、slot 和 emit，分别对应 Vue2.x 中的 $attr属性、slot插槽 和$emit 发射事件。并且这几个属性都是自动同步最新的值，所以我们每次使用拿到的都是最新值。

2、reactive、ref 与 toRefs：

- vue2 中数组定义在 data，3 使用 reactive 和 ref 定义数据
  - 如下：
  ```js
  import { defineComponent, reactive, ref ,toRefs} from "vue";
  setup(props, context) {
    // ref可定义数据
    const obj = ref({count:1, name:"张三"});
    const year = ref(0);
    // reactive可以代理一个对象，但是不能代理基本类型
    const user = reactive({
      name: 'Bob',
      sex: '男'
    })
  }
  ```
- toRefs：

```js
  import { defineComponent, reactive, ref ,toRefs} from "vue";
  setup(props, context) {
    const obj = ref({count:1, name:"张三"});
  }

  // 当在html中使用时必须 obj.name ，较为繁琐，但解构对象又回消除响应式，故可用：

  // toRefs用于将一个reactive对象转化为属性全部为ref对象的普通对象
  return {
    // 使用reRefs
    ...toRefs(obj)
  }
```

3、生命周期钩子

- 新增了 setup 生命周期，将 Vue2.x 中的 beforeDestroy 名称变更成 beforeUnmount; destroyed 表更为 unmounted

- beforeCreate 和 created 被 setup 替换了（但是 Vue3 中你仍然可以使用， 因为 Vue3 是向下兼容的， 也就是你实际使用的是 vue2 的）。其次，钩子命名都增加了 on; Vue3.x 还新增用于调试的钩子函数 onRenderTriggered 和 onRenderTricked

```js
// 钩子需要导入
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue'
```

4、watch 与 watchEffect 的用法

::: tip watch
watch 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况是惰性的，也就是说仅在侦听的源数据变更时才执行回调。
watch(source, callback, [options])
:::

- source:可以支持 string,Object,Function,`Array`; 用于指定要侦听的响应式变量
- callback: 执行的回调函数
- options：支持 deep、immediate 和 flush 选项。

🌰：

```js
import { defineComponent, ref, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  setup() {
    // 1、监听reactive
    const state = reactive({ nickname: 'name', age: 20 })
    watch(
      () => state.age,
      (curAge, preAge) => {
        console.log('新值:', curAge, '老值:', preAge)
      }
    )

    // 2、监听ref
    const year = ref(0)
    watch(year, (newVal, oldVal) => {
      console.log('新值:', newVal, '老值:', oldVal)
    })

    // 3、监听多个。source为数组
    watch([() => state.age, year], ([curAge, preAge], [newVal, oldVal]) => {
      console.log('新值:', curAge, '老值:', preAge)
      console.log('新值:', newVal, '老值:', oldVal)
    })

    // 4、复杂的嵌套对象。使用deep:true
    const state = reactive({
      room: {
        id: 100,
        attrs: {
          size: '140平方米',
          type: '三室两厅'
        }
      }
    })
    watch(
      () => state.room,
      (newType, oldType) => {
        console.log('新值:', newType, '老值:', oldType)
      },
      { deep: true }
    )

    // 5、默认惰性的，需要立即执行回调：immediate: true即可

    // 6、默认组件销毁会停止监听，若需要自己控制：使用watch的返回值
    const stopWatchRoom = watch(
      () => state.room,
      (newType, oldType) => {
        console.log('新值:', newType, '老值:', oldType)
      },
      { deep: true }
    )
    setTimeout(() => {
      // 停止监听
      stopWatchRoom()
    }, 3000)
    return {
      ...toRefs(state)
    }
  }
})
```

::: tip watchEffect
watchEffect 会自动收集依赖, 只要指定一个回调函数。在组件初始化时， 会先执行一次来收集依赖， 然后当收集到的依赖中数据发生变化时， 就会再次执行回调函数
:::

- watchEffect 不需要手动传入依赖
- watchEffect 会先执行一次用来自动收集依赖
- watchEffect 无法获取到变化前的值， 只能获取变化后的值

```js
watchEffect(() => {
  console.log(state)
  console.log(year)
})
```

二、自定义 Hooks

聚合逻辑为 Hooks

```js
// 1、make Hooks
import { ref, Ref, computed } from 'vue'

type CountResultProps = {
  count: Ref<number>,
  multiple: Ref<number>,
  increase: (delta?: number) => void,
  decrease: (delta?: number) => void
}

export default function useCount(initValue = 1): CountResultProps {
  const count = ref(initValue)

  const increase = (delta?: number): void => {
    if (typeof delta !== 'undefined') {
      count.value += delta
    } else {
      count.value += 1
    }
  }

  const multiple = computed(() => count.value * 2)

  const decrease = (delta?: number): void => {
    if (typeof delta !== 'undefined') {
      count.value -= delta
    } else {
      count.value -= 1
    }
  }

  return {
    count,
    multiple,
    increase,
    decrease
  }
}
```

```html
<!-- 2、use Hooks -->
<script lang="ts">
  import useCount from "../hooks/useCount";
    setup() {
      const { count, multiple, increase, decrease } = useCount(10);
      return {
        count,
        multiple,
        increase,
        decrease,
      };
    },
</script>
```

三、Vue3.x 将使用 Proxy 取代 Vue2.x 版本的 Object.defineProperty

- Object.defineProperty 只能劫持对象的属性， 而 Proxy 是直接代理对象

由于 Object.defineProperty 只能劫持对象属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。但是 Proxy 直接代理对象， 不需要遍历操作

- Object.defineProperty 对新增属性需要手动进行 Observe

因为 Object.defineProperty 劫持的是对象的属性，所以新增属性时，需要重新遍历对象， 对其新增属性再次使用 Object.defineProperty 进行劫持。也就是 Vue2.x 中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set 内部也是通过调用 Object.defineProperty 去处理的。

四、Teleport 传送

希望继续在组件内部使用 Dialog(可以使用到 Vue 组件内的状态（data 或者 props）的值),又希望渲染的 DOM 结构不嵌套在组件的 DOM 中：

- 用`<Teleport>`包裹 Dialog, 此时就建立了一个传送门，可以将 Dialog 渲染的内容传送到任何指定的地方

- 如：

```html
<!-- 1、在全局根节点增加 dialog DOM  -->
<!-- 如在index.html 。一般在 App.vue 内 -->
<body>
  <div id="app"></div>
  <div id="dialog"></div>
</body>

<!-- 2、定义一个Dialog组件Dialog.vue -->
<template>
  <!-- to 的 id 与 1 中的id一致 -->
  <teleport to="#dialog">
    <div class="dialog">
      <!-- 一些内容... -->
    </div>
  </teleport>
</template>

<!-- 3、在某组件中使用 -->
<div class="header">
  <!-- <navbar />等一些内容 -->
  <dialog v-if="dialogVisible"></dialog>
</div>

<!-- 4、最终DOM结构为 -->
<!-- 使用 teleport 组件，通过 to 属性，指定该组件渲染的位置与 <div id="app"></div> 同级，也就是在 body 下，但是 Dialog 的状态 dialogVisible 又是完全由内部 Vue 组件控制 -->
<body>
  <div id="app"></div>
  <div id="dialog">...</div>
</body>
```

五、Suspense 异步渲染

Suspense 只是一个带插槽的组件，只是它的插槽指定了 default 和 fallback 两种状态

Vue3.x 新出的`内置组件Suspense`, 它提供两个`template slot`, 刚`开始`会`渲染`一个`fallback状态`下的内容， 直到到达`某个条件后`才会`渲染default状态`的正式`内容`， 通过使用 Suspense 组件进行展示`异步渲染`就更加的简单。

```html
<Suspense>
  <!-- default: 最终正式 -->
  <template #default>
    <async-component></async-component>
  </template>
  <!-- fallback: 一开始 -->
  <template #fallback>
    <div>
      Loading...
    </div>
  </template>
</Suspense>
```

六、片段（Fragment）

- 在 Vue2.x 中， template 中只允许有一个根节点
- 在 Vue3.x 中，你可以直接写多个根节点

七、slot 具名插槽语法

- vue2: 具名插槽和作用域插槽分别使用 slot 和 slot-scope 来实现

```ts
// 1、具名插槽（带名字）
// 子：
<slot name="title"></slot>
// 父:
<template slot="title">
  <h1>歌曲：成都</h1>
<template>

// 2、作用域插槽（传数据）
// 子：
<slot name="content" :data="data"></slot>
export default {
  data(){
    return{
      data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
    }
  }
}
// 父：
<template slot="content" slot-scope="scoped">
    <div v-for="item in scoped.data">{{item}}</div>
<template>
```

- vue3: 将 slot 和 slot-scope 进行了合并同意使用

```ts
// 子：
<slot name="content" :data="data"></slot>
export default {
  data(){
    return{
      data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
    }
  }
}

// 父：
<template v-slot:content="scoped">
   <div v-for="item in scoped.data">{{item}}</div>
</template>

// 父：或简写 #content="{data}"
<template #content="{data}">
    <div v-for="item in data">{{item}}</div>
</template>
```

- [ts 系列](https://mp.weixin.qq.com/s/y6C4R04mpvBmyV80p5WOug)
- [SourceMap 与前端异常监控](https://mp.weixin.qq.com/s/y6C4R04mpvBmyV80p5WOug)
- [SourceMap 获取源码](https://zhuanlan.zhihu.com/p/26033573)
- [mozilla:source-map](https://github.com/mozilla/source-map)
- [阮一峰：JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)

#### SourceMap 与前端异常监控

1、代码反解

然后每次把 SourceMap 也上传一份给 监控，线上遇到错误将错误上传给 监控 Server，监控 Server 基于错误堆栈和 SourceMap 反解出原始的堆栈就可以了。是的，监控系统要解决的一个核心问题就是代码反解

出于一些性能和安全等的考虑，通常我们发布到线上的代码，通常并非原始的代码，而是经过混淆压缩后的代码，即使不经过压缩，大部分的前端工程都会经过一个 build 的过程，这个过程里通常会包括代码的转换、打包和压缩等，这使得调试生成的代码变得异常困难，因此，我们需要一个工具帮我们解决这类调试问题。

2、SourceMap

编译的时候除了生成最终产物 xxx.js 文件外还会额外生成一个 xxx.js.map 的文件，这个 map 文件里包含了`原始代码及其位置映射信息`，这样我们利用 xxx.js 和 xxx.js.map 就可以将 xxx.js 的代码及其位置完美的映射会源代码以及位置，这样我们的调试工具就可以基于这个 map 文件实现源码调试了。

- transformer: Babel、typescript、emscripten、esbuild【】
- minifier 压缩混淆: esbuild ,terser
- bundler 打包: esbuild, webpack, rollup【打包时也需配置生成 SourceMap】
- runtime 开发调试: browser & node & deno【用的浏览器的 SourceMap 支持和 node 的 SourceMap 支持】
- 日志上报: client server 【将 SourceMap 发布到内网而非公网上，不然别人也可以解析你的源码了】

3、SourceMap 格式

将一个 .ts 文件编译为 .js 文件，看看其 SourceMap 信息是如何处理映射的。我们项目包含了原始的 ts 文件 add.ts、编译后的产物文件 add.js 和 SourceMap 文件 add.js.map

```js
// add.ts
const add = (x:number, y:number) => {
  return x + y;
}

// add.js
var add = function (x, y) {
    return x + y;
};
//# sourceMappingURL=module.js.map【访问 http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js，打开压缩后的版本，滚动到底部，你可以看到最后一行是这样的：//@ sourceMappingURL=jquery.min.map; 这就是Source Map。它是一个独立的map文件，与源码在同一个目录下】

// SourceMap
{
  version : 3, // SourceMap标准版本,最新的为3
  file: "add.js", // 转换后的文件名
  sourceRoot : "", // 转换前的文件所在目录，如果与转换前的文件在同一目录，该项为空
  sources: ["add.ts"], // 转换前的文件，该项是一个数组，表示可能存在多个文件合并
  names: [], // 转换前的所有变量名和属性名,多用于minify的场景
  sourcesContent: [ // 原始文件内容
    "const add = (x:number,y:number) => {\n  return x+y;\n}"
  ]
  mappings: "AAAA,IAAM,GAAG,GAAG,UAAC,CAAQ,EAAC,CAAQ;IAC5B,OAAO,CAAC,GAAC,CAAC,CAAC;AACb,CAAC,CAAA",
}
```

mapping 的格式:

- 实际上是个三级结构

```js
let mappings: "AAAA,IAAM,GAAG,GAAG,UAAC,CAAQ,EAAC,CAAQ;IAC5B,OAAO,CAAC,GAAC,CAAC,CAAC;AACb,CAAC,CAAA";
lines = mappings.split(';')
[
  'AAAA,IAAM,GAAG,GAAG,UAAC,CAAQ,EAAC,CAAQ', // var add = function (x, y) { 一级
  'IAC5B,OAAO,CAAC,GAAC,CAAC,CAAC',     // return x + y; 二级
  'AACb,CAAC,CAAA' // }; 三级
]
* 每一行都对应生成代码的每行文件的位置映射信息
* 此处三行对应 add 方法的三行
```

- 对于 mappings 的三行：
  - segment：每一行同包含由 , 分割的多个 segment 信息，其中每个 segment 都对应了产物里每一行里每一个符合所在的列的信息
  - fields：每个 segment 实际上又包含了几个 field，每个 field 都编码了具体的行列映射信息,依次为：
    - 第一位: 转换后代码所处的列号，如果这是当前行的第一个 segment，那么是个绝对值，否则是相对于上一个 segment 的相对值
    - 第二位：表示这个位置属于 sources 属性中的哪一个文件，相对于前一个 segment 的位置（区别于列号，下一行的第一个 segment 仍然是相对于上一行的最后一个 segment，并不会 reset）
    - 第三位：表示这个位置属于转换前代码的第几行，相对位置，同第二列
    - 第四位：表示这个位置属于转换前代码的第几列，相对位置，同第二列
    - 第五位：表示这个位置属于 names 属性中的哪一个变量,相对位置，同第二列
- field 存储的值并非是直接的数字值，而是将数字使用 vlq 进行了编码，根据上述这些信息我们实际上就可以实现 SourceMap 的双向映射了，即可以根据 SourceMap 和原始代码的位置信息查找到生成代码的信息，也可以根据 SourceMap 和生成代码的位置信息，查找到原始代码的信息
  - 双向查找流程：vlq 解码
  - 事实上上面这些反解流程并不需要我们自己去实现，[mozilla:source-map](https://github.com/mozilla/source-map) 已经帮我们提供了很多的编译方法，包括不限于
    - originalPositionFor：查找源码位置
    - generatedPositionFor：查找生成代码位置
    - eachMapping：生成每个 segment 的详细映射信息

### 2021-09-23

- Vue.js 3.2： vnode： https://mp.weixin.qq.com/s/z2ZCUFfFzp3c1ly4IQrrMA

  - vnode 本质上是用来描述 DOM 的 JavaScript 对象，它在 Vue.js 中可以描述不同类型的节点，比如普通元素节点、组件节点、纯文本 vnode、注释 vnode 等。
  - 优点：抽象，引入 vnode，可以把渲染过程抽象化，从而使得组件的抽象能力也得到提升。
    其次是跨平台，因为 patch vnode 的过程不同平台可以有自己的实现，基于 vnode 再做服务端渲染、weex 平台、小程序平台的渲染都变得容易了很多

- 流程图：draw.io：https://drawio-app.com/examples/

- 时序图：PlantUml：https://plantuml.com/zh/sequence-diagram

- 画图工具：OmniGraffle：https://www.omnigroup.com/omnigraffle

### 2021-09-22

- xss 攻击：https://tech.meituan.com/2018/09/27/fe-security.html
- CSRF 攻击：https://mp.weixin.qq.com/s/sYoccR4-qM4crgkQBYvSpA
- 甘特图：通过条状图来显示项目、进度和其他时间相关的系统进展的内在关系随着时间进展的情况（React 开源甘特图组件的性能优化）：https://mp.weixin.qq.com/s/eP9M2wBJof_lOgCpVoOoXg
- SourceMap：https://mp.weixin.qq.com/s/UMDVbq1V-hmVKibweaoURQ
- npm & yarn：https://mp.weixin.qq.com/s/Zp9p-BAosfvCT0iDMz1aEw
- Web Component：https://mp.weixin.qq.com/s/h8B1YxqOKtwr5CpNSYm_2A
- Vue 源码：https://mp.weixin.qq.com/s/ze4PvXuEvup76safzAl5jA
- 从唤端出发，学习第三方 JS：https://mp.weixin.qq.com/s/jJJHQ3jZfUVQMayqBA6MpQ

### 2021-09-21

#### 断点续传

前端：

- 1、核心是利用 Blob.prototype.slice 方法，和数组的 slice 方法相似，调用的 slice 方法可以返回原文件的某个切片，根据预先设置好的切片最大数量将文件切分为一个个切片，然后借助 http 的可并发性，同时上传多个切片，这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间
- 2、并发，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序

服务端：

- 1、服务端需要负责接受这些切片，并在接收到所有切片后合并切片
  - 何时合并切片，即切片什么时候传输完成？
  - 如何合并切片？
- 2、第一个问题需要前端进行配合，前端在每个切片中都携带切片最大数量的信息，当服务端接受到这个数量的切片时自动合并，也可以额外发一个请求主动通知服务端进行切片的合并
- 3、第二个问题，具体如何合并切片呢？这里可以使用 nodejs 的 读写流（readStream/writeStream），将所有切片的流传输到最终文件的流里

https://juejin.cn/post/6844904046436843527

#### react 的 setState

1.setState 是同步还是异步的，为什么有的时候不能立即拿到更新结果而有的时候可以?

1.1 钩子函数和 React 合成事件中的 setState

- 1.调用 setState 不会立即更新
- 2.所有组件使用的是同一套更新机制，当所有组件 didmount 后，父组件 didmount，然后执行更新
- 3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。

  1.2 异步函数和原生事件中的 setstate？

- 1.在父组件 didmount 后执行
- 2.调用 setState 同步更新

  2.为什么有时连续两次 setState 只有一次生效？

- 1.直接传递对象的 setstate 会被合并成一次
- 2.使用函数传递 state 不会被合并

#### 几大 JS 框架的设计思路

运行时 ｜ ... ｜ 预编译

react ｜ vue ｜ angular

React：是一个重运行时的框架，在数据发生变化后，并没有直接去操作 dom，而是生成一个新的所谓的虚拟 dom，它可以帮助我们解决跨平台和兼容性问题，并且通过 diff 算法得出最小的操作行为，这些全部都是在运行时来做的。

Svelte：一个典型的重编译的框架，作为开发者我们只需要去写模版和数据，经过 Svelte 的编译和预处理，代码基本全部会解析成原生的 DOM 操作，Svelte 的性能也是最接近原生 js

Vue：在运行时和预编译取了一个很好地权衡，它保留了虚拟 dom，但是会通过响应式去控制虚拟 dom 的颗粒度，在预编译里面，又做了足够多的性能优化，做到了按需更新。

#### 编译时优化？

Vue 使用的是模版语法，模版 的特点，就是语法受限，我们可以使用 v-if v-for 这些指定的语法去编码，虽然这不够动态，但是由于语法是可枚举的，所以它可以在预编译层面做更多的预判，让 Vue 在运行时有更好的性能。

比如看一个 Vue 3.0 具体在编译时所做的优化：

- 传统 vdom 的 Diff 算法总归要按照 vdom 树的层级结构一层一层的遍历，所以 diff 性能会和模版的大小正相关，跟动态节点的数量无关。在一些组件整个模版内只有少量动态节点的情况下，这些遍历都是性能的浪费。
- 在 Vue3.0 里面，就有这样一条类似的优化策略，它的 compiler 可以根据节点的动态属性，为每个 虚拟 dom 创建不同的 patchflag，比如说，节点具有动态的 text，或者具有动态的 class，都会被打上不同的 patchflag。然后 patchflag 再配合 block tree，就可以做到对不同节点的靶向更新。

#### 死磕运行时

React ，它本身的思路是纯 JS 写法，这种方式非常灵活，但是，这也使它在编译时很难做太多的事情，像上面`vue`这样的编译时优化是很难实现的。所以，我们可以看到 React 几个大版本的的优化主要都在运行时。

如 CPU：

- 主流浏览器的刷新频率一般是 60Hz，也就是每秒刷新 60 次，大概 16.6ms 浏览器刷新一次。由于 GUI 渲染线程和 JS 线程是互斥的，所以 JS 脚本执行和浏览器布局、绘制不能同时执行。

- 在这 16.6ms 的时间里，浏览器既需要完成 JS 的执行，也需要完成样式的重排和重绘，如果 JS 执行的时间过长，超出了 16.6ms，这次刷新就没有时间执行样式布局和样式绘制了，于是在页面上就会表现为卡顿。

批处理：

- 如果在需要处理批处理的环境中（React 生命周期、合成事件中）无论调用多少次 setState，都会不会执行更新，而是将要更新的 state 存入 \_pendingStateQueue，将要更新的组件存入 dirtyComponent。当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount 后会将 isBranchUpdate 设置为 false。这时将执行之前累积的 setState。

Concurrent Mode：（Concurrent 模式是一组 React 的新功能，可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整。）

- 在运行时的主要瓶颈就是 CPU、IO ，如果能够破这两个瓶颈，就可以实现应用的保持响应。
- 在 CPU 上，我们的主要问题是，在 JS 执行超过 16.6 ms 时，页面就会产生卡顿，那么 React 的解决思路，就是在浏览器每一帧的时间中预留一些时间给 JS 线程，React 利用这部分时间更新组件。
- 当预留的时间不够用时，React 将线程控制权交还给浏览器让他有时间渲染 UI，React 则等待下一帧再继续被中断的工作。
- 这种将长任务分拆到每一帧中，每一帧执行一小段任务的操作，就是我们常说的时间切片。

- [react](https://mp.weixin.qq.com/s/4Y6DuY5rDohgdCm0MP5WBA)

#### 拼音搜索（见分享）

大多都是在索引阶段添加了拼音字段，有的还同时加了首拼字段，不过基本上都是只会给标题字段加上拼音索引。 还有另外一种实现方案就是将标题分词后，将分词的拼音单独存储到另外一个索引库，而且这个索引库的文档模型只有中文和拼音两个字段，用户输入关键词的时候，通过 ajax 检索匹配的中文，然后展现到搜索框的下方。如果你不是想问拼音自动补全的效果，而是想问直接搜索拼音时，会将对应的文章搜索出来的话，那大多是将拼音和对应的中文词语做了同义词映射。

### 2021-09-20

#### Service Worker

浏览器在后台独立于网页运行的、用 JavaScript 编写的脚本。想要玩转 Service Worker，是需要学习它的 API 的

- 我们需要手动编写 service-worker.js 文件。
- 我们需要在网页中下载并注册 service-worker.js 文件。
- Service Worker 具有超能力，可以拦截并处理 HTTP 请求。Service Worker 要求 HTTPS，注意那个"S"，但为了开发调试方便，localhost 除外

Service Worker 的生命周期:

- ervice Worker 生命周期：安装中、安装后、激活中、激活后、我废了。
- 首次导航到网站时，会下载、解析并执行 Service Worker 文件，触发 install 事件，尝试安装 Service Worker，如果 install 事件回调函数中的操作都执行成功，标志 Service Worker 安装成功，此时进入 waiting 状态，注意这时的 Service Worker 只是准备好了而已，并没有生效，当用户二次进入网站时，才会激活 Service Worker，此时会触发 activate 事件，标志 Service Worker 正式启动，开始响应 fetch、post、sync 等事件。
- 主要事件
  - install：Service Worker 安装时触发，通常在这个时机缓存文件。
  - activate：Service Worker 激活时触发，通常在这个时机做一些重置的操作，例如处理旧版本 Service Worker 的缓存。
  - fetch：浏览器发起 HTTP 请求时触发，通常在这个事件的回调函数中匹配缓存，是最常用的事件。
  - push：和推送通知功能相关
  - sync：和后台同步功能相关
- Service Worker 的应用:
  - 1.`缓存静态资源`。（利用 CacheStorage API 来缓存 js、css、字体、图片等静态文件。我们可以在 Service Worker 的 install 阶段，指定需要缓存的具体文件，在 fetch 事件的回调函数中，检查请求的 url，如果匹配了已缓存的资源，则不再从服务端获取，以此达到提升网页性能的目的。）
  - 2.`离线体验`。（将首页 index.html 也缓存呢？那结果是我们的网页甚至可以支持离线浏览。）
  - 3.`体验优化`。（网页中图片是很消耗带宽资源的，用户等待网站加载，很多时候都是在等图片，大多数放在 CDN 上的图片，都支持添加后缀参数获取不同分辨率照片的功能。假设我们有办法知道一个用户的网络条件的好坏（至于如何判断一个用户的网络条件，是另外一件事，可以让用户选择，也可用技术手段解决），把用户分级，暂且分为两级：网速快的和网速慢的。我们把网速级别信息放到 HTTP 请求的 header 中（或其它你想得到的合适的地方），当发起图片请求的时候，我们有机会拿到用户的网络级别，如果是网速快的用户，我们通过后缀参数返回 CDN 上高分辨率的图片，反之相反。这样的结果是网速快的用户可以看到更清晰的照片，而网速慢的用户虽然看到的照片清晰度差，但可以更早地看到照片，不必经过漫长的等待。）

Service Worker 的初衷是极致优化用户体验，是用来锦上添花的，技术只是技术，但实际应用前，应考虑成本和收益。

- [Service Worker](https://juejin.cn/post/6844903887296528398)

### 2021-09-19

为什么 app 都开发极速版（用看视频红包推广），已经有一个普通版，为什么还要去推广阉割的版本呢？【极速版通俗来讲就是，产品的简化版，只包含产品的核心功能，安装包会更小，运行速度会更快。】

- 拉新获客成本降低
- 获取下沉市场的用户，有些用户群体流量不足、网络差、手机内存小等等，一二三线的用户已经获取差不多了，上线网赚活动，邀请好友拉新领红包
- 极速版特有的功能：看视频赚金币
  - 网赚游戏，这种模式毕竟属于灰色地带，若上架到主版本后，政策突然锁紧，主版本会受影响太大。
  - 将其上架于极速版是保险的措施。而选择网赚模式，也只是恰好这种模式，更加适合下沉市场。
  - 试验某些可能涉嫌违规的功能，避免主版本 app 违规。

架构图: 4+1 视图。分别为场景视图、逻辑视图、物理视图、处理流程视图和开发视图。

- 场景视图：描述系统的参与者与功能用例间的关系，反映系统的最终需求和交互设计，通常由用例图表示。
- 处理流程视图：描述系统软件组件之间的通信时序，数据的输入输出，反映系统的功能流程与数据流程,通常由时序图和流程图表示
- 开发视图：描述系统的模块划分和组成，以及细化到内部包的组成设计，服务于开发人员，反映系统开发实施过程

vue&react 区别

1、模式

- Vue 使用的是 web 开发者更熟悉的`模板与特性`。模板+JavaScript+CSS 的组合模式呈现，它跟 web 现有的 HTML、JavaScript、CSS 能够更好地配合
- React 的特色在于`函数式编程`的理念和丰富的技术选型, 更容易吸引在 FP 上持续走下去的开发者。

2、Vue 跟 React 的最大区别在于数据的 reactivity，就是反应式系统上

- Vue 提供反应式的数据，当数据改动时，界面就会自动更新。Push-based：改动数据之后，数据本身会把这个改动推送出去，告知渲染系统自动进行渲染
- React 里面需要调用方法 SetState。Pull-based：用户要给系统一个明确的信号说明现在需要重新渲染了，这个系统才会重新渲染

两者不是完全互斥的，比如说在 React 里面，你也可以用一些第三方的库像 MobX 实现 Push-based 的系统，同时你也可以在 Vue2.0 里面，通过一些手段，比如把数据 freeze 起来，让数据不再具有反应式特点，或者通过手动调用组件更新的方法来做一个 pull-based 系统。所以两者并没有一个绝对的界限，只是默认的倾向性不同而已。

### 2021-09-18

#### 扫码登陆

基于 token 的认证机制：

- 账号密码登录时，客户端会将设备信息一起传递给服务端，
- 如果账号密码校验通过，服务端会把`账号与设备进行一个绑定`，存在一个数据结构中，这个数据结构中包含了账号 ID，设备 ID，设备类型等等，然后服务端会生成一个 token，用它来映射数据结构，这个 token 其实就是一串有着特殊意义的字符串，它的意义就在于，通过它可以找到对应的账号与设备信息，
- 客户端得到这个 token 后，需要进行一个本地保存，每次访问系统 API 都`携带上token与设备信息`。
- 服务端就可以通过 token 找到与它绑定的账号与设备信息，然后把绑定的设备信息与客户端每次传来的设备信息进行比较，如果相同，那么校验通过，返回 AP 接口响应数据，如果不同，那就是校验不通过拒绝访问。

扫码登陆：【PC 端、手机端、服务端】

- 1、PC 二维码准备阶段：用户打开 PC 端，切换到二维码登录界面

  - PC 端向服务端发起请求，生成用户登录的二维码，并且把 PC 端设备信息也传递给服务端
  - 服务端收到请求后，它生成二维码 ID，并将二维码 ID 与 PC 端设备信息进行绑定，把二维码 ID 返回给 PC 端
  - PC 端收到二维码 ID 后，生成二维码(二维码中肯定包含了 ID)
  - 为了`及时知道二维码的状态`，客户端在`展现二维码后`，PC 端`不断的轮询`服务端，比如每隔一秒就轮询一次，`请求`服务端告诉`当前二维码的状态`及相关信息

- 2、扫描状态切换

  - 用户用手机去`扫描`PC 端的`二维码`，通过二维码内容`取到`其中的`二维码ID`
  - 再`调用`服务端`API`将移动端的`身份信息`与`二维码ID`一起发送给服务端
  - 服务端接收到后，它可以将身份信息与二维码 ID 进行绑定，生成临时 token。然后返回给手机端(临时 token，为的就是手机端在下一步操作时，可以用它作为凭证。以此确保扫码，登录两步操作是同一部手机端发出的)
  - 因为 PC 端一直在轮询二维码状态，所以这时候二维码状态发生了改变，它就可以在界面上把二维码状态更新为已扫描

- 3、状态的确认
  - 手机端在接收到临时 token 后会弹出确认登录界面，用户点击`确认`时，手机端携带临时 token 用来调用服务端的接口，告诉服务端，我已经确认
  - 服务端收到确认后，根据二维码 ID 绑定的设备信息与账号信息，`生成用户PC端登录的token`
  - 这时候`PC端的轮询接口`，它就可以`得知`二维码的状态已经变成了"`已确认`"。并且`从服务端`可以`获取`到用户登录的`token`
  - 到这里，`登录就成功了`，后端 PC 端就可以用 token 去访问服务端的资源了

scene value 扫码场景值: 从相册选取和直接扫的 scene 肯定不一样

- [深入浅出 Commonjs 和 Es Module](https://mp.weixin.qq.com/s/y_uk7wXAfvq8FzcUZrR93w)
- [二维码扫码登录](https://juejin.cn/post/6940976355097985032#heading-8)

#### ts 如何工作

- [TS 工作](https://mp.weixin.qq.com/s/_zbrH7V-MDHnYSGXfc_Dsg)

工作原理：

- TypeScript 源码经过扫描器扫描之后变成一系列 Token；
- 解析器解析 token，得到一棵 AST 语法树；
- 绑定器遍历 AST 语法树，生成一系列 Symbol，并将这些 Symbol 连接到对应的节点上；
- 检查器再次扫描 AST，检查类型，并将错误收集起来；
- 发射器根据 AST 生成 JavaScript 代码。

VSCode 内置了对 TypeScript 语言的支持，类型检查主要通过 TypeScript 插件（extension）进行。插件背后就是 Language Service Protocal。

- LSP 是由微软提出的的一个协议，目的是为了解决插件在不同的编辑器之间进行复用的问题。LSP 协议在语言插件和编辑器之间做了一层隔离，插件不再直接和编辑器通信，而是通过 LSP 协议进行转发。这样在遵循了 LSP 的编译器中，相同功能的插件，可以一次编写，多处运行。LSP 协议的插件存在两个部分
  - LSP 客户端，它用来和 VSCode 环境交互。通常用 JS/TS 写成，可以获取到 VSCode API，因此可以监听 VSCode 传过来的事件，或者向 VSCode 发送通知。
    - 创建语言服务器；
    - 作为 VSCode 和语言服务器之间沟通的桥梁。
  - 语言服务器(如：tsserver)。它是语言特性的核心实现，用来对文本进行词法分析、语法分析、语义诊断等。它在一个单独的进程中运行。
    - TypeScript 插件的语言服务器其实就是一个在独立进程中运行的 tsserver.js 文件。我们可以在 typescript 源码的 src 文件下面找到 tsserver 文件夹，这个文件夹编译之后，就是我们项目中的 node_modules/typescript/lib/tsserver.js 文件。tsserver 接收插件客户端传过来的各种消息，将文件交给 typescript-core 分析处理，处理结果回传给客户端后，再由插件客户端交给 VSCode，进行展示/执行动作等

TypeScript 与 babel：

- 错误提示功能由 VSCode 提供。但是我们的代码需要经过编译之后才能在浏览器中运行，这个过程中是什么东西处理了 TypeScript 呢？答案是 Babel
- Babel 最初是设计用来将 ECMAScript 2015+的代码转换成后向兼容的代码，主要工作就是语法转换和 polyfill。只要 Babel 能识别 TypeScript 语法，就能对 TypeScript 语法进行转换。因此，Babel 和 TypeScript 团队进行了长达一年的合作，推出了`@babel/preset-typescript` 这个插件。使用这个插件，就能将 TypeScript 转换成 JavaScript

  - Babel 有两种常见使用场景，一种是直接在 CLI 中调用 babel 命令，另一种是将 Babel 和打包工具（如 webpack）结合使用。
  - webpack 中使用 babel 处理 typescript。在 webpack 中使用@babel/preset-typescript 插件，只需要两步。
    - 1、首先是配置 babel，让它加载@babel/preset-typescript 插件
    ```json
    {
      "presets": ["@babel/preset-typescript"]
    }
    ```
    - 2、配置 webpack，让 babel 能处理 ts 文件
    ```js
    {
      'rules'[
        {
          test: /.ts$/,
          use: 'label-loader'
        }
      ]
    }
    ```
    - 3、这样的话，webpack 在遇到.ts 文件时，会调用 label-loader 处理这个文件。label-loader 将这个文件转换成标准 JavaScript 文件后，将处理结果交还 webpack，webpack 继续后面的流程。

- label-loader：将 TypeScript 文件转换成标准 JavaScript？直接删除掉类型注解。

  - 解析：将原代码处理为 AST。对应 babel-parse
  - 转换：对 AST 进行遍历，在此过程中对节点进行添加、更新、移除等操作。对应 babel-tranverse。
  - 生成：把转换后的 AST 转换成字符串形式的代码，同时创建源码映射。对应 babel-generator。

- 校验提交到代码仓库的代码（VSCode 只提示类型错误，babel 完全不校验类型）
  - 执行：`tsc --noEmit --skipLibCheck`。tsc 命令对应的 TypeScript 版本，就是 node_modules 下安装的 TypeScript 的版本，这个版本可能跟 VSCode 的 TypeScript 插件使用的 tsserver 的版本不一致。这在大多数情况下没有问题，VSCode 内置的 TypeScript 版本一般都比项目中依赖的 TypeScript 版本高，TypeScript 是后向兼容的。如果遇到 VSCode 类型检查正常，但是 tsc 命令检查出错，或相反的情况，可以从版本方面排查一下。
  - 配合 husky，在 gitcommit 之前先执行一下这个命令，检查一下类型。如果类型验证不通过就不执行 git commit

### 2021-09-17

#### 链式调用

`return this`实现，把对象再返回回来，对象就可以继续调用方法，实现链式操作了。

```js
// 实现一个find函数，并且find函数能够满足下列条件

// title数据类型为string|null
// userId为主键，数据类型为number

// 原始数据
const data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' }
]

// 查找data中，符合条件的数据，并进行排序
const result = find(data)
  .where({
    title: /\d$/
  })
  .orderBy('userId', 'desc')

// 输出
;[
  { userId: 19, title: 'title2' },
  { userId: 8, title: 'title1' }
]
```

```js
function find(origin) {
  return {
    data: origin,
    where: function(searchObj) {
      const keys = Reflect.ownKeys(searchObj)

      for (let i = 0; i < keys.length; i++) {
        this.data = this.data.filter(item =>
          searchObj[keys[i]].test(item[keys[i]])
        )
      }

      return find(this.data)
    },
    orderBy: function(key, sorter) {
      this.data.sort((a, b) => {
        return sorter === 'desc' ? b[key] - a[key] : a[key] - b[key]
      })

      return this.data
    }
  }
}
```

#### 判断对象是否存在循环引用

可以通过 map 来进行暂存，当值是对象的情况下，我们将对象存在 map 中，循环判断是否存在，如果存在就是存在环了，同时进行递归调用。

#### 高阶函数

柯里化（Currying）：又称部分求值（Partial Evaluation），是把接受多个参数的原函数变换成接受一个单一参数（原函数的第一个参数）的函数，并且返回一个新函数，新函数能够接受余下的参数，最后返回同原函数一样的结果。核心思想是把多参数传入的函数拆成单（或部分）参数函数，内部再返回调用下一个单（或部分）参数函数，依次处理剩余的参数。

柯里化有 3 个常见作用：

- 参数复用
- 提前返回
- 延迟计算/运行

```js
// ES5 方式
function currying(fn) {
  var rest1 = Array.prototype.slice.call(arguments)
  rest1.shift()
  return function() {
    var rest2 = Array.prototype.slice.call(arguments)
    return fn.apply(null, rest1.concat(rest2))
  }
}
// ES6 方式
function currying(fn, ...rest1) {
  return function(...rest2) {
    return fn.apply(null, rest1.concat(rest2))
  }
}
```

偏函数是创建一个调用另外一个部分（参数或变量已预制的函数）的函数，函数可以根据传入的参数来生成一个真正执行的函数。其本身不包括我们真正需要的逻辑代码，只是根据传入的参数返回其他的函数，返回的函数中才有真正的处理逻辑比如：

```js
var isType = function(type) {
  returnfunction(obj) {
    returnObject.prototype.toString.call(obj) === `[object ${type}]`
  }
}

var isString = isType('String')
var isFunction = isType('Function')
```

- 柯里化是把一个接受 n 个参数的函数，由原本的一次性传递所有参数并执行变成了可以分多次接受参数再执行，例如：add = (x, y, z) => x + y + z→ curryAdd = x => y => z => x + y + z；
- 偏函数固定了函数的某个部分，通过传入的参数或者方法返回一个新的函数来接受剩余的参数，数量可能是一个也可能是多个；

技术调研

- 现存方案
- 对比环节：echarts、three.js、antdv、d3、chart.js
- 原理：echarts 是 svg/canvas 双引擎，而 three.js 更多的是基于 webgl
- 活跃度：github star 数、代码更新频率、issue 响应速度、文档完整度、在线示例、官方团队和社区的规模
- 生产环境可用性：web 在线编辑器，ACE 和 CodeMirror，CodeMirror 的受欢迎程度更高，羽雀、github 都是基于其打造自己的在线编辑器
- 功能：可视化是关系数据（树状图、脑图、流程图），antv-G6；3D 环绕地球效果来说，echarts、three.js；
- 兼容性：浏览器的最低兼容版本、是否涉及 pc 端/移动端
- 性能：包体积、渲染速度。对于移动端 gzip 之后超过 200k，pc 端 gzip 之后超过 500k，都可以认为是体积有点大了
- 可维护性：工作量、学习/维护成本、对于业务的侵入度、最佳实践
- 缺陷及隐患
- 最后产出文档

  - 1、需求背景
  - 2、一句话结论
  - 3、现存方案对比记录
  - 4、参考文档链接

- [技术调研](https://juejin.cn/post/6901845776880795662#heading-15)

### 2021-09-16

#### 渲染性能

HTML 和 CSS 定义了渲染的内容，而 JavaScript 可以干预内容和渲染过程。

渲染视角拆分为：渲染内容、渲染过程、JavaScript 干预

通过网络 I/O 或磁盘 I/O （缓存）加载 HTML CSS 之后的链路为：解码 HTML、CSS 文件（GZip 文本传输前压缩等）、处理过程（HTML、CSS Passing）、DOM Tree 构建、Style 内联、布局、合成器、绘制，这里涉及浏览器引擎进行大量的解析和计算等处理过程，为此，需要引入一个概念：关键渲染路径（Critical Rendering Path），简称：CRP。`https://mp.weixin.qq.com/s/cpSBcCHB7lYYGq1PE26qtg`

CRP 的步骤：【关键渲染路径 CRP】

- 地址栏输入 url，request page -> get Page，一旦浏览器得到响应，它就开始解析它。当它遇到一个依赖关系时，它就会尝试下载它

- 处理 HTML 标记并构建 DOM 树：如果它是一个样式文件（CSS 文件），浏览器就必须在渲染页面之前完全解析它（`这就是为什么说CSS具有渲染阻碍性`）

- 处理 CSS 标记并构建 CSSOM 树：如果它是一个脚本文件（JavaScript 文件），浏览器必须： 停止解析，下载脚本，并运行它。只有在这之后，它才能继续解析，因为 JavaScript 脚本可以改变页面内容（特别是 HTML）。（`这就是为什么说JavaScript阻塞解析`）

- 将 DOM 树和 CSSOM 树合并大一个渲染树：建立了 DOM 树和 CSSOM 树，结合在一起就得到了渲染树

- 根据渲染树来生成布局 flow：将渲染树转换为布局。

- 将各个节点布局绘制 paint 到屏幕上：根据浏览器在前几个阶段计算出来的数据对像素进行字面上的着色

优化页面的关键渲染路径（Critical Rendering Path）三件事：

- 减少关键资源请求数: 减小使用阻塞的资源（CSS 和 JS），注意，并非所有资源是关键资源，尤其是 CSS 和 JS（比如使用媒体查询的 CSS，使用异步的 JS 就不关键了）

- 减少关键资源大小：使用各种手段，比如减少、压缩和缓存关键资源，数据量越小，引擎计算复杂度越小

- 缩短关键渲染路径长度
  - 对 CRP 进行分析和特性描述，记录 关键资源数量、关键资源大小 和 CRP 长度
  - 最大限度减少关键资源的数量：删除它们，延迟它们的下载，将它们标记为异步等
  - 优化关键资源字节数以缩短下载时间（往返次数），减少 CRP 长度
  - 优化其余关键资源的加载顺序，需要尽早下载所有关键资源，以缩短 CRP 长度
  - 检测 CRP 中一些重要指标（关键资源数量、关键资源大小 、CRP 长度等等）：在 Chrome 中使用 Lighthouse 插件

重绘不一定需要重排，重排必然会导致重绘。

- 重排 repaint：当渲染树的一部分必须更新并且节点的尺寸发生了变化，浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。（尺寸、位置、增删 DOM、浏览器窗口变化、set style）
- 重绘 reflow：是在一个元素的外观被改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。（position 属性为 absolute 或 fixed 的元素，重排开销比较小，不用考虑它对其他元素的影响）

#### tab 自动吸顶多滚动容器

- 1.外层滚动容器与 tab 容器滚动是一体化，滚动过渡要自然
- 2.tabbar 在滚动至顶时需自动吸顶
- 3.不同 tab 容器之间支持横滑切换浏览操作
- 4.不同 tab 容器的滚动浏览是隔离的，需要保持各自的浏览位置
- 5.不同 tab 容器可以承载着无限列表内容

H5:

- position:sticky 吸顶
  - sticky 节点是以最近一个拥有滚动机制的父节点（overflow 不等于 visible 时）来固定
- 嵌套滚动中的滚动惯性传递
- 横滑：translate3d
- [intersectionobserver：](https://foreverwaiting.github.io/easy-bookmark/blogs/mdn.html#intersectionobserver-%E4%BA%A4%E5%8F%89%E8%A7%82%E5%AF%9F%E8%80%85%E3%80%90%E8%AE%A1%E7%AE%97web%E9%A1%B5%E9%9D%A2%E7%9A%84%E5%85%83%E7%B4%A0%E7%9A%84%E4%BD%8D%E7%BD%AE%E3%80%91)

### 2021-09-15

#### 防盗链

防止别人盗用链接（图片音视频等）：

当在请求上述资源时候，请求头中有 Host(请求的主机)和 Referer(来源)两个参数，两者不同即可判定为盗链，在 node 服务中判断并作出操作即可。（返回裂图或替换）

```js
// js部分
const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')
const getHostName = function(str) {
  let { hostname } = url.parse(str)
  return hostname
}

http
  .createServer((req, res) => {
    let refer = req.headers['referer'] || req.headers['referrer'] // 请求头都是小写的
    // 先看一下refer的值，去和host的值作对比，不相等就需要防盗链了
    // 要读取文件 返回给客户端
    let { pathname } = url.parse(req.url)
    let src = path.join(__dirname, 'public', '.' + pathname)
    // src代表我要找的文件
    fs.stat(src, err => {
      // 先判断文件存不存在
      if (!err) {
        if (refer) {
          // 不是所有图片都有来源
          let referHost = getHostName(refer)
          let host = req.headers['host'].split(':')[0]

          if (referHost !== host) {
            // 防盗链
            fs.createReadStream(path.join(__dirname, 'public', './1.jpg')).pipe(
              res
            )
          } else {
            // 正常显示，如果路径存在，可以正常显示直接返回
            fs.createReadStream(src).pipe(res)
          }
        } else {
          // 正常显示，如果路径存在，可以正常显示直接返回
          fs.createReadStream(src).pipe(res)
        }
      } else {
        res.end('end')
      }
    })
  })
  .listen(8888)
```

#### CSS: content-visibility(长列表性能优化)

允许用户代理跳过元素的呈现工作(包括布局和绘制)，直到需要它时，这使得初始页面加载速度更快。

属性及优点：

- visible：默认值，对布局和呈现不会产生什么影响
- hidden：元素跳过其内容的呈现。用户代理功能也不可访问（相当于设置了 display：none）
  - 用户代理：如，在页面中查找(command F)，按 Tab 键顺序导航，焦点事件。
- auto：对于用户可见区域的元素，浏览器会正常渲染其内容；对于不可见区域的元素，浏览器会`暂时跳过`其内容的呈现，等到其处于用户可见区域时，浏览器在渲染其内容。【对于暂时跳过的，虽未在视区，但其用户代理仍可访问】

缺点：

- 兼容性差：https://caniuse.com/?search=content-visibility
- 对滚动条的影响：由于视图外的 img 未渲染时候高度为 0，出现视区->图片渲染->页面高度增加->滚动条滚动闪动
  - 解决：`contains -intrinsic-size` 此 CSS 属性控制由 content-visibility 指定的元素的自然大小，所以设定一个默认值即可暂时解决。

### 2021-09-14

- 异常监控：https://mp.weixin.qq.com/s/4UyEHM-YmdgrfF_yze9Bpg、https://mp.weixin.qq.com/s/jSx_Es72jcC2gZl9k181xw、https://mp.weixin.qq.com/s/wI-_69GV3r55EMG-DaTNUA
- rpc，graphQl：https://segmentfault.com/a/1190000013961872，https://segmentfault.com/a/1190000014131950
- ast 语法树：https://github.com/CodeLittlePrince/blog/issues/19
- with、eval、newFunction：https://www.yuque.com/chengzishuo/dty0x8/dvw94r
- 技术清单：https://github.com/alienzhou/frontend-tech-list
- 单线程 js：https://github.com/JChehe/blog/blob/master/posts/%E5%85%B3%E4%BA%8EJavaScript%E5%8D%95%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%B8%80%E4%BA%9B%E4%BA%8B.md

- 脚手架 node：https://juejin.cn/post/6844903526947110919

### 2021-09-13

Monaco Editor: vscode 的前身，主要功能为编辑器

#### Monaco Editor 的核心功能与组件：

行号

Overlay Widget，可以渲染任意的内容小部件，能选择放置在顶部、底部或编辑器中间。例如编辑器内的查找框即是一个 Overlay Widget

ViewLine，每一行都表示一个 ViewLine

Decorations 装饰块，可以指定某个位置的代码块以何种样式呈现，例如修改其背景色、前景色等

Content Widget，与 Overlay Widget 类似，但可以基于行、列指定其位置。例如自动补全的列表框就是一个 Content Widget

View Zone, 与 Overlay、Content Widget 不同，它可以插入到特定的行之间将其撑开。例如在上图中 88 行与 89 行之间的查找引用窗口

支持通过 Decorations API 来添加更多的装饰，例如版本控制中为修改过的行号添加一个色块，又或者在调试状态下显示断点信息等

对于不同编程语言的基础支持（即`高亮`）则需要通过`注册语言`规则的方式来实现，Monaco 默认使用了名为 Monarch 的高亮系统（而 VS Code 使用的则是 Textmate），Monarch 规定了语言需要包含的关键字、类型、操作符，以及 Tokenizer。Tokenizer 是一组正则表达式，表示以何种规则来识别这些关键字以及括号、注释块，Monarch 将会依照正则表达式的配置来匹配每个 Token，并为之渲染对应的主题色

对于高级的`语言特性`支持，Monaco 也提供了遵循 LSP 标准的 API，例如`自动补全、鼠标悬停、查找引用、定义跳转`等常见功能都可以通过`注册语言服务器`来实现，而 Monaco 本身自带了包括 TypeScirpt/JavaScript、CSS、HTML 的语言服务支持

- [json view 编辑器基于 Monaco](https://www.npmjs.com/package/react-json-view)

#### Chrome 89 新功能(大量 DevTools 新特性)

支持选择 CSS 的 :target 伪类，当 URL 中的 hash 和 DOM 元素的 id 相同时，将触发该元素的 :target 伪类

复制 CSS 属性的新选项

- 类的复制选项:
  - Copy selector：复制当前选择器名称；
  - Copy rule：复制当前选择器的规则；
  - Copy all declarations：复制当前规则下的所有声明，包括无效属性和带前缀的属性。
- 属性的复制选项:
  - Copy declaration：复制当前行的声明；
  - Copy property：复制当前行的属性；
  - Copy value：复制当前行的值。

保持记录网络日志：DevTools 现在始终保持记录网络日志（Record network log）设置。以前，每当页面重新加载时，DevTools 都会重置用户的选择。

Console、Sources 面板中复制对象的新选项：现在可以使用 Console 和 Sources 面板中的新选项来快捷复制对象值。这非常方便，尤其是当需要复制一个比较大的对象（例如一个长数组）时。！！！！！！！

支持超出视口的元素截图：在 Element 面板中，右键单击一个 DOM 元素并选择 Capture node screenshot 可以使用元素截图功能。

Cookies 相关更新：显示 url 解码后的 cookie 的新选项

在设备模式下模拟双屏和`可折叠屏幕`

### 2021-09-12

- 文件上传，断点上传：https://mp.weixin.qq.com/s/hOkxwjSHGZ-3oXyN3CwwqQ

  - https://panjiachen.github.io/awesome-bookmarks/diary/read.html#%E4%BA%94%E6%9C%88

- 前端异常埋点：https://mp.weixin.qq.com/s/ithQ2DDFvTfpuaixH8pt2A

  - 前端异常捕获
    - try…catch: 无法捕获（异步任务抛出的异常，promise（异常内部捕获到了，并未往上抛异常，使用 catch 处理））
    - 全局异常监听 window.onerror
      ```js
      window.addEventListener('error', function() {
        console.log(error)
        // 异常上报
      })
      ```
      - 好处：同步任务、异步任务都可捕获，可以得到具体的异常信息、异常文件的 URL、异常的行号与列号及异常的堆栈信息，再捕获异常后，统一上报至我们的日志服务器，而且可以全局监听
      - 坏处：浏览器兼容性、跨域脚本无法准确捕获异常，跨域之后 window.onerror 捕获不到正确的异常信息，而是统一返回一个 Script error，可通过在 script 标签使用 crossorigin 属性来规避这个问题
    - Promise 内部异常: onerror 以及 try-catch 也无法捕获 Promise 实例抛出的异常，只能最后在 catch 函数上处理
  - vue 工程异常
    - Vue.config.errorHandler 这样的 Vue 全局配置，可以在 Vue 指定组件的渲染和观察期间未捕获错误的处理函数
  - 生产环境：由于代码是经过 webpack 打包后压缩`混淆`的代码，导致 error 堆栈信息里的报错的代码行数都在第一行了
  - 错误上报：
    - img 标签 这种方式无需加载任何通讯库，而且页面是无需刷新的，相当于 get 请求，没有跨域问题。缺点是有 url 长度限制。（通过动态创建一个 img,浏览器就会向服务器发送 get 请求。将需要上报的错误数据放在 url 中，利用这种方式就可以将错误上报到服务器了）
    - ajax 与正常的接口请求无异，可以用 post
  - 上报信息：应该包含异常位置（行号，列号），异常信息等。
  - 服务端收集日志：`log4js-node`插件。拿到上报的 error 日志后，解析（会拿到 colno 为 2319，lineno 为 1），安装一个插件帮助我们找到对应`压缩前`的代码位置(npm install source-map -S:先读取对应的 map 文件（按 filename 对应），然后只需传入压缩后的报错行号列号即可，就会返回压缩前的错误信息。)。
  - 数据存储 日志可视化
  - 错误日志类型分类
  - 上报频率，防抖
  - https://mp.weixin.qq.com/s/4UyEHM-YmdgrfF_yze9Bpg
  - https://mp.weixin.qq.com/s/jSx_Es72jcC2gZl9k181xw
  - ut 打点上报，sls、odps 日志存储（流量染色），traceId 透传注入

  try catch: 同步、async await

  onerror：同步、异步

  error 事件监听：同步、异步、资源加载（img）

  unhandlerejection：Promise、async await

- Bundleless【组件动态加载】： https://mp.weixin.qq.com/s/1v9UX_z27_lioId1ZSEcDQ

- graphQl 网关与 cdn：https://mp.weixin.qq.com/s/ZO1Vpslk3-17YxUVt9Vhrw

- js 数据类型转换：https://mp.weixin.qq.com/s/NN8DiH9ATZ2RuaDjlls-aw

- 监控页面白屏：https://mp.weixin.qq.com/s/q1oXKJCAW7NQjaF0MP3vuA

  - [脚本错误量极致优化-监控上报与 Script error](https://github.com/joeyguo/blog/issues/13)
  - [Webpack 打包后代码执行时机分析与优化](https://github.com/joeyguo/blog/issues/21)
  - [前端资源加载失败优化](http://www.alloyteam.com/2021/01/15358/)

- jest 测试：http://www.alloyteam.com/2020/02/14255/

- h5 闪开：http://www.alloyteam.com/2020/06/fast-open-h5/

### 2021-09-11

- css: https://qishaoxuan.github.io/css_tricks/createTriangle/

- vim：https://shanyue.tech/op/vim-setting.html#%E5%B0%8F%E7%BB%93

- 浏览器工作原理：https://cloud.tencent.com/developer/article/1360028

#### 命令

1、rimfaf 【https://github.com/isaacs/rimraf】用于在构建之前清除 dist 目录文件内容。如：

```json
"scripts": {
  "build": "npm run lint && rimraf dist types && gulp",
}
```

2、create a directory recursively 递归的创建目录：【https://github.com/substack/node-mkdirp】

```js
var mkdirp = require('mkdirp')
mkdirp('/tmp/foo/bar/baz', function(err) {
  if (err) console.error(err)
  else console.log('pow!')
})
// And now /tmp/foo/bar/baz exists, huzzah!
```

#### Github Actions

Travis、Gitlab CI / CD 以及 Jenkins

在 .github/workflows 下新增 mian.yml 配置文件:

```yml
# 以下都是官方文档的简单翻译
# 当前的 yml（.yaml） 文件是一个 workflow，是持续集成一次运行的一个过程，必须放置在项目的 .github/workflow 目录下
# 如果不清楚 .yml 文件格式语法，可以查看 https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes
# 初次编写难免会产生格式问题，可以使用 VS Code 插件进行格式检测，https://marketplace.visualstudio.com/items?itemName=OmarTawfik.github-actions-vscode

# 具体各个配置属性可查看 https: //docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

# workflow 的执行仍然会受到一些限制，例如
#  - 每个 job 最多执行 6 小时（本地机器不受限制）
#  - 每个 workflow 最多执行 72 小时
#  - 并发 job 的数量会受到限制
#  - 更多查看 https: //docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#usage-limits

# name: 当前 workflow 的名称
name: Algorithms

# on:  指定 workflow 触发的 event
#
#      event 有以下几种类型
#         - webhook
#         - scheduled
#         - manual
on:
  # push: 一个 webhook event，用于提交代码时触发 workflow，也可以是触发列表，例如 [push, pull_request]

  #        workflows 触发的 event 大部分是基于 webhook 配置，以下列举几个常见的 webhook:
  #           - delete:  删除一个 branch 或 tag 时触发
  #           - fork / watch:  某人 fork / watch 项目时触发（你问有什么用，发送邮件通知不香吗？）
  #           - pull_request:  提交 PR 时触发
  #           - page_build:  提交 Github Pages-enabled 分支代码时触发
  #           - push:  提交代码到特定分支时触发
  #           - registry_package:  发布或跟新 package 时触发
  #           更多 webhook 可查看 https: //docs.github.com/en/actions/reference/events-that-trigger-workflows
  #           从这里可以看出 Git Actions 的一大特点就是 Gihub 官方提供的一系列 webhook
  push:
    # branches: 指定 push 触发的特定分支，这里你可以通过列表的形式指定多个分支
    branches:
      - feat/framework
    #
    # branches 的指定可以是通配符类型，例如以下配置可以匹配 refs/heads/releases/10
    # - 'releases/**'
    #
    # branches 也可以使用反向匹配，例如以下不会匹配 refs/heads/releases/10
    # - '!releases/**'
    #
    # branches-ignore:  只对 [push, pull_request] 两个 webhook 起作用，用于指定当前 webhook 不触发的分支
    # 需要注意在同一个 webhook 中不能和 branches 同时使用
    #
    # tags:  只对 [push, pull_request] 两个 webhook 起作用，用于指定当前 webhook 触发的 tag
    #
    # tags:
    #   - v1             # Push events to v1 tag
    #   - v1.*           # Push events to v1.0, v1.1, and v1.9 tags
    #
    # tags-ignore:  类似于 branches-ignore
    #
    # paths、paths-ignore...
    #
    # 更多关于特定过滤模式可查看 https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet
    #
    # 其他的 webhook 控制项还包括 types（不是所有的 webhook 都有 types），例如已 issues 为例，可以在 issues 被 open、reopened、closed 等情况下触发 workflow
    # 更多 webhook 的 types 可查看 https: //docs.github.com/en/actions/reference/events-that-trigger-workflows#webhook-events
    #
    # on:
    #   issues:
    #     types:  [opened, edited, closed]

  # 除此之外如果对于每个分支有不同的 webhook 触发，则可以通过以下形式进行多个 webhook 配置
  #
  # push:
  #   branches:
  #     - master
  # pull_request:
  #   branches:
  #     - dev
  #
  # 除了以上所说的 webhook event，还有 scheduled event 和 manual event
  # scheduled event:  用于定时构建，例如最小的时间间隔是 5 min 构建一次
  # 具体可查看 https: //docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events

# env:  指定环境变量（所有的 job 生效，每一个 job 可以独立通过 jobs.<job_id>.env、jobs.<job_id>.steps.env 配置）
# defaults / defaults.run: 所有的 job 生效，每一个 job 可以独立通过 jobs.<job_id>.defaults 配置
# deafults
# defaults.run

# jobs: 一个 workflow 由一个或多个 job 组成
jobs:
  # job id: 是 job 的唯一标识，可以通过 _ 进行连接，例如:  my_first_job，例如这里的 build 就是一个 job id
  build_and_deploy:
    # name: 在 Github 中显示的 job 名称
    name: Build And Deploy
    #
    # needs: 用于继发执行 job，例如当前 job build 必须在 job1 和 job2 都执行成功的基础上执行
    # needs: [job1, job2]
    #
    # runs-on: job 运行的环境配置，包括:
    #   - windows-latest
    #   - windows-2019
    #   - ubuntu-20.04
    #   - ubuntu-latest
    #   - ubuntu-18.04
    #   - ubuntu-16.04
    #   - macos-latest
    #   - macos-10.15
    #   - self-hosted（本地机器，具体可查看 https: //docs.github.com/en/actions/hosting-your-own-runners/using-self-hosted-runners-in-a-workflow）
    runs-on: ubuntu-latest
    #
    # outputs:  用于输出信息
    #
    # env:  用于设置环境变量
    #
    # defaults:  当前所有 step 的默认配置
    #
    # defaults.run

    # if: 满足条件执行当前 job

    # steps:  一个 job 由多个 step 组成，step 可以
    #   - 执行一系列 tasks
    #   - 执行命令
    #   - 执行 action
    #   - 执行公共的 repository
    #   - 在 Docker registry 中的 action
    steps:
      #
      # id: 类似于 job id
      #
      # if:  类似于 job if
      #
      # name:  当前 step 的名字
      - name: Checkout
        #
        # uses: 用于执行 action
        #
        #       action: 可以重复使用的单元代码
        #          - 为了 workflow 的安全和稳定建议指定 action 的发布版本或 commit SHA
        #          - 使用指定 action 的 major 版本，这样可以允许你接收 fixs 以及 安全补丁并同时保持兼容性
        #          - 尽量不建议使用 master 版本，因为 master 很有可能会被发布新的 major 版本从而破坏了 action 的兼容性
        #          - action 可能是 JavaScript 文件或 Docker 容器，如果是 Docker 容器，那么 runs-on 必须指定 Linux 环境
        #
        #         指定固定 commit SHA
        #         uses:  actions/setup-node@74bc508
        #         指定一个 major 发布版本
        #         uses:  actions/setup-node@v1
        #         指定一个 minor 发布版本
        #         uses:  actions/setup-node@v1.2
        #         指定一个分支
        #         uses:  actions/setup-node@master
        #         指定一个 Github 仓库子目录的特定分支、ref 或 SHA
        #         uses:  actions/aws/ec2@master
        #         指定当前仓库所在 workflows 的目录地址
        #         uses:  ./.github/actions/my-action
        #         指定在 Dock Hub 发布的 Docker 镜像地址
        #         uses:  docker: //alpine: 3.8
        #         A Docker image in a public registry
        #         uses:  docker: //gcr.io/cloud-builders/gradle

        # checkout action 主要用于向 github 仓库拉取源代码（需要注意 workflow 是运行在服务器上，因此需要向当前 github 拉取仓库源代码）
        # 它的功能包括但不限于
        #   - Fetch all history for all tags and branches
        #   - Checkout a different branch
        #   - Checkout HEAD^
        #   - Checkout multiple repos (side by side)
        #   - Checkout multiple repos (nested)
        #   - Checkout multiple repos (private)
        #   - Checkout pull request HEAD commit instead of merge commit
        #   - Checkout pull request on closed event
        #   - Push a commit using the built-in token

        # checkout action:  https: //github.com/actions/checkout
        uses: actions/checkout@v2
        # with: action 提供的输入参数
        with:
          # 指定 checkout 的分支、tag 或 SHA
          # 更多 checkout action 的配置可查看 https: //github.com/actions/checkout#usage
          ref: feat/ci
        # args: 用于 Docker 容器的 CMD 指令参数
        # entrypoint: Docker 容器 action（覆盖 Dockerfile 的 ENTRYPOINT） 和 JavaScript action 都可以使用
      #
      # run: 使用当前的操作系统的默认的 non-login shell 执行命令行程序
      # 运行单个脚本
      # run: npm install
      # 运行多个脚本
      # run: |
      #   npm ci
      #   npm run build
      #
      # working-directory: 用于指定当前脚本运行的目录
      # working-directory: ./temp
      #
      # shell: 可以指定 shell 类型进行执行，例如 bash、pwsh、python、sh、cmd、powershell
      # shell: bash
      #
      # env: 除了可以设置 workflow 以及 job 的 env，也可以设置 step 的 env（可以理解为作用域不同，局部作用域的优先级更高）
      #
      # comtinue-on-error: 默认当前 step 失败则会阻止当前 job 继续执行，设置 true 时当前 step 失败则可以跳过当前 job 的执行

      - name: Cache
        # cache action: https://github.com/actions/cache
        # cache 在这里主要用于缓存 npm，提升构建速率
        uses: actions/cache@v2
        # npm 缓存的路径可查看 https://docs.npmjs.com/cli/cache#cache
        # 由于这里 runs-on 是 ubuntu-latest，因此配置 ~/.npm
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      # github-script action: https://github.com/actions/github-script
      # 在 workflow 中使用 Script 语法调用 Github API 或引用 workflow context

      # setup-node action: https://github.com/actions/setup-node
      # 配置 Node 执行环境（当前构建的服务器默认没有 Node 环境，可以通过 Action 安装 Node）
      # 需要注意安装 Node 的同时会捆绑安装 npm，如果想了解为什么会捆绑，可以 Google 一下有趣的故事哦
      # 因此使用了该 action 后就可以使用 npm 的脚本在服务器进行执行啦
      # 这里也可以尝试 v2-beta 版本哦
      - name: Set Node
        uses: actions/setup-node@v1
        with:
          # 也可以通过 strategy.matrix.node 进行灵活配置
          # 这里本地使用 node 的 12 版本构建，因此这里就进行版本固定啦
          node-version: '12'

      - run: npm install
      - run: npm run build
      - run: npm run docs:build

      - name: Deploy
        # 用于发布静态站点资源
        # actions-gh-pages action: https://github.com/peaceiris/actions-gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          # GTIHUB_TOKEN：https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token
          # Github 会在 workflow 中自动生成 GIHUBT_TOKEN，用于认证 workflow 的运行
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # 静态资源目录设置
          publish_dir: ./docs/.vuepress/dist
          # 默认发布到 gh-pages 分支上，可以指定特定的发布分支
          publish_branch: gh-pages1 # default: gh-pages
          full_commit_message: ${{ github.event.head_commit.message }}
    #
    # timeout-minutes: 一个 job 执行的最大时间，默认是 6h，如果超过时间则取消执行
    #
    # strategy.matrix: 例如指定当前 job 的 node 版本列表、操作系统类型列表等
    # strategy.fail-fast
    # strategy.max-parallel
    # continue-on-error:  一旦当前 job 执行失败，那么 workflow 停止执行。设置为 true 可以跳过当前 job 执行
    # container: Docker 容器配置，包括 image、env、ports、volumes、options 等配置
    #
    # services: 使用 Docker 容器 Action 或者 服务 Action 必须使用 Linux 环境运行
```

### 2021-09-08

#### git 提交规范[cz 工具]

##### Git 提交说明可分为三个部分：`<Header> <Body> <Footer>`

- `<Header>`: 包含`<type>(<scope>): <subject>`，分别是：

  - type：提交性质。如 feat、fix 等
  - scope：commit 的影响范围，依据功能或者组件库划分
  - subject：commit 内容的简述

- `<Body>`: commit 的内容

- `<Footer>`: 如果代码的提交是[不兼容变更]或[关闭缺陷]，Footer 是必需的，否则可以省略。
  - 关闭 issues： # + issues 的编号
  - 当前代码与上一个版本不兼容，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由和迁移方法。

##### 规范提交说明：使用 npm install -g commitizen（后使用 git cz 即可）

使用 commitizen 生成符合 AngularJS 规范的提交说明：cz-conventional-changelog

1、commitizen init cz-conventional-changelog --save --save-exact

2、package.json 中新增 config.commitizen 字段信息，主要用于配置 cz 工具的适配器路径

```js
"devDependencies": {
 "cz-conventional-changelog": "^2.1.0"
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

3、使用 git cz 代替 git commit 进行提交说明。会在执行后命令行提示选择`<Header>`

使用自定义规范配置：npm install cz-customizable --save-dev

1、将之前符合 Angular 规范的 cz-conventional-changelog 适配器路径改成 cz-customizable 适配器路径：

```json
"devDependencies": {
  "cz-customizable": "^5.3.0"
},
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

2、增加 [.cz-config.js] 文件配置自定义规范。参考：https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js

##### 校验工具 commitlint，Commitizen 提交校验（git commit -m '测试提交内容'）

校验提交说明是否符合规范

1、npm install --save-dev @commitlint/cli

2、npm install --save-dev @commitlint/config-conventional

3、新建[commitlint.config.js]文件并设置校验规则

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

4、安装 husky(哈士奇)：npm install husky --save-dev

```json
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

##### Commitizen 日志

使用了 cz 工具集，配套 conventional-changelog 可以快速生成开发日志:

1、npm install conventional-changelog -D

2、package.json 修改："version": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"

3、执行 npm run version 后可查看生产的日志 CHANGELOG.md

资料： - [commit 提交](https://juejin.cn/post/6844903831893966856#heading-14)

#### ESLint 配置。代码格式规则 和 质量规则

1、安装：npm i --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

2、新建 .eslintrc.js 配置文件

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 使用 ESLint 解析 TypeScript 语法
  plugins: ['@typescript-eslint'], // 在 ESLint 中加载插件 @typescript-eslint/eslint-plugin，该插件可用于配置 TypeScript 校验规则
  // 在 ESLint 中使用共享规则配置，其中 eslint:recommended 是 ESLint 内置的推荐校验规则配置（也被称作最佳规则实践），plugin:@typescript-eslint/recommended 是类似于 eslint:recommended 的 TypeScript 推荐校验规则配置
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended']
}
```

3、package.josn 设置：

```json
"scripts": {
  "lint": "eslint src",
}
```

4、测试在 src 下是否有书写错误的语法：npm run lint 会输入错误信息。 >eslint src...

5、ESLint 插件代码的实时提示，不需要执行 npm run lint

6、防止不需要被校验的文件出现校验信息，可以通过 .eslintignore 文件进行配置

7、ESLint 确保构建。

- 在构建打包前进行 ESLint 校验能够确保构建时无任何错误信息，一旦 ESLint 校验不通过则不允许进行源码的构建操作。

- 在构建时进行校验的严格控制，一旦 lint 抛出 warning 或者 error 则立马终止构建

```json
// 需要注意 Shell 中的 && 和 & 是有差异的，&& 主要用于继发执行，只有前一个任务执行成功，才会执行下一个任务，& 主要用于并发执行，表示两个脚本同时执行。这里构建的命令需要等待 lint 命令执行通过才能进行，一旦 lint 失败那么构建命令将不再执行。
// bash教程：https://wangdoc.com/bash/
// c语言教程：https://wangdoc.com/clang/
// ssh：http://wangdoc.com/ssh
"scripts": {
  "lint": "eslint src --max-warnings 0",
  "build": "npm run lint && rimraf dist types && gulp",
}
```

8、开发者手册！！！：https://www.ruanyifeng.com/blog/developer/

#### Prettier 代码格式规则

1、安装：npm i prettier eslint-config-prettier --save-dev。（eslint-config-prettier，用于解决 ESLint 和 Prettier 配合使用时容易产生的格式规则冲突问题）

2、使用：--write 参数类似于 ESLint 中的 --fix（在 ESLint 中使用该参数还是需要谨慎哈，建议还是使用 VS Code 的 Save Auto Fix 功能），主要用于自动修复格式错误

```json
"scripts": {
  "prettier": "prettier src test --write",
},
```

3、使用 npm run prettier 代码格式修复

4、Prettier 插件。VS Code 的 Prettier - Code formatter 插件进行 Save Auto Fix

#### Lint Staged

##### Lint Staged 背景

在 Git Commit Message 中使用了 commitlint 工具配合 husky 可以防止生成不规范的 Git Commit Message，从而阻止用户进行不规范的 Git 代码提交，其原理就是监听了 Git Hook 的执行脚本（会在特定的 Git 执行命令诸如 commit、push、merge 等触发之前或之后执行相应的脚本钩子）。Git Hook 其实是进行项目约束非常好用的工具，它的作用包括但不限于：

- Git Commit Message 规范强制统一
- ESLint 规则统一，防止不符合规范的代码提交
- Prettier 自动格式化（类似的还包括 Style 样式格式等）
- 代码稳定性提交，提交之前确保测试用例全部通过
- 发送邮件通知
- CI 集成（服务端钩子）

git 钩子：Git 中 pre 系列钩子允许终止即将发生的 Git 操作，而 post 系列往往用作通知行为。

Git Hook 的钩子非常多，但是在客户端中可能常用的钩子是以下两个：

- pre-commit：pre-commit 钩子在键入提交信息（运行 git commit 或 git cz）前运行，主要用于检查当前即将被提交的代码快照，例如提交遗漏、测试用例以及代码等。该钩子如果以非零值退出则 Git 将放弃本次提交。当然你也可以通过配置命令行参数 git commit --no-verify 绕过钩子的运行。

- commit-msg：该钩子在用户输入 Commit Message 后被调用，接收存有当前 Commit Message 信息的临时文件路径作为唯一参数，因此可以利用该钩子来核对 Commit Meesage 信息（在 Git Commit Message 中使用了该钩子对提交信息进行了是否符合 Angular 规范的校验）。该钩子和 pre-commit 类似，一旦以非零值退出 Git 将放弃本次提交。

##### Lint Staged 配置

lint 的是已经放入 Git Stage 暂存区中的代码，ed 在英文中表明已经做过，减少代码的检测量。

lint-staged 可以在用户提交代码之前（生成 Git Commit Message 信息之前）使用 ESLint 检查 Git 暂存区中的代码信息（git add 之后的修改代码），一旦存在 💩 一样不符合校验规则的代码，则可以终止提交行为。需要注意的是 lint-staged 不会检查项目的全量代码（全量使用 ESLint 校验对于较大的项目可能会是一个相对耗时的过程），而只会检查添加到 Git 暂存区中的代码。根据官方文档执行以下命令自动生成配置项信息：

1、安装：npx mrm lint-staged

2、默认生成的配置文件是针对 JavaScript 环境的，手动修改 package.json 中的配置信息进行 TypeScript 适配：

```json
// 我们的哈士奇再次上场，这次它是要咬着你的 ESLint 不放了，这里我简称它的动作为 "咬 💩" ~~~
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    //
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
},
"lint-staged": {
  // 这里需要注意 ESLint 脚本的 --max-warnings 0
  // 否则就算存在 warning 也不会终止提交行为
  // 这里追加了 Prettier 的自动格式化，确保代码提交之前所有的格式能够修复
  "*.ts": ["npm run lint", "npm run prettier"]
}

// 即
"scripts": {
  // --max-warnings 0
  "lint": "eslint src --max-warnings 0",
}
```

3、husky 在 package.json 中配置了 pre-commit 和 commit-msg 两个 Git 钩子，优先使用 pre-commit 钩子执行 ESLint 校验，如果校验失败则终止运行。如果校验成功则会继续执行 commit-msg 校验 Git Commit Message

#### Npm Script Hook

1、github 开源项目：package.json 中的 main、bin、files、script

```json
// 脚本命令
"lint": "eslint src test --max-warnings 0",
"test": "jest --bail --coverage",
"build": "npm run lint && npm run prettier && npm run test && rimraf dist types && gulp",
"changelog": "rimraf CHANGELOG.md && conventional-changelog -p angular -i CHANGELOG.md -s"
```

2、build 脚本命令过于复杂，通过 npm 的脚本钩子 pre 和 post 将脚本的功能区分开，从而使脚本的语义更加清晰

之后执行 npm run build 命令时事实上类似于执行了：npm run prebuild && npm run build

```json
"lint": "eslint src test --max-warnings 0",
"test": "jest --bail --coverage",
"prebuild": "npm run lint && npm run prettier && npm run test",
"build": "rimraf dist types && gulp",
"changelog": "rimraf CHANGELOG.md && conventional-changelog -p angular -i CHANGELOG.md -s"
```

3、npm 除了指定一些特殊的脚本钩子以外（例如 prepublish、postpublish、preinstall、postinstall 等），还可以对任意脚本增加 pre 和 post 钩子。

#### 文章

- ts 项目：https://juejin.cn/post/6856410900577026061（）

- 打包工具：rollup（组件动态加载，构建 [ES Module]（https://github.com/rollup/rollup/wiki/ES6-modules） 的特性）、webpack、vite。

- 互联网广告： https://www.huxiu.com/article/363114.html

  - 落地页
  - 商业化

- 人生 github： https://liferestart.syaro.io/view/index.html 【https://github.com/VickScarlet/lifeRestart】

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
