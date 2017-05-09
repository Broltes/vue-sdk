<template>
  <app-view>
    <div class="app-body">
      <div class="actionsheet">

      <div class="actionsheet-btn" v-for="(item, index) in buttons"
        @click="action(index)">{{item}}</div>
      </div>

      <div class="actionsheet">
        <div class="actionsheet-message">分享</div>

        <div class="actionsheet-menu" v-for="(menu, menuIndex) in menus">
          <div class="actionsheet-menu-item" v-for="(item, index) in menu"
            @click="action(index, menuIndex)">
            <div class="actionsheet-menu-icon">
              <img v-if="item.img" :src="item.img">
              <icon v-if="item.icon" :id="item.icon"></icon>
            </div>
            <div class="actionsheet-menu-label">{{item.label}}</div>
          </div>
        </div>

        <div class="actionsheet-cancel">取消</div>
      </div>
    </div>
  </app-view>
</template>

<script>
import { actionsheet } from 'vue-sdk';
import qq from '@/img/qq.png';
import weibo from '@/img/weibo.png';
import weixin from '@/img/weixin.png';

export default {
  data() {
    return {
      imgs: {
        qq, weibo, weixin
      },

      buttons: ['拍照', '从相册选择'],

      menus: [
        [
          { img: qq, label: 'QQ' },
          { img: weixin, label: '微信好友' },
          { img: weibo, label: '新浪微博' }
        ],
        [
          { icon: 'home', label: '首页' },
          { icon: 'message', label: '消息' },
          { icon: 'me', label: '我' },
          { icon: 'complaints', label: '举报' }
        ]
      ]
    }
  },
  methods: {
    action(index, menuIndex) {
      actionsheet({
        message: menuIndex >= 0 ? '分享' : '',
        cancelText: menuIndex >= 0 ? '取消' : '',
        buttons: menuIndex >= 0 ? null : this.buttons,
        menus: menuIndex >= 0 ? this.menus : null,
        action(index, menuIndex) {
          console.log(index, menuIndex)
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.app-body {
  background-color: #666;
}

.actionsheet {
  margin-top: 3em;
}
</style>
