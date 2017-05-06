<template>
  <div class="app-header">
    <div class="app-header-left">
      <slot name="left"></slot>
    </div>

    <div class="app-header-title">
      <slot></slot>
    </div>

    <div class="app-header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
