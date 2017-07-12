<template>
  <div class="app-header">
    <div class="app-header-left">
      <a class="app-header-back" v-if="withback !== undefined" @click="$router.go(-1)">{{withback}}</a>
      <slot name="left"></slot>
    </div>

    <div class="app-header-title">
      <slot></slot>
    </div>

    <div class="app-header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    withback: String
  }
}
</script>
