# set，map，symbol

Symbol
1.ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。
Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
注意，Symbol函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的Symbol函数的返回值是不相等的。
Symbol 值不能与其他类型的值进行运算，会报错。
Symbol 值可以显式转为字符串。Symbol 值也可以转为布尔值，但是不能转为数值。
2.创建 Symbol 的时候，可以添加一个描述。（读取这个描述需要将 Symbol 显式转为字符串）
es2019提供了一个实例属性description，直接返回 Symbol 的描述。
const sym = Symbol('foo');
sym.description // "foo"
3.由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。(Symbol 值作为对象属性名时，不能用点运算符。)
在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
属性名的遍历
Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。(Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。)
另一个新的 API，Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
使用symbol：
有时，我们希望重新使用同一个 Symbol 值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
Set 和 Map 数据结构
ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成 Set 数据结构。（Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。）
应用：// 去除数组的重复成员
[...new Set(array)]

上面的方法也可以用于，去除字符串里面的重复字符。
[...new Set('ababbc')].join('')
// "abc"
向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。（在 Set 内部，两个NaN是相等。两个对象总是不相等的。）
Set 实例的属性和方法
Set 结构的实例有以下属性。
Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。
Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
add(value)：添加某个值，返回 Set 结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值。
Array.from方法可以将 Set 结构转为数组。这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
  return Array.from(new Set(array));
}
Set 结构的实例有四个遍历方法，可以用于遍历成员。
keys()：返回键名的遍历器
values()：返回键值的遍历器
entries()：返回键值对的遍历器
forEach()：使用回调函数遍历每个成员
需要特别指出的是，Set的遍历顺序就是插入顺序。
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
（这是因为垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失。）
WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。
WeakSet 结构有以下三个方法。（WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。但数组的成员只能是对象。）
WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
WeakSet 没有size属性，没有办法遍历它的成员。WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
MAp实例的属性和方法
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，（Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数。如果对同一个键多次赋值，后面的值将覆盖前面的值。）
    size属性返回 Map 结构的成员总数。
    set方法设置键名key对应的键值为value，然后返回整个 Map 结构。如果key已经有值，则键值会被更新，否则就新生成该键。set方法返回的是当前的Map对象，因此可以采用链式写法。
    get方法读取key对应的键值，如果找不到key，返回undefined。
    has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。
    delete方法删除某个键，返回true。如果删除失败，返回false
    clear方法清除所有成员，没有返回值。
Map 结构原生提供三个遍历器生成函数和一个遍历方法。
keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。
需要特别注意的是，Map 的遍历顺序就是插入顺序。
（1）Map 转为数组
前面已经提过，Map 转为数组最方便的方法，就是使用扩展运算符（...）。
（2）数组 转为 Map
将数组传入 Map 构造函数，就可以转为 Map。
（3）Map 转为对象
如果所有 Map 的键都是字符串，它可以无损地转为对象。
（4）对象转为 Map
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}
objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
（5）Map 转为 JSON
Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}
let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

（6）JSON 转为 Map
JSON 转为 Map，正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}
jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
WeakMap结构与Map结构类似，也是用于生成键值对的集合。
WeakMap与Map的区别有两点。
首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。