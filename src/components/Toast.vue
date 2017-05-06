<template>
  <div>
    <div class="mask" v-show="show && mask"></div>

    <transition name="toast">
      <div class="toast" v-show="show">
        <i class="loading" v-if="icon === 'loading'"></i>
        <icon id="success" v-if="icon === 'success'"></icon>
        <icon id="warn" v-if="icon === 'warn'"></icon>
        <div class="toast-message">{{message}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['show', 'message', 'icon', 'mask']
}
</script>
