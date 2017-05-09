<template>
  <popup :show="show" :maskClick="maskClick">
    <div class="actionsheet">
      <div v-if="message" class="actionsheet-message">{{message}}</div>

      <div class="actionsheet-btn" v-for="(item, index) in buttons"
        @click="action(index)">{{item}}</div>

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

      <div v-if="cancelText" @click="cancel" class="actionsheet-cancel">{{cancelText}}</div>
    </div>
  </popup>
</template>

<script>
export default {
  props: ['show', 'message', 'buttons', 'menus', 'cancelText', 'action', 'cancel'],
  methods: {
    // cancel not ready when init plugin
    maskClick() {
      this.cancel();
    }
  }
}
</script>
