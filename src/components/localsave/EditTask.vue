<script setup>
import { ref } from "vue";
import dropdown from "vue-dropdowns";
const props = defineProps({
  itemId: String,
  itemName: String,
  itemStatus: String,
});
const emit = defineEmits(["cancel", "update"]);
const edit = ref("");
const EditTodo = ref(props.itemName);
const EditID = ref(props.itemId);
const defaultData = [
  {
    id: 1,
    content: "Write a blog post",
    status: "Inprogress",
  },
];
const todosData = JSON.parse(localStorage.getItem("todos")) || defaultData;
const todos = ref(todosData);
const object = {
  name: props.itemStatus,
};
const arrayOfObjects = [
  {
    name: "Completed",
  },
  {
    name: "Inprogress",
  },
];
function methodToRunOnSelect(payload) {
  object["name"] = payload["name"];
  console.log(object);
}

function saveData() {
  const storageData = JSON.stringify(todos.value);
  localStorage.setItem("todos", storageData);
}

function updateTodo() {
  for (var i = 0; i < this.todos.length; i++) {
    if (this.todos[i]["id"] === this.EditID) {
      this.todos[i]["content"] = this.EditTodo;
      this.todos[i]["status"] = object["name"];
    }
  }
  saveData();
  emit("cancel");
}

function cancel() {
  emit("cancel");
}
</script>

<template>
  <div class="header-container">
    <h2>Edit Task: {{ EditID }}</h2>
  </div>
  <div class="add-container mt-8" @submit.prevent="addTodo()">
    <form>
      <nav class="textField">
        <label>Task Name</label>
        <input v-model="EditTodo" name="EditTodo" autocomplete="off" />
        <label>Task Status</label>
        <dropdown
          :options="arrayOfObjects"
          :selected="object"
          v-on:updateOption="methodToRunOnSelect"
        ></dropdown>
      </nav>
    </form>
  </div>
  <div class="footer-container">
    <nav class="update-data-popup">
      <nav class="button-cancel" @click="cancel()">Cancel</nav>
      <nav class="button-update" @click="updateTodo()">Update</nav>
    </nav>
  </div>
</template>


<style>

</style>