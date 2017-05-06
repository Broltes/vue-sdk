<template>
  <transition :name="transitionName">
    <div class="app-view">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { default as vm, initForRouter } from './vm';

function getVisibleBody($view) {
  return [].slice.apply($view.querySelectorAll('.app-body')).filter(el => {
    let style = window.getComputedStyle(el);
    return style.visibility !== 'hidden' && style.display !== 'none';
  })[0];
}

export default {
  data() {
    return vm;
  },
  computed: {
    transitionName() {
      let directionName = {
        '1': 'forward',
        '-1': 'back'
      }[this.direction];

      return 'app-view-' + directionName;
    }
  },
  created() {
    initForRouter(this.$router);
  },
  activated() {
    console.log(vm.direction, 'enter', vm.timestamp, this)

    let scrollTop = vm.scrollTopMap[vm.timestamp];
    let $body = getVisibleBody(this.$el);

    // Restore the scrollbar progress
    if (scrollTop && $body) $body.scrollTop = scrollTop;
  },
  deactivated() {
    console.log(vm.direction, 'leave', vm.lastTimestamp, this);

    if (vm.direction === -1) {
      // Disable keep-alived current view when closed by back direction
      this.$parent.$destroy();
      delete vm.scrollTopMap[vm.lastTimestamp];
      return;
    }

    // Save the scrollbar progress for current view
    let $body = getVisibleBody(this.$el);
    if ($body) vm.scrollTopMap[vm.lastTimestamp] = $body.scrollTop;
  }
}
</script>
