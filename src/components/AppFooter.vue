<template>
  <div class="app-footer">
    <div v-for="item in items" :key="item.index"
      :class="`app-footer-item${index === item.index ? ' app-footer-item-active' : ''}`"
      @click="setIndex(item.index)">

      <span class="app-footer-icon">
        <icon :id="index === item.index ? item.iconFilled || item.icon + '-fill' : item.icon"></icon>
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
  computed: {
    items() {
      return this.list.map((item, i) => {
        return Object.assign({
          index: i
        }, item)
      })
    }
  },
  methods: {
    setIndex(index) {
      this.$emit('switch', index)
    }
  }
}
</script>
