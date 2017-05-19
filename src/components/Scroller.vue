<template>
  <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <slot name="header"></slot>
    <div :style="{ transform: `translate3d(0,${y}px,0)` }" ref="scroller">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import animate from '../modules/animate';
const { easeOutCubic, easeInOutCubic } = animate;
const overScrollDistance = 20;

function fixByBoundary(value, boundary) {
  if (value > boundary[1]) {
    return boundary[1];
  } else if (value < boundary[0]) {
    return boundary[0];
  }

  return value;
}
// Variables for each instance
//
// let startTime;
// let startPointY;
// let endPointY;
// let lastTranslateY = 0;// Cache y when scroll stoped
// let decelerating;// animation id
// const points = [];// Track scroll movement for decleration

// let boundary;
// let translateBoundary;
// let indicatorHeight;
// let offsetItemIndex;

export default {
  props: {
    indicator: {
      type: Array,
      // [top, bottom] to the scroller
      default: [0, 0]
    },
    indicatorIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      y: 0
    };
  },
  methods: {
    touchstart(e) {
      e.preventDefault();
      if (this.decelerating) this.decelerating = animate.stop(this.decelerating);

      this.startPointY = e.changedTouches[0].pageY;
      this.startTime = e.timeStamp;
      this.lastTranslateY = this.y;
      this.points = [];

      // Always caculate the scrollHeight before scroll,
      // as scroller content may changes
      let scrollHeight = this.$refs.scroller.clientHeight;
      this.boundary = [-scrollHeight + this.indicator[1], this.indicator[0]];
      this.translateBoundary = [this.boundary[0] - overScrollDistance, this.boundary[1] + overScrollDistance];
    },
    touchmove(e) {
      this.endPointY = e.changedTouches[0].pageY;
      const diff = this.endPointY - this.startPointY;

      // Sync scroll position
      this.y = fixByBoundary(this.lastTranslateY + diff, this.translateBoundary);

      this.startTime = e.timeStamp;
      // Track scroll movement
      this.points.push([this.startTime, this.y]);

      // Keep list from growing infinitely (holding min 10, max 20 measure points)
      if (this.points.length > 40) {
        this.points.splice(0, 20);
      }
    },
    touchend(e) {
      const endTime = e.timeStamp;
      this.endPointY = e.changedTouches[0].pageY;

      // Need deceleration,
      // if the last move was detected in 100ms,
      // and the movement between endPointY and startPointY(last y) is more than 10px.
      if (endTime - this.startTime < 100) {
        const endIndex = this.points.length - 1;
        let startIndex = endIndex;
        // Find point measured 100ms ago as start point
        for (let i = endIndex; i > 0 && this.startTime - this.points[i][0] < 100; i--) {
          startIndex = i;
        }

        // If start and stop point is identical in a 100ms timeframe,
        // we cannot compute any useful deceleration.
        if (startIndex !== endIndex) {
          const startPoint = this.points[startIndex];
          const endPoint = this.points[endIndex];

          // Compute relative movement between these two points
          const timeOffset = endPoint[0] - startPoint[0];
          const movedTop = endPoint[1] - startPoint[1];

          // Based on 50ms compute the movement to apply for each render step
          let decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
          // How much velocity is required to start the deceleration
          let minVelocityToStartDeceleration = 4;

          if (Math.abs(decelerationVelocityY) > minVelocityToStartDeceleration) {
            this.decelerat(decelerationVelocityY);
          }
        }
      }

      if (!this.decelerating) this.scrollTo(this.y);
    },

    decelerat(decelerationVelocityY) {
      // Start animation
      this.decelerating = animate.start(() => {
        let nextY = this.y + decelerationVelocityY;

        // Stop the animation for translateBoundary
        if (fixByBoundary(nextY, this.translateBoundary) !== nextY) {
          decelerationVelocityY = 0;
          this.scrollTo(nextY);
          return false;// Stop animation
        }

        if (Math.abs(decelerationVelocityY) > 1) {
          decelerationVelocityY *= 0.95;
        } else {
          // Scroll animation almost stoped
          if (!this.indicatorHeight) {
            return false;// Stop animation
          }

          // Make the distance of scroll step to meet the indicator at the end of animation
          if (Math.abs(this.y % this.indicatorHeight) < 1) {
            decelerationVelocityY = 0;
            this.completed();
            return false;// Stop animation
          }
        }

        this.y = nextY;
      });
    },
    // Scroll with animation
    scrollTo(y) {
      // To meet the boundary
      let fixedY = fixByBoundary(y, this.boundary);
      if (fixedY === y) {
        // To meet the indicator
        let offsetY = this.y % this.indicatorHeight;

        if (Math.abs(offsetY) < this.indicatorHeight / 2) {
          fixedY -= offsetY;
        } else {
          fixedY += (offsetY > 0 ? 1 : -1) * (this.indicatorHeight - Math.abs(offsetY));
        }
      }

      let oldY = this.y;
      let diffY = fixedY - oldY;
      let step = (percent) => {
        this.y = oldY + (diffY * percent);

        if (percent >= 1) this.completed();
      }

      animate.start(step, 200, this.decelerating ? easeOutCubic : easeInOutCubic)
    },
    completed() {
      if (this.indicatorHeight) {
        // Get the index of item, which is in indicator
        this.$emit('change', Math.abs(Math.round(this.y / this.indicatorHeight - this.offsetItemIndex)));
      }
    },

    indicatorIndexChange() {
      this.indicatorHeight = this.indicator[1] - this.indicator[0];
      this.offsetItemIndex = this.indicator[0] / this.indicatorHeight;

      this.y = (this.offsetItemIndex - this.indicatorIndex) * this.indicatorHeight;
    }
  },
  mounted() {
    this.$nextTick(this.indicatorIndexChange);
    this.$watch(function() {
      return [this.indicator, this.indicatorIndex];
    }, this.indicatorIndexChange);
  }
}
</script>
