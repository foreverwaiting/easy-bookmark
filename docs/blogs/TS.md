# typescript

## TS 泛型基础知识

### 在函数中使用泛型

```js
// 在方法执行的括号前加上尖括号，指定类型就可以了(可以省略尖括号，ts会类型推断，但不建议这么做)，这样也约束了参数的类型，这就是最基本最基础的一个使用方式了
function join<T> (a: T, b: T) {
  return `${a} ${b}`;
}

join<number>(1, 2);
join<string>('1', '2');
// join<number>(1, '2'); //这行报错，你都规定是number了，字符串2是什么鬼
// join<string>(1, '2'); //这行也报错，你都规定是string了，数字1是什么鬼


// 数组参数（约束数组每一项的类型）
function getArr<T>(arr: T[]) {
  return arr;
}

getArr<number>([1, 2, 3]) //指定了number，那我的数组必须每一项也是number，如果不是就报错
getArr<string>(['g', 'q', 'f']) //同理这里指定了string


// 获取对象对应key的value，那大家都知道使用obj[key]就可以了，但有的对象我们并不知道有没有这个key，用泛型的话可以很好的解决这个问题
function getVal<T>(obj: T, k: keyof T){
  return obj[k];
}

interface Person {
  name: string;
  age: number;
}

getVal<Person>({
  name: 'gqf',
  age: 29
}, 'age') // 这里的key值只能传name或者age，否则就会报错，这个就是泛型的力量



// 可以改造成必须拼接数字和字符串，这里可以使用多个泛型的语法
function manyTest<K, V>(a: K, b: V) {
  return `${a} ${b}`
}

manyTest<number, string>(1, '2') //泛型指定了第一个参数是数字，第二个参数是字符串，所以对应的参数也要这么传
```

### 在类中使用泛型

```js
// 泛型继承接口了，我们可以规定数组中的每一项必须是个对象，且有规定的格式
interface Skill {
  name: string;
  canDamage: boolean; // 是否是直接造成伤害的技能
}

class DesignHero<T extends Skill> { // 规定了数组每一项的Skill技能，要遵循接口的格式，有name和canDamage字段
  constructor(private skills: T[]){}

  getSkillName (index: number) {
    console.log(this.skills[index].name)
    return this.skills[index].name;
  }
}

const finalHero = new DesignHero([
  {
    name: '一技能',
    canDamage: true,
  },
  {
    name: '二技能',
    canDamage: false,
  },
  {
    name: '三技能',
    canDamage: false,
  },
  {
    name: '四技能',
    canDamage: true,
  }
])

finalHero.getSkillName(0)
```

### 在接口中使用泛型

```js
// 该接口的data项的具体格式不确定，不同的接口会返回的数据是不一样的，当我们想根据具体当前请求的接口返回具体data格式的时候，就比较麻烦了，因为getData并不清楚你调用的具体接口是什么，对应的数据又会是什么，这个时候我们可以对IResponseData使用泛型，完整代码如下
interface IResponseData<T> {
  code: number;
  message?: string;
  data: T;
}

// 用户接口
interface IResponseUserData {
  id: number;
  username: string;
  email: string;
}

// 文章接口
interface IResponseArticleData {
  id: number;
  title: string;
  author: IResponseUserData;
}

async function getData<U>(url: string) {
  let response = await fetch(url)
  let data: Promise<IResponseData<U>> = await response.json() // 注意这里返回的是个Promise，然后我们根据不同的接口，指定不同的data数据格式
  return data
}

;(async function() {
  let userData = (await getData) < IResponseUserData > '/user'
  userData.data.username

  let articleData = (await getData) < IResponseArticleData > '/article'
  articleData.data.author.email
})()
```

## typescript

### 交叉类型

```ts
interface Button {
  type: string
  text: string
}

interface Link {
  alt: string
  href: string
}

const linkBtn: Button & Link = {
  type: 'danger',
  text: '跳转到百度',
  alt: '跳转到百度',
  href: 'http://www.baidu.com'
}
```

### 类型别名（type）

```ts
type InnerType = 'default' | 'primary' | 'danger'

interface Button {
  type: InnerType
  text: string
}

interface Alert {
  type: ButtonType
  text: string
}
```

### 类型索引（keyof）

keyof 类似于 Object.keys ，用于获取一个接口中 Key 的联合类型

```ts
interface ButtonStyle {
  color: string
  background: string
}
interface ButtonTypes {
  default: ButtonStyle
  primary: ButtonStyle
  danger: ButtonStyle
}
interface Button {
  type: 'default' | 'primary' | 'danger'
  text: string
}

// 使用 keyof 后，ButtonTypes修改后，type 类型会自动修改
interface Button {
  type: keyof ButtonTypes
  text: string
}
```

### 类型约束（extends）

对泛型加以约束

```ts
type BaseType = string | number | boolean

// 这里表示 copy 的参数
// 只能是字符串、数字、布尔这几种基础类型
function copy<T extends BaseType>(arg: T): T {
  return arg
}
```

extends 经常与 keyof 一起使用，例如我们有一个方法专门用来获取对象的值，但是这个对象并不确定，我们就可以使用 extends 和 keyof 进行约束

```ts
function getValue<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
// 这里的 getValue 方法就能根据传入的参数 obj 来约束 key 的值
const obj = { a: 1 }
const a = getValue(obj, 'a')
const b = getValue(obj, 'b') // 取b会报错
```

### 类型映射（in）

in 关键词的作用主要是做类型的映射，遍历已有接口的 key 或者是遍历联合类型

```ts
// 内置的泛型接口 Readonly如下
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

interface Obj {
  a: string
  b: string
}

type ReadOnlyObj = Readonly<Obj>
```

### 条件类型（U ? X : Y）

如 内置范型接口：

```ts
type Extract<T, U> = T extends U ? T : never
```

```ts
// 通过 Extract 提取这三个公共属性
interface Worker {
  name: string
  age: number
  email: string
  salary: number
}

interface Student {
  name: string
  age: number
  email: string
  grade: number
}

type CommonKeys = Extract<keyof Worker, keyof Student>
// 'name' | 'age' | 'email'
```

### 工具泛型

TypesScript 中内置了很多工具泛型，前面介绍过 Readonly、Extract 这两种，内置的泛型在 TypeScript 内置的 lib.es5.d.ts 中都有定义，所以不需要任何依赖都是可以直接使用的

1、Partial

Partial 用于将一个接口的所有属性设置为可选状态，首先通过 keyof T，取出类型变量 T 的所有属性，然后通过 in 进行遍历，最后在属性后加上一个 ?。

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

```ts
import React from 'react'

interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  text: string
  disabled: boolean
  onClick: () => void
}

// 将按钮组件的 props 的属性都改为可选
const render = (props: Partial<ButtonProps> = {}) => {
  const baseProps = {
    disabled: false,
    type: 'button',
    text: 'Hello World',
    onClick: () => {}
  }
  const options = { ...baseProps, ...props }
  return (
    <button
      type={options.type}
      disabled={options.disabled}
      onClick={options.onClick}
    >
      {options.text}
    </button>
  )
}
Required
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

2、Record

Record 接受两个类型变量，Record 生成的类型具有类型 K 中存在的属性，值为类型 T

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

```ts
// 有个商品列表的数组，要在商品列表中找到商品名为 「每日坚果」的商品，我们一般通过遍历数组的方式来查找，比较繁琐，为了方便，我们就会把这个数组改写成对象。
interface Goods {
  id: string
  name: string
  price: string
  image: string
}

const goodsMap: Record<string, Goods> = {}
const goodsList: Goods[] = await fetch('server.com/goods/list')

goodsList.forEach(goods => {
  goodsMap[goods.name] = goods
})
```

3、Pick

Pick 主要用于提取接口的某几个属性

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

```ts
interface Todo {
  title: string
  completed: boolean
  description: string
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

4、Exclude

Exclude 的作用与之前介绍过的 Extract 刚好相反，如果 T 中的类型在 U 不存在，则返回，否则抛弃

```ts
type Exclude<T, U> = T extends U ? never : T
```

```ts
interface Worker {
  name: string
  age: number
  email: string
  salary: number
}

interface Student {
  name: string
  age: number
  email: string
  grade: number
}
// 取出的是 Worker 在 Student 中不存在的 salary
type ExcludeKeys = Exclude<keyof Worker, keyof Student>
// 'salary'
```

5、Omit

Omit 的作用刚好和 Pick 相反，先通过 Exclude<keyof T, K> 先取出类型 T 中存在，但是 K 不存在的属性，然后再由这些属性构造一个新的类型

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

```ts
interface Todo {
  title: string
  completed: boolean
  description: string
}

type TodoPreview = Omit<Todo, 'description'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
}
```

待续
