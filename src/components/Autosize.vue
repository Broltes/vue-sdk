<template>
  <textarea @input="update" :rows="rows" :value="value"></textarea>
</template>

<script>
export default {
  props: {
    value: String,
    rows: { default: 1 }
  },
  methods: {
    update(e) {
      //  resize
      const el = e.target;
      el.style.height = 'auto';
      el.style.height = Math.max(el.scrollHeight, el.offsetHeight) + 'px';

      this.$emit('input', el.value);
    }
  }
}
</script>
