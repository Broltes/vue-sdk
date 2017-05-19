<template>
  <app-view>
    <keep-alive>
      <router-view :cb="cb"></router-view>
    </keep-alive>
  </app-view>
</template>

<script>
import { toast } from 'vue-sdk';

export default {
  methods: {
    cb: function() {
      // use alert will fail when view reopen
      toast.show({ message: 'cb from holder ' + Date.now() });
    }
  }
}
</script>
