<template>
  <router-view>
    <app-header withback>crop</app-header>
    <div class="app-body">
      <label class="avatar-uploader" :style="{
          backgroundImage: `url(${img})`,
          backgroundSize: `${sizeRatio.width * 100}% ${sizeRatio.height * 100}%`,
          backgroundPosition: `${beginPoint.x * 100}% ${beginPoint.y * 100}%`
        }">
        <div class="avatar-uploader-label">编辑</div>
        <input type="file" accept="image/*" @change="imgSelected">
      </label>
    </div>
  </router-view>
</template>

<script>
import mediator from '../mediator';

export default {
  data() {
    return {
      img: '',
      beginPoint: {
        x: 0,
        y: 0
      },
      sizeRatio: {
        width: 1,
        height: 1
      }
    };
  },
  methods: {
    imgSelected(e) {
      let target = e.target;
      let files = [].slice.call(target.files);// convert filelist to normal array
      target.value = null;// reset input value

      let imgFile = files[0];
      if (!imgFile) return;

      let reader = new FileReader();
      reader.readAsDataURL(imgFile);
      reader.onload = e => {
        // replace for android4.x
        let img = e.target.result.replace('data:base64', 'data:image/jpeg;base64');

        mediator.post({
          img,
          onCrop: ({ beginPoint, cropSize, naturalSize, scale }) => {
            let sizeRatio = {
              width: naturalSize.width / cropSize.width,
              height: naturalSize.height / cropSize.height
            };

            Object.assign(this, {
              img,
              beginPoint: {
                x: beginPoint.x / (naturalSize.width - cropSize.width),
                y: beginPoint.y / (naturalSize.height - cropSize.height)
              },
              sizeRatio
            });
          }
        });
        this.$router.push('/crop');
      };
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader {
  $size: 6em;

  display: block;
  margin: 2em auto;
  width: $size;
  height: $size;
  border-radius: 100%;
  overflow: hidden;
  background: $bg;
  text-align: center;
  position: relative;
  background-repeat: no-repeat;

  &-label {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: $font-size-xs;
    line-height: 2;
    color: #fff;
    background-color: #333;
  }

  > input {
    display: none;
  }
}
</style>
