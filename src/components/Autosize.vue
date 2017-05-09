<template>
  <textarea @input="resize" :rows="rows"></textarea>
</template>

<script>
export default {
  props: {
    rows: { default: 1 }
  },
  methods: {
    resize(e) {
      const el = e.target;

      el.style.height = 'auto';
      el.style.height = Math.max(el.scrollHeight, el.offsetHeight) + 'px';
    }
  }
}
</script>
