# es6

## let 和 const 命令

let：
1、块儿级作用域【let实际上为 JavaScript 新增了块级作用域。】【{}代表块儿级】
【块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了】
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());
for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。如下：
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
2、不存在变量提升。【变量提升：变量可以在声明之前使用，值为undefined】
let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
3、暂时性死区【temporal dead zone，简称 TDZ】
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。如下：
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
4、“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。【在没有let之前，typeof运算符是百分之百安全的，永远不会报错】
5、let不允许在相同作用域内，重复声明同一个变量。
const：
1、const声明一个只读的常量。一旦声明，常量的值就不能改变。【改变常量的值会报错】
2、同样有：块儿级作用域，不存在变量提升，暂时性死区，不可重复声明特性。
3、const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
【对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。】
【对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。】
4、如果真的想将对象冻结，应该使用Object.freeze方法。
const foo = Object.freeze({});
// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
ES6 一共有 6 种声明变量的方法：
var命令、function命令、let命令、const命令、import命令、class命令
顶层对象的属性：
1、在浏览器环境指的是window对象，在 Node 指的是global对象。
2、ES5 之中，顶层对象的属性与全局变量是等价的。
3、顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
：没法在编译时就报出变量未声明的错误
：顶层对象的属性是到处可以读写的，这非常不利于模块化编程
4、从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩
：为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；
：let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性；
var a = 1;
window.a // 1

let b = 1;
window.b // undefined
globalThis 对象：
1、JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。
2、顶层对象在各种实现里面是不统一的
：浏览器【顶层对象是window，但 Node 和 Web Worker 没有window】
：浏览器和 Web Worker 【self也指向顶层对象，但是 Node 没有self】
：Node【顶层对象是global，但其他环境都不支持】
3、同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this变量，但是有局限性。
：全局环境中【this会返回顶层对象、Node.js 模块中this返回的是当前模块、ES6 模块中this返回的是undefined】
：函数里面的this【函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象】
4、取到顶层对象。下面是两种勉强可以使用的方法：
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);
// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
globalThis：
ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。
垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis。

## 解构赋值

1、数组的解构赋值
“模式匹配”【等号两边的模式相同，左边的变量就会被赋予对应的值】： let [a, b, c] = [1, 2, 3];（解构不成功，变量的值就等于undefined）
“不完全解构”【等号左边的模式，只匹配一部分的等号右边的数组】：let [x, y] = [1, 2, 3]; 解构依然可以成功
等号的右边不是数组（或者严格地说，不是可遍历的结构，即《Iterator》），那么将会报错。
Set 结构，也可以使用数组的解构赋值。
只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
Generator【next()方法，done返回值】 函数也可以。
2、对象的解构赋值
3、字符串的解构赋值
4、数值布尔值的解构赋值
5、函数参数的解构赋值
6、圆括号的解构赋值
7、用途

## Iterator，for...of

一、Iterator（遍历器）的概念
JavaScript 原有的表示“集合”的数据结构【Array，Object】，ES6增加【Map，Set】
有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构。
这样就需要一种统一的接口机制，来处理所有不同的数据结构。
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
作用1: 为各种数据结构，提供一个统一的、简便的访问接口
作用2: 使得数据结构的成员能够按某种次序排列
作用3: ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。
二、Iterator（遍历器）遍历过程【next()方法，移动指针】
创建一个指针对象，指向当前数据结构的起始位置
第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
第二次调用指针对象的next方法，指针就指向数据结构的第二个成员
不断调用指针对象的方法，直到它指向数据结构的结束位置。
每一次调用next方法：it.next()返回{ value: "a", done: false }
value是当前成员的值，done属性是布尔值，表示遍历是否结束。
三、默认 Iterator 接口
Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即循环。
使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口
一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）
 Symbol.iterator属性：是一个函数，就是当前数据结构默认的遍历器生成函数
执行这个函数，就会返回一个遍历器
属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值。
有了遍历器接口，数据结构就可以用for...of循环遍历，也可以使用while循环遍历。
 yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
四、数据结构原生具备 Iterator 接口
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
🌰栗子：如下：看到数组的Symbol.iterator属性，是一个函数，arr[Symbol.iterator]();执行这个属性，返回一个遍历器对象，iter，调用其next()方法即可。



五、调用 Iterator 接口的场合
解构赋值
扩展运算符
yield*
由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口
for...of
Array.from()
Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
Promise.all()
Promise.race()
六、遍历器对象的 return()，throw()方法
 return()：
如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。
一个对象在完成遍历前，需要清理或释放资源，就可以部署return()方法
return必须返回一个对象。
2. throw()：
throw()方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法
六、for。。。of方法
ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。
一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。
 for...in循环读取键名，for...of循环读取键值。数组的遍历器接口只返回具有数字索引的属性
2.并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组
3.对于字符串来说，for...of循环还有一个特点，就是会正确识别 32 位 UTF-16 字符
4.普通对象for of无法使用。
七、与其他遍历语法的比较
for循环写法比较麻烦
for each无法break，return
for in顺序不定，
for of没有for in缺点，还可与break、continue和return配合使用

## generator函数

一、generator（生成器）是ES6标准引入的新的数据类型
函数在执行过程中，如果没有遇到return语句（函数末尾如果没有return，就是隐含的return undefined;），控制权无法交回被调用的代码。函数只能返回一次
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
二、generator基础
generator和函数不同的是，generator由function*定义（注意多出的*号），并且，除了return语句，还可以用yield返回多次。
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}
fib(5);
直接调用一个generator和调用函数不一样，fib(5)仅仅是创建了一个generator对象，还没有去执行它。
不断地调用generator对象的next()方法：
next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”
value就是yield的返回值，done表示这个generator是否已经执行结束了
done为true，则value就是return的返回值。
for ... of循环迭代generator对象，这种方式不需要我们自己判断done
三、generator作用
generator可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数
generator就可以实现需要用面向对象才能实现的功能
把异步回调代码变成“同步”代码
四、Generator 函数
Generator 函数是一个状态机，封装了多个内部状态
执行 Generator 函数会返回一个遍历器对象
依次遍历 Generator 函数内部的每一个状态
Generator 函数是一个普通函数，但是有两个特征：
 function关键字与函数名之间有一个星号；
函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）
调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）
必须调用遍历器对象的next方法，使得指针移向下一个状态。
直到遇到下一个yield表达式（或return语句）为止
Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。


五、yield 表达式
遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式。
如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
如果该函数没有return语句，则返回的对象的value属性值为undefined。
 yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数。
 yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
 yield表达式如果用在另一个表达式之中，必须放在圆括号里面。【console.log('Hello' + (yield 123)); // OK】
四、next 方法的参数

### ES6基础

- [ES6基础](es6/base.md)

### ES6（set，map，symbol）

- [set，map，symbol](es6/setMapSymbol.md)

### promise

- [promise](es6/promise.md)

### ES6数组

- [ES6数组](es6/array.md)

### 数据类型Map

- [数据类型Map](es6/map.md)

### ES6对象

- [ES6对象](es6/obj.md)

### ES6函数

- [ES6函数](es6/function.md)

待续。。。