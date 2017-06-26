<template>
  <transition :name="transitionName">
    <div :class="`app-view app-view-${vm.animation}`">
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
    return {
      vm,
      timestamp: vm.timestamp,
      scrollTop: 0
    };
  },
  computed: {
    transitionName() {
      let directionName = {
        '1': 'forward',
        '-1': 'back'
      }[vm.direction];

      return `app-view-${vm.animation}-${directionName}`;
    }
  },
  watch: {
    'vm.timestamp': function(timestamp) {
      if (timestamp < this.timestamp) {
        console.log(vm.direction, 'destroy', this.timestamp, this);

        // Disable keep-alived current view when closed by back direction.
        // Destroy the deprecated view after the transition finished.
        // Can't in transition js hook, as there's no transition if `history.go(-2)`.
        setTimeout(() => {
          this.$parent.$destroy();
        }, 1e3);
      } else if (timestamp === this.timestamp) {
        console.log(vm.direction, 'enter', this.timestamp, this);

        // scrollTop must apply in activated hook for ios
        this.scrollTop = vm.scrollTopMap[this.timestamp];
      } else {
        console.log(vm.direction, 'leave', this.timestamp, this);

        // Save the scrollbar progress for current view
        let $body = getVisibleBody(this.$el);
        if ($body) vm.scrollTopMap[this.timestamp] = $body.scrollTop;
      }
    }
  },
  created() {
    initForRouter(this.$router);
  },
  activated() {
    let $body = getVisibleBody(this.$el);

    // Restore the scrollbar progress
    if ($body && this.scrollTop) $body.scrollTop = this.scrollTop;
  }
}
</script>
