<template>
  <app-view>
    <app-header withback>
      Nest
      <router-link :to="{ name: 'nested' }" slot="right">Nested</router-link>
    </app-header>
    <div class="app-body">
      <div class="btn-area">
        <a @click="cb" class="btn">Test</a>
      </div>
    </div>
  </app-view>
</template>

<script>
export default {
  props: ['cb']
}
</script>
