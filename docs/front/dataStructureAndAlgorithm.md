# 数据结构与算法

## 数据结构

分类：数组、字符串、列表、栈、队列、链表、字典、散列、集合、二叉树、图、等等

算法：树结构（先序、中序、后序遍历）；tree结构与list相互转化过滤查询等；图和图的算法；排序算法；检索算法（顺序查找、二分查找等）；动态规划；贪心算法等等

### 数组排序

- 简单使用 sort 方法的时候，是按位排序的
- 升降序
原则：
当返回值大于0时，a放在b的后面；
当返回值小于0时，a放在b的前面；
当返回值等于0时，ab位置不改变。

```js
var arr = [1, 22, 15, 32, 4, 5]
    arr.sort((a, b) => {return a - b}) // 升序排序 [1, 4, 5, 15, 22, 32]
    arr.sort((a, b) => {return b - a}) // 降序排序 [32, 22, 15, 5, 4, 1]
```

- a-b 或者 b-a其实是分情况讨论后的简写
- 原始写法

```js
var arr = [1, 22, 15, 32, 4, 5]
    arr.sort((a, b) => {
      if (a > b) return 1;
      else if (a < b) return -1;
      else return 0;
    }); // [1,4,5,15,22,32]
```

- 数组push(后面加) + 数组pop，(后面删返回被删的) = 栈【后进先出】【仅能在表尾进行插入或删除操作的线性】【一摞盘子是现实世界中常见的栈的例子】

- 数组unshift(前面加【和在数组的末尾添加元素比起来，在数组的开头添加元素更难。如果不利用数组提供的可 变函数，则新的元素添加进来后，需要把后面的每个元素都相应地向后移一个位置。】) + 数组shift(前面删【返回被删的】) = 队列【先进先出，后进后出】【表的队尾进行插入，而在队头删除元素】

### 数组操作

- 不生成新数组:foreach、some、every、reduce
- 生成新数组:map、filter

### 栈队列实例

- 栈：
    1、进制转换
    2、判断回文数
    3、递归

- 队列：
    1、基数排序

### 链表

1、数组的长度是固定的，所以当数组已被数据填满时，再要加入新的元素就会非常困难。
在数组中，添加和删 除元素也很麻烦，因为需要将数组中的其他元素向前或向后平移，以反映数组刚刚进行了 添加或删除操作。
2、数组优点【随机访问】
3、数组元素靠它们的位置进行引用，链表元素则是靠相互之间的关系进行引用
4、遍历链表，就是跟着 链接，从链表的首元素一直走到尾元素（但这不包含链表的头节点，头节点常常用来作为 链表的接入点），链表的尾元素指向一个 null 节点。
4、插入：链表中插入一个节点的效率很高。需要修改它前面的节点（前 驱），使其指向新加入的节点，而新加入的节点则指向原来前驱指向的节点。
5、删除：从链表中删除一个元素也很简单。将待删除元素的前驱节点指向待删除元素的后继节点，同时 将待删除元素指向 null，元素就删除成功了

### 字典，散列

1、字典
利用Object.keys可对字典像数组那样排序
2、散列
3、set

### 树

1、在二叉树上进行查找非常快、为二叉树添加或删除元素 也非常快
2、根节点、父节点、叶子节点
3、二叉树是一种特殊的树，它的子节点个数不超过两个
4、树的层次【树的深度】


### 对象相关操作

### tree结构

[BFS DFS](algorithm/tree.md)

### js其他相关


## 算法

### 算法理论基础概念

1.时间复杂度：用来度量算法的运行时间，是一个函数。【解决问题执行的时间，随着问题规模（数据量）的扩大，时间是怎么变化的】

常见有：

O(N)、O(log2N)、O(N2)、O(nlog2N)、O(N*K)、O(N+K)、

2.空间复杂度：用来度量算法的空间占用，是一个函数。【解决问题临时占用存储空间的大小，随着问题规模（数据量）的扩大，临时占用存储空间的大小是怎么变化的】

常见有：

O(1)、O(nlog2N)、O(N+K)、

3.稳定性

稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。

### 排序算法

十种常见排序算法可以分为两大类：

比较类排序：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此也称为非线性时间比较类排序。
非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。 

[十种常见排序算法](algorithm/排序算法.md)

[动态规划](algorithm/动态规划.md)

### JS树结构操作

[查找、遍历、筛选、树结构和列表结构相互转换](https://wintc.top/article/20)

待补充：leetcode刷题

### 动态规划

### 搜索算法

## 题目汇总

### 两数之和

给定 nums = [2, 7, 11, 15], target = 9

nums[0] + nums[1] = 2 + 7 = 9 , 返回 [0, 1]

```js
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const ele = nums[i];
    const result = target - ele;
    if (map.has(result)) {
      return [map.get(result), i]
    } else {
      map.set(ele, i)
    }
  }
  return [];
};
```

### 字符串转换整数

```js
/*
 * 示例 1:
 * 
 * 输入: "42"
 * 输出: 42
 * 
 * 
 * 示例 2:
 * 
 * 输入: "   -42"
 * 输出: -42
 * 解释: 第一个非空白字符为 '-', 它是一个负号。
 * 我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
 * 
 * 
 * 示例 3:
 * 
 * 输入: "4193 with words"
 * 输出: 4193
 * 解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
 * 
 * 
 * 示例 4:
 * 
 * 输入: "words and 987"
 * 输出: 0
 * 解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
 * ⁠    因此无法执行有效的转换。
 * 
 * 示例 5:
 * 
 * 输入: "-91283472332"
 * 输出: -2147483648
 * 解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
 * 因此返回 INT_MIN (−2^31) 。
 * 
 * 
 */
var myAtoi = function (str) {
  let num = parseInt(str, 10);
  if (isNaN(num)) return 0;
  if (num < Math.pow(-2, 31)) return Math.pow(-2, 31);
  if (num > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1;
  return num;
};
```

### 回文数

```js
var isPalindrome = function (x) {
  //暴力解题法：转字符串
  // return x.toString() == x.toString().split("").reverse().join("");
  if (x < 0 || (x % 10 == 0 && x != 0)) {
    return false;
  }

  let rev = 0;
  // ~~1.9;       // => 1
  // ~~-1.9;      // => -1
  while (rev < x) {
    rev = rev * 10 + x % 10;
    x = ~~(x / 10);
  }
  return (rev === x) || (~~(rev / 10) === x)
};
```

### 盛最多水的容器

```js
/*
 * 示例：
 * 
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 */
var maxArea = function (height) {
  if (!height || height.length <= 1) {
    return 0
  }
  let left = 0;
  let right = height.length - 1;
  let result = 0;
  while (left < right) {
    result = Math.max(result, (right - left) * (Math.min(height[left], height[right])));
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return result;
};
```

### 三数之和

```js
/*
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 * 
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 */
var threeSum = function (nums) {
  const result = [];
  nums.sort(function (a, b) {
    return a - b;
  })
  for (let i = 0; i < nums.length - 2; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      var start = i + 1;
      var end = nums.length - 1;
      while (start < end) {
        if (nums[i] + nums[start] + nums[end] === 0) {
          result.push([nums[i], nums[start], nums[end]]);
          start++;
          end--;
          while (start < end && nums[start] === nums[start - 1]) {
            start++
          }
          while (start < end && nums[end] === nums[end + 1]) {
            end--
          }
        } else if (nums[i] + nums[start] + nums[end] < 0) {
          start++
        } else {
          end--
        }
      }
    }
  }
  return result;
};
```

### 螺旋矩阵

```js
/*
 *
 * 给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。
 * 
 * 示例 1:
 * 
 * 输入:
 * [
 * ⁠[ 1, 2, 3 ],
 * ⁠[ 4, 5, 6 ],
 * ⁠[ 7, 8, 9 ]
 * ]
 * 输出: [1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例 2:
 * 
 * 输入:
 * [
 * ⁠ [1, 2, 3, 4],
 * ⁠ [5, 6, 7, 8],
 * ⁠ [9,10,11,12]
 * ]
 * 输出: [1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 
 */
 var spiralOrder = function (matrix) {
  var res = []
  var i = 0
  var j = 0
  var n = matrix.length - 1
  if (n < 0)
    return []
  var m = matrix[0].length - 1
  var turn = m == 0 ? 'd' : 'r'
  var boundl = 0
  var boundr = m
  var boundu = 0
  var boundd = n

  for (var a = 0; a < (m + 1) * (n + 1); a++) {
    res.push(matrix[i][j])
    if (turn == 'r') {
      j++
      if (j == boundr) {
        boundu++
        turn = 'd'
      }
    } else if (turn == 'd') {
      i++
      if (i == boundd) {
        boundr--
        turn = 'l'
      }
    } else if (turn == 'l') {
      j--
      if (j == boundl) {
        boundd--
        turn = 'u'
      }
    } else if (turn == 'u') {
      i--
      if (i == boundu) {
        boundl++
        turn = 'r'
      }
    }
  }
  return res
};
```
### 寻找峰值

```js
/*
* 
 * 示例 1:
 * 
 * 输入: nums = [1,2,3,1]
 * 输出: 2
 * 解释: 3 是峰值元素，你的函数应该返回其索引 2。
 * 
 * 示例 2:
 * 
 * 输入: nums = [1,2,1,3,5,6,4]
 * 输出: 1 或 5 
 * 解释: 你的函数可以返回索引 1，其峰值元素为 2；
 * 或者返回索引 5， 其峰值元素为 6。
 * 
 * 
 * 说明:
 * 
 * 你的解法应该是 O(logN) 时间复杂度的。
 * 
 */
 var findPeakElement = function(nums) {
  // for (let i = 0; i < nums.length - 1; i++) {
  //   if (nums[i] > nums[i+1]) {
  //     return i
  //   }
  // }
  // return nums.length - 1
  var left = 0, right = nums.length -1;
  while (left < right) {
    var mid = Math.floor((left + right) / 2)
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
};
```

### 将数组分成和相等的三个部分

```js
/*
 * 
 * 示例 1：
 * 
 * 输入：[0,2,1,-6,6,-7,9,1,2,0,1]
 * 输出：true
 * 解释：0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1
 * 
 * 
 * 示例 2：
 * 
 * 输入：[0,2,1,-6,6,7,9,-1,2,0,1]
 * 输出：false
 * 
 * 
 * 示例 3：
 * 
 * 输入：[3,3,6,5,-2,2,5,1,-9,4]
 * 输出：true
 * 解释：3 + 3 = 6 = 5 - 2 + 2 + 5 + 1 - 9 + 4
 * 
 * 
 /
 var canThreePartsEqualSum = function (A) {
  let sum = A.mySum(); // 数组的累加和
  if (sum % 3 !== 0) return false; // 不能被3整除，则return false
  let avgrage = parseInt(sum / 3); /* 每个部分应该累加的和 */
  let temp = 0; // 记录每部分的累加
  let count = 0; // 记录分成部分的个数
  for (let i = 0; i < A.length; i++) {
    temp += A[i];
    if (temp === avgrage) { // 累加和达到平均值，说明可分为一个部分
      temp = 0; // 重置为0，准备下一部分的累加
      count++;
      if (count === 2) {
        // count为2时，说明已经分好了两个部分
        // 如果第二个部分分好时，累加的最后一个数字刚好是数组A的最后一个数字，说明此数组只能分为两个部分，因此返回false
        // 如果累加的最后一个数字不是数组A的最后一个数字，那么不管后面还有多少个数字，它们的累加和一定等于平均值
        if (i === A.length - 1) {
          return false;
        }
        return true;
      }
    }
  }
  return false;
};
Array.prototype.mySum = function () {
  return this.reduce((a, b) => a + b, 0);
}
```

### 边界内所有质数和

```js
function sumPrime(num) {
    if (num < 2) {
        return 0;
    }

    let arr = Array(num + 1).fill(true)

    for (let index = 2; index < Math.sqrt(num); index++) {
        let j = i ** 2
        while (arr[i] == true && j <= num) {
            arr[j] = false
            j += i
        }
        console.log(arr.map((x, i) => { return x ? i : 0 }))
    }

    return arr.reduce((x, curr, i) => x + (curr ? index : 0), 0) - 1
}
sumPrime(100)
```

### 旋转矩阵

```js
// 示例 1:

// 给定 matrix = 
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],

// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]
// 示例 2:

// 给定 matrix =
// [
//   [ 5, 1, 9,11],
//   [ 2, 4, 8,10],
//   [13, 3, 6, 7],
//   [15,14,12,16]
// ], 

// 原地旋转输入矩阵，使其变为:
// [
//   [15,13, 2, 5],
//   [14, 3, 4, 1],
//   [12, 6, 8, 9],
//   [16, 7,10,11]
// ]
// 思路：先变147，258，369，，，再反转
var rotate = function (matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix[i].length; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  matrix.forEach(row => row.reverse())
};
```

### 质数筛

```js
function sumPrime(num) {
    if (num < 2) {
        return 0;
    }

    let arr = Array(num + 1).fill(true)

    for (let i = 2; i < Math.sqrt(num); i++) {
        let j = i ** 2
        while (arr[i] === true && j <= num) {
            arr[j] = false
            j += i
        }
    }

    return arr.reduce((x, curr, index) => x + (curr ? index : 0), 0) - 1
}

sumPrime(140)
console.log(sumPrime(140)) 
// 
function sumPrimeMe(num) {
    let res = 0
    for (let i = 2; i < num; i++) {
        if (isPrime(i)) {
            res += i
        }
    }
    return res
}
function isPrime(x) {
    for (let index = 2; index <= Math.sqrt(x); index++) {
        if (x % index == 0) {
            return false
        }
    }
    return true
}
sumPrimeMe(140)
console.log(sumPrimeMe(140)) 
```

### 拿硬币

```js
/**
 * 
 * 桌上有 n 堆力扣币，每堆的数量保存在数组 coins 中。我们每次可以选择任意一堆，拿走其中的一枚或者两枚，求拿完所有力扣币的最少次数。

示例 1：

输入：[4,2,1]

输出：4

解释：第一堆力扣币最少需要拿 2 次，第二堆最少需要拿 1 次，第三堆最少需要拿 1 次，总共 4 次即可拿完。

示例 2：

输入：[2,3,10]

输出：8

限制：
1 <= n <= 4
1 <= coins[i] <= 10
 */

/**
 * @param {number[]} coins
 * @return {number}
 */
var minCount = function (coins) {
  var sum = 0;
  coins.map(function (x) {
    sum = sum + parseInt((x + 1) / 2)
  })
  return sum;
};
```

### 斐波那契数列

```js
// 指数级
function fibonacci1(n) {
    return n == 1 || n == 2 ? 1 : fibonacci1(n -1) + fibonacci1(n -2)
}
// 需要执行2的n次方
// fibonacci(10)返回55，也就是第10个斐波那契数
var start_data1 = new Date()
console.log(fibonacci1(31)) // 执行了2的10次共 1024次

// 线性 [reduce和for循环算法   （动态规划）]
  function fibonacci2(n) {
    let [a,b] = [0,1]
    for (let i = 0; i < n; i++) {
      [a, b] = [b, a+b]
    }
    return b
  }

  function fibonacci3(n) {
    return Array(n).fill().reduce( ([a,b], _) => {
      return [b, a+b]
    }, [0,1])[1]
  }
```

### 递归DOM节点的绝对位置

```js
  // offsetLeft offsetRight是相对于offsetParent的位置
  // Element.getBoundingClientRect()是相对于视窗的位置，会受滚动影响
  function get_layout(ele) {
    const layout = {
      width : ele.offsetWidth,
      height : ele.offsetHeight,
      top : ele.offsetTop,
      left : ele.offsetLeft
    }
    if (ele.offsetParent) {
      const parentLayout = get_layout(ele.offsetParent)
      layout.left += parentLayout.left
      layout.top += parentLayout.top
    }
    return layout
  }
```

### 汉子排序

```js
// 汉子排序
var arr = ['王成成','王峰','蒋介石','李明'].sort((a,b) => a.localeCompare(b, 'zh'))
console.log(arr)
```

### 笛卡尔积

```js
  function dikaerji(...Matrix) {
    if (Matrix.length === 0) return []
    if (Matrix.length === 1) return Matrix[0]
    return Matrix.reduce((A,B) => {
      const product = []
      for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B.length; j++) {
          product.push(
            Array.isArray(A[i]) ? [...A[i], B[j]] : [A[i], B[j]]
          )
        }
      }
      console.log(product)
      return product
    })
  }
  var arr = [['a','b'],[3,4],['x','y']]
  dikaerji(...arr)
```

### 全排列

```js
  function* perm1(A, N) {
    if(!N) { N = A.length}
    if(N === 1) { yield A.slice(); return}
    for (let i = 0; i < N; i++) {
      swap(A, i, N - 1)
      yield * perm1(A, N - 1)
      swap(A, i, N - 1)
    }
  }
  var it = perm1(arr)
  console.log([...it])

  // 
  function swap(arr,i,j) {  
    if(i!=j) {   
      [ arr[i], arr[j]] = [ arr[j], arr[i]]
    }  
  }
```

### 生成器

```js
// 生成器构造斐波那契数列
function* fibonacci() {
  let a = 1, b = 1
  yield a; yield b
  while (true) {
    const t = b
    b = a + b; a = t
    yield b
  }
}
const it = fibonacci()
const feb10 = Array.form( Array(10), it.next, it).map( x => x.value )
console.log(feb10)

// 数组展平的生成器实现
function* flatten(array) {
  for (let i = 0; i < array.length; i++) {
    if ( Array.isArray(array[i]) ) {
      yield * flatten(array[i])
    } else {
      yield array[i]
    } 
  }
}
console.log( [...flatten([1,2,[3,4,5,[6,7]]])] )
```

### 数组最大深度

```js
  var arr1 = [1, 2, [1, [1, 2, [1, 2, [1, 2, [1, 2, [1, 2, [1, 2]]]]]], 3]], a = 1;
  function multiarr(arr1) {
    for (i = 0; i < arr1.length; i++) {
      if (arr1[i] instanceof Array) {
        a++;
        arr1 = arr1[i];
        multiarr(arr1);
      }
    }
    return a;
  }
  console.log(multiarr(arr1));
```

### 数组展平通过传入整数参数控制“拉平”层数

```js
// array展平
function flatten(arr) {
    return [].concat(
        ...arr.map(x =>
            Array.isArray(x) ? flatten(x) : x
        )
    )
}
flatten(arr);


// reduce + 递归
function flat(arr, num = 1) {
    return num > 0
        ? arr.reduce(
            (pre, cur) =>
                pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
            []
        )
        : arr.slice();
}
const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }]
flat(arr, Infinity);
```

### hailstone

```js
function hailstoneArr(e){
    var length = 0;
    var arr = [];
    while (e>1) {
        (e % 2) ? e = 3 * e + 1 : e /=2;
        arr.push(e)
        length++;
    }
    return arr;
    console.log(length);
    console.log(arr);
}
function hailstoneLength(e){
    var length = 0;
    var arr = [];
    while (e>1) {
    (e % 2) ? e = 3 * e + 1 : e /=2;
    arr.push(e)
    length++;
    }
    return length;
    console.log(length);
    console.log(arr);
}
hailstoneArr(42);
hailstoneLength(42);
```

### 按属性分组对象数组

```js
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];
var groupInPro = function (arr,pro) {
  return arr.reduce(function (res,item) {
    var key = item[pro]
    if (!res[key]) {
      res[key] = []
    }
    res[key].push(item)
    return res
  },{})
}
console.log(groupInPro(people,'age'))
```

### sku

```js
let names = ["iPhone X", "iPhone XS"]

let colors = ["黑色", "白色"]

let storages = ["64g", "256g"]

let combine = function (...chunks) {
  let res = []

  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    let isLast = chunkIndex === chunks.length - 1
    for (let val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }

  // 从属性数组下标为 0 开始处理
  // 并且此时的 prev 是个空数组
  helper(0, [])

  return res
}
console.log(combine(names, colors, storages))
```

### 数转罗马

```js
var intToRoman = function(num) {
let dic = [
    {s: 'I', n: 1},
    {s: 'IV', n: 4},
    {s: 'V', n: 5},
    {s: 'IX', n: 9},
    {s: 'X', n: 10},
    {s: 'XL', n: 40},
    {s: 'L', n: 50},
    {s: 'XC', n: 90},
    {s: 'C', n: 100},
    {s: 'CD', n: 400},
    {s: 'D', n: 500},
    {s: 'CM', n: 900},
    {s: 'M', n: 1000}
];
let res = "";
while(num > 0) {
    for(let i = dic.length-1; i >=0; --i) {
        if(num - dic[i].n >= 0) {
            res += dic[i].s;
            num -= dic[i].n;
            break;
        }
    }
}
return res;
};
console.log(intToRoman(3210))
```

### 罗马转数字

```js
var romanToInt = function(s) {
    const romaMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000,
        'IV': 4,
        'IX': 9,
        'XL': 40,
        'XC': 90,
        'CD': 400,
        'CM': 900,
    }
    let result = 0
    const romaSplit = s.match(/(CM)|(CD)|(XC)|(XL)|(IX)|(IV)|(IX)|(\w)/g) // \w	查找单词字符正则
    console.log(romaSplit)
    for (const v of romaSplit) {
        result += romaMap[v]
    }
    return result
};
console.log(romanToInt('III'))
console.log(romanToInt("MCMXCIVII"))
console.log(romanToInt("MMMCCX"))
```

### 合并 并排序

```js
var array = [
    {a:7,b:100},
    {a:5,b:900},
    {a:1,b:400},
    {a:2,b:600},
    {a:3,b:200},
    {a:4,b:100},
    {a:1,b:1000},
    {a:2,b:880},
    {a:3,b:30},
    {a:2,b:10},
    {a:3,b:90},
    {a:4,b:100},
    {a:5,b:10},
    {a:3,b:700},
    {a:1,b:100},
    {a:6,b:400},
    {a:3,b:200},
    {a:4,b:800}
];
// 合并同类项
var obj={},newArr=[];
array.forEach(function(item){
    //根据对象的属性是唯一的，将值作为对象的属性名
    if(!obj[item.a]){
        var arr=[];
        arr.push(item);
        newArr.push(arr);
        obj[item.a]=item;
    }else{
        newArr.forEach(function(value,index){
            //如果已经存在  就循环新组的值将值插入属性相同的数组里   为了防止重复添加   只要和第一个比较就可以了
            if(value[0].a==item.a){
                value.push(item)
            }
        })
    }
})
// b属性由小到大排序
function compare(value){
        return function(aa,bb){
            var aaa = aa[value];
            var bbb = bb[value];
            return aaa - bbb;
        }
      }
for (let index = 0; index < newArr.length; index++) {
    const element = newArr[index];
    element.sort(compare('b'))
}

// a属性由小到大排序
function BubbleSort1(newArr){
    var i,j,temp;
    for(i=0;i<newArr.length-1;i++){
        for(j=i+1;j<newArr.length;j++){
            if(newArr[i][0].a>newArr[j][0].a){
                temp=newArr[j];
                newArr[j]=newArr[i];
                newArr[i]=temp;
            }
        }
    }
    return newArr;
}
```

### 二分查找

```js
const binarySearch = function(arr, target) {
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    const cur = arr[mid]

    if (cur === target) {
      return mid
    }

    if (cur < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }
  return false
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(binarySearch(arr, 6))
```

### 无重复字符的最长子串

```js
var lengthOfLongestSubstring = function(s) {
  if (s.length <= 1) return s.length
  let longest = 0
  let longestS = s[0]
  for (let index = 1; index < s.length; index++) {
    const cur = s[index]

    const hasRepeat = longestS.indexOf(cur)
    if (hasRepeat >= 0) {
      longest = Math.max(longest, longestS.length)
      longestS = (longestS + cur).slice(hasRepeat + 1)
    } else {
      longestS += cur
    }
  }
  return Math.max(longest, longestS.length)
}
```

### 无重复字符的最长子串

```js
// "abcabcbb" abc // "pwwkew" wke
var lengthOfLongestSubstring = function(strs) {
  if (strs.length <= 1) {
    return strs.length
  }
  let max = 1

  let hashMap = strs.substring(0, 1)
  for (let i = 1; i < strs.length; i++) {
    const cur = strs[i]
    const index = hashMap.indexOf(cur)
    hashMap = hashMap + cur
    if (index >= 0) {
      hashMap = hashMap.substring(index + 1)
    } else {
      max = Math.max(max, hashMap.length)
    }
  }
  return max
}
```

### 最大置换

```js
var maximumSwap = function(num) {
  const arr = (num + '').split('').reduce((acc, cur) => {
    acc.push(+cur)
    return acc
  }, [])
  for (let i = 0; i < arr.length; i++) {
    const rest = arr.slice(i + 1)
    const max = Math.max(...rest)
    if (max > arr[i]) {
      const index = arr.lastIndexOf(max)
      ;[arr[i], arr[index]] = [arr[index], arr[i]]
      break
    }
  }
  return arr.join('')
}
```