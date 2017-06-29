<template>
  <router-view>
    <app-header withback>toast</app-header>
    <div class="app-body demo-toast">
      <toast v-bind="loading" :show="true" :mask="false" @click.native="showLoading"></toast>
      <toast v-bind="success" :show="true" @click.native="showSuccess"></toast>
      <toast v-bind="warn" :show="true" @click.native="showWarn"></toast>
      <toast v-bind="msg" :show="true" @click.native="showMsg"></toast>
    </div>
  </router-view>
</template>

<script>
import { toast } from 'vue-sdk';
import Toast from 'vue-sdk/src/components/Toast';

export default {
  data() {
    return {
      loading: {
        icon: 'loading',
        message: 'loading with mask',
        mask: true
      },
      success: {
        icon: 'success',
        message: '加载成功'
      },
      warn: {
        icon: 'warn',
        message: '操作失败'
      },
      msg: {
        message: '简单提示消息'
      }
    }
  },
  methods: {
    showLoading() {
      toast.show(this.loading);
    },
    showSuccess() {
      toast.show(this.success);
    },
    showWarn() {
      toast.show(this.warn);
    },
    showMsg() {
      toast.show(this.msg);
    }
  },
  components: {
    toast: Toast
  }
}
</script>

<style lang="scss">
.demo-toast {
  .toast {
    position: static;
    display: inline-block;
    transform: none;
    margin: 1em;
  }
}
</style>
