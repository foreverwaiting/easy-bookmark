# react 学习

## react 基础入门

### HTML 模板

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="../build/react.development.js"></script> React核心库
    <script src="../build/react-dom.development.js"></script> 提供DOM相关功能
    <script src="../build/babel.min.js"></script> 将JSX语法转化为JavaScript语法
  </head>
  <body>
    <!-- 将一个 h1 标题，插入 example 节点 -->
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

- type="text/babel"： script 标签的 type 属性为 text/babel 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/babel" 。

### ReactDOM.render()

- ReactDOM.render： 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

### JSX 语法

- JSX 的语法： HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法。

- JSX 的基本语法规则： 遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。

```js
var names = ['Alice', 'Emily', 'Kate'];

ReactDOM.render(
  <div>
  {
    names.map(function (name) {
      return <div>Hello, {name}!</div>
    })
  }
  </div>,
  document.getElementById('example')
);

```

- JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员

```js
var arr = [
  <h1>Hello world!</h1>,
  <h2>React is awesome</h2>,
];
ReactDOM.render(
  <div>{arr}</div>,
  document.getElementById('example')
);
```

### 组件

- 组件React.createClass： 组件类的第一个字母必须大写，否则会报错。组件类只能包含一个顶层标签，否则也会报错。

```js
// 变量 HelloMessage 就是一个组件类
// 所有组件类都必须有自己的 render 方法，用于输出组件。
var HelloMessage = React.createClass({
  render: function() {
    return <h1>Hello {this.props.name}</h1>;
  }
});
// 模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例

// 组件的用法与原生的 HTML 标签完全一致，可以任意加入属性。如下的name，添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。
ReactDOM.render(
  <HelloMessage name="John" />,
  document.getElementById('example')
);
```

- 组件的属性可以在组件类的 this.props 对象上获取。

```js
// 如上组件<HelloMessage name="John" />的属性可在组件类通过this.props对象上获取
var HelloMessage = React.createClass({
  render: function() {
    return <h1>
      Hello {this.props.name}
    </h1><p>
      some text
    </p>;
  }
});
```

### this.props.children

- this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点。

```js
// this.props.children 的值有三种可能:处理 this.props.children 的时候要小心。
    // 当前组件没有子节点，它就是 undefined
    // 有一个子节点，数据类型是 object
    // 有多个子节点，数据类型就是 array
var NotesList = React.createClass({
  render: function() {
    return (
      <ol>
      {
        React.Children.map(this.props.children, function (child) {
          return <li>{child}</li>;
        })
      }
      </ol>
    );
  }
});
// React 提供一个工具方法 React.Children 来处理 this.props.children
    // 可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

### PropTypes

- PropTypes：组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求，组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

```js
// PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。通不过验证时。控制台会显示一行错误信息
var MyTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

// getDefaultProps 方法可以用来设置组件属性的默认值。设置title默认值。
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
ReactDOM.render(
  <MyTitle />,
  document.body
);
```

### 获取真实的DOM节点

- 获取真实的DOM节点：有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性。

::: tip DOM diff
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
:::

```js
// 由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus();
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);
```

### this.state

- 组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI

```js
// LikeButton 组件
// getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。
// 用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});
ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

- this.props 和 this.state: this.props 表示那些一旦定义，就不再改变的特性，，this.state 是会随着用户互动而产生变化的特性

### 表单

- 用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取

```js
// 文本输入框的值，不能用 this.props.value 读取
// 定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况
var Input = React.createClass({
  getInitialState: function() {
    return {value: 'Hello!'};
  },
  handleChange: function(event) {
    this.setState({value: event.target.value});
  },
  render: function () {
    var value = this.state.value;
    return (
      <div>
        <input type="text" value={value} onChange={this.handleChange} />
        <p>{value}</p>
      </div>
    );
  }
});

ReactDOM.render(<Input/>, document.body);
```

### 组件的生命周期

基础状态：will 函数在进入状态之前调用，did 函数在进入状态之后调用
- Mounting：已插入真实 DOM
    - componentWillMount()
    - componentDidMount()
- Updating：正在被重新渲染
    - componentWillUpdate(object nextProps, object nextState)
    - componentDidUpdate(object prevProps, object prevState)
- Unmounting：已移出真实 DOM
    - componentWillUnmount()
两种特殊状态的处理函数：
- componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
- shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

```js
// 在hello组件加载以后，通过 componentDidMount 方法设置一个定时器，每隔100毫秒，就重新设置组件的透明度，从而引发重新渲染。
var Hello = React.createClass({
  getInitialState: function () {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
});

ReactDOM.render(
  <Hello name="world"/>,
  document.body
);
```

### Ajax

- 使用 componentDidMount 方法设置 Ajax 请求
- 请求成功，再用 this.setState 方法重新渲染 UI 

```js
var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.body
);



// 
// 从Github的API抓取数据，然后将Promise对象作为属性，传给RepoList组件
ReactDOM.render(
  <RepoList
    promise={$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars')}
  />,
  document.body
);
// 如果Promise对象正在抓取数据（pending状态），组件显示"正在加载"；如果Promise对象报错（rejected状态），组件显示报错信息；如果Promise对象抓取数据成功（fulfilled状态），组件显示获取的数据。
var RepoList = React.createClass({
  getInitialState: function() {
    return { loading: true, error: null, data: null};
  },

  componentDidMount() {
    this.props.promise.then(
      value => this.setState({loading: false, data: value}),
      error => this.setState({loading: false, error: error}));
  },

  render: function() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    }
    else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    }
    else {
      var repos = this.state.data.items;
      var repoList = repos.map(function (repo) {
        return (
          <li>
            <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count} stars) <br/> {repo.description}
          </li>
        );
      });
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      );
    }
  }
});
```





## Redux

### 设计思想

（1）Web 应用是一个状态机，视图与状态是一一对应的。

（2）所有的状态，保存在一个对象里面。

### 基本概念-Store

- 保存数据的地方，可以把它看成一个容器。整个应用只能有一个 Store
- 提供createStore函数，用来生成 Store
```js
// createStore函数接受另一个函数作为参数，返回新生成的 Store 对象
import { createStore } from 'redux';
const store = createStore(fn);
```

### 基本概念-State

- Store对象包含所有数据：如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
- 当前时刻的 State，可以通过store.getState()拿到
```js
// 一个 State 对应一个 View。只要 State 相同，View 就相同
import { createStore } from 'redux';
const store = createStore(fn);

const state = store.getState();
```

### 基本概念-Action

- Action 就是 View 发出的通知，表示 State 应该要发生变化了。State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。
- Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置
```js
// Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。
// Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

### 基本概念-Action Creator

- View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。、
```js
// addTodo函数就是一个 Action Creator。
const ADD_TODO = '添加 TODO';
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux');
```

### 基本概念-store.dispatch()

- store.dispatch()是 View 发出 Action 的唯一方法。
```js
// store.dispatch接受一个 Action 对象作为参数，将它发送出去。
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
// 结合 Action Creator，这段代码可以改写如下。
store.dispatch(addTodo('Learn Redux'));
```

### 基本概念-Reducer

- Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

```js
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

- 整个应用的初始状态，可以作为 State 的默认值

```js
// reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});

// 实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
// createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
import { createStore } from 'redux';
const store = createStore(reducer);
```

- 为什么这个函数叫做 Reducer 呢?因为它可以作为数组的reduce方法的参数

```js
// 一系列 Action 对象按照顺序作为一个数组
// 数组actions表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态3
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];

const total = actions.reduce(reducer, 0); // 3
```

### 基本概念-纯函数

- Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

::: tip
纯函数是函数式编程的概念，必须遵守以下一些约束:
不得改写参数
不能调用系统 I/O 的API
不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
:::

- 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象

```js
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
// 最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。
```

### 基本概念-store.subscribe()

- Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```js
// 显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);
```

- store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

```js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

### 基本概念-Store 的实现

- Redux 涉及的基本概念，可以发现 Store 提供了三个方法。
store.getState()
store.dispatch()
store.subscribe()

```js
import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);
```

- createStore方法还可以接受第二个参数，表示 State 的最初状态。这通常是服务器给出的。

```js
let store = createStore(todoApp, window.STATE_FROM_SERVER)
```

### 基本概念-Reducer 的拆分

- Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大。

- Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

```js
// 通过combineReducers方法将三个子 Reducer 合并成一个大的函数。
// 这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名
import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;
// 总之，combineReducers()做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象。
```

### 基本概念-Redux 的工作流程总结

<img :src="$withBase('/react.jpg')" alt="react">

- 首先，用户发出 Action：store.dispatch(action);

- 然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State ：let nextState = todoApp(previousState, action);

- State 一旦有变化，Store 就会调用监听函数：store.subscribe(listener);

- listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

```js
function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
```

- 实例：计数器

```js
// 作用就是把参数value的值，显示在网页上
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);
// 为Counter添加递增和递减的 Action。
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};
// Store 的监听函数设置为render，每次 State 的变化都会导致网页重新渲染。
render();
store.subscribe(render);
```

### Redux 的基本做法：

- 用户发出 Action，Reducer 函数算出新的 State，View 重新渲染。
- 但一个关键问题没有解决：异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。
- 怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。

### 中间件-中间件的概念

- 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

### 中间件-中间件的用法

- 常用的中间件都有现成的，只要引用别人写好的模块即可

```js
// 怎么使用中间件
// redux-logger提供一个生成器createLogger，可以生成日志中间件logger
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
const logger = createLogger();
// 将它放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。 
const store = createStore(
  reducer,
  applyMiddleware(logger)
);

// （1）createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
);
// （2）中间件的次序有讲究。
// applyMiddleware方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
);
```

### 中间件-applyMiddlewares()

- applyMiddlewares:  Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。

- 所有中间件被放进了一个数组chain，然后嵌套执行，最后执行store.dispatch。可以看到，中间件内部（middlewareAPI）可以拿到getState和dispatch这两个方法。

### 中间件-异步操作的基本思路

- 同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。操作发起时的 Action操作成功时的 Action操作失败时的 Action

### 中间件-redux-thunk 中间件

- 异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？

- 使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch


### 异步操作-redux-promise 中间件

- 异步操作的解决方案，就是让 Action Creator 返回一个 Promise 对象。

- 如果 Action 本身是一个 Promise，它 resolve 以后的值应该是一个 Action 对象，会被dispatch方法送出（action.then(dispatch)），但reject 以后不会有任何动作；如果 Action 对象的payload属性是一个 Promise 对象，那么无论 resolve 和 reject，dispatch方法都会发出 Action。

### React-Redux用法-组件分类

- 组件分成两大类：UI 组件（presentational component）和容器组件（container component）。UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

- 如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。

1、UI 组件：
  只负责 UI 的呈现，不带有任何业务逻辑
  没有状态（即不使用this.state这个变量）
  所有数据都由参数（this.props）提供
  不使用任何 Redux 的 API

2、容器组件
  负责管理数据和业务逻辑，不负责 UI 的呈现
  带有内部状态
  使用 Redux 的 API

你可能会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。

React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

### React-Redux用法-connect()

- React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

```js
// TodoList是 UI 组件，VisibleTodoList就是由 React-Redux 通过connect方法自动生成的容器组件。
import { connect } from 'react-redux'
const VisibleTodoList = connect()(TodoList);
```

```js
// connect方法的完整 API 
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。

// 定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
```

### React-Redux用法-mapStateToProps()

- mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。

```js
// mapStateToProps是一个函数，它接受state作为参数，返回一个对象。
// 对象有一个todos属性，代表 UI 组件的同名参数，后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

// getVisibleTodos
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

// mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。

// 容器组件的代码
//    <FilterLink filter="SHOW_ALL">
//      All
//    </FilterLink>

// 使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
// connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
```

### React-Redux用法-mapDispatchToProps()

- mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

```js
// 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
// mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。


// 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

### React-Redux用法-Provider 组件

- 让容器组件拿到state: connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。一种解决方法是将state对象作为参数，传入容器组件。但是，这样做比较麻烦，尤其是容器组件可能在很深的层级，一级级将state传下去就很麻烦。React-Redux 提供Provider组件，可以让容器组件拿到state。

```js
// Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。

// 它的原理是React组件的context属性

// store放在了上下文对象context上面。然后，子组件就可以从context拿到store
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### React-Redux用法-实例：计数器

- 1、计数器组件，它是一个纯的 UI 组件

```js
// 这个 UI 组件有两个参数：value和onIncreaseClick。前者需要从state计算得到，后者需要向外发出 Action。
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}
```

- 2、定义value到state的映射，以及onIncreaseClick到dispatch的映射。

```js
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Action Creator
const increaseAction = { type: 'increase' }
```

- 3、使用connect方法生成容器组件。

```js
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

- 4、定义这个组件的 Reducer。

```js
// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}
```

- 5、生成store对象，并使用Provider在根组件外面包一层

```js
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
  todoApp,
  persistedState
);

store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos,
  })
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### redux完整示例

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```


### React 钩子-React 的两套 API

- 类（class）API 和基于函数的钩子（hooks） API
- 官方推荐使用钩子（函数），而不是类。因为钩子更简洁，代码量少，用起来比较"轻"，而类比较"重"。而且，钩子是函数，更符合 React 函数式的本质。

```js
// 任何一个组件，可以用类来写，也可以用钩子来写
// 类的写法。
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
// 钩子的写法，也就是函数。
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
### React 钩子-类和函数的差异

类组件和函数组件是有差异的。不同的写法，代表了不同的编程方法论:

- 类（class）是数据和逻辑的封装。 也就是说，组件的状态和操作方法是封装在一起的。如果选择了类的写法，就应该把相关的数据和操作，都写在同一个 class 里面。
class ---> Methods + Variable

- 函数一般来说，只应该做一件事，就是返回一个值。 如果你有多个操作，每个操作应该写成一个单独的函数。而且，数据的状态应该与操作方法分离。根据这种理念，React 的函数组件只应该做一件事情：返回组件的 HTML 代码，而没有其他的功能。

input x ---> Function f ---> output x

- 这个函数只做一件事，就是根据输入的参数，返回组件的 HTML 代码。这种只进行单纯的数据计算（换算）的函数，在函数式编程里面称为 "纯函数"（pure function）。

### React 钩子-副效应是什么？

- 疑问：如果纯函数只能进行数据计算，那些不涉及计算的操作（比如生成日志、储存数据、改变应用状态等等）应该写在哪里呢？

- 函数式编程将那些跟数据计算无关的操作，都称为 "副效应" （side effect） 。如果函数内部直接包含产生副效应的操作，就不再是纯函数了，我们称之为不纯的函数。

- 纯函数内部只有通过间接的手段（即通过其他函数调用），才能包含副效应。

### React 钩子-钩子（hook）的作用

- 钩子（hook）就是 React 函数组件的副效应解决方案，用来为函数组件引入副效应。

- 函数组件的主体只应该用来返回组件的 HTML 代码，所有的其他操作（副效应）都必须通过钩子引入。

- 由于副效应非常多，所以钩子有许多种。React 为许多常见的操作（副效应），都提供了专用的钩子。
    - useState()：保存状态
    - useContext()：保存上下文
    - useRef()：保存引用
    - ......

- 上面这些钩子，都是引入某种特定的副效应，而 `useEffect()` 是通用的副效应钩子 。找不到对应的钩子时，就可以用它。其实，从名字也可以看出来，它跟副效应（side effect）直接相关。

### React 钩子-useEffect() 的用法

- useEffect()本身是一个函数，由 React 框架提供，在函数组件内部调用即可。

```js
// 举例来说，我们希望组件加载以后，网页标题（document.title）会随之改变。那么，改变网页标题这个操作，就是组件的副效应，必须通过useEffect()来实现。
// 组件加载以后，React 就会执行这个函数
import React, { useEffect } from 'react';

// useEffect()的参数是一个函数，它就是所要完成的副效应（改变网页标题）
function Welcome(props) {
  useEffect(() => {
    document.title = '加载完成';
  });
  return <h1>Hello, {props.name}</h1>;
}
// useEffect()的作用就是指定一个副效应函数，组件每渲染一次，该函数就自动执行一次。组件首次在网页 DOM 加载后，副效应函数也会执行。
```

### React 钩子-useEffect() 的第二个参数

- 有时候，我们不希望useEffect()每次渲染都执行，这时可以使用它的第二个参数，使用一个数组指定副效应函数的依赖项，只有依赖项发生变化，才会重新渲染。

```js
// useEffect()的第二个参数是一个数组，指定了第一个参数（副效应函数）的依赖项（props.name）。只有该变量发生变化时，副效应函数才会执行。
function Welcome(props) {
  useEffect(() => {
    document.title = `Hello, ${props.name}`;
  }, [props.name]);
  return <h1>Hello, {props.name}</h1>;
}
// 如果第二个参数是一个空数组，就表明副效应参数没有任何依赖项。因此，副效应函数这时只会在组件加载进入 DOM 后执行一次，后面组件重新渲染，就不会再次执行。
// 这很合理，由于副效应不依赖任何变量，所以那些变量无论怎么变，副效应函数的执行结果都不会改变，所以运行一次就够了。
```

### React 钩子-useEffect() 的用途

只要是副效应，都可以使用useEffect()引入。它的常见用途有下面几种。

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // useState()用来生成一个状态变量（data），保存获取的数据；
  const [data, setData] = useState({ hits: [] });
  // useEffect()的副效应函数内部有一个 async 函数，用来从服务器异步获取数据。
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux',
      );
      // 拿到数据以后，再用setData()触发组件的重新渲染。
      setData(result.data);
    };

    fetchData();
  }, []);
  // 由于获取数据只需要执行一次，所以上例的useEffect()的第二个参数为一个空数组。

  return (
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
```

### React 钩子-useEffect() 的返回值

- 副效应是随着组件加载而发生的，那么组件卸载时，可能需要清理这些副效应。

- useEffect()允许返回一个函数，在组件卸载时，执行该函数，清理副效应。如果不需要清理副效应，useEffect()就不用返回任何值。

```js
// useEffect()在组件加载时订阅了一个事件，并且返回一个清理函数，在组件卸载时取消订阅。
// 实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

### React 钩子-useEffect() 的注意点

- 使用useEffect()时，有一点需要注意。如果有多个副效应，应该调用多个useEffect()，而不应该合并写在一起。

```js
function App() {
  const [varA, setVarA] = useState(0);
  const [varB, setVarB] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setVarA(varA + 1), 1000);
    return () => clearTimeout(timeout);
  }, [varA]);

  useEffect(() => {
    const timeout = setTimeout(() => setVarB(varB + 2), 2000);

    return () => clearTimeout(timeout);
  }, [varB]);

  return <span>{varA}, {varB}</span>;
}
```

### React Hooks-组件类的缺点

- React 的核心是组件。v16.8 版本之前，组件的标准写法是类（class）。其缺点：代码太重
    - 大型组件很难拆分和重构，也很难测试。
    - 业务逻辑分散在组件的各个方法之中，导致重复逻辑或关联逻辑。
    - 组件类引入了复杂的编程模式，比如 render props 和高阶组件。


### React Hooks-函数组件

- 组件的最佳写法应该是函数，而不是类。但是，这种写法有重大限制，必须是纯函数，不能包含状态，也不支持生命周期方法，因此无法取代类。

- React Hooks 的设计目的，就是加强版函数组件，完全不使用"类"，就能写出一个全功能的组件。

### React Hooks-Hook 的含义

- React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。

- React 默认提供了一些常用钩子，你也可以封装自己的钩子。

- 所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用use前缀命名，便于识别。

- 下面介绍 React 默认提供的四个最常用的钩子。
    - useState()
    - useContext()
    - useReducer()
    - useEffect()

### React Hooks-useState()：状态钩子

- useState()用于为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。

```js
// useState()这个函数：接受状态的初始值，作为参数
// useState()这个函数：返回一个数组，数组的第一个成员是一个变量（上例是buttonText），指向状态的当前值。第二个成员是一个函数，用来更新状态，约定是set前缀加上状态的变量名（上例是setButtonText）。
import React, { useState } from "react";

export default function  Button()  {
  const  [buttonText, setButtonText] =  useState("Click me,   please");

  function handleClick()  {
    return setButtonText("Thanks, been clicked!");
  }

  return  <button  onClick={handleClick}>{buttonText}</button>;
}
```

### React Hooks-useContext()：共享状态钩子

- 需要在组件之间共享状态，可以使用useContext()。

```js
// 有两个组件 Navbar 和 Messages，我们希望它们之间共享状态。
<div className="App">
  <Navbar/>
  <Messages/>
</div>

// 第一步就是使用 React Context API，在组件外部建立一个 Context。
const AppContext = React.createContext({});

// 组件封装代码如下
// AppContext.Provider提供了一个 Context 对象，这个对象可以被子组件共享。
<AppContext.Provider value={{
  username: 'superawesome'
}}>
  <div className="App">
    <Navbar/>
    <Messages/>
  </div>
</AppContext.Provider>

// Navbar 组件的代码如下
// useContext()钩子函数用来引入 Context 对象，从中获取username属性。
const Navbar = () => {
  const { username } = useContext(AppContext);
  return (
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  );
}

// Message 组件的代码也类似。
// useContext()钩子函数用来引入 Context 对象，从中获取username属性。
const Messages = () => {
  const { username } = useContext(AppContext)
  return (
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}
```

### React Hooks-useReducer()：action 钩子

- React 本身不提供状态管理功能，通常需要使用外部库。这方面最常用的库是 Redux。Redux 的核心概念是，组件发出 action 与状态管理器通信。状态管理器收到 action 以后，使用 Reducer 函数算出新的状态，Reducer 函数的形式是(state, action) => newState。

- useReducers()钩子用来引入 Reducer 功能。

```js
// useReducer()的基本用法，它接受 Reducer 函数和状态的初始值作为参数，返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action 的dispatch函数。
const [state, dispatch] = useReducer(reducer, initialState);

// 计数器的例子。用于计算状态的 Reducer 函数如下。
const myReducer = (state, action) => {
  switch(action.type)  {
    case('countUp'):
      return  {
        ...state,
        count: state.count + 1
      }
    default:
      return  state;
  }
}

// 组件代码如下
function App() {
  const [state, dispatch] = useReducer(myReducer, { count:   0 });
  return  (
    <div className="App">
      <button onClick={() => dispatch({ type: 'countUp' })}>
        +1
      </button>
      <p>Count: {state.count}</p>
    </div>
  );
}
```

::: tip 
由于 Hooks 可以提供共享状态和 Reducer 函数，所以它在这些方面可以取代 Redux。但是，它没法提供中间件（middleware）和时间旅行（time travel），如果你需要这两个功能，还是要用 Redux。
:::

### React Hooks-useEffect()：副作用钩子

- useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前，放在componentDidMount里面的代码，现在可以放在useEffect()。

```js
// useEffect()接受两个参数。
    // 第一个参数是一个函数，异步操作的代码放在里面
    // 第二个参数是一个数组，用于给出 Effect 的依赖项，只要这个数组发生变化，useEffect()就会执行。
    // 第二个参数可以省略，这时每次组件渲染时，就会执行useEffect()。
const Person = ({ personId }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});

  useEffect(() => {
    setLoading(true); 
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId])

  if (loading === true) {
    return <p>Loading ...</p>
  }

  return <div>
    <p>You're viewing: {person.name}</p>
    <p>Height: {person.height}</p>
    <p>Mass: {person.mass}</p>
  </div>
}
// 上面代码中，每当组件参数personId发生变化，useEffect()就会执行。组件第一次渲染时，useEffect()也会执行。   
```

### React Hooks-创建自己的 Hooks

- Hooks 代码还可以封装起来，变成一个自定义的 Hook，便于共享。

```js
// 封装hook,usePerson()就是一个自定义的 Hook。
const usePerson = (personId) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/people/${personId}/`)
      .then(response => response.json())
      .then(data => {
        setPerson(data);
        setLoading(false);
      });
  }, [personId]);  
  return [loading, person];
};

// Person 组件改用这个新的钩子，引入封装的逻辑
const Person = ({ personId }) => {
  const [loading, person] = usePerson(personId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>You're viewing: {person.name}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
    </div>
  );
};
```

### umi3 使用 dva

技术架构：Ts、dva、

dva中主要分3层，models,services,components,其中models是最重要概念，这里放的是各种数据，与数据交互的应该都是在这里。services是请求后台接口的方法。components是组件了。

```js
// model的基本结构
{   
  namespace: String, // 命名空间名字，必填     
  //namespace: 'global' 说明以下此处的dva命名空间为 global，即你调用的时候需要采用 global.XXX 的形式   
  state: Object, // 状态   
  reducer: Object, // 同步更新 state 修改状态  
  effects: Object, // 副作用：处理异步逻辑     
  //当数据需要从服务器获取时，需要发起异步请求，请求到数据之后，通过调用 Reducers更新数据到全局state   
  subscriptions: Object // 订阅数据源
}
```
- 1、reducer：用来处理同步操作。如果不需要调接口时候，我们前台传递的 action可以直接调用 reducers里的方法。
  - reducer是一个函数，接收state 和 action，返回老的或新的state。
  ```js
  save(state, action) {
    return { …state, …action.payload }; 
  },
  ```
  - state:为当前 Model 下的所有 state 值
  - action:当前台页面需要进行数据操作时，就会创建一个 action,action 存放了传递过来需要对当前 state 进行改变的数据。
  ```js
  reducers:{
  changeTitle(state, { payload: { num }){ 
    //changeTitle可以理解为一个方法名 
    //payload:就是 action 里传递过来的数据。
    //num 是传过来的，名字随便起，不是state中的num，这接收一个action
    return {...state,...num}
    //return：返回的是新的 state。等于舍弃了旧的 state,重新 return 一个新的 state 作为当前 Model 的 state。
    //一般情况下，我们要解开旧的 state,将它重新赋值给新的 state。...state 为 ES6 语法。
    //将操作完成得数据累加到 return 中。
    //同名的数据会覆盖，所以不用担心旧的 state 值会影响到新设置的值。
    //不同名的数据会追加。
  },
  ```

  - 页面调用
  ```js
    //页面使用dispatch进行使用
    this.props.dispatch({
        type: 'pageModel/changeTitle',  //namespace+需要调用的reducer方法
        payload: 'Hello World',
      });
    };
  ```

- 2、effects：用来处理异步操作。如果需要调取接口的话，前台页面就需要调用 effects 里的方法。
  - 将数据取出来，在传递给 reducers 里的方法进行数据操作和同步 state。
  - Dva 中的异步操作都放到 effects 中管理，基于 Redux-saga 实现 Effect 是一个 Generator函数，内部使用 yield 关键字，标识每一步的操作
  - 每一个 effect 都可以接收两个参数：
    - 包含 dispatch 携带参数 payload 的 action 对象
    - dva 提供的 effect 函数内部的处理函数集。【常用的有 call: 执行异步函数、put: 发出一个 Action类似于
    dispatch 触发reducer改变state、select: 返回 model 中的 state //用于从state里获取数据】

```js
// 1.call
  *deleteOne({ payload }, { call }) {
  //deleteOne方法名，payload是传来的参数，是个对象，如果没参数可以写成{_,{call, put}}
  //*:这个 * 符号，可能小伙伴们不熟悉，简单点，只要记住每个 effects 里方法前面都加上 * 即可。
  //(这表明它是一个异步函数，里面可以使用 yield 等待其他异步函数执行结果。)

  //payload:当前台页面需要进行数据操作时，就会创建一个 action,
  //action 存放了传递过来需要对当前 state 进行改变的数据。
  //payload 就是存放在 action 里面的数据。
  const rsp = yield call(cardsService.deleteOne,{num:payload.numCount});
  //call:与后台服务端接口进行交互。
  //第一个传参：后台服务器接口对应的名称。第二个参数：入参。
  //cardsService是引入service层那个js的一个名字，num是后台要求传的参数，rsp就是后台返回来的数据
  // 请求成功之后，调用 reducer 更新 state

  service中异步请求(cardsService.js)
  // request 是封装的一个网络请求库  

  async function deleteOne(data) {
   return request("queryFromApi", {
    data,
    method: "post",
    dataType: "payload"
  })}
```

```js
// 2.select
  *deleteOne({ payload }, { select, put }) {
　　 effects:{
      const m = yield select((state) => state.test.num)
      //select就是用来选择上面state里的数据
    }
  }
```

```js
// 3.put
  yield put({
  　type: "addNum",
    // put:用来发出事件，即 action。一般调用 reducers 下的方法进行同步数据。
    //type:该 Model 层里 reducers 下的方法名。
    //payload:参数的传递。
    payload: {
    　 num: data, 
      // 把后台返回的数据赋值给了num
      //假如那个reducer中方法是由这里effects去触发的，那个num名必须是这里名字num，如果reducer中方法不是这触发，那名字可随便起
      return rsp;
    },
  }
```

- 3、subscriptions：订阅监听，比如我们监听路由，进入页面就如何

```js
setup ({ dispatch, history, query }) {
　return history.listen(
　　async ({ pathname, search, query}) => {
　　　if (pathname==="/testdemo") {// 当进入testdemo这路由，就会触发fetchUser方法
　　　　dispatch({ type: "fetchUser" })
　　　}
　})
}
```

- 4、connect：connect 连接 Model 和 Route 页面下的数据

```js
// dva 有提供 connect 方法。只要在每个 Routes 页面导入下面的代码即可。
import { connect } from 'dva';

// 对于组件：我们在最后导出时使用 connect 进行与 Models 的连接。
// index 为 Model 层里面的 namespace。命名空间
export default connect(({index}) => ({index}))(IndexPage);
```

- 5、前台调用 Model 层方法

```js
const { dispatch } = this.props; 
//在 dva 中，可以通过 `this.props` 直接取得 `dispatch`
dispatch ({
  type:'example/fetch',  //指定哪个 model 层里面的哪个 方法
  payload:{name:'exampleNew'}, 
  //需要传递到 model 层里面的参数。
  //payload 为固定用法(我自己的理解)。
})

// parame和query传值:
// query更加类似于我们ajax中get传参，params则类似于post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示
```

- [dva github](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)
- [使用dva与服务端进行数据交互](https://www.ahwgs.cn/ruheshiyongdvayufuwuduanjinxingshujujiaohu.html)

## react native

## Next ssr