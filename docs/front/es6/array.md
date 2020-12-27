# es6 array

1.扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。
只有函数调用时，扩展运算符才可以放在圆括号中。
由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。
ES5 写法中，push方法的参数不能是数组，有了扩展运算符，就可以直接将数组传入push方法。
扩展运算符的应用
（1）复制数组，数组是复合的数据类型，直接复制的话，只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。改变时原数组复制的数组都会变
ES5 只能用变通方法来复制数组。
const a1 = [1, 2];
const a2 = a1.concat();
扩展运算符提供了复制数组的简便写法。
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;
（2）合并数组
扩展运算符提供了数组合并的新写法。
const arr1 = ['a', 'b'];
const arr2 = ['c'];
const arr3 = ['d', 'e'];
// ES5 的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]
// ES6 的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

不过，这两种方法都是浅拷贝（如果修改了原数组的成员，会同步反映到新数组。），使用的时候需要注意。
（3）与解构赋值结合
扩展运算符可以与解构赋值结合起来，用于生成数组。
如果将扩展运算符用于数组赋值，只能放在参数的最后一位
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
（4）字符串
扩展运算符还可以将字符串转为真正的数组。
[...'hello']
// [ "h", "e", "l", "l", "o" ]
扩展运算符内部调用的是数据结构的 Iterator 接口，因此只要具有 Iterator 接口的对象，都可以使用扩展运算符，比如 Map 结构。
Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。
Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);
如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
Array.from()可以将各种值转为真正的数组，并且还提供map功能。这实际上意味着，只要有一个原始的数据结构，你就可以先对它的值进行处理，然后转成规范的数组结构，进而就可以使用数量众多的数组方法。
Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
Array.of()
Array.of方法用于将一组值，转换为数组。
这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

上面代码中，Array方法没有参数、一个参数、三个参数时，返回结果都不一样。只有当参数个数不少于 2 个时，Array()才会返回由参数组成的新数组。参数个数只有一个时，实际上是指定数组的长度。
Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]

Array.of总是返回参数值组成的数组。如果没有参数，就返回一个空数组。
Array.of方法可以用下面的代码模拟实现。
function ArrayOf(){
  return [].slice.call(arguments);
}
数组实例的 copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
Array.prototype.copyWithin(target, start = 0, end = this.length)

它接受三个参数。
target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
这三个参数都应该是数值，如果不是，会自动转为数值。
数组实例的 find() 和 findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。接受三个参数，依次为当前的值、当前的位置和原数组。
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。
数组实例的 fill()
fill方法使用给定值，填充一个数组。
['a', 'b', 'c'].fill(7)
// [7, 7, 7]
fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置
数组实例的 entries()，keys() 和 values()
ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是
keys()是对键名的遍历、(Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。)
values()是对键值的遍历，
(Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
Object.values会过滤属性名为 Symbol 值的属性。
如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组)
entries()是对键值对的遍历。
(Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
Object.entries方法的另一个用处是，将对象转为真正的Map结构。)
Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
数组实例的 includes()
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016 引入了该方法。(该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始)
Map 和 Set 数据结构有一个has方法，需要注意与includes区分。
Map 结构的has方法，是用来查找键名的，比如Map.prototype.has(key)、WeakMap.prototype.has(key)、Reflect.has(target, propertyKey)。
Set 结构的has方法，是用来查找值的，比如Set.prototype.has(value)、WeakSet.prototype.has(value)。
数组实例的 flat()，flatMap()
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。(flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。)如果原数组有空位，flat()方法会跳过空位。
flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。(flatMap()只能展开一层数组。)
数组的空位
数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
ES5 对空位的处理:
forEach(), filter(), reduce(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
ES6 对空位的处理:ES6 则是明确将空位转为undefined。
Array.from方法会将数组的空位，转为undefined
扩展运算符（...）也会将空位转为undefined。
copyWithin()会连空位一起拷贝。
fill()会将空位视为正常的数组位置。

for...of循环也会遍历空位。
entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。