<template>
  <div class="app-footer">
    <div v-for="(item, i) in list"
      :class="`app-footer-item${index === i ? ' app-footer-item-active' : ''}`"
      @click="setIndex(i)">

      <span class="app-footer-icon">
        <icon :id="index === i ? item.iconFilled || item.icon + '-fill' : item.icon"></icon>
        <span class="badge" v-if="item.badge">{{item.badge}}</span>
        <span class="badge-dot" v-if="item.badgeDot"></span>
      </span>

      <div class="app-footer-label">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'index'],
  methods: {
    setIndex(index) {
      this.$emit('switch', index);
    }
  }
}
</script>
