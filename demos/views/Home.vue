<template>
  <app-view>
    <app-header>vue-sdk</app-header>

    <div class="app-body" v-show="footerIndex === 0">
      <div class="cells">
        <router-link to="/cell" class="cell cell-access"><div class="cell-bd">cell</div></router-link>
        <router-link to="/button" class="cell cell-access"><div class="cell-bd">button</div></router-link>
        <router-link to="/toast" class="cell cell-access"><div class="cell-bd">toast</div></router-link>
        <router-link to="/dialog" class="cell cell-access"><div class="cell-bd">dialog</div></router-link>
      </div>

      <div class="x-content"></div>
    </div>
    <div class="app-body" v-show="footerIndex === 1">
        <loading></loading>
    </div>
    <div class="app-body" v-show="footerIndex === 2">
      <div class="x-content"></div>
    </div>

    <app-footer :list="footerItems" :index="footerIndex" @switch="setFooterIndex"></app-footer>
  </app-view>
</template>

<script>
export default {
  data() {
    return {
      footerIndex: 0,
      footerItems: [
        { icon: 'home', label: '主页', badge: '99+' },
        { icon: 'message', label: '消息', badge: '6' },
        { icon: 'me', label: '我', badgeDot: true }
      ]
    }
  },
  methods: {
    setFooterIndex(index) {
      this.footerIndex = index;
    }
  }
}
</script>

<style lang="scss" scoped>
.x-content {
  height: 900px;
  background: linear-gradient(#eee, #999);
}
</style>
