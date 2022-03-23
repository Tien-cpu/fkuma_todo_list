<script setup>
import { ref } from "vue";
const props = defineProps();
const emit = defineEmits(["reload", "saveData"]);
const newTodo = ref("");
const defaultData = [
  {
    id: 1,
    content: "Write a blog post",
    status: "Inprogress",
  },
];
const todosData = JSON.parse(localStorage.getItem("todos")) || defaultData;
const todos = ref(todosData);
function searchAll() {
		todos.value = []
		let todosList = JSON.parse(localStorage.getItem('todos')) || defaultData;
		for (var i = 0; i<todosList.length; i++) {
			todos.value.push({
				id: todosList[i]['id'],
				content: todosList[i]['content'],
				status: todosList[i]['status']
			});
		}
	}
function saveData() {
  const storageData = JSON.stringify(todos.value);
  localStorage.setItem("todos", storageData);
}
function addTodo() {
    searchAll()
    if (newTodo.value) {
        todos.value.push({
        id:
            this.todos.length === 0
            ? 1
            : this.todos[this.todos.length - 1]["id"] + 1,
        content: newTodo.value,
        status: "Inprogress",
        });
        newTodo.value = "";
    }
    saveData();
    emit("reload");
}
</script>

<template>
  <div class="add-container mt-8" @submit.prevent="addTodo()">
    <form>
      <nav class="textField">
        <label>Task Name</label>
        <input v-model="newTodo" name="newTodo" autocomplete="off" />
      </nav>
      <button>ADD</button>
    </form>
  </div>
</template>


<style>
</style>