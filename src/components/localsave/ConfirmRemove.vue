<script setup>
import { ref } from "vue";
import dropdown from "vue-dropdowns";
const props = defineProps({
  itemId: String,
  itemName: String,
  itemIndex: Number,
});
const emit = defineEmits(["cancel", "remove"]);
function cancelRemove() {
  emit("cancel");
}
function remove() {
  emit("remove",props.itemIndex);
}
</script>

<template>
  <div class="header-container">
    <h2>Remove Task: {{ EditID }}</h2>
  </div>
  <div class="add-container mt-8" @submit.prevent="addTodo()">
    <h3>Are you sure you want to delete: {{ EditTodo }}</h3>
  </div>
  <div class="footer-container">
    <nav class="update-data-popup">
      <nav class="button-cancel" @click="cancelRemove()">Cancel</nav>
      <nav class="button-update" @click="remove()">Delete</nav>
    </nav>
  </div>
</template>


<style>
</style>