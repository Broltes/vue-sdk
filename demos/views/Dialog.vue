<template>
  <app-view>
    <div class="app-body">
      <div class="dialog">
        <div class="dialog-hd">{{title}}</div>
        <div class="dialog-bd">{{content}}</div>
        <div class="dialog-ft">
          <a class="dialog-btn" @click="test(1)">Alert</a>
          <a class="dialog-btn" @click="test(2)">Confirm</a>
        </div>
      </div>

      <div class="cells">
        <div class="cell">
          <div class="cell-hd">Title</div>
          <input type="text" class="cell-input" v-model="title">
        </div>
        <div class="cell">
          <div class="cell-hd">Content</div>
          <input type="text" class="cell-input" v-model="content">
        </div>
      </div>
    </div>
  </app-view>
</template>

<script>
import { dialog } from 'vue-sdk';

export default {
  data() {
    return {
      title: '弹窗标题',
      content: '弹窗内容'
    }
  },
  methods: {
    test(buttonsLength) {
      dialog({
        title: this.title,
        content: this.content,
        buttons: ['取消', '确定'].slice(-buttonsLength),
        action(index) {
          console.log(index, 'clicked');
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  position: static;
  margin: 2em auto;
}
</style>
