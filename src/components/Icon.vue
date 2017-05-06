<template>
  <svg class="icon"><use :xlink:href="`#${id}`"/></svg>
</template>

<script>
export default {
  props: ['id']
}
</script>
