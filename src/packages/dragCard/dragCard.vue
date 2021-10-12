<template>
  <div
    :style="{
      position: 'relative',
      width: cardOutsideWidth * colNum + 'px',
      height: computeTop(cardData.length) + cardOutsideHeight + 'px',
    }"
  >
    <div
      class="z-cardOutsideBox"
      v-for="item of cardData"
      :key="item.id"
      :id="item.id"
      :style="{
        width: cardOutsideWidth + 'px',
        height: cardOutsideHeight + 'px',
      }"
    >
      <div
        class="z-cardInsideBox"
        :style="{
          width: cardInsideWidth + 'px',
          height: cardInsideHeight + 'px',
        }"
      >
        <div @mousedown="onMouseDown($event, item.id)" class="z-cardHeaderBox">
          <slot name="header" :item="item">
            <div class="z-cardHeader">
              <div v-if="item.name" class="z-cardTitle">{{ item.name }}</div>
              <div v-else class="z-cardTitle">默认标题</div>
            </div>
          </slot>
        </div>
        <component
          :is="item.componentData"
          :itemData="item"
          v-if="item.componentData"
        ></component>
        <slot v-else name="content" :item="item">
          <div class="z-cardEmptyContent">暂无数据</div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dragCard",
  props: {
    cardData: {
      type: Array,
      default: () => [],
    },
    colNum: {
      type: Number,
      default: 2,
    },
    cardOutsideWidth: {
      type: Number,
      default: 700,
    },
    cardOutsideHeight: {
      type: Number,
      default: 400,
    },
    cardInsideWidth: {
      type: Number,
      default: 640,
    },
    cardInsideHeight: {
      type: Number,
      default: 360,
    },
  },
  data() {
    return {
      mousedownTimer: null,
    };
  },
  watch: {
    cardData: {
      handler: function () {
        this.addCardStyle();
      },
      immediate: true,
    },
  },
  methods: {
    computeTop(num) {
      return Math.ceil(num / this.colNum - 1) * this.cardOutsideHeight;
    },
    computeLeft(num) {
      return ((num - 1) % this.colNum) * this.cardOutsideWidth;
    },
    addCardStyle() {
      this.$nextTick(() => {
        this.cardData.forEach((item) => {
          document.querySelector("#" + item.id).style.top =
            this.computeTop(item.positionNum) + "px";
          document.querySelector("#" + item.id).style.left =
            this.computeLeft(item.positionNum) + "px";
        });
      });
    },
    onMouseDown(event, selectId) {
      if (this.mousedownTimer) {
        return false;
      }

      let DectetTimer = null;
      let originTop =
        document.body.scrollTop === 0
          ? document.documentElement.scrollTop
          : document.body.scrollTop;
      let scrollTop = originTop;
      let moveTop = 0;
      let moveLeft = 0;
      let originPosition = {
        left: 0,
        top: 0,
        originNum: -1,
      };
      let originMousePosition = {
        x: 0,
        y: 0,
      };
      let oldNum = null,
        newNum = null;
      let selectDom = document.getElementById(selectId);
      let selectData = this.cardData.find((item) => item.id === selectId);

      originMousePosition.x = event.screenX;
      originMousePosition.y = event.screenY;
      selectDom.classList.add("z-cardMoveBox");
      moveLeft = originPosition.left = parseInt(
        selectDom.style.left.slice(0, selectDom.style.left.length - 2)
      );
      moveTop = originPosition.top = parseInt(
        selectDom.style.top.slice(0, selectDom.style.top.length - 2)
      );

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("scroll", onMouseScroll);
      const that = this;
      function onMouseMove(event) {
        moveTop = originPosition.top + (event.screenY - originMousePosition.y);
        moveLeft =
          originPosition.left + (event.screenX - originMousePosition.x);
        document.querySelector(".z-cardMoveBox").style.left = moveLeft + "px";
        document.querySelector(".z-cardMoveBox").style.top =
          moveTop + (scrollTop - originTop) + "px";
        if (!DectetTimer) {
          DectetTimer = setTimeout(() => {
            cardDectect(moveTop + (scrollTop - originTop), moveLeft);
            DectetTimer = null;
          }, 200);
        }
      }

      function onMouseScroll(event) {
        scrollTop =
          document.body.scrollTop === 0
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
        document.querySelector(".z-cardMoveBox").style.top =
          moveTop + (scrollTop - originTop) + "px";
      }

      function cardDectect(top, left) {
        let newWidthNum = Math.round(left / that.cardOutsideWidth) + 1;
        let newHeightNum = Math.round(top / that.cardOutsideHeight);

        if (
          newHeightNum > Math.ceil(that.cardData.length / that.colNum) - 1 ||
          newHeightNum < 0 ||
          newWidthNum <= 0 ||
          newWidthNum > that.colNum
        ) {
          return false;
        }
        const newPositionNum = newWidthNum + newHeightNum * that.colNum;
        if (newPositionNum !== selectData.positionNum) {
          let newItem = that.cardData.find(
            (item) => item.positionNum === newPositionNum
          );
          if (newItem) {
            switchPosition(newItem, selectData);
          }
        }
      }

      function switchPosition(newItem, oldItem) {
        let oldPosition = oldItem.positionNum;
        let newPosition = newItem.positionNum;
        if (newPosition > oldPosition) {
          let list = [];
          for (let i = oldPosition + 1; i <= newPosition; i++) {
            let pushData = that.cardData.find((item) => item.positionNum === i);
            list.push(pushData);
          }
          for (let item of list) {
            that.$set(item, "positionNum", item.positionNum - 1);
            document.querySelector("#" + item.id).style.top =
              that.computeTop(item.positionNum) + "px";
            document.querySelector("#" + item.id).style.left =
              that.computeLeft(item.positionNum) + "px";
          }
          that.$set(oldItem, "positionNum", newPosition);
        }
        if (newPosition < oldPosition) {
          let list = [];
          for (let i = oldPosition - 1; i >= newPosition; i--) {
            let pushData = that.cardData.find((item) => item.positionNum === i);
            list.push(pushData);
          }
          for (let item of list) {
            that.$set(item, "positionNum", item.positionNum + 1);
            document.querySelector("#" + item.id).style.top =
              that.computeTop(item.positionNum) + "px";
            document.querySelector("#" + item.id).style.left =
              that.computeLeft(item.positionNum) + "px";
          }
          that.$set(oldItem, "positionNum", newPosition);
        }
      }

      function onMouseUp() {
        clearTimeout(DectetTimer);
        DectetTimer = null;
        cardDectect(moveTop + (scrollTop - originTop), moveLeft);
        document.querySelector(".z-cardMoveBox").classList.add("z-transition");
        document.querySelector(".z-cardMoveBox").style.top =
          that.computeTop(selectData.positionNum) + "px";
        document.querySelector(".z-cardMoveBox").style.left =
          that.computeLeft(selectData.positionNum) + "px";
        that.mousedownTimer = setTimeout(() => {
          document.querySelector(".z-cardMoveBox").classList.remove("z-transition");
          document.querySelector(".z-cardMoveBox").classList.remove("z-cardMoveBox");
          clearTimeout(that.mousedownTimer);
          that.mousedownTimer = null;
        }, 300);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("scroll", onMouseScroll);
      }
    },
  },
};
</script>
