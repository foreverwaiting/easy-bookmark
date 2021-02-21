# typescript

## TS泛型基础知识

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
interface IResponseData<T>{
    code: number;
    message?: string;
    data: T;
}

// 用户接口
interface IResponseUserData{
    id: number;
    username: string;
    email: string;
}

// 文章接口
interface IResponseArticleData{
    id: number;
    title: string;
    author: IResponseUserData; 
} 

async function getData<U>(url: string){
    let response = await fetch(url);
    let data: Promise<IResponseData<U>> = await response.json(); // 注意这里返回的是个Promise，然后我们根据不同的接口，指定不同的data数据格式
    return data;
} 

(async function(){
    let userData = await getData<IResponseUserData>('/user');
    userData.data.username;

    let articleData = await getData<IResponseArticleData>('/article');
    articleData.data.author.email;
})()  

```

## typescript