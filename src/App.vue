<script setup>
import TheMainPopup from './components/localsave/TheMainPopup.vue'
import TheMainPopupAPIVue from './components/apisave/TheMainPopupAPI.vue';
</script>

<template>
  <main>
    <TheMainPopup/>
  </main>
</template>

<style>
@import './assets/base.css';
body {
  background: #e6e6e6;
  overflow: hidden;
}
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
