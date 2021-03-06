# es6基础

1.let
let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
for循环有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined。
let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。如果一个变量根本没有被声明，使用typeof反而不会报错，会显示undefined
总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
2.let
let不允许在相同作用域内，重复声明同一个变量。
因此，不能在函数内部重新声明参数。
ES5 只有全局作用域和函数作用域，没有块级作用域
let实际上为 JavaScript 新增了块级作用域。
ES6 允许块级作用域的任意嵌套。每一层都是一个单独的作用域。内层作用域可以定义外层作用域的同名变量。
块级作用域的出现，实际上使得获得广泛应用的立即执行函数表达式（IIFE）不再必要了
// IIFE 写法
(function () {
  var tmp = ...;
  ...
}());
// 块级作用域写法
{
  let tmp = ...;
  ...
}
// 块级作用域内部，优先使用函数表达式ES6 的块级作用域必须有大括号，
{
  let a = 'secret';
  let f = function () {
    return a;
  };
}
3.const
const声明一个只读的常量。一旦声明，常量的值就不能改变。const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
const的作用域与let命令相同：只在声明所在的块级作用域内有效。
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
const声明的常量，也与let一样不可重复声明。
将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数。
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};
ES6 声明变量的六种方法
ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有 6 种声明变量的方法。
顶层对象的属性
顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。
var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。
浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
Node 里面，顶层对象是global，但其他环境都不支持。
取到顶层对象。下面是两种勉强可以使用的方法。
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

现在有一个提案，在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。
垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis。
4.变量的解构赋值
数组的解构赋值：
1.解构赋值相当于匹配模式对应赋值，
结构不成功变量值为undefined，
不完全解构，等号左边模式只匹配一部分等号右边的数组，此时结构成功，
若等号右边不是数组，严格的说不是可遍历结构，会报错
解构赋值允许默认值，当一个数组成员严格等于===undefined时，默认值才生效。
如果默认值是表达式时，是惰性求值的，只有用到的时候才求值
默认值可以引用解构赋值的其他变量，但是该变量必须已经被声明，
对象的解构赋值：
对象解构时，变量必须与属性同名，才能取到正确的值，此时顺序不影响。
解构失败，值为undefined
对象解构可以取到继承的属性
也可指定默认值，生效的条件对象属性值严格等于===undefined
已声明的变量解构赋值会报错
字符串的解构赋值：
字符串被转换成一个类数组对象，且有length属性，也可对length解构赋值
数组布尔值的解构赋值：
等号右边的要是数值和布尔值，则会先转化为对象，再解构赋值，所以undefined和null无法转化为对象，所以对他们解构都会报错
函数参数的解构赋值：
也可使用默认值
解构赋值的用处：
1.交换变量的值
2.从函数返回多个值
3.函数参数的定义
4.提取json对象中数据
5.函数参数默认值
6.遍历map结构
7.输入模块的指定方法
5.扩展
1.字符串扩展
字符可用Unicode表示（放入大括号{}）
字符串可用for...of遍历，且for...of可识别Unicode码点
可直接输入字符串码点，或者转义的
JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
U+005C：反斜杠（reverse solidus)
U+000D：回车（carriage return）
U+2028：行分隔符（line separator）
U+2029：段分隔符（paragraph separator）
U+000A：换行符（line feed）
JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符），为了消除这个报错，ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）。
模板字符串：使用反引号
模板字符串包含反引号时需要\转义
模板字符串的空格缩进都会保留，若想消除使用trim（）消除
模板字符串嵌入变量使用${}，变量没有声明时报错，{}内可放表达式，可进行运算，以及引用对象属性，还可调用函数，若{}内是字符串则原样输出，模板字符串可以嵌套
2.字符串新增方法
2.1ES6 提供了String.fromCodePoint()方法，可以识别大于0xFFFF的字符
2.2ES6 还为原生的 String 对象，提供了一个raw()方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法
2.3ES6 提供了codePointAt()方法，能够正确处理 4 个字节储存的字符，返回一个字符的码点。
2.4传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
这三个方法都支持第二个参数，表示开始搜索的位置。
2.5repeat方法返回一个新字符串，表示将原字符串重复n次。参数如果是小数，会被取整,2.9也取2，如果repeat的参数是负数或者Infinity，会报错。
但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0，参数NaN等同于 0，如果repeat的参数是字符串，则会先转换成数字
2.6ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。padStart()和padEnd()一共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。如果省略第二个参数，默认使用空格补全长度。padStart()的常见用途是为数值补全指定位数。另一个用途是提示字符串格式。'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
2.7ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们返回的都是新字符串，不会修改原始字符串。除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。浏览器还部署了额外的两个方法，trimLeft()是trimStart()的别名，trimRight()是trimEnd()的别名。
3.数值的扩展
1.ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
如果要将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
ES6 在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。如果参数类型不是数值，Number.isFinite一律返回false。Number.isNaN()用来检查一个值是否为NaN。如果参数类型不是NaN，Number.isNaN一律返回false。它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，Number.isFinite()对于非数值一律返回false, Number.isNaN()只有对于NaN才返回true，非NaN一律返回false。
2.ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。是逐步减少全局性方法，使得语言逐步模块化。
3.Number.isInteger()用来判断一个数值是否为整数。如果参数不是数值，Number.isInteger返回false。（JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。如果对数据精度的要求较高，不建议使用Number.isInteger()判断一个数值是否为整数。）
4.ES6 在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"
Number.EPSILON实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的。Number.EPSILON的实质是一个可以接受的最小误差范围。为浮点数运算，部署了一个误差检查函数。
5.JavaScript 能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。ES6 引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。（实际使用这个函数时，需要注意。验证运算结果是否落在安全整数的范围内，不要只验证运算结果，而要同时验证参与运算的每个值。）
Math新增的方法：
Math.trunc方法用于去除一个数的小数部分，返回整数部分
Math.sign方法用来判断一个数到底是正数、负数、还是零。
Math.cbrt方法用于计算一个数的立方根
Math.hypot方法返回所有参数的平方和的平方根。
Math.expm1(x)返回 ex - 1
Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)
Math.log10(x)返回以 10 为底的x的对数。
Math.log2(x)返回以 2 为底的x的对数。