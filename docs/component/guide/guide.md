---
title: 安装
---
# 开发指南

输入下列命令可以安装zth-uxcool-extra-ui  
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
