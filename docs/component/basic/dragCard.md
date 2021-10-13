---
title: dragCard
---

# 可拖拽卡片
<script>
export default {
  data() {
    return {
      componentData: [
        {
          positionNum: 1,
          name: "演示卡片1",
          id: "card1",
        },
        {
          positionNum: 2,
          name: "演示卡片2",
          id: "card2",
        },
        {
          positionNum: 3,
          name: "演示卡片3",
          id: "card3",
        },
        {
          positionNum: 4,
          name: "演示卡片4",
          id: "card4",
        },
        {
          positionNum: 5,
          name: "演示卡片5",
          id: "card5",
        },
        {
          positionNum: 6,
          name: "演示卡片6",
          id: "card6",
        }
      ],
    }
  }
}
</script>

<template>
  <zDragCard 
      :cardData="componentData"
      :colNum="3"
      :cardOutsideWidth="300"
      :cardInsideWidth="260"
      :cardOutsideHeight="190"
      :cardInsideHeight="150"
    >
      <template v-slot:header="slotProps">
        <div class="topMenuBox">
          <div v-if="slotProps.item.name">{{slotProps.item.name}}</div>
          <div v-else> 默认标题 </div>
        </div>
      </template>
    </zDragCard>
</template>

<style lang="scss" scoped>
.topMenuBox{
  background-color: lightblue;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #818181;
  padding: 0px 15px;
}
</style>

使用

```vue
<script>
//1. import child from "./childComponent/child" 需要使用组件数据时引入组件
export default {
//2.   components:{
//     exampleChild1   //注入组件
//   },
  data() {
    return {
      componentData: [
        {
          positionNum: 1,
          name: "演示卡片1",
          id: "card1",
        //3. componentData:exampleChild1   将componentData设置为该组件
        },
        {
          positionNum: 2,
          name: "演示卡片2",
          id: "card2",
        },
        {
          positionNum: 3,
          name: "演示卡片3",
          id: "card3",
        },
        {
          positionNum: 4,
          name: "演示卡片4",
          id: "card4",
        },
        {
          positionNum: 5,
          name: "演示卡片5",
          id: "card5",
        },
        {
          positionNum: 6,
          name: "演示卡片6",
          id: "card6",
        }
      ],
    }
  }
}
</script>

<template>
  <zDragCard 
      :cardData="componentData"
      :colNum="3"
      :cardOutsideWidth="300"
      :cardInsideWidth="260"
      :cardOutsideHeight="190"
      :cardInsideHeight="150"
    >
      <template v-slot:header="slotProps">
        <div class="topMenuBox">
          <div v-if="slotProps.item.name">{{slotProps.item.name}}</div>
          <div v-else> 默认标题 </div>
        </div>
      </template>
    </zDragCard>
</template>

<style lang="scss" scoped>
.topMenuBox{
  background-color: lightblue;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #818181;
  padding: 0px 15px;
}
</style>
```

属性

|       Name        |  Type  | Default |  Description   |
| :---------------: | :----: | :-----: | :------------: |
|     cardData      | Array  |   []    |     数据源     |
|      colNum       | Number |    2    |      列数      |
| cardOutsideWidth  | Number |   700   |  卡片整体宽度  |
| cardOutsideHeight | Number |   400   |  卡片整体高度  |
|  cardInsideWidth  | Number |   640   | 卡片整内容宽度 |
| cardInsideHeight  | Number |   360   | 卡片整内容高度 |

cardData属性

|   Attribute   |  Type  |  Default   |             Description             |
| :-----------: | :----: | :--------: | :---------------------------------: |
|      id       | String |            |   必填，设置卡片的id作为唯一识别    |
|  positionNum  | Number |            | 必填，设置卡片位置，从1开始依次递增 |
|     name      | String | '默认标题' |      选填，设置卡片的标题名称       |
| componentData |  组件  |            |   选填，设置卡片的内容为组件数据    |


事件

|    Name    |  Description   |                          Parameter                           |
| :--------: | :------------: | :----------------------------------------------------------: |
| startDrag  | 拖拽开始时调用 |             event:鼠标事件;selectId:被选中卡片id             |
| finishDrag | 拖拽结束时调用 | oldPosition:拖拽前的positionNum;newPosition:拖拽后需要交换的positionNum;selectData:选中卡片数据 |
