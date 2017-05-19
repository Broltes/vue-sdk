<template>
  <app-view>
    <app-header withback>actionsheet</app-header>
    <div class="app-body demo-actionsheet">
      <actionsheet v-bind="simple" :show="true" :action="simpleAction"></actionsheet>
      <actionsheet v-bind="complex" :show="true" :action="complexAction"></actionsheet>
    </div>
  </app-view>
</template>

<script>
import { actionsheet } from 'vue-sdk';
import ActionSheet from 'vue-sdk/src/components/ActionSheet';
import qq from '@/img/qq.png';
import weibo from '@/img/weibo.png';
import weixin from '@/img/weixin.png';

export default {
  data() {
    return {
      simple: {
        buttons: ['拍照', '从相册选择'],
        cancelText: ''
      },

      complex: {
        message: '分享',
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
    }
  },
  methods: {
    simpleAction() {
      actionsheet({
        ...this.simple,
        action(index) {
          console.log(index)
        }
      });
    },
    complexAction() {
      actionsheet({
        ...this.complex,
        action(index, menuIndex) {
          console.log(index, menuIndex)
        }
      });
    }
  },
  components: {
    actionsheet: ActionSheet
  }
}
</script>

<style lang="scss">
.demo-actionsheet {
  background-color: #666;

  .mask {
    display: none;
  }

  .popup {
    position: static;
  }

  .actionsheet {
    margin-top: 3em;
  }
}
</style>
