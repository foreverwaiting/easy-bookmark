# 每日

日益增长

## 2021-09

### 2021-09-12

- 文件上传，断点上传：https://mp.weixin.qq.com/s/hOkxwjSHGZ-3oXyN3CwwqQ

  - https://panjiachen.github.io/awesome-bookmarks/diary/read.html#%E4%BA%94%E6%9C%88

- 埋点：https://mp.weixin.qq.com/s/ithQ2DDFvTfpuaixH8pt2A

  - ut 打点上报，sls、odps 日志存储（流量染色），traceId 透传注入

- Bundleless【组件动态加载】： https://mp.weixin.qq.com/s/1v9UX_z27_lioId1ZSEcDQ

- graphQl 网关与 cdn：https://mp.weixin.qq.com/s/ZO1Vpslk3-17YxUVt9Vhrw

- js 数据类型转换：https://mp.weixin.qq.com/s/NN8DiH9ATZ2RuaDjlls-aw

- 监控页面白屏：https://mp.weixin.qq.com/s/q1oXKJCAW7NQjaF0MP3vuA

  - [脚本错误量极致优化-监控上报与 Script error](https://github.com/joeyguo/blog/issues/13)
  - [Webpack 打包后代码执行时机分析与优化](https://github.com/joeyguo/blog/issues/21)
  - [前端资源加载失败优化](http://www.alloyteam.com/2021/01/15358/)

- jest 测试：http://www.alloyteam.com/2020/02/14255/

- h5 闪开：http://www.alloyteam.com/2020/06/fast-open-h5/

### 2021-09-11

- css: https://qishaoxuan.github.io/css_tricks/createTriangle/

- vim：https://shanyue.tech/op/vim-setting.html#%E5%B0%8F%E7%BB%93

- 浏览器工作原理：https://cloud.tencent.com/developer/article/1360028

#### 命令

1、rimfaf 【https://github.com/isaacs/rimraf】用于在构建之前清除 dist 目录文件内容。如：

```json
"scripts": {
  "build": "npm run lint && rimraf dist types && gulp",
}
```

2、create a directory recursively 递归的创建目录：【https://github.com/substack/node-mkdirp】

```js
var mkdirp = require('mkdirp')
mkdirp('/tmp/foo/bar/baz', function(err) {
  if (err) console.error(err)
  else console.log('pow!')
})
// And now /tmp/foo/bar/baz exists, huzzah!
```

#### Github Actions

Travis、Gitlab CI / CD 以及 Jenkins

在 .github/workflows 下新增 mian.yml 配置文件:

```yml
# 以下都是官方文档的简单翻译
# 当前的 yml（.yaml） 文件是一个 workflow，是持续集成一次运行的一个过程，必须放置在项目的 .github/workflow 目录下
# 如果不清楚 .yml 文件格式语法，可以查看 https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes
# 初次编写难免会产生格式问题，可以使用 VS Code 插件进行格式检测，https://marketplace.visualstudio.com/items?itemName=OmarTawfik.github-actions-vscode

# 具体各个配置属性可查看 https: //docs.github.com/en/actions/reference/workflow-syntax-for-github-actions

# workflow 的执行仍然会受到一些限制，例如
#  - 每个 job 最多执行 6 小时（本地机器不受限制）
#  - 每个 workflow 最多执行 72 小时
#  - 并发 job 的数量会受到限制
#  - 更多查看 https: //docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#usage-limits

# name: 当前 workflow 的名称
name: Algorithms

# on:  指定 workflow 触发的 event
#
#      event 有以下几种类型
#         - webhook
#         - scheduled
#         - manual
on:
  # push: 一个 webhook event，用于提交代码时触发 workflow，也可以是触发列表，例如 [push, pull_request]

  #        workflows 触发的 event 大部分是基于 webhook 配置，以下列举几个常见的 webhook:
  #           - delete:  删除一个 branch 或 tag 时触发
  #           - fork / watch:  某人 fork / watch 项目时触发（你问有什么用，发送邮件通知不香吗？）
  #           - pull_request:  提交 PR 时触发
  #           - page_build:  提交 Github Pages-enabled 分支代码时触发
  #           - push:  提交代码到特定分支时触发
  #           - registry_package:  发布或跟新 package 时触发
  #           更多 webhook 可查看 https: //docs.github.com/en/actions/reference/events-that-trigger-workflows
  #           从这里可以看出 Git Actions 的一大特点就是 Gihub 官方提供的一系列 webhook
  push:
    # branches: 指定 push 触发的特定分支，这里你可以通过列表的形式指定多个分支
    branches:
      - feat/framework
    #
    # branches 的指定可以是通配符类型，例如以下配置可以匹配 refs/heads/releases/10
    # - 'releases/**'
    #
    # branches 也可以使用反向匹配，例如以下不会匹配 refs/heads/releases/10
    # - '!releases/**'
    #
    # branches-ignore:  只对 [push, pull_request] 两个 webhook 起作用，用于指定当前 webhook 不触发的分支
    # 需要注意在同一个 webhook 中不能和 branches 同时使用
    #
    # tags:  只对 [push, pull_request] 两个 webhook 起作用，用于指定当前 webhook 触发的 tag
    #
    # tags:
    #   - v1             # Push events to v1 tag
    #   - v1.*           # Push events to v1.0, v1.1, and v1.9 tags
    #
    # tags-ignore:  类似于 branches-ignore
    #
    # paths、paths-ignore...
    #
    # 更多关于特定过滤模式可查看 https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet
    #
    # 其他的 webhook 控制项还包括 types（不是所有的 webhook 都有 types），例如已 issues 为例，可以在 issues 被 open、reopened、closed 等情况下触发 workflow
    # 更多 webhook 的 types 可查看 https: //docs.github.com/en/actions/reference/events-that-trigger-workflows#webhook-events
    #
    # on:
    #   issues:
    #     types:  [opened, edited, closed]

  # 除此之外如果对于每个分支有不同的 webhook 触发，则可以通过以下形式进行多个 webhook 配置
  #
  # push:
  #   branches:
  #     - master
  # pull_request:
  #   branches:
  #     - dev
  #
  # 除了以上所说的 webhook event，还有 scheduled event 和 manual event
  # scheduled event:  用于定时构建，例如最小的时间间隔是 5 min 构建一次
  # 具体可查看 https: //docs.github.com/en/actions/reference/events-that-trigger-workflows#scheduled-events

# env:  指定环境变量（所有的 job 生效，每一个 job 可以独立通过 jobs.<job_id>.env、jobs.<job_id>.steps.env 配置）
# defaults / defaults.run: 所有的 job 生效，每一个 job 可以独立通过 jobs.<job_id>.defaults 配置
# deafults
# defaults.run

# jobs: 一个 workflow 由一个或多个 job 组成
jobs:
  # job id: 是 job 的唯一标识，可以通过 _ 进行连接，例如:  my_first_job，例如这里的 build 就是一个 job id
  build_and_deploy:
    # name: 在 Github 中显示的 job 名称
    name: Build And Deploy
    #
    # needs: 用于继发执行 job，例如当前 job build 必须在 job1 和 job2 都执行成功的基础上执行
    # needs: [job1, job2]
    #
    # runs-on: job 运行的环境配置，包括:
    #   - windows-latest
    #   - windows-2019
    #   - ubuntu-20.04
    #   - ubuntu-latest
    #   - ubuntu-18.04
    #   - ubuntu-16.04
    #   - macos-latest
    #   - macos-10.15
    #   - self-hosted（本地机器，具体可查看 https: //docs.github.com/en/actions/hosting-your-own-runners/using-self-hosted-runners-in-a-workflow）
    runs-on: ubuntu-latest
    #
    # outputs:  用于输出信息
    #
    # env:  用于设置环境变量
    #
    # defaults:  当前所有 step 的默认配置
    #
    # defaults.run

    # if: 满足条件执行当前 job

    # steps:  一个 job 由多个 step 组成，step 可以
    #   - 执行一系列 tasks
    #   - 执行命令
    #   - 执行 action
    #   - 执行公共的 repository
    #   - 在 Docker registry 中的 action
    steps:
      #
      # id: 类似于 job id
      #
      # if:  类似于 job if
      #
      # name:  当前 step 的名字
      - name: Checkout
        #
        # uses: 用于执行 action
        #
        #       action: 可以重复使用的单元代码
        #          - 为了 workflow 的安全和稳定建议指定 action 的发布版本或 commit SHA
        #          - 使用指定 action 的 major 版本，这样可以允许你接收 fixs 以及 安全补丁并同时保持兼容性
        #          - 尽量不建议使用 master 版本，因为 master 很有可能会被发布新的 major 版本从而破坏了 action 的兼容性
        #          - action 可能是 JavaScript 文件或 Docker 容器，如果是 Docker 容器，那么 runs-on 必须指定 Linux 环境
        #
        #         指定固定 commit SHA
        #         uses:  actions/setup-node@74bc508
        #         指定一个 major 发布版本
        #         uses:  actions/setup-node@v1
        #         指定一个 minor 发布版本
        #         uses:  actions/setup-node@v1.2
        #         指定一个分支
        #         uses:  actions/setup-node@master
        #         指定一个 Github 仓库子目录的特定分支、ref 或 SHA
        #         uses:  actions/aws/ec2@master
        #         指定当前仓库所在 workflows 的目录地址
        #         uses:  ./.github/actions/my-action
        #         指定在 Dock Hub 发布的 Docker 镜像地址
        #         uses:  docker: //alpine: 3.8
        #         A Docker image in a public registry
        #         uses:  docker: //gcr.io/cloud-builders/gradle

        # checkout action 主要用于向 github 仓库拉取源代码（需要注意 workflow 是运行在服务器上，因此需要向当前 github 拉取仓库源代码）
        # 它的功能包括但不限于
        #   - Fetch all history for all tags and branches
        #   - Checkout a different branch
        #   - Checkout HEAD^
        #   - Checkout multiple repos (side by side)
        #   - Checkout multiple repos (nested)
        #   - Checkout multiple repos (private)
        #   - Checkout pull request HEAD commit instead of merge commit
        #   - Checkout pull request on closed event
        #   - Push a commit using the built-in token

        # checkout action:  https: //github.com/actions/checkout
        uses: actions/checkout@v2
        # with: action 提供的输入参数
        with:
          # 指定 checkout 的分支、tag 或 SHA
          # 更多 checkout action 的配置可查看 https: //github.com/actions/checkout#usage
          ref: feat/ci
        # args: 用于 Docker 容器的 CMD 指令参数
        # entrypoint: Docker 容器 action（覆盖 Dockerfile 的 ENTRYPOINT） 和 JavaScript action 都可以使用
      #
      # run: 使用当前的操作系统的默认的 non-login shell 执行命令行程序
      # 运行单个脚本
      # run: npm install
      # 运行多个脚本
      # run: |
      #   npm ci
      #   npm run build
      #
      # working-directory: 用于指定当前脚本运行的目录
      # working-directory: ./temp
      #
      # shell: 可以指定 shell 类型进行执行，例如 bash、pwsh、python、sh、cmd、powershell
      # shell: bash
      #
      # env: 除了可以设置 workflow 以及 job 的 env，也可以设置 step 的 env（可以理解为作用域不同，局部作用域的优先级更高）
      #
      # comtinue-on-error: 默认当前 step 失败则会阻止当前 job 继续执行，设置 true 时当前 step 失败则可以跳过当前 job 的执行

      - name: Cache
        # cache action: https://github.com/actions/cache
        # cache 在这里主要用于缓存 npm，提升构建速率
        uses: actions/cache@v2
        # npm 缓存的路径可查看 https://docs.npmjs.com/cli/cache#cache
        # 由于这里 runs-on 是 ubuntu-latest，因此配置 ~/.npm
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      # github-script action: https://github.com/actions/github-script
      # 在 workflow 中使用 Script 语法调用 Github API 或引用 workflow context

      # setup-node action: https://github.com/actions/setup-node
      # 配置 Node 执行环境（当前构建的服务器默认没有 Node 环境，可以通过 Action 安装 Node）
      # 需要注意安装 Node 的同时会捆绑安装 npm，如果想了解为什么会捆绑，可以 Google 一下有趣的故事哦
      # 因此使用了该 action 后就可以使用 npm 的脚本在服务器进行执行啦
      # 这里也可以尝试 v2-beta 版本哦
      - name: Set Node
        uses: actions/setup-node@v1
        with:
          # 也可以通过 strategy.matrix.node 进行灵活配置
          # 这里本地使用 node 的 12 版本构建，因此这里就进行版本固定啦
          node-version: '12'

      - run: npm install
      - run: npm run build
      - run: npm run docs:build

      - name: Deploy
        # 用于发布静态站点资源
        # actions-gh-pages action: https://github.com/peaceiris/actions-gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          # GTIHUB_TOKEN：https://docs.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token
          # Github 会在 workflow 中自动生成 GIHUBT_TOKEN，用于认证 workflow 的运行
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # 静态资源目录设置
          publish_dir: ./docs/.vuepress/dist
          # 默认发布到 gh-pages 分支上，可以指定特定的发布分支
          publish_branch: gh-pages1 # default: gh-pages
          full_commit_message: ${{ github.event.head_commit.message }}
    #
    # timeout-minutes: 一个 job 执行的最大时间，默认是 6h，如果超过时间则取消执行
    #
    # strategy.matrix: 例如指定当前 job 的 node 版本列表、操作系统类型列表等
    # strategy.fail-fast
    # strategy.max-parallel
    # continue-on-error:  一旦当前 job 执行失败，那么 workflow 停止执行。设置为 true 可以跳过当前 job 执行
    # container: Docker 容器配置，包括 image、env、ports、volumes、options 等配置
    #
    # services: 使用 Docker 容器 Action 或者 服务 Action 必须使用 Linux 环境运行
```

### 2021-09-08

#### git 提交规范[cz 工具]

##### Git 提交说明可分为三个部分：`<Header> <Body> <Footer>`

- `<Header>`: 包含`<type>(<scope>): <subject>`，分别是：

  - type：提交性质。如 feat、fix 等
  - scope：commit 的影响范围，依据功能或者组件库划分
  - subject：commit 内容的简述

- `<Body>`: commit 的内容

- `<Footer>`: 如果代码的提交是[不兼容变更]或[关闭缺陷]，Footer 是必需的，否则可以省略。
  - 关闭 issues： # + issues 的编号
  - 当前代码与上一个版本不兼容，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由和迁移方法。

##### 规范提交说明：使用 npm install -g commitizen（后使用 git cz 即可）

使用 commitizen 生成符合 AngularJS 规范的提交说明：cz-conventional-changelog

1、commitizen init cz-conventional-changelog --save --save-exact

2、package.json 中新增 config.commitizen 字段信息，主要用于配置 cz 工具的适配器路径

```js
"devDependencies": {
 "cz-conventional-changelog": "^2.1.0"
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

3、使用 git cz 代替 git commit 进行提交说明。会在执行后命令行提示选择`<Header>`

使用自定义规范配置：npm install cz-customizable --save-dev

1、将之前符合 Angular 规范的 cz-conventional-changelog 适配器路径改成 cz-customizable 适配器路径：

```json
"devDependencies": {
  "cz-customizable": "^5.3.0"
},
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

2、增加 [.cz-config.js] 文件配置自定义规范。参考：https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js

##### 校验工具 commitlint，Commitizen 提交校验（git commit -m '测试提交内容'）

校验提交说明是否符合规范

1、npm install --save-dev @commitlint/cli

2、npm install --save-dev @commitlint/config-conventional

3、新建[commitlint.config.js]文件并设置校验规则

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

4、安装 husky(哈士奇)：npm install husky --save-dev

```json
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

##### Commitizen 日志

使用了 cz 工具集，配套 conventional-changelog 可以快速生成开发日志:

1、npm install conventional-changelog -D

2、package.json 修改："version": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0 && git add CHANGELOG.md"

3、执行 npm run version 后可查看生产的日志 CHANGELOG.md

资料： - [commit 提交](https://juejin.cn/post/6844903831893966856#heading-14)

#### ESLint 配置。代码格式规则 和 质量规则

1、安装：npm i --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

2、新建 .eslintrc.js 配置文件

```js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // 使用 ESLint 解析 TypeScript 语法
  plugins: ['@typescript-eslint'], // 在 ESLint 中加载插件 @typescript-eslint/eslint-plugin，该插件可用于配置 TypeScript 校验规则
  // 在 ESLint 中使用共享规则配置，其中 eslint:recommended 是 ESLint 内置的推荐校验规则配置（也被称作最佳规则实践），plugin:@typescript-eslint/recommended 是类似于 eslint:recommended 的 TypeScript 推荐校验规则配置
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended']
}
```

3、package.josn 设置：

```json
"scripts": {
  "lint": "eslint src",
}
```

4、测试在 src 下是否有书写错误的语法：npm run lint 会输入错误信息。 >eslint src...

5、ESLint 插件代码的实时提示，不需要执行 npm run lint

6、防止不需要被校验的文件出现校验信息，可以通过 .eslintignore 文件进行配置

7、ESLint 确保构建。

- 在构建打包前进行 ESLint 校验能够确保构建时无任何错误信息，一旦 ESLint 校验不通过则不允许进行源码的构建操作。

- 在构建时进行校验的严格控制，一旦 lint 抛出 warning 或者 error 则立马终止构建

```json
// 需要注意 Shell 中的 && 和 & 是有差异的，&& 主要用于继发执行，只有前一个任务执行成功，才会执行下一个任务，& 主要用于并发执行，表示两个脚本同时执行。这里构建的命令需要等待 lint 命令执行通过才能进行，一旦 lint 失败那么构建命令将不再执行。
// bash教程：https://wangdoc.com/bash/
// c语言教程：https://wangdoc.com/clang/
// ssh：http://wangdoc.com/ssh
"scripts": {
  "lint": "eslint src --max-warnings 0",
  "build": "npm run lint && rimraf dist types && gulp",
}
```

8、开发者手册！！！：https://www.ruanyifeng.com/blog/developer/

#### Prettier 代码格式规则

1、安装：npm i prettier eslint-config-prettier --save-dev。（eslint-config-prettier，用于解决 ESLint 和 Prettier 配合使用时容易产生的格式规则冲突问题）

2、使用：--write 参数类似于 ESLint 中的 --fix（在 ESLint 中使用该参数还是需要谨慎哈，建议还是使用 VS Code 的 Save Auto Fix 功能），主要用于自动修复格式错误

```json
"scripts": {
  "prettier": "prettier src test --write",
},
```

3、使用 npm run prettier 代码格式修复

4、Prettier 插件。VS Code 的 Prettier - Code formatter 插件进行 Save Auto Fix

#### Lint Staged

##### Lint Staged 背景

在 Git Commit Message 中使用了 commitlint 工具配合 husky 可以防止生成不规范的 Git Commit Message，从而阻止用户进行不规范的 Git 代码提交，其原理就是监听了 Git Hook 的执行脚本（会在特定的 Git 执行命令诸如 commit、push、merge 等触发之前或之后执行相应的脚本钩子）。Git Hook 其实是进行项目约束非常好用的工具，它的作用包括但不限于：

- Git Commit Message 规范强制统一
- ESLint 规则统一，防止不符合规范的代码提交
- Prettier 自动格式化（类似的还包括 Style 样式格式等）
- 代码稳定性提交，提交之前确保测试用例全部通过
- 发送邮件通知
- CI 集成（服务端钩子）

git 钩子：Git 中 pre 系列钩子允许终止即将发生的 Git 操作，而 post 系列往往用作通知行为。

Git Hook 的钩子非常多，但是在客户端中可能常用的钩子是以下两个：

- pre-commit：pre-commit 钩子在键入提交信息（运行 git commit 或 git cz）前运行，主要用于检查当前即将被提交的代码快照，例如提交遗漏、测试用例以及代码等。该钩子如果以非零值退出则 Git 将放弃本次提交。当然你也可以通过配置命令行参数 git commit --no-verify 绕过钩子的运行。

- commit-msg：该钩子在用户输入 Commit Message 后被调用，接收存有当前 Commit Message 信息的临时文件路径作为唯一参数，因此可以利用该钩子来核对 Commit Meesage 信息（在 Git Commit Message 中使用了该钩子对提交信息进行了是否符合 Angular 规范的校验）。该钩子和 pre-commit 类似，一旦以非零值退出 Git 将放弃本次提交。

##### Lint Staged 配置

lint 的是已经放入 Git Stage 暂存区中的代码，ed 在英文中表明已经做过，减少代码的检测量。

lint-staged 可以在用户提交代码之前（生成 Git Commit Message 信息之前）使用 ESLint 检查 Git 暂存区中的代码信息（git add 之后的修改代码），一旦存在 💩 一样不符合校验规则的代码，则可以终止提交行为。需要注意的是 lint-staged 不会检查项目的全量代码（全量使用 ESLint 校验对于较大的项目可能会是一个相对耗时的过程），而只会检查添加到 Git 暂存区中的代码。根据官方文档执行以下命令自动生成配置项信息：

1、安装：npx mrm lint-staged

2、默认生成的配置文件是针对 JavaScript 环境的，手动修改 package.json 中的配置信息进行 TypeScript 适配：

```json
// 我们的哈士奇再次上场，这次它是要咬着你的 ESLint 不放了，这里我简称它的动作为 "咬 💩" ~~~
"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    //
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
},
"lint-staged": {
  // 这里需要注意 ESLint 脚本的 --max-warnings 0
  // 否则就算存在 warning 也不会终止提交行为
  // 这里追加了 Prettier 的自动格式化，确保代码提交之前所有的格式能够修复
  "*.ts": ["npm run lint", "npm run prettier"]
}

// 即
"scripts": {
  // --max-warnings 0
  "lint": "eslint src --max-warnings 0",
}
```

3、husky 在 package.json 中配置了 pre-commit 和 commit-msg 两个 Git 钩子，优先使用 pre-commit 钩子执行 ESLint 校验，如果校验失败则终止运行。如果校验成功则会继续执行 commit-msg 校验 Git Commit Message

#### Npm Script Hook

1、github 开源项目：package.json 中的 main、bin、files、script

```json
// 脚本命令
"lint": "eslint src test --max-warnings 0",
"test": "jest --bail --coverage",
"build": "npm run lint && npm run prettier && npm run test && rimraf dist types && gulp",
"changelog": "rimraf CHANGELOG.md && conventional-changelog -p angular -i CHANGELOG.md -s"
```

2、build 脚本命令过于复杂，通过 npm 的脚本钩子 pre 和 post 将脚本的功能区分开，从而使脚本的语义更加清晰

之后执行 npm run build 命令时事实上类似于执行了：npm run prebuild && npm run build

```json
"lint": "eslint src test --max-warnings 0",
"test": "jest --bail --coverage",
"prebuild": "npm run lint && npm run prettier && npm run test",
"build": "rimraf dist types && gulp",
"changelog": "rimraf CHANGELOG.md && conventional-changelog -p angular -i CHANGELOG.md -s"
```

3、npm 除了指定一些特殊的脚本钩子以外（例如 prepublish、postpublish、preinstall、postinstall 等），还可以对任意脚本增加 pre 和 post 钩子。

#### 文章

- ts 项目：https://juejin.cn/post/6856410900577026061（）

- 打包工具：rollup（组件动态加载，构建 [ES Module]（https://github.com/rollup/rollup/wiki/ES6-modules） 的特性）、webpack、vite。

- 互联网广告： https://www.huxiu.com/article/363114.html

  - 落地页
  - 商业化

- 人生 github： https://liferestart.syaro.io/view/index.html 【https://github.com/VickScarlet/lifeRestart】

### 2021-09-07

- RPC 介绍 https://mp.weixin.qq.com/s/Ky6SoWJv85orqYioihTRqg

  - 日志分析：traceId RPC 等等

- js 类型转化 https://mp.weixin.qq.com/s/NN8DiH9ATZ2RuaDjlls-aw

- 预渲染 Next.js https://mp.weixin.qq.com/s/tDPkTwrR031CjsWbiVTVGw

- 白屏监控： https://mp.weixin.qq.com/s/q1oXKJCAW7NQjaF0MP3vuA

- css: width:fit-content 可以实现元素收缩效果的同时，保持原本的 block 水平状态，于是，就可以直接使用 margin:auto 实现元素向内自适应同时的居中效果了

- css: :not 伪类,用来匹配不符合一组选择器的元素。 :not(a):not(.disabled) {}

  - 0 级指没有优先级，1 级是标签选择器，10 级是类选择器，属性选择器，100 级是 ID 选择器。
  - CSS 伪类的优先级: 0 级和 10 级
  - 逻辑伪类的优先级都是 0。例如：:not()，:is()，:where()等
  - 无效： :not(.disabled, .read-only) {} /_ 无效，不支持 _/ 、:not(a.disabled) {} /_ 无效，不支持 _/

- :where() CSS 伪类函数接受选择器列表作为它的参数，将会选择所有能被该选择器列表中任何一条规则选中的元素
  - :where() 和 :is() 的不同之处在于，:where() 的优先级总是为 0 ，但是 :is() 的优先级是由它的选择器列表中优先级最高的选择器决定的。

### 2021-09-06

- Vite 中大量运用 magic-string 这个库做一些字符串的魔术替换，这个库的目的就是在一些轻量级替换源代码的场景中替代 AST 这种过于庞大的解决方案。

- 用 fast-glob 去实现 Vite 中好用的 Glob Import 批量导入语法

- https://github.com/sindresorhus： Promise 相关的模块

  - p-reduce 适用于需要根据异步资源计算累加值的场景

  ```js
  // p-reduce/p-reduce.test.js
  import delay from 'delay'
  import pReduce from 'p-reduce'

  const inputs = [Promise.resolve(1), delay(50, { value: 6 }), 8]

  async function main() {
    const result = await pReduce(inputs, async (a, b) => a + b, 0)
    console.dir(result) // 输出结果：15
  }

  main()
  ```

  - p-map 可以控制并发，也可以决定是否在出现错误时停止迭代

  ```js
  // p-map/p-map.test.js

  // options: object
  // - concurrency: number —— 并发数，默认值 Infinity，最小值为 1；
  // - stopOnError: boolean —— 出现异常时，是否终止，默认值为 true。

  import delay from 'delay'
  import pMap from 'p-map'

  const inputs = [200, 100, 50]
  const mapper = value => delay(value, { value })

  async function main() {
    console.time('start')
    const result = await pMap(inputs, mapper, { concurrency: 1 })
    console.dir(result) // 输出结果：[ 200, 100, 50 ] concurrency控制并发数量，越大time越短
    console.timeEnd('start')
  }
  main()
  ```

  - p-filter 对返回的结果进行过滤的场景

  ```js
  // p-filter/p-filter.test.js

  // options: object
  // - concurrency: number —— 并发数，默认值 Infinity，最小值为 1
  import pFilter from 'p-filter'

  const inputs = [Promise.resolve(1), 2, 3]
  const filterer = x => x % 2

  async function main() {
    const result = await pFilter(inputs, filterer, { concurrency: 1 })
    console.dir(result) // 输出结果：[ 1, 3 ]
  }

  main()
  ```

  - p-waterfall 适用于串行执行 「promise-returning」 或 「async」 函数，并把前一个函数的返回结果自动传给下一个函数的场景
  - p-forever 适用于需要重复不断执行 「promise-returning」 或 「async」 函数，直到用户终止的场景。该模块默认导出了一个 「pForever」 函数
  - p-times 适用于显式指定 「promise-returning」 或 「async」 函数执行次数的场景

- [Object.keys() 的顺序是如何定义的](https://mp.weixin.qq.com/s/6RrGm4HletEtohPkGz1_pQ)

  - 1、定义变量 keys 为空列表
  - 2、对于入参 O 的每一个符合 【array index】 定义的属性，【升序】排列后添加到 keys 列表
  - 3、对于入参 O 的每一个字符串属性，按照【定义时间顺序升序】排列后添加到 keys 列表
  - 4、对于入参 O 的每一个 【Symbol】 属性，按照【定义时间顺序升序】排列后添加到 keys 列表
  - 5、返回最终得到的 keys 列表

  - array index 定义：An array indexis aninteger indexwhose numeric valueiis in the range +0 ≤i< (2^32- 1).

  ```js
  // 执行环境 node-v14.16.1
  const object = { a: 'x', c: 'x', 55: 'x', 1: 'x', b: 'x' }
  object['-1'] = 'x'
  object[Math.pow(2, 32) - 1] = 'x'
  object[Math.pow(2, 32) - 2] = 'x'

  // 输出 [ '1', '55', '4294967294', 'a', 'c', 'b', '-1', '4294967295' ]
  console.log(Object.keys(object))
  ```
