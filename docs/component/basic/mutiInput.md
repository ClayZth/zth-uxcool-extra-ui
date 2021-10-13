---
title: MutiInput
---

# 多项填写输入框
<script>
export default {
  data() {
    return {
      modalData: ['20011111', '20018888', '20019874', '20015656', '20015555'],
    }
  }
}
</script>

<template>
  <zMutiInput 
      placeholder="请输入员工工号"
      allowClear
      outsideClose
      useLabel
      allowDeleteLabel
      v-model="modalData"/>
</template>

```vue
<template>
  <zMutiInput 
      placeholder="请输入员工工号"
      allowClear
      outsideClose
      useLabel
      allowDeleteLabel
      v-model="modalData"/>
</template>

<script>
export default {
  data() {
    return {
      modalData: ['20011111', '20018888', '20019874', '20015656', '20015555'],
    }
  }
}
</script>
```
属性

|       Name       |  Type   | Default  |            Description             |
| :--------------: | :-----: | :------: | :--------------------------------: |
|   placeholder    | String  | "请输入" |         输入框默认展示内容         |
|    allowClear    | Boolean |  false   |     是否在展示框内显示清空图标     |
|   outsideClose   | Boolean |  false   |     是否允许点击外部关闭填写框     |
|  value/v-model   |  Array  |    []    |             输入框内容             |
|     useLabel     | Boolean |  false   |          是否使用标签展示          |
|    needBlank     | Boolean |  false   |   配合useLabel使用，是否需要空白   |
| allowDeleteLabel | Boolean |  false   | 配合useLabel使用，是否允许删除标签 |
