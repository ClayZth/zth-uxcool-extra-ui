<template>
  <div class="z-container" id="vueMutiInput">
    <div class="input-container">
      <div class="z-input" @click="onInputFocus" v-if="!useLabel">
        <div v-if="showPlaceholder" class="placeholder">{{ placeholder }}</div>
        <div class="input-display-value" :title="displayValue">
          {{ displayValue }}
        </div>
      </div>
      <div class="z-label-input" v-else @click="onInputFocus">
        <div class="z-label-content" v-if="displayValue.length">
          <div
            v-for="(item, index) in displayValue"
            :key="index"
            class="z-label"
          >
            <div>{{ item }}</div>
            <div
              class="delete-icon"
              v-if="allowDeleteLabel"
              @click.stop="onDelete(item)"
            ></div>
          </div>
        </div>
        <div v-if="showPlaceholder" class="placeholder">{{ placeholder }}</div>
      </div>
      <div class="close-icon" v-if="allowClear" @click="onReset"></div>
    </div>
    <div class="textarea-container" v-if="isShow">
      <textarea
        name="zTextarea"
        autofocus
        class="z-textarea"
        placeholder="请用回车进行分隔"
        v-model="inputValue"
      ></textarea>
      <div class="z-buttons">
        <button class="z-sureBtn" @click="onSure">确认</button>
        <button class="z-resetBtn" @click="onReset">重置</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "vueMutiInput",
  props: {
    placeholder: {
      type: String,
      default: "请输入",
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    outsideClose: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    useLabel: {
      type: Boolean,
      default: false,
    },
    needBlank: {
      type: Boolean,
      default: false,
    },
    allowDeleteLabel: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  data() {
    return {
      isShow: false,
      displayValue: "",
      inputValue: "",
    };
  },
  computed: {
    showPlaceholder() {
      if (this.useLabel) {
        return this.displayValue.length == 0;
      } else {
        return !this.displayValue;
      }
    },
  },
  created() {
    if (this.value && this.value.length) {
      if (!this.useLabel) {
        this.displayValue = this.value.join(",");
      } else {
        this.displayValue = this.value;
      }
      this.inputValue = this.value.join("\n");
    }
  },
  mounted() {
    document.addEventListener("click", (e) => {
      let box = document.getElementById("vueMutiInput");
      if (!box.contains(e.target) && this.isShow && this.outsideClose) {
        this.isShow = false;
      }
    });
  },
  methods: {
    onInputFocus() {
      this.isShow = !this.isShow;
    },
    onSure() {
      if (!this.needBlank) {
        this.inputValue = this.inputValue.trim();
      }
      if (this.inputValue && this.inputValue.indexOf("\n" > -1)) {
        if (this.useLabel) {
          if (this.needBlank) {
            this.displayValue = this.inputValue.split("\n");
          } else {
            let list = this.inputValue.split("\n");
            for (let i = 0; i < list.length; i++) {
              if (list[i] == "") {
                list.splice(i, 1);
                i -= 1;
              }
            }
            this.displayValue = list;
          }
        } else {
          this.displayValue = this.inputValue.replace(/\n/g, ",");
        }
      } else {
        this.displayValue = "";
      }
      this.isShow = false;
    },
    onReset() {
      if (this.useLabel) {
        this.displayValue = [];
      } else {
        this.displayValue = "";
      }
      this.inputValue = "";
      this.$emit("change", []);
    },
    onDelete(str) {
      let list = this.inputValue.split('\n')
      const id = list.findIndex(v=>v === str)
      list.splice(id,1)
      this.inputValue = list.join('\n')
      const idx = this.displayValue.findIndex(v=>v === str)
      this.displayValue.splice(idx,1)
    },
  },
};
</script>
