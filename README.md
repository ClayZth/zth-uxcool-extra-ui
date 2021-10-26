# zth-uxcool-extra-ui

文档:[https://clayzth.github.io/zth-uxcool-extra-ui/](https://clayzth.github.io/zth-uxcool-extra-ui/)

基于Vue2.X的组件库，包含多项填写输入框组件和可拖拽卡片组件

安装
```
npm install zth-uxcool-extra-ui
```

使用
```js
import zthUxcoolExtraUI from 'zth-uxcool-extra-ui'
import "zth-uxcool-extra-ui/lib/styles/zth-uxcool-extra-ui.css"
Vue.use(zthUxcoolExtraUI)

//
import Vue from 'vue'
import {mutiInput,dragCard} from 'zth-uxcool-extra-ui'
//由于只在组件库的入口处设置了install方法来注册组件
//按需引入的时候需要手动注册
Vue.component("zMutiInput",mutiInput)
Vue.component("zDragCard",dragCard)
```
