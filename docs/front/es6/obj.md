# es6对象

1.ES6 允许直接写入变量和函数，作为对象的属性和方法
let birth = '2000/01/01';
const Person = {
  name: '张三',
  //等同于birth: birth
  birth,    /////简洁法
  // 等同于hello: function ()...
  hello() { console.log('我的名字是', this.name); }
};
2.JavaScript 定义对象的属性，有两种方法。
一
obj.foo = true;
二
obj['a' + 'bc'] = 123;

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。（属性名表达式与简洁表示法，不能同时使用，会报错）
如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。
var obj = {
  foo: true,
  abc: 123
};
ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名（表达式还可以用于定义方法名。），即把表达式放在方括号内。
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
3.方法的 name 属性
函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。方法的name属性返回函数名（即方法名）。
如果对象的方法使用了取值函数（getter）和存值函数（setter），则name属性不是在该方法上面，而是该方法的属性的描述对象的get和set属性上面，返回值是方法名前加上get和set。
如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
4.属性的可枚举性和遍历
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor方法可以获取该属性的描述对象。
    configurable:false,//能否使用delete、能否需改属性特性、或能否修改访问器属性、，false为不可重新定义，默认值为true
    enumerable:false,//对象属性是否可通过for-in循环，flase为不可循环，默认值为true
    writable:false,//对象属性是否可修改,flase为不可修改，默认值为true
    value:'xiaoming' //对象属性的默认值，默认值为undefined
有四个操作会忽略enumerable为false的属性。
for...in循环：只遍历对象自身的和继承的可枚举的属性。es5
Object.keys()：返回对象自身的所有可枚举的属性的键名。es5
JSON.stringify()：只串行化对象自身的可枚举的属性。es5
Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。es6
ES6 规定，所有 Class 的原型的方法都是不可枚举的。
总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。

属性的遍历
ES6 一共有 5 种方法可以遍历对象的属性。
（1）for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
（2）Object.keys(obj)
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
（3）Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
（4）Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
（5）Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。
首先遍历所有数值键，按照数值升序排列。
其次遍历所有字符串键，按照加入时间升序排列。
最后遍历所有 Symbol 键，按照加入时间升序排列。
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]

上面代码中，Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。
super 关键字
我们知道，this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象。
super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。
JavaScript 引擎内部，super.foo等同于Object.getPrototypeOf(this).foo（属性）或Object.getPrototypeOf(this).foo.call(this)（方法）
对象的扩展运算符
对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。
(解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
解构赋值必须是最后一个参数，否则会报错。
解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
扩展运算符的解构赋值，不能复制继承自原型对象的属性。)
const o = Object.create({ x: 1, y: 2 });
o.z = 3;
let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，
ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，所以上面代码引入了中间变量newObj，如果写成下面这样会报错。
let { x, ...{ y, z } } = o;
对象的方法
1.
ES5 比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。
Object.is它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。（不同之处只有两个：一是+0不等于-0，二是NaN等于自身。）
2.
Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

Object.assign方法的第一个参数是目标对象，后面的参数都是源对象。（Object.assign(target, source1, source2);）
（注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

如果只有一个参数，Object.assign会直接返回该参数。

如果该参数不是对象，则会先转成对象，然后返回。

由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。）
如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。这意味着，如果undefined和null不在首参数，就不会报错。其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。
Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。属性名为 Symbol 值的属性，也会被Object.assign拷贝。（Object.assign方法实行的是浅拷贝，而不是深拷贝。）对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。
一些函数库提供Object.assign的定制版本（比如 Lodash 的_.defaultsDeep方法），可以得到深拷贝的合并。
Object.assign可以用来处理数组，但是会把数组视为对象。
Object.assign只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制。
3.
object.assign的应用
克隆对象
function clone(origin) {
  return Object.assign({}, origin);
}

将原始对象拷贝到一个空对象，就得到了原始对象的克隆。
采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
合并多个对象
将多个对象合并到某个对象。
const merge =
  (target, ...sources) => Object.assign(target, ...sources);

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。
const merge =
  (...sources) => Object.assign({}, ...sources);
为属性指定默认值
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}

上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则options的属性值会覆盖DEFAULTS的属性值。
4.
ES5 的Object.getOwnPropertyDescriptor()方法会返回某个对象属性的描述对象（descriptor）。ES2017 引入了Object.getOwnPropertyDescriptors()方法，返回指定对象所有自身属性（非继承属性）的描述对象。（该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。）
Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。（Object.getOwnPropertyDescriptors()方法配合Object.defineProperties()方法，就可以实现正确拷贝。）
5.
Object.getOwnPropertyDescriptors()方法可以实现一个对象继承另一个对象。
以前，继承另一个对象:
const obj = {
  __proto__: prot,
  foo: 123,
};
有了Object.getOwnPropertyDescriptors()，
const obj = Object.create(
  prot,
  Object.getOwnPropertyDescriptors({
    foo: 123,
  })
);
6.Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。
Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。(由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。)
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);
proto.y = 20;
proto.z = 40;
obj.x // 10
obj.y // 20
obj.z // 40
Object.setPrototypeOf方法用于读取一个对象的原型对象。
Object.getPrototypeOf(obj);