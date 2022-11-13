(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{317:function(e,a,t){"use strict";t.r(a);var n=t(13),s=Object(n.a)({},(function(){var e=this._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[e("h1",{attrs:{id:"数据类型map"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据类型map"}},[this._v("#")]),this._v(" 数据类型Map")]),this._v(" "),e("p",[this._v("一.Map\n是一个键值对的集合，很像 Object。但主要的区别是，Map 允许所有数据类型作为键.(不像普通对象，键并没有被转化为字符串。任何类型的键都是可以的。)\n主要的方法包括：\nnew Map() – 创建 map。\nmap.set(key, value) – 根据键（key）存储值（value）。\nmap.get(key) – 根据键返回值，如果 map 中该键不存在，返回 undefined。\nmap.has(key) – 如果键存在，返回 true，否则返回 false。\nmap.delete(key) – 移除该键的值。\nmap.clear() – 清空 map\nmap.size – 返回当前元素个数\n1.可以使用对象作为键\n为了检测值是否相等，Map 使用了算法 SameValueZero。它大概就和严格等于号 === 相同，但区别是 NaN 等于 NaN。所以 NaN 也可以作为键。\n2.set:每次 map.set 的调用将会返回 map 自身，所以可以链式调用.\n如：map.set('1', 'str1').set(1, 'num1').set(true, 'bool1');\n3.内建方法 Object.entries(obj)，它可以返回一个对象的键值对数组，所以可以用一个对象来初始化一个 map\n如：let map = new Map(Object.entries({name: \"John\",age: 30}));\n4.遍历Map:\n有三种方法可以循环遍历 map：\nmap.keys() – 返回键的迭代器，\nfor(let jian of Map.keys){}\nmap.values() – 返回值的迭代器，\nfor(let zhi of Map.values){}\nmap.entries() – 返回 [key, value] 迭代器入口,for..of 循环会默认使用它。\nfor(let jianzhi dui of Map){}\n注意1：和普通 Object 不同，迭代器的迭代顺序和值被插入的顺序一致，Map 会保留这个顺序。\n注意2：Map 有一个内建的 forEach 方法，和array很像。Map.forEach(value, key, map){};\n二.Set\n是一个值的集合，这个集合中所有的值仅出现一次。\n主要方法包括：\nnew Set(iterable) – 创建 set，利用数组来创建是可选的（任何可迭代对象都可以）。\nset.add(value) – 添加值，返回 set 自身。\nset.delete(value) – 删除值，如果该 value 在调用方法的时候存在则返回 true ，否则返回 false。\nset.has(value) – 如果 set 中存在该值则返回 true ，否则返回 false。\nset.clear() – 清空 set。\nset.size – 元素个数。\n1.可以使用 for..of 或者 forEach 来循环查看 set。\n如：\nfor (let value of set)\nSet.forEach(value, value, map){};\n2.遍历Map:\n有三种方法可以循环遍历 set：\nset.keys() – 返回键的迭代器，\nfor(let zhi of set.keys){}\nmap.values() – 返回值的迭代器，\nfor(let zhi of set.values){}\nmap.entries() – 返回 [key, value] 迭代器入口,for..of 循环会默认使用它。\nfor(let jianzhi dui of set){}\n注意：返回形如 [value, value] 的迭代对象，为了兼容 Map 而存在。形式而已。\n三。WeakSet /WeakMap\n对于正常的Map，Set：\n在一个正常 Map 中，我们将某对象存储为键还是值并不重要。它将会被一直保留在内存中，就算已经没有指向它的引用。还可以通过 map.keys() 得到它。\n而对于 WeakMap/WeakSet  不会阻止内存移除对象。\nWeakSet /WeakMap 是一种特殊的 Set/ Map，它不会阻止 JavaScript 将它的元素从内存中移除。\n他俩的方法：\nweakMap/.get(key)\nweakMap/.set(key, value)\nweakMap/.delete(key, value)\nweakMap/.has(key)\n如：区别一：WeakMap/WeakSet的键必须是对象，而Map/Set的键可以是基础类型。\n区别二：WeakMap/WeakSet并不支持方法 keys()，values()，entries()，我们不能对它进行迭代。所以没有办法获取它的所有键值。\n四。对象的键值项\n上面说的map.keys()，map.value()，map.entries()，纯对象也支持，但是稍有差异。\n对于纯对象，下列方法是可用的：\nObject.keys(obj) —— 返回一个包含该对象全部的键的数组。\nObject.values(obj) —— 返回一个包含该对象全部的值的数组。\nObject.entries(obj) —— 返回一个包含该对象全部 [key, value] 键值对的数组\n第一个区别：是在对象中我们的调用语法是 Object.keys(obj)，而不是 obj.keys()\n原因：在 JavaScript 中对象是所有复杂数据结构的基础。所以我们可能有一个我们自己创建的对象，比如 orderobj，它实现了自己的方法 orderobj.values()。同时，我们依然可以对它调用 Object.values(orderobj) 方法.\n第二个区别：Object.* 方法返回的是「真正的」数组对象，而不是可迭代项。\n注：Object.keys/values/entries 忽略 Symbol 类型的属性\n解决：想要获得 Symbol 类型的键，有另外不同的方法 Object.getOwnPropertySymbols， 它会返回一个只包含 Symbol 类型的键的数组。同样，Reflect.ownKeys(obj) 方法会返回「所有」键。")])])}),[],!1,null,null,null);a.default=s.exports}}]);