<template>
  <app-view>
    <div class="app-body">
      <div class="toast" @click="loading">
        <i class="loading"></i>
        <div class="toast-message">正在加载...</div>
      </div>

      <div class="toast" @click="success">
        <icon id="success"></icon>
        <div class="toast-message">加载成功</div>
      </div>

      <div class="toast" @click="warn">
        <icon id="warn"></icon>
        <div class="toast-message">操作失败</div>
      </div>

      <div class="toast" @click="msg">
        <div class="toast-message">简单提示消息</div>
      </div>
    </div>
  </app-view>
</template>

<script>
import { toast } from 'vue-sdk';

export default {
  methods: {
    loading() {
      toast.show({
        icon: 'loading',
        message: '正在加载',
        mask: true
      });
    },

    success() {
      toast.show({
        icon: 'success',
        message: '加载成功'
      });
    },

    warn() {
      toast.show({
        icon: 'warn',
        message: '操作失败'
      });
    },

    msg() {
      toast.show({
        message: '简单提示消息'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: static;
  display: inline-block;
  transform: none;
  margin: 1em;
}
</style>
