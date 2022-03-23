<script setup>
import { ref } from "vue";
import dropdown from "vue-dropdowns";
import axios from 'axios';
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
  axios
        .post("http://localhost:3030/v1/remove/props.itemIndex",{
            headers: {
                Authorization: 'Bearer {token}'
            }
        })
        .then(response => {
          console.log(response.status)
            if(response.status == 200){
              emit("cancel");
            }
        })
        .catch(e => {
            console.log(e)
        })
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