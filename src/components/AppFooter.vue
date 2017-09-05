<template>
  <div class="app-footer">
    <div v-for="(item, i) in list" :key="i"
      :class="`app-footer-item${i === index ? ' app-footer-item--active' : ''}`"
      @click="setIndex(i)">

      <span class="app-footer-icon">
        <icon v-if="item.icon"
          :id="i === index ? item.iconFilled || item.icon + '-fill' : item.icon"></icon>
        <img v-if="item.img" :src="i === index ? item.imgFilled : item.img">
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
      this.$emit('switch', index)
    }
  }
}
</script>
