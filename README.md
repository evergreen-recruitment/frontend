# 常青招聘-前端

## 项目介绍

本项目为服创A15赛题的前端代码，我们力求前端页面的精致和优雅，并保证用户具有优秀的体验。我们还一改传统招聘网站简陋的页面，加入了大量新颖元素如分析简历、知识图谱、技能分析、技术栈分析、相关搜索、大数据算法推荐等等。

## 技术介绍

项目使用先进的前端技术栈包括Vue、Node.js、Typescript，严谨的代码规范和样式统一性，包括Git提交信息的规范和控制，并使用AliyunFLow
进行CI/CD，在页面上我们使用统一的主题色和圆角，包括自适应的主题色和暗亮色模式，优美的设计，绝对让你眼前一亮。

项目包含如下依赖:

| 依赖                       | 介绍                                                                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Vue3 框架                  | Vue3 是一个用于构建用户界面的渐进式 JavaScript 框架。Vue3 是 Vue.js 的最新版本，引入了许多新特性，如 Composition API 和更好的性能。       |
| Typescript js类型加强语言  | TypeScript 是 JavaScript 的一个超集，添加了静态类型和基于类的面向对象编程。它可以帮助开发者编写更健壮的代码并进行更有效的重构。           |
| Vite 前端工程化工具        | Vite 是一个由 Vue.js 作者开发的现代前端构建工具，它提供了快速的冷启动、即时热更新和丰富的内建功能，可以极大地提高开发效率。               |
| Ant-Design-Vue 组件库      | Ant Design Vue 是 Ant Design 的 Vue 实现，它提供了一套企业级的高质量 UI 组件，可以帮助开发者快速构建漂亮的界面。                          |
| Echarts 图形库             | ECharts 是一个由百度开发的开源 JavaScript 可视化库，它可以运行在浏览器和 Node.js 环境中，支持折线图、柱状图、散点图、饼图等多种图表类型。 |
| antv/g6 图形库             | G6 是 AntV 的一款图可视化引擎，提供了图的基础能力，如节点和边的样式定义、布局、交互、动画以及分析算法等，适用于中大型复杂图的场景。       |
| Alova 请求库               | Alova 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 node.js。                                                                           |
| VueUse 方法库              | VueUse 是一个提供各种 Vue Composition API 函数的库，这些函数可以帮助你更好地处理常见的 Web API 和状态。                                   |
| Sass 预处理器              | Sass 是一种 CSS 的扩展语言，它添加了许多有用的特性，如变量、嵌套规则、混合和函数，可以帮助开发者编写更干净、更易于维护的 CSS 代码。       |
| TailwindCSS 原子化CSS      | Tailwind CSS 是一个高度可定制的、低级的 CSS 框架，它提供了一套实用程序类，可以帮助开发者快速构建自定义的用户界面。                        |
| Eslint 代码规范            | ESLint 是一个开源的 JavaScript 代码检查工具，它可以帮助开发者发现代码中的问题，并强制执行一套编码规范。                                   |
| Prettier 代码样式统一      | Prettier 是一个代码格式化工具，它可以自动格式化你的代码，以确保项目中的所有代码都有一致的样式。                                           |
| husky Git运行钩子          | Husky 是一个可以阻止不良 git commit、git push 和更多的工具，它可以在这些 git 命令执行前运行你定义的任务，如测试和 linting。               |
| Commitlint Git提交信息规范 | Commitlint 是一个帮助你管理 git commit 信息的工具，它可以确保你的 commit 信息符合一定的格式和标准。                                       |

## 目录结构

```
evergreen-frontend
├── public
│   ├── loading.js
│   └── logo.png
├── src
│   ├── apis
│   │   ├── application.ts
│   │   ├── auth.ts
│   │   ├── city.ts
│   │   ├── common.ts
│   │   ├── company.ts
│   │   ├── employee.ts
│   │   ├── home.ts
│   │   ├── industry.ts
│   │   ├── job.ts
│   │   └── user.ts
│   ├── assets
│   │   ├── images
│   │   │   ├── bg1.svg
│   │   │   ├── bg2-bg.svg
│   │   │   ├── bg2.svg
│   │   │   ├── default_avatar.png
│   │   │   ├── logo.png
│   │   │   ├── logo1-black.png
│   │   │   └── logo1-white.png
│   │   ├── map
│   │   │   └── map.json
│   │   └── tutorial
│   │       └── tutorial.ts
│   ├── components
│   │   ├── ApplicationUpload
│   │   │   └── ApplicationUpload.vue
│   │   ├── BottomFloatBtn
│   │   │   └── BottomFloatBtn.vue
│   │   ├── I3DProgressBar
│   │   │   └── I3DProgressBar.vue
│   │   ├── ICard
│   │   │   └── ICard.vue
│   │   ├── ICharts
│   │   │   └── ICharts.vue
│   │   ├── IDiffEditor
│   │   │   └── IDiffEditor.vue
│   │   ├── IEditor
│   │   │   └── IEditor.vue
│   │   ├── ILocationSelector
│   │   │   └── ILocationSelector.vue
│   │   ├── INavigator
│   │   │   └── INavigator.vue
│   │   ├── IPageHeader
│   │   │   └── IPageHeader.vue
│   │   ├── ISearchBar
│   │   │   └── ISearchBar.vue
│   │   ├── ITable
│   │   │   └── ITable.vue
│   │   ├── Icon
│   │   │   └── Icon.vue
│   │   ├── JobCard
│   │   │   └── JobCard.vue
│   │   ├── JobCardV2
│   │   │   └── JobCardV2.vue
│   │   ├── JobCategoryFilter
│   │   │   └── JobCategoryFilter.vue
│   │   ├── JobItem
│   │   │   └── JobItem.vue
│   │   ├── JobSearch
│   │   │   └── JobSearch.vue
│   │   ├── JobSearchFilter
│   │   │   └── JobSearchFilter.vue
│   │   ├── JobSearchHome
│   │   │   └── JobSearchHome.vue
│   │   ├── JobSearchList
│   │   │   └── JobSearchList.vue
│   │   ├── KnowledgeGraph
│   │   │   └── KnowledgeGraph.vue
│   │   ├── NProgress
│   │   │   └── nprogress.scss
│   │   └── UserPanel
│   │       └── UserPanel.vue
│   ├── config
│   │   ├── router.config.ts
│   │   └── theme.config.ts
│   ├── directives
│   │   ├── vLazyLoad.ts
│   │   └── vSlideIn.ts
│   ├── hooks
│   │   └── useEnterAnimation.ts
│   ├── layouts
│   │   ├── components
│   │   │   ├── IAlert
│   │   │   │   └── IAlert.vue
│   │   │   ├── IAvatar
│   │   │   │   └── IAvatar.vue
│   │   │   ├── IBackground
│   │   │   │   ├── v1
│   │   │   │   │   ├── PerlinNoise
│   │   │   │   │   │   └── PerlinNoise.ts
│   │   │   │   │   └── IBackground.vue.back
│   │   │   │   └── IBackground.vue
│   │   │   ├── IEmpAlert
│   │   │   │   └── IEmpAlert.vue
│   │   │   ├── IEmpAvatar
│   │   │   │   └── IEmpAvatar.vue
│   │   │   ├── IEmpHeader
│   │   │   │   └── IEmpHeader.vue
│   │   │   ├── IEmpLayout
│   │   │   │   └── IEmpLayout.vue
│   │   │   ├── IEmpMenu
│   │   │   │   └── IEmpMenu.vue
│   │   │   ├── IEmpSide
│   │   │   │   └── IEmpSide.vue
│   │   │   ├── IFooter
│   │   │   │   └── IFooter.vue
│   │   │   └── IHeader
│   │   │       └── IHeader.vue
│   │   ├── AuthLayout.vue
│   │   ├── BasicLayout.vue
│   │   ├── EmpAuthLayout.vue
│   │   └── EmpBasicLayout.vue
│   ├── locales
│   │   ├── langs
│   │   │   ├── en
│   │   │   │   └── index.json
│   │   │   └── zh
│   │   │       └── index.json
│   │   └── index.ts
│   ├── router
│   │   ├── index.ts
│   │   └── permission.ts
│   ├── stores
│   │   ├── modules
│   │   │   ├── app.ts
│   │   │   ├── employee.ts
│   │   │   ├── status.ts
│   │   │   └── user.ts
│   │   └── index.ts
│   ├── styles
│   │   ├── common.scss
│   │   ├── preflight.css
│   │   ├── style.scss
│   │   ├── theme.scss
│   │   └── variables.module.scss
│   ├── tours
│   │   └── index.ts
│   ├── types
│   │   └── commonTypes.d.ts
│   ├── utils
│   │   ├── request.ts
│   │   └── utils.ts
│   ├── views
│   │   ├── auth
│   │   │   ├── completeInfo
│   │   │   │   └── index.vue
│   │   │   ├── forgetPassword
│   │   │   │   └── index.vue
│   │   │   ├── loginByCaptcha
│   │   │   │   └── index.vue
│   │   │   ├── loginByPassword
│   │   │   │   └── index.vue
│   │   │   └── uploadApplication
│   │   │       └── index.vue
│   │   ├── company
│   │   │   ├── detail
│   │   │   │   └── index.vue
│   │   │   └── search
│   │   │       └── index.vue
│   │   ├── empAuth
│   │   │   ├── forget
│   │   │   │   └── index.vue
│   │   │   ├── login
│   │   │   │   └── index.vue
│   │   │   └── register
│   │   │       └── index.vue
│   │   ├── empViews
│   │   │   └── home
│   │   │       └── index.vue
│   │   ├── exception
│   │   │   └── 404.vue
│   │   ├── home
│   │   │   └── index.vue
│   │   ├── job
│   │   │   ├── detail
│   │   │   │   └── index.vue
│   │   │   └── search
│   │   │       └── index.vue
│   │   ├── recommend
│   │   │   └── index.vue
│   │   ├── settings
│   │   │   └── index.vue
│   │   └── user
│   │       ├── application
│   │       │   └── index.vue
│   │       ├── center
│   │       │   └── index.vue
│   │       ├── delivery
│   │       │   └── index.vue
│   │       └── previewApplication
│   │           └── index.vue
│   ├── App.vue
│   └── main.ts
├── Dockerfile
├── README.md
├── build.bat
├── build.sh
├── commitlint.config.js
├── components.d.ts
├── env.d.ts
├── index.html
├── nginx.conf
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── style.css
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── 录屏脚本.md
```

## 运行项目

本项目使用Node.js 18 和 pnpm 管理包依赖，故你需要安装Node.js 18 或者使用nvm 切换到Node.js 18 版本，然后使用以下命令安装和部署项目

1. 安装依赖

```bash
pnpm install
```

2. 运行项目

```bash
pnpm dev
```

3. 打包项目

```bash
pnpm build
```

