<template>
  <div>
    <transition name="mask">
      <div class="mask mask-dark" v-show="show" @click="hide"></div>
    </transition>

    <transition name="popup">
      <div class="popup" v-show="show">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    hide() {
      this.$emit('update:show', false)
    }
  }
}
</script>
