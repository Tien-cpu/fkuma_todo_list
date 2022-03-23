<script setup>
import { ref } from "vue";
import axios from 'axios';
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
function saveData() {
  const storageData = JSON.stringify(todos.value);
  localStorage.setItem("todos", storageData);
}
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
function addTodo() {
  if (newTodo.value) {
    axios
        .post("http://localhost:3030/v1/add",{
                "content": newTodo.value
            },{
            headers: {
                Authorization: 'Bearer {token}'
            }
        })
        .then(response => {
          console.log(response.status)
            if(response.status == 200){
              emit("reload");
            }
        })
        .catch(e => {
            console.log(e)
        })
  }
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