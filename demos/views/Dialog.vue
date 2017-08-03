<template>
  <router-view>
    <app-header withback>dialog</app-header>
    <div class="app-body demo-dialog">
      <app-dialog v-bind="options" :show="true" :action="action"></app-dialog>

      <div class="cells">
        <div class="cell">
          <div class="cell-label">Title</div>
          <input type="text" class="cell-input" v-model="options.title">
        </div>
        <div class="cell">
          <div class="cell-label">Content</div>
          <input type="text" class="cell-input" v-model="options.content">
        </div>
      </div>
    </div>
  </router-view>
</template>

<script>
import { dialog } from 'vue-sdk'
import Dialog from 'vue-sdk/src/components/Dialog'

export default {
  data() {
    return {
      options: {
        title: '弹窗标题',
        content: '弹窗内容',
        buttons: ['Alert', 'Confirm']
      }
    }
  },
  methods: {
    action(demoIndex) {
      dialog({
        ...this.options,
        buttons: ['取消', '确定'].slice(-(demoIndex + 1)),
        action(index) {
          console.log(index, 'clicked')
        }
      })
    },
    test(buttonsLength) {
      dialog({
        title: this.title,
        content: this.content,
        buttons: ['取消', '确定'].slice(-buttonsLength),
        action(index) {
          console.log(index, 'clicked')
        }
      })
    }
  },
  components: {
    appDialog: Dialog
  }
}
</script>

<style lang="scss">
.demo-dialog {
  .dialog {
    position: static;
    margin: 2em auto;
  }

  .mask {
    display: none;
  }
}
</style>
