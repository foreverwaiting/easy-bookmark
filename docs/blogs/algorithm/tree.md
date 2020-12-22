# 搜索思想——DFS & BFS

DFS（Deep First Search）深度优先搜索。结合数据结构就是：用递归的形式，用到了栈结构，先进后出。（一条路递归下去，完事后回溯到上一步选择另一个岔路口重复执行）

BFS（Breath First Search）广度优先搜索。结合数据结构就是：选取状态用队列的形式，出队入队，先进先出。（每遇到岔路口都标记出来）

## 二叉树操作

待续。。。

## 树结构

### 什么是树结构及相关操作

- 树结构类似如下：
```js
let tree = [
  {
    id: '1',
    title: '节点1',
    children: [
      {
        id: '1-1',
        title: '节点1-1'
      },
      {
        id: '1-2',
        title: '节点1-2'
      }
    ]
  },
  {
    id: '2',
    title: '节点2',
    children: [
      {
        id: '2-1',
        title: '节点2-1'
      }
    ]
  }
]
```

- 树结构相关操作

遍历【先序、后序、广度、深度】、转换【tree2list、list2tree】、查找筛选【路径查找、指定节点查找】

### 广度优先遍历

- 思路：维护一个队列。初始值为根节点组成的列表queueArr，取出queueArr第一个元素访问执行操作逻辑若其后代元素如果有的话全部追加到队列最后（重复此步骤）
```js
function treeForeach (tree, func) {
  let node, list = [...tree]
  while (node = list.shift()) {
    func(node)
    node.children && list.push(...node.children)
  }
}
```

### 深度优先遍历

- 思路：循环tree数据，若其后代元素如果有的话，递归调用当前方法。所有的递归都可写成循环
```js
// 递归操作
function treeForeach (tree, func) {
  tree.forEach(data => {
    func(data)
    data.children && treeForeach(data.children, func) // 遍历子树
  })
}
// 循环操作：与广度优先循环实现类似，要维护一个队列，不同的是子节点不追加到队列最后，而是加到队列最前面
function treeForeach (tree, func) {
  let node, list = [...tree]
  while (node = list.shift()) {
    func(node)
    node.children && list.unshift(...node.children)
  }
}
```
### 列表数据结构

如下列表：
```js
let list = [
  {
    id: '1',
    title: '节点1',
    parentId: '',
  },
  {
    id: '1-1',
    title: '节点1-1',
    parentId: '1'
  },
  {
    id: '1-2',
    title: '节点1-2',
	  parentId: '1'
  },
  {
    id: '2',
    title: '节点2',
    parentId: ''
  },
  {
    id: '2-1',
    title: '节点2-1',
  	parentId: '2'
  }
]
```

### 列表转为树

- 思路：节点信息中根据parentId依赖关系转化，把所有非根节点放到对应父节点的chilren数组中，然后把根节点提取出来

```js
function listToTree (list) {
  // id=>node的映射，并新增字段children=[]
  let info = list.reduce((map, node) => (map[node.id] = node, node.children = [], map), {})
  return list.filter(node => {
    // 遍历list给children填值push
    info[node.parentId] && info[node.parentId].children.push(node)
    // 返回没parentId的即为跟节点
    return !node.parentId
  })
}
```

<!-- id=>node的映射 -->
```js
let info = list.reduce(function(map, node) {
    map[node.id] = node;
    node.children = [];
    return map
}, {})
```

### 树转为列表

- 思路：递归或循环

```js
//递归实现
function treeToList (tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node)
    node.level = level + 1
    node.children && treeToList(node.children, result, level + 1)
  })
  return result
}
```

```js
// 循环实现
function treeToList (tree) {
  let node, result = tree.map(node => (node.level = 1, node))
  for (let i = 0; i < result.length; i++) {
    if (!result[i].children) continue
    let list = result[i].children.map(node => (node.level = result[i].level + 1, node))
    result.splice(i+1, 0, ...list)
  }
  return result
}
```

### 树结构筛选

- 思路：过滤符合条件的节点，剪裁掉其它节点。一个节点是否保留在过滤后的树结构中，取决于它以及后代节点中是否有符合条件的节点。可以传入一个函数描述符合条件的节点
```js
function treeFilter (tree, func) {
  // 使用map复制一下节点，避免修改到原树
  return tree.map(node => ({ ...node })).filter(node => {
    node.children = node.children && treeFilter(node.children, func)
    return func(node) || (node.children && node.children.length)
  })
}
```

### 树结构查找节点

- 思路：遍历的过程，遍历到满足条件的节点则返回，遍历完成未找到则返回null

```js
function treeFind (tree, func) {
  for (const data of tree) {
    if (func(data)) return data
    if (data.children) {
      const res = treeFind(data.children, func)
      if (res) return res
    }
  }
  return null
}
```

### 树结构查找节点路径

- 思路：用到回溯法的思想。查找路径要使用先序遍历，维护一个队列存储路径上每个节点的id，假设节点就在当前分支，如果当前分支查不到，则回溯。

```js
function treeFindPath (tree, func, path = []) {
  if (!tree) return []
  for (const data of tree) {
    path.push(data.id)
    if (func(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(data.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}
```

```js
// 查找多条节点路径
function treeFindPath (tree, func, path = [], result = []) {
  for (const data of tree) {
    path.push(data.id)
    func(data) && result.push([...path])
    data.children && treeFindPath(data.children, func, path, result)
    path.pop()
  }
  return result
}
```
