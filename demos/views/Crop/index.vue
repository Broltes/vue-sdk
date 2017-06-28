<template>
  <app-view>
    <div>
      <a class="crop-btn" @click="$router.back()">取消</a>
      <a class="crop-btn" @click="crop">确定</a>
    </div>
    <crop :img="img" ref="crop"></crop>
  </app-view>
</template>

<script>
import mediator from '../mediator';

export default {
  data() {
    return {
      img: ''
    };
  },
  methods: {
    crop() {
      this._onCrop(this.$refs.crop.crop());
      this.$router.back();
    }
  },
  created() {
    let { img, onCrop } = mediator.fetch();
    this._onCrop = onCrop;
    this.img = img;
  }
}
</script>

<style lang="scss" scoped>
.crop-btn {
  position: absolute;
  top: 1em;
  color: #fff;
  z-index: 1;

  &:first-child {
    left: 1em;
  }
  &:last-child {
    right: 1em;
  }
}
</style>
