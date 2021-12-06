# 数据结构与算法

- 时间复杂度：O(1)、 O(n) 、O(logN) 、O(n\*logN) 、O(n 方) 、O(n 立方)
- 空间复杂度：O(1)、 O(n) 、O(mn)二维

## 数据结构

分类：数组、字符串、列表、栈、队列、链表、字典、散列、集合、二叉树、图、等等

算法：树结构（先序、中序、后序遍历）；tree 结构与 list 相互转化过滤查询等；图和图的算法；排序算法；检索算法（顺序查找、二分查找等）；动态规划；贪心算法等等

### 数组排序

- 简单使用 sort 方法的时候，是按位排序的
- 升降序
  原则：
  当返回值大于 0 时，a 放在 b 的后面；
  当返回值小于 0 时，a 放在 b 的前面；
  当返回值等于 0 时，ab 位置不改变。

```js
var arr = [1, 22, 15, 32, 4, 5]
arr.sort((a, b) => {
  return a - b
}) // 升序排序 [1, 4, 5, 15, 22, 32]
arr.sort((a, b) => {
  return b - a
}) // 降序排序 [32, 22, 15, 5, 4, 1]
```

- a-b 或者 b-a 其实是分情况讨论后的简写
- 原始写法

```js
var arr = [1, 22, 15, 32, 4, 5]
arr.sort((a, b) => {
  if (a > b) return 1
  else if (a < b) return -1
  else return 0
}) // [1,4,5,15,22,32]
```

- 数组 push(后面加) + 数组 pop，(后面删返回被删的) = 栈【后进先出】【仅能在表尾进行插入或删除操作的线性】【一摞盘子是现实世界中常见的栈的例子】

- 数组 unshift(前面加【和在数组的末尾添加元素比起来，在数组的开头添加元素更难。如果不利用数组提供的可 变函数，则新的元素添加进来后，需要把后面的每个元素都相应地向后移一个位置。】) + 数组 shift(前面删【返回被删的】) = 队列【先进先出，后进后出】【表的队尾进行插入，而在队头删除元素】

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
利用 Object.keys 可对字典像数组那样排序
2、散列
3、set

### 树

1、在二叉树上进行查找非常快、为二叉树添加或删除元素 也非常快
2、根节点、父节点、叶子节点
3、二叉树是一种特殊的树，它的子节点个数不超过两个
4、树的层次【树的深度】

### 对象相关操作

### tree 结构

[BFS DFS](algorithm/tree.md)

### js 其他相关

## 算法

### 算法理论基础概念

1.时间复杂度：用来度量算法的运行时间，是一个函数。【解决问题执行的时间，随着问题规模（数据量）的扩大，时间是怎么变化的】

常见有：

O(N)、O(log2N)、O(N2)、O(nlog2N)、O(N\*K)、O(N+K)、

2.空间复杂度：用来度量算法的空间占用，是一个函数。【解决问题临时占用存储空间的大小，随着问题规模（数据量）的扩大，临时占用存储空间的大小是怎么变化的】

常见有：

O(1)、O(nlog2N)、O(N+K)、

3.稳定性

稳定：如果 a 原本在 b 前面，而 a=b，排序之后 a 仍然在 b 的前面。
不稳定：如果 a 原本在 b 的前面，而 a=b，排序之后 a 可能会出现在 b 的后面。

### 排序算法

十种常见排序算法可以分为两大类：

比较类排序：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破 O(nlogn)，因此也称为非线性时间比较类排序。
非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。

[十种常见排序算法](algorithm/排序算法.md)

[动态规划](algorithm/动态规划.md)

### JS 树结构操作

[查找、遍历、筛选、树结构和列表结构相互转换](https://wintc.top/article/20)

待补充：leetcode 刷题

### 动态规划

### 搜索算法

## 题目汇总

### 两数之和

给定 nums = [2, 7, 11, 15], target = 9

nums[0] + nums[1] = 2 + 7 = 9 , 返回 [0, 1]

```js
var twoSum = function(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const ele = nums[i]
    const result = target - ele
    if (map.has(result)) {
      return [map.get(result), i]
    } else {
      map.set(ele, i)
    }
  }
  return []
}
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
var myAtoi = function(str) {
  let num = parseInt(str, 10)
  if (isNaN(num)) return 0
  if (num < Math.pow(-2, 31)) return Math.pow(-2, 31)
  if (num > Math.pow(2, 31) - 1) return Math.pow(2, 31) - 1
  return num
}
```

### 回文数

```js
var isPalindrome = function(x) {
  //暴力解题法：转字符串
  // return x.toString() == x.toString().split("").reverse().join("");
  if (x < 0 || (x % 10 == 0 && x != 0)) {
    return false
  }

  let rev = 0
  // ~~1.9;       // => 1
  // ~~-1.9;      // => -1
  while (rev < x) {
    rev = rev * 10 + (x % 10)
    x = ~~(x / 10)
  }
  return rev === x || ~~(rev / 10) === x
}
```

### 盛最多水的容器

```js
/*
 * 示例：
 *
 * 输入：[1,8,6,2,5,4,8,3,7]
 * 输出：49
 */
var maxArea = function(height) {
  if (!height || height.length <= 1) {
    return 0
  }
  let left = 0
  let right = height.length - 1
  let result = 0
  while (left < right) {
    result = Math.max(
      result,
      (right - left) * Math.min(height[left], height[right])
    )
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return result
}
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
var threeSum = function(nums) {
  const result = []
  nums.sort(function(a, b) {
    return a - b
  })
  for (let i = 0; i < nums.length - 2; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      var start = i + 1
      var end = nums.length - 1
      while (start < end) {
        if (nums[i] + nums[start] + nums[end] === 0) {
          result.push([nums[i], nums[start], nums[end]])
          start++
          end--
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
  return result
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let ans = []
  const len = nums.length
  if (nums == null || len < 3) return ans
  nums.sort((a, b) => a - b) // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue // 去重
    let L = i + 1
    let R = len - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]])
        while (L < R && nums[L] == nums[L + 1]) L++ // 去重
        while (L < R && nums[R] == nums[R - 1]) R-- // 去重
        L++
        R--
      } else if (sum < 0) L++
      else if (sum > 0) R--
    }
  }
  return ans
}
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
var spiralOrder = function(matrix) {
  var res = []
  var i = 0
  var j = 0
  var n = matrix.length - 1
  if (n < 0) return []
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
}
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
  var left = 0,
    right = nums.length - 1
  while (left < right) {
    var mid = Math.floor((left + right) / 2)
    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  return left
}
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
    return 0
  }

  let arr = Array(num + 1).fill(true)

  for (let index = 2; index < Math.sqrt(num); index++) {
    let j = i ** 2
    while (arr[i] == true && j <= num) {
      arr[j] = false
      j += i
    }
    console.log(
      arr.map((x, i) => {
        return x ? i : 0
      })
    )
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
var rotate = function(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix[i].length; j++) {
      ;[matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }
  matrix.forEach(row => row.reverse())
}
```

### 质数筛

```js
function sumPrime(num) {
  if (num < 2) {
    return 0
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
var minCount = function(coins) {
  var sum = 0
  coins.map(function(x) {
    sum = sum + parseInt((x + 1) / 2)
  })
  return sum
}
```

### 斐波那契数列

```js
// 指数级
function fibonacci1(n) {
  return n == 1 || n == 2 ? 1 : fibonacci1(n - 1) + fibonacci1(n - 2)
}
// 需要执行2的n次方
// fibonacci(10)返回55，也就是第10个斐波那契数
var start_data1 = new Date()
console.log(fibonacci1(31)) // 执行了2的10次共 1024次

// 线性 [reduce和for循环算法   （动态规划）]
function fibonacci2(n) {
  let [a, b] = [0, 1]
  for (let i = 0; i < n; i++) {
    ;[a, b] = [b, a + b]
  }
  return b
}

function fibonacci3(n) {
  return Array(n)
    .fill()
    .reduce(
      ([a, b], _) => {
        return [b, a + b]
      },
      [0, 1]
    )[1]
}
```

### 递归 DOM 节点的绝对位置

```js
// offsetLeft offsetRight是相对于offsetParent的位置
// Element.getBoundingClientRect()是相对于视窗的位置，会受滚动影响
function get_layout(ele) {
  const layout = {
    width: ele.offsetWidth,
    height: ele.offsetHeight,
    top: ele.offsetTop,
    left: ele.offsetLeft
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
var arr = ['王成成', '王峰', '蒋介石', '李明'].sort((a, b) =>
  a.localeCompare(b, 'zh')
)
console.log(arr)
```

### 笛卡尔积

```js
function dikaerji(...Matrix) {
  if (Matrix.length === 0) return []
  if (Matrix.length === 1) return Matrix[0]
  return Matrix.reduce((A, B) => {
    const product = []
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < B.length; j++) {
        product.push(Array.isArray(A[i]) ? [...A[i], B[j]] : [A[i], B[j]])
      }
    }
    console.log(product)
    return product
  })
}
var arr = [
  ['a', 'b'],
  [3, 4],
  ['x', 'y']
]
dikaerji(...arr)
```

### 全排列

```js
function* perm1(A, N) {
  if (!N) {
    N = A.length
  }
  if (N === 1) {
    yield A.slice()
    return
  }
  for (let i = 0; i < N; i++) {
    swap(A, i, N - 1)
    yield* perm1(A, N - 1)
    swap(A, i, N - 1)
  }
}
var it = perm1(arr)
console.log([...it])

//
function swap(arr, i, j) {
  if (i != j) {
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}
```

### 生成器

```js
// 生成器构造斐波那契数列
function* fibonacci() {
  let a = 1,
    b = 1
  yield a
  yield b
  while (true) {
    const t = b
    b = a + b
    a = t
    yield b
  }
}
const it = fibonacci()
const feb10 = Array.form(Array(10), it.next, it).map(x => x.value)
console.log(feb10)

// 数组展平的生成器实现
function* flatten(array) {
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      yield* flatten(array[i])
    } else {
      yield array[i]
    }
  }
}
console.log([...flatten([1, 2, [3, 4, 5, [6, 7]]])])
```

### 数组最大深度

```js
var arr1 = [1, 2, [1, [1, 2, [1, 2, [1, 2, [1, 2, [1, 2, [1, 2]]]]]], 3]],
  a = 1
function multiarr(arr1) {
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] instanceof Array) {
      a++
      arr1 = arr1[i]
      multiarr(arr1)
    }
  }
  return a
}
console.log(multiarr(arr1))

//
function deep(arr, level) {
  arr &&
    arr.forEach(element => {
      element['level'] = level + 1
      if (element.hasOwnProperty('children')) {
        deep(element, level + 1)
      }
    })
  return ele
}
deep(arr, (level = 0))
// 最后拍平arr找出level最大的值
```

### 数组展平通过传入整数参数控制“拉平”层数

```js
// array展平
function flatten(arr) {
  return [].concat(...arr.map(x => (Array.isArray(x) ? flatten(x) : x)))
}
flatten(arr)

// reduce + 递归
function flat(arr, num = 1) {
  return num > 0
    ? arr.reduce(
        (pre, cur) => pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
        []
      )
    : arr.slice()
}
const arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  'string',
  { name: '弹铁蛋同学' }
]
flat(arr, Infinity)
```

### hailstone

```js
function hailstoneArr(e) {
  var length = 0
  var arr = []
  while (e > 1) {
    e % 2 ? (e = 3 * e + 1) : (e /= 2)
    arr.push(e)
    length++
  }
  return arr
  console.log(length)
  console.log(arr)
}
function hailstoneLength(e) {
  var length = 0
  var arr = []
  while (e > 1) {
    e % 2 ? (e = 3 * e + 1) : (e /= 2)
    arr.push(e)
    length++
  }
  return length
  console.log(length)
  console.log(arr)
}
hailstoneArr(42)
hailstoneLength(42)
```

### 按属性分组对象数组

```js
var people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
]
var groupInPro = function(arr, pro) {
  return arr.reduce(function(res, item) {
    var key = item[pro]
    if (!res[key]) {
      res[key] = []
    }
    res[key].push(item)
    return res
  }, {})
}
console.log(groupInPro(people, 'age'))
```

### sku

```js
let names = ['iPhone X', 'iPhone XS']

let colors = ['黑色', '白色']

let storages = ['64g', '256g']

let combine = function(...chunks) {
  let res = []

  let helper = function(chunkIndex, prev) {
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
    { s: 'I', n: 1 },
    { s: 'IV', n: 4 },
    { s: 'V', n: 5 },
    { s: 'IX', n: 9 },
    { s: 'X', n: 10 },
    { s: 'XL', n: 40 },
    { s: 'L', n: 50 },
    { s: 'XC', n: 90 },
    { s: 'C', n: 100 },
    { s: 'CD', n: 400 },
    { s: 'D', n: 500 },
    { s: 'CM', n: 900 },
    { s: 'M', n: 1000 }
  ]
  let res = ''
  while (num > 0) {
    for (let i = dic.length - 1; i >= 0; --i) {
      if (num - dic[i].n >= 0) {
        res += dic[i].s
        num -= dic[i].n
        break
      }
    }
  }
  return res
}
console.log(intToRoman(3210))
```

### 罗马转数字

```js
var romanToInt = function(s) {
  const romaMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900
  }
  let result = 0
  const romaSplit = s.match(/(CM)|(CD)|(XC)|(XL)|(IX)|(IV)|(IX)|(\w)/g) // \w	查找单词字符正则
  console.log(romaSplit)
  for (const v of romaSplit) {
    result += romaMap[v]
  }
  return result
}
console.log(romanToInt('III'))
console.log(romanToInt('MCMXCIVII'))
console.log(romanToInt('MMMCCX'))
```

### 合并 并排序

```js
var array = [
  { a: 7, b: 100 },
  { a: 5, b: 900 },
  { a: 1, b: 400 },
  { a: 2, b: 600 },
  { a: 3, b: 200 },
  { a: 4, b: 100 },
  { a: 1, b: 1000 },
  { a: 2, b: 880 },
  { a: 3, b: 30 },
  { a: 2, b: 10 },
  { a: 3, b: 90 },
  { a: 4, b: 100 },
  { a: 5, b: 10 },
  { a: 3, b: 700 },
  { a: 1, b: 100 },
  { a: 6, b: 400 },
  { a: 3, b: 200 },
  { a: 4, b: 800 }
]
// 合并同类项
var obj = {},
  newArr = []
array.forEach(function(item) {
  //根据对象的属性是唯一的，将值作为对象的属性名
  if (!obj[item.a]) {
    var arr = []
    arr.push(item)
    newArr.push(arr)
    obj[item.a] = item
  } else {
    newArr.forEach(function(value, index) {
      //如果已经存在  就循环新组的值将值插入属性相同的数组里   为了防止重复添加   只要和第一个比较就可以了
      if (value[0].a == item.a) {
        value.push(item)
      }
    })
  }
})
// b属性由小到大排序
function compare(value) {
  return function(aa, bb) {
    var aaa = aa[value]
    var bbb = bb[value]
    return aaa - bbb
  }
}
for (let index = 0; index < newArr.length; index++) {
  const element = newArr[index]
  element.sort(compare('b'))
}

// a属性由小到大排序
function BubbleSort1(newArr) {
  var i, j, temp
  for (i = 0; i < newArr.length - 1; i++) {
    for (j = i + 1; j < newArr.length; j++) {
      if (newArr[i][0].a > newArr[j][0].a) {
        temp = newArr[j]
        newArr[j] = newArr[i]
        newArr[i] = temp
      }
    }
  }
  return newArr
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

### 千分位

```js
const num = 1234567899.11
function toThousands(num) {
  num = num + ''
  let result = ''
  const decimalNum = num.split('.')[1]
  let intNum = num.split('.')[0]
  while (intNum.length > 3) {
    result = ',' + intNum.slice(-3) + result
    intNum = intNum.slice(0, intNum.length - 3)
  }
  return intNum + result + (decimalNum ? '.' + decimalNum : '')
}
console.log(toThousands(num))
```

### 不同路径 Unique Paths

```js
// 建立M*N的矩阵，第0行第0列元素都是1
// var uniquePaths = function(m, n) {
//     if (m === 1 || n === 1) return 1;
//     let d = [];

//     for (let i=0; i<m;i++) {
//         for (let j=0; j<n; j++) {
//             if (i === 0 || j === 0) {
//                 if (!d[i]) d[i] = [];
//                 d[i][j] = 1;
//             } else {
//                 d[i][j] = d[i-1][j] + d[i][j-1];
//             }
//         }
//     }

//     return d[m-1][n-1];
// };
// 二维到一维【滚动数组思想」是一种常见的动态规划优化方法，在我们的题目中已经多次使用到，例如「剑指 Offer 46. 把数字翻译成字符串」、「70. 爬楼梯」等，当我们定义的状态在动态规划的转移方程中只和某几个状态相关的时候，就可以考虑这种优化方法，目的是给空间复杂度「降维」。】
var uniquePaths = function(m, n) {
  const dp = new Array(n).fill(1)
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] = dp[j] + dp[j - 1]
    }
  }
  return dp[n - 1]
}
```

### 不同路径 II

```js
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
//  既然是障碍物，说明此路不通，即经过此节点的路径数为0，所以当遇到障碍物时，设置dp[i][r] = 0即可
var uniquePathsWithObstacles = function(obstacleGrid) {
  // 行
  var n = obstacleGrid.length
  // 列
  var m = obstacleGrid[0].length
  // 初始化
  var dp = new Array(n)
  for (var i = 0; i < n; i++) {
    dp[i] = new Array(m).fill(0)
  }
  dp[0][0] = obstacleGrid[0][0] == 0 ? 1 : 0
  // 如果起点就是障碍物
  if (dp[0][0] == 0) {
    return 0
  }
  // 第一行
  for (var j = 1; j < m; j++) {
    if (obstacleGrid[0][j] != 1) {
      dp[0][j] = dp[0][j - 1]
    }
  }
  // 第一列
  for (var r = 1; r < n; r++) {
    if (obstacleGrid[r][0] != 1) {
      dp[r][0] = dp[r - 1][0]
    }
  }
  // 动态递推
  for (var i = 1; i < n; i++) {
    for (var r = 1; r < m; r++) {
      if (obstacleGrid[i][r] != 1) {
        dp[i][r] = dp[i - 1][r] + dp[i][r - 1]
      }
    }
  }
  return dp[n - 1][m - 1]
}
// 降维
var uniquePathsWithObstacles = function(obstacleGrid) {
  var n = obstacleGrid.length
  var m = obstacleGrid[0].length
  var result = Array(m).fill(0)
  result[0] = 1
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < m; j++) {
      if (obstacleGrid[i][j] == 1) {
        result[j] = 0
      } else if (j > 0) {
        result[j] += result[j - 1]
      }
    }
  }
  return result[m - 1]
}
```

### 最大盛水问题

```js
var maxArea = function(height) {
  if (!height || height.length <= 1) return 0
  var left = 0
  var right = height.length - 1
  var answer = 0
  while (left < right) {
    answer = Math.max(
      answer,
      (right - left) * Math.min(height[left], height[right])
    )
    if (height[left] < height[right]) {
      left++
    } else {
      right--
    }
  }
  return answer
}
```

### 数组子集

输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

```js
// 回溯
const subsets = nums => {
  const res = []

  const dfs = (index, list) => {
    if (index == nums.length) {
      // 指针越界
      res.push(list.slice()) // 加入解集
      return // 结束当前的递归
    }
    list.push(nums[index]) // 选择这个数
    dfs(index + 1, list) // 基于该选择，继续往下递归，考察下一个数
    list.pop() // 上面的递归结束，撤销该选择
    dfs(index + 1, list) // 不选这个数，继续往下递归，考察下一个数
  }

  dfs(0, [])
  return res
}

// 递归
const subsets = nums => {
  const res = []

  const dfs = (index, list) => {
    res.push(list.slice()) // 调用子递归前，加入解集
    for (let i = index; i < nums.length; i++) {
      // 枚举出所有可选的数
      list.push(nums[i]) // 选这个数
      dfs(i + 1, list) // 基于选这个数，继续递归，传入的是i+1，不是index+1
      list.pop() // 撤销选这个数
    }
  }
  dfs(0, [])
  return res
}
```

### 最长公共前缀

输入：strs = ["flower","flow","flight"] 输出："fl"
输入：strs = ["dog","racecar","car"] 输出："" 解释：输入不存在公共前缀。

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  let resStr = ''
  if (!strs.length) return resStr
  if (strs.length === 1) return strs[0]
  let tmp = strs[0].split('')[0]
  let lenArr = strs.map(x => {
    return x.length
  })
  let minLen = Math.min(...lenArr)
  for (let i = 0; i < minLen; i++) {
    let bool = strs.every(x => {
      return x.split('')[i] == tmp
    })
    if (bool) {
      resStr = resStr + strs[0].split('')[i]
      tmp = strs[0].split('')[i + 1]
    } else {
      break
    }
  }
  return resStr
}
```

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  if (strs.length == 0) return ''
  let ans = strs[0]
  for (let i = 1; i < strs.length; i++) {
    let j = 0
    for (; j < ans.length && j < strs[i].length; j++) {
      if (ans[j] != strs[i][j]) break
    }
    ans = ans.substr(0, j)
    if (ans === '') return ans
  }
  return ans
}
```

### 目标和

给你一个整数数组 nums 和一个整数 target 。向数组中的每个整数前添加  '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

- [目标和](https://leetcode-cn.com/problems/target-sum/solution/mu-biao-he-by-leetcode-solution-o0cp/)

```js
// 例子
// 输入：nums = [1,1,1,1,1], target = 3
// 输出：5
// 解释：一共有 5 种方法让最终目标和为 3 。
// -1 + 1 + 1 + 1 + 1 = 3
// + 1 - 1 + 1 + 1 + 1 = 3
// + 1 + 1 - 1 + 1 + 1 = 3
```

```js
// 回溯
// 数组 nums 的每个元素都可以添加符号 + 或 -，因此每个元素有 2 种添加符号的方法，n 个数共有 2^n种添加符号的方法，对应 2^n 种不同的表达式。当 n 个元素都添加符号之后，即得到一种表达式，如果表达式的结果等于目标数 target，则该表达式即为符合要求的表达式。

// 可以使用回溯的方法遍历所有的表达式，回溯过程中维护一个计数器 count，当遇到一种表达式的结果等于目标数 target 时，将 count 的值加 1。遍历完所有的表达式之后，即可得到结果等于目标数 target 的表达式的数目。

var findTargetSumWays = function(nums, target) {
  let count = 0
  const backtrack = (nums, target, index, sum) => {
    if (index === nums.length) {
      if (sum === target) {
        count++
      }
    } else {
      backtrack(nums, target, index + 1, sum + nums[index])
      backtrack(nums, target, index + 1, sum - nums[index])
    }
  }
  backtrack(nums, target, 0, 0)
  return count
}
// 时间复杂度：O(2^n)，其中 n 是数组 nums 的长度。
// 空间复杂度：O(n)，其中 n 是数组 nums 的长度。
```

```js
// 动态规划
// 记数组的元素和为 sum，添加 - 号的元素之和为 neg，则其余添加 + 的元素之和为 sum−neg，得到的表达式的结果为:
// (sum−neg)−neg=sum−2⋅neg=target
// 即：neg = (sum - target) / 2
var findTargetSumWays = function(nums, target) {
  let sum = 0
  for (const num of nums) {
    sum += num
  }
  const diff = sum - target
  if (diff < 0 || diff % 2 !== 0) {
    return 0
  }
  const neg = Math.floor(diff / 2)
  const dp = new Array(neg + 1).fill(0)
  dp[0] = 1
  for (const num of nums) {
    for (let j = neg; j >= num; j--) {
      dp[j] += dp[j - num]
    }
  }
  return dp[neg]
}
// 时间复杂度：O(n × (sum − target))
// 空间复杂度：O(sum − target)
```

### 单词拆分

```js
// 输入: s = "leetcode", wordDict = ["leet", "code"]
// 输出: true
// 解释: 返回 true 因为 "leetcode" 可以被拆分成 "leet code"。

// 输入: s = "applepenapple", wordDict = ["apple", "pen"]
// 输出: true
// 解释: 返回 true 因为 "applepenapple" 可以被拆分成 "apple pen apple"。注意你可以重复使用字典中的单词。

// 输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// 输出: false
```

```js
// 动态规划
function wordBreak(s: string, wordDict: string[]): boolean {
  const n: number = s.length
  const wordDictSet: Set<string> = new Set(wordDict)
  const dp: Array<boolean> = new Array(n + 1).fill(false)
  dp[0] = true
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDictSet.has(s.substr(j, i - j))) {
        dp[i] = true
        break
      }
    }
  }
  return dp[n]
}
```

### 单词拆分 2

```js
// 输入:
s = 'catsanddog'
wordDict = ['cat', 'cats', 'and', 'sand', 'dog']
// 输出:
arr = ['cats and dog', 'cat sand dog']

// 输入:
s = 'pineapplepenapple'
wordDict = ['apple', 'pen', 'applepen', 'pine', 'pineapple']
// 输出:
arr = ['pine apple pen apple', 'pineapple pen apple', 'pine applepen apple']
// 解释: 注意你可以重复使用字典中的单词。

// 输入:
s = 'catsandog'
wordDict = ['cats', 'dog', 'sand', 'and', 'cat']
// 输出:
arr = []
```

```js
// 动态规划
const backtrack = (s, length, wordSet, index, map) => {
  if (map.has(index)) {
    return map.get(index)
  }
  const wordBreaks = []
  if (index === length) {
    wordBreaks.push([])
  }
  for (let i = index + 1; i <= length; i++) {
    const word = s.substring(index, i)
    if (wordSet.has(word)) {
      const nextWordBreaks = backtrack(s, length, wordSet, i, map)
      for (const nextWordBreak of nextWordBreaks) {
        const wordBreak = [word, ...nextWordBreak]
        wordBreaks.push(wordBreak)
      }
    }
  }
  map.set(index, wordBreaks)
  return wordBreaks
}
var wordBreak = function(s, wordDict) {
  const map = new Map()
  const wordBreaks = backtrack(s, s.length, new Set(wordDict), 0, map)
  const breakList = []
  for (const wordBreak of wordBreaks) {
    breakList.push(wordBreak.join(' '))
  }
  return breakList
}
```

### 零钱兑换

给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回  -1。你可以认为每种硬币的数量是无限的。

```js
// 输入：coins = [1, 2, 5], amount = 11
// 输出：3
// 解释：11 = 5 + 5 + 1
```

#### 动态规划

尝试分解子问题：「最优子结构」「缩小问题规模」「自顶向下」「自底向上」「动态规划」

- 使用「自顶向下」思想来考虑这个题目，然后用「自底向上」的方法来解题，

- dp[i]: 表示总金额为 i 的时候最优解法的硬币数

- 我们想一下：求总金额 120 有几种方法？下面这个思路关键了 !!!

  一共有 3 种方式，因为我们有 3 种不同面值的硬币。

  1.拿一枚面值为 1 的硬币 + 总金额为 119 的最优解法的硬币数量

  这里我们只需要假设总金额为 119 的最优解法的硬币数有人已经帮我们算好了，

  不需要纠结于此。(虽然一会也是我们自己算，哈哈)

  即：dp[119] + 1

  2.拿一枚面值为 2 的硬币 + 总金额为 118 的最优解法的硬币数

  这里我们只需要假设总金额为 118 的最优解法的硬币数有人已经帮我们算好了

  即：dp[118] + 1

  3.拿一枚面值为 5 的硬币 + 总金额为 115 的最优解法的硬币数

  这里我们只需要假设总金额为 115 的最优解法的硬币数有人已经帮我们算好了

  即：dp[115] + 1

  - 所以，总金额为 120 的最优解法就是上面这三种解法中最优的一种，也就是硬币数最少

    的一种，我们下面试着用代码来表示一下：

  - dp[120] = Math.min(dp[119] + 1, dp[118] + 1, dp[115] + 1);

  - 推导出「状态转移方程」：

    dp[i] = Math.min(dp[i - coin] + 1, dp[i - coin] + 1, ...)

    其中 coin 有多少种可能，我们就需要比较多少次，那么我们到底需要比较多少次呢？

    当然是 coins 数组中有几种不同面值的硬币，就是多少次了~ 遍历 coins 数组，

    分别去对比即可

  - 上面方程中的 dp[119]，dp[118]，dp[115] 我们继续用这种思想去分解，

    这就是动态规划了，把这种思想，思考问题的方式理解了，这一类型的题目

    问题都不会太大。

```js
var coinChange = function(coins, amount) {
  let dp = new Array(amount + 1).fill(Infinity)
  dp[0] = 0

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1)
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]
}
```

### 最大正方形

```js
// 暴力法
// 遍历矩阵中的每个元素，每次遇到 1，则将该元素作为正方形的左上角；
// 确定正方形的左上角后，根据左上角所在的行和列计算可能的最大正方形的边长（正方形的范围不能超出矩阵的行数和列数），在该边长范围内寻找只包含 1 的最大正方形；
// 每次在下方新增一行以及在右方新增一列，判断新增的行和列是否满足所有元素都是 1。
function maximalSquare(matrix) {
  console.time()
  let maxSide = 0
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
    return maxSide
  }
  let rows = matrix.length
  let columns = matrix[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // 遇到一个 1 作为正方形的左上角
      if (matrix[i][j] == '1') {
        maxSide = Math.max(maxSide, 1)
        // 计算可能的最大正方形边长
        let currentMaxSide = Math.min(rows - i, columns - j)
        for (let k = 1; k < currentMaxSide; k++) {
          // 判断新增的一行一列是否均为 1
          let flag = true
          if (matrix[i + k][j + k] == '0') {
            break
          }
          for (let m = 0; m < k; m++) {
            if (matrix[i + k][j + m] == '0' || matrix[i + m][j + k] == '0') {
              flag = false
              break
            }
          }
          if (flag) {
            maxSide = Math.max(maxSide, k + 1)
          } else {
            break
          }
        }
      }
    }
  }
  let maxSquare = maxSide * maxSide
  console.timeEnd()
  return maxSquare
}
// 时间复杂度: m 和 nn 是矩阵的行数和列数
// 1.需要遍历整个矩阵寻找每个 11，遍历矩阵的时间复杂度是 O(mn)O(mn)。
// 2.对于每个可能的正方形，其边长不超过 m 和 n 中的最小值，需要遍历该正方形中的每个元素判断是不是只包含 1，遍历正方形时间复杂度是 O(min(m,n)^2)
// 3.总时间复杂度是 O(mn min(m,n)^2)

// 空间复杂度：O(1) 额外使用的空间复杂度为常数。
```

```js
// 动态规划
// 动态方程dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;

function maximalSquare(matrix) {
  console.time()
  let maxSide = 0
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {
    return maxSide
  }
  let rows = matrix.length
  let columns = matrix[0].length

  let dp = new Array(matrix.length)
  for (let i = 0; i < rows; i++) {
    dp[i] = new Array(matrix[i].length).fill(0)
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j] == '1') {
        if (i == 0 || j == 0) {
          dp[i][j] = 1
        } else {
          dp[i][j] =
            Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1
        }
        maxSide = Math.max(maxSide, dp[i][j])
      }
    }
  }
  let maxSquare = maxSide * maxSide
  console.timeEnd()
  return maxSquare
}
// 时间复杂度：O(mn)
// 空间复杂度：O(mn)
```

### 统计全为 1 的正方形子矩阵

给你一个 m \* n 的矩阵，矩阵中的元素不是 0 就是 1，请你统计并返回其中完全由 1 组成的 正方形 子矩阵的个数。

```js
var countSquares = function(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0
  let rowLimit = matrix.length,
    colLimit = matrix[0].length,
    count = 0
  let dp = JSON.parse(JSON.stringify(matrix))

  for (let i = 0; i < rowLimit; i++) {
    for (let j = 0; j < colLimit; j++) {
      if (matrix[i][j] !== 0) {
        // 如果不越界，那就求出以当前点为右下角的正方形边长
        if (i - 1 >= 0 && j - 1 >= 0) {
          dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
          count += dp[i][j] // 边长是几，以当前点为右下角的正方形就有几个，通过观察可以得出此结论
        } else {
          // 如果越界了，也要加 1，至少当前点是1，可以计为一个正方形
          count += 1
        }
      }
    }
  }

  return count
}
```

### 二分法

使得时间复杂度为：O(logn)

### 最长回文子串

一个字符串中最长的回文子串

```js
// 暴力枚举
var longestPalindrome = function(s) {
  function isPalindrome(str) {
    var len = str.length
    var middle = parseInt(len / 2)
    for (var i = 0; i < middle; i++) {
      if (str[i] != str[len - i - 1]) {
        return false
      }
    }
    return true
  }
  var ans = ''
  var max = 0
  var len = s.length
  for (var i = 0; i < len; i++) {
    for (var r = i + 1; r <= len; r++) {
      var tmpStr = s.substring(i, r)
      if (isPalindrome(tmpStr) && tmpStr.length > max) {
        ans = s.substring(i, r)
        max = tmpStr.length
      }
    }
  }
  return ans
}
// 时间复杂度O(n^3)
// 空间复杂度O(1)
```

```js
// 巧解
// 两种情况
// 一种是回文子串长度为奇数（如aba，中心是b）
// 另一种回文子串长度为偶数（如abba，中心是b，b）
// 循环遍历字符串 对取到的每个值 都假设他可能成为最后的中心进行判断
var longestPalindrome = function(s) {
  if (s.length < 2) {
    return s
  }
  let res = ''
  for (let i = 0; i < s.length; i++) {
    // 回文子串长度是奇数
    helper(i, i)
    // 回文子串长度是偶数
    helper(i, i + 1)
  }

  function helper(m, n) {
    while (m >= 0 && n < s.length && s[m] == s[n]) {
      m--
      n++
    }
    // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
    if (n - m - 1 > res.length) {
      // slice也要取[m+1,n-1]这个区间
      res = s.slice(m + 1, n)
    }
  }
  return res
}
```

```js
// 动态规划
var longestPalindrome = function(s) {
  let len = s.length
  let res = ''
  //创建二维数组
  let dp = Array.from(new Array(len), () => new Array(len).fill(0))
  //从字符串首部开始
  for (let i = 0; i < len; i++) {
    //从字符串i前开始依次向前查找
    for (let j = i; j >= 0; j--) {
      dp[j][i] = s[i] == s[j] && (i - j < 2 || dp[j + 1][i - 1])
      if (dp[j][i] && i - j + 1 > res.length) {
        res = s.substring(j, i + 1)
      }
    }
  }
  console.log(dp)
  return res
}
```

### 数组交集

- [数组交集](https://github.com/sisterAn/JavaScript-Algorithms/issues/6)

```js
// 两个数组
const fn = (n1, n2) => [...new Set(n1.filter(i => n2.includes(i)))]
// 或
var intersection = function(nums1, nums2) {
  let map1 = new Set(nums1)
  let map2 = new Set(nums2)
  let res = []
  map1.forEach(item => {
    if (map2.has(item)) {
      res.push(item)
    }
  })
  return res
}
```

```js
/*找差集*/
function difference(arr1, arr2) {
  var set1 = new Set(arr1)
  var set2 = new Set(arr2)
  for (let ele of set1) {
    if (set2.has(ele)) {
      set2.delete(ele)
    }
  }
  return Array.from(set2)
}

/*找并集*/
function union(arr1, arr2) {
  return Array.from(new Set([...arr1, ...arr2]))
}
```

```js
// 多个数组交集，reduce两个的就行
const intersection = function(...args) {
  if (args.length === 0) {
    return []
  }
  if (args.length === 1) {
    return args[0]
  }
  return [
    ...new Set(
      args.reduce((result, arg) => {
        return result.filter(item => arg.includes(item))
      })
    )
  ]
}
```

- [最长公共串](https://github.com/sisterAn/JavaScript-Algorithms/issues/19)

```js
// 获取数组中的最大值及最小值字符串，最小字符串与最大字符串的最长公共前缀也为其他字符串的公共前缀，即为字符串数组的最长公共前缀
// 时间复杂度：O(n+m)，n是数组的长度， m 是字符串数组中最短字符的长度
// 空间复杂度：O(1)
var longestCommonPrefix = function(strs) {
  if (strs === null || strs.length === 0) return ''
  if (strs.length === 1) return strs[0]
  let min = 0,
    max = 0
  for (let i = 1; i < strs.length; i++) {
    if (strs[min] > strs[i]) min = i
    if (strs[max] < strs[i]) max = i
  }
  for (let j = 0; j < strs[min].length; j++) {
    if (strs[min].charAt(j) !== strs[max].charAt(j)) {
      return strs[min].substring(0, j)
    }
  }
  return strs[min]
}
```

```js
// 分治策略 归并思想
// 时间复杂度：O(s)，s 是所有字符串中字符数量的总和

// 空间复杂度：O(m*logn)，n是数组的长度，m为字符串数组中最长字符的长度
var longestCommonPrefix = function(strs) {
  if (strs === null || strs.length === 0) return ''
  return lCPrefixRec(strs)
}

// 若分裂后的两个数组长度不为 1，则继续分裂
// 直到分裂后的数组长度都为 1，
// 然后比较获取最长公共前缀
function lCPrefixRec(arr) {
  let length = arr.length
  if (length === 1) {
    return arr[0]
  }
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid, length)
  return lCPrefixTwo(lCPrefixRec(left), lCPrefixRec(right))
}

// 求 str1 与 str2 的最长公共前缀
function lCPrefixTwo(str1, str2) {
  let j = 0
  for (; j < str1.length && j < str2.length; j++) {
    if (str1.charAt(j) !== str2.charAt(j)) {
      break
    }
  }
  return str1.substring(0, j)
}
```

### 无重复字符的最长子串

```js
// 时间复杂度：O(n)

// 空间复杂度：O(n)
// 使用 map 来存储当前已经遍历过的字符，key 为字符，value 为下标

// 使用 i 来标记无重复子串开始下标，j 为当前遍历字符下标

// 遍历字符串，判断当前字符是否已经在 map 中存在，存在则更新无重复子串开始下标 i 为相同字符的下一位置，此时从 i 到 j 为最新的无重复子串，更新 max ，将当前字符与下标放入 map 中

// 最后，返回 max 即可
var lengthOfLongestSubstring = function(s) {
  let map = new Map(),
    max = 0
  for (let i = 0, j = 0; j < s.length; j++) {
    if (map.has(s[j])) {
      i = Math.max(map.get(s[j]) + 1, i)
    }
    max = Math.max(max, j - i + 1)
    map.set(s[j], j)
  }
  return max
}
```

### 搜索二维矩阵

```js
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true

// 查询搜索、减枝、二分、
// 定义左右两个指针、使用while循环
var searchMatrix = function(matrix, target) {
    const m = matrix.length, n = matrix[0].length;
    let x = 0, y = n - 1;
    while (x < m && y >= 0) {
        if (matrix[x][y] === target) {
            return true;
        }
        if (matrix[x][y] > target) {
            --y;
        } else {
            ++x;
        }
    }
    return false;
};
```

### 异或运算

- 排序数组中的搜索问题，首先想到 二分法 解决
- 寻找重复元素：异或^

- 任何数和 0 做 ^异或运算，结果仍然是原来的数，即 a ^0 = a。
- 任何数和其自身做异或运算，结果是 0，即 a ^a = 0。
- 异或运算满足交换律和结合律

```js
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：
// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
// 示例 1:
// 输入: [2,2,1]
// 输出: 1
// 示例 2:
// 输入: [4,1,2,1,2]
// 输出: 4

var singleNumber = function(nums) {
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    res ^= nums[i]
  }
  return res
}
```

### 有效的括号

```js
// 时间复杂度：O(n)

// 空间复杂度：O(n)
// 首先判断该元素是否是 { 、 ( 、 [ ，直接入栈
// 否则该字符为 } 、 ) 、 ] 中的一种，如果该字符串有效，则该元素应该与栈顶匹配，例如栈中元素有 ({， 如果继续遍历到的元素为 ), 那么当前元素序列为 ({) 是不可能有效的，所以此时与栈顶元素匹配失败，则直接返回 false ，字符串无效
// 当遍历完成时，所有已匹配的字符都已匹配出栈，如果此时栈为空，则字符串有效，如果栈不为空，说明字符串中还有未匹配的字符，字符串无效
const isValid = function(s) {
  let map = {
    '{': '}',
    '(': ')',
    '[': ']'
  }
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i])
    } else if (s[i] !== map[stack.pop()]) {
      return false
    }
  }
  return stack.length === 0
}
```

### 字符串相加

```js
// 从 num1 ，num2 的尾部开始计算，模拟人工加法，保存到 tmp 中；

// 计算 tmp 的个位数，并添加到 result 的头部，这里的 result 是 string 类型，不是 number 类型；

// 计算进位，改成 tmp，进行下次循环

// 索引溢出处理：循环结束，根据 tmp 判断是否有进位，并在 result 头部添加进位 1

// 返回 result
var addStrings = function(num1, num2) {
  let a = num1.length,
    b = num2.length,
    result = '',
    tmp = 0
  while (a || b) {
    a ? (tmp += +num1[--a]) : ''
    b ? (tmp += +num2[--b]) : ''

    result = (tmp % 10) + result
    if (tmp > 9) tmp = 1
    else tmp = 0
  }
  if (tmp) result = 1 + result
  return result
}
// 时间复杂度 O(max(M,N))
// 空间复杂度 O(1)
```

### 堆排序、Top K、中位数

```js
https://github.com/sisterAn/JavaScript-Algorithms/issues/60
```

### js 数组

```js
https://github.com/sisterAn/JavaScript-Algorithms/issues/2
```

### Terminal

Terminal 用 iTerm2 + zsh + oh-my-zsh 的组合，主题是 robbyrussell

Homebrew 必装

autojump 实现目录间快速跳转，想去哪个目录直接 j + 目录名，不用在频繁的 cd 了

zsh-autosuggestions 命令自动建议和补全

zsh-syntax-highlighting 命令行语法高亮

history 命令行记录

zsh-git-prompt git 分支信息提示

### 编辑器和 Terminal

- [**Go2shell**](https://zipzapmac.com/Go2Shell) 在当前文件夹打开 shell
- Terminal 用 [**iTerm2**](https://www.iterm2.com/) + [**zsh**](https://en.wikipedia.org/wiki/Z_shell) + [**oh-my-zsh**](https://github.com/robbyrussell/oh-my-zsh) 的组合，主题是 [robbyrussell](https://github.com/robbyrussell/oh-my-zsh/blob/master/themes/robbyrussell.zsh-theme)

### zsh 插件

- [**Homebrew**](https://brew.sh/index_zh-cn) 必装
- [**autojump**](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/autojump) 实现目录间快速跳转，想去哪个目录直接 j + 目录名，不用在频繁的 cd 了
- [**zsh-autosuggestions**](https://github.com/zsh-users/zsh-autosuggestions) 命令自动建议和补全
- [**zsh-syntax-highlighting**](https://github.com/zsh-users/zsh-syntax-highlighting) 命令行语法高亮
- [**history**](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/history) 命令行记录
- [**zsh-git-prompt**](https://github.com/olivierverdier/zsh-git-prompt) git 分支信息提示

### mac 安装

- cat /etc/shells 查看所有终端类型
- echo \$SHELL 当前使用的终端
- /usr/bin/ruby -e "\$(curl -fsSL https://cdn.jsdelivr.net/gh/ineo6/homebrew-install/install)" 安装 brew 中科大源
- brew install wget 安装 wget
- sh -c "\$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)" 使用 wget 安装 oh-my-zsh
- vim ~/.zshrc 编辑配置

```js
// 配置加入以下：

1、使用默认主题
ZSH_THEME="robbyrussell"

2、高亮、自动提示的包

plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)

# alias ohmyzsh="mate ~/.oh-my-zsh"
#
#自动补全插件
source ~/.oh-my-zsh/plugins/incr/incr.zsh
```

- git clone https://github.com/zsh-users/zsh-syntax-highlighting.git 、 git clone git://github.com/zsh-users/zsh-autosuggestions \$ZSH_CUSTOM/plugins/zsh-autosuggestions 下载 oh-my-zsh 高亮、自动提示的包
- source .zshrc 保存配置

- /bin/zsh -c “\$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)” 进入选源中科大、清华、腾讯、阿里的源

3、github 慢

```js
// sudo vim /etc/hosts
// 进入  http://ping.chinaz.com/github.com  查看最快的然后在sudo vim /etc/hosts中修改保存即可
```

4、zsh 主题全路径显示当前路径

```js
// vim ~/.oh-my-zsh/themes/robbyrussell.zsh-theme
// %{$fg[cyan]%}%c%{$reset_color%}中的%c就是当前文件夹名的意思，把它修改成[$PWD]，整个也就变成了%{$fg[cyan]%}[$PWD]%{$reset_color%}b，$PWD是终端自带变量，值为当前路径，只是把它取出来而已
```
