<template>
  <div>
    <transition name="mask">
      <div class="mask mask-dark" v-show="show"></div>
    </transition>

    <transition name="dialog">
      <div class="dialog" v-show="show">
        <div class="dialog-hd">{{title}}</div>
        <div class="dialog-bd">{{content}}</div>
        <div class="dialog-ft">
          <a class="dialog-btn" v-for="(btn, index) in buttons" @click="action(index)">{{btn}}</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['show', 'title', 'content', 'buttons', 'action']
}
</script>
