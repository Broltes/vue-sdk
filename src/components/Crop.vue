<template>
  <div class="crop"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend">
    <div :class="`crop-bg ${transition ? 'crop-bg-transition' : ''}`" :style="{ transform: `translate3d(${x0}px,${y0}px, 0) scale(${scale})`}">
      <img :src="img" @load="imgLoaded">
    </div>
    <div ref="mask" class="crop-mask"></div>
  </div>
</template>

<script>
function touchToPoint(touch) {
  return touch && {
    x: touch.pageX,
    y: touch.pageY
  };
}
function calculatePointsDistance(p1, p2) {
  if (!p2) return 0;
  let x0 = Math.abs(p1.x - p2.x);
  let y0 = Math.abs(p1.y - p2.y);

  return Math.round(Math.sqrt(x0 * x0 + y0 * y0));
}
function calculateCenterPoint(p1, p2) {
  if (!p2) return p1;
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p1.y) / 2
  };
}
function limit(min, val, max) {
  return Math.max(min, Math.min(max, val));
}

export default {
  props: ['img'],
  data() {
    return {
      x0: 0,
      y0: 0,
      scale: 1,
      transition: 0
    };
  },
  methods: {
    imgLoaded(e) {
      let { target } = e;
      let bg = target.parentElement;
      let { mask } = this.$refs;

      this._imgInfo = {
        naturalWidth: target.naturalWidth,
        naturalHeight: target.naturalHeight,
        initialWidth: target.clientWidth,
        initialHeight: target.clientHeight
      };

      this._maskInfo = {
        // Compute offset of mask to the img
        offsetX: mask.offsetLeft - bg.offsetLeft,
        offsetY: mask.offsetTop - bg.offsetTop,

        width: mask.clientWidth,
        height: mask.clientHeight
      };

      this._minScale = Math.max(
        this._maskInfo.width / this._imgInfo.initialWidth,
        this._maskInfo.height / this._imgInfo.initialHeight);

      this._scaleX = this._scaleY = 0;
    },
    touchstart({ touches }) {
      let p1 = touchToPoint(touches[0]);
      let p2 = touchToPoint(touches[1]);
      let { scale, x0, y0 } = this;

      this._initialData = {
        distance: calculatePointsDistance(p1, p2),
        centerPoint: calculateCenterPoint(p1, p2),
        x0,
        y0,
        scale
      };
    },
    touchmove(e) {
      e.preventDefault();
      this.transition = 0;

      let p1 = touchToPoint(e.touches[0]);
      let p2 = touchToPoint(e.touches[1]);
      let { _initialData } = this;

      if (p2) {
        let centerPoint = calculateCenterPoint(p1, p2);

        // scale
        let scale0 = calculatePointsDistance(p1, p2) / _initialData.distance;
        this.scale = scale0 * _initialData.scale;
        let scaleRadio = this.scale / _initialData.scale;

        // move after scale
        this.x0 = (_initialData.x0 + centerPoint.x - _initialData.centerPoint.x) * scaleRadio;
        this.y0 = (_initialData.y0 + centerPoint.y - _initialData.centerPoint.y) * scaleRadio;
      } else {
        // simply move
        this.x0 = p1.x - _initialData.centerPoint.x + _initialData.x0;
        this.y0 = p1.y - _initialData.centerPoint.y + _initialData.y0;
      }
    },
    touchend({ touches }) {
      const { scale, x0, y0 } = this;
      let { _initialData } = this;

      this.transition = 1;
      this.scale = Math.max(this._minScale, scale);

      if (touches.length) {
        // Reset the initial point, avoiding shaking when touches changed.
        _initialData.centerPoint = touchToPoint(touches[0]);
        _initialData.x0 = x0;
        _initialData.y0 = y0;
      } else {
        // Compute the offset caused by scaling.
        this._scaleX = (this._imgInfo.initialWidth * this.scale - this._imgInfo.initialWidth) / 2;
        this._scaleY = (this._imgInfo.initialHeight * this.scale - this._imgInfo.initialHeight) / 2;

        // Check boundaries.
        let maxX = this._scaleX + this._maskInfo.offsetX;
        let maxY = this._scaleY + this._maskInfo.offsetY;

        this.x0 = limit(-maxX, x0, maxX);
        this.y0 = limit(-maxY, y0, maxY);
      }
    },
    crop() {
      const { scale, x0, y0, _imgInfo, _maskInfo } = this;
      // Compute the ratio of the img natural size to current size.
      let cropScale = (_imgInfo.initialWidth * scale) / _imgInfo.naturalWidth;

      // The left-top crop point to img.
      let viewX = _maskInfo.offsetX - x0 + this._scaleX;
      let viewY = _maskInfo.offsetY - y0 + this._scaleY;

      return {
        // The left-top point of the crop rectangle.
        // Crop the image by natural size.
        beginPoint: {
          x: Math.round(viewX / cropScale),
          y: Math.round(viewY / cropScale)
        },

        cropSize: {
          width: Math.round(_maskInfo.width / cropScale),
          height: Math.round(_maskInfo.height / cropScale)
        },

        naturalSize: {
          width: _imgInfo.naturalWidth,
          height: _imgInfo.naturalHeight
        },

        scale: cropScale
      };
    }
  }
}
</script>
