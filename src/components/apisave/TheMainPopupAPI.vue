
<template>
    <div class="screan">
        <div class="main">
        <div class="header-container">
            <h2>TODO APP</h2>
        </div>
            <AddComponentsVue @reload="searchAll()" @saveData="saveData()"/>
            <div class="list-todo-container">
                <div class="right-wrapper">
                    <button class="button-search" @click="searchCompleted()">Completed</button>
                    <button class="button-search" @click="searchInprogress()">Inprogress</button>
                    <button class="button-search" @click="searchAll()">ALL</button>
                </div>
                <ul>
                    <li
                        v-for="(todo, index) in todos"
                        :key="index"
                    >
                        <span
                            :class="{ done: todo.done ,textF}"
                            class="name"
                        >{{ todo.content }}</span>
                        <span
                            :class="{ done: todo.done ,textF}"
                            class="status"
                        >{{ todo.status }}</span>
                        <nav class="update-data">
                            <nav class="buttonEdit" @click="openedit(index)"><IconEdit />    Edit</nav>
                            <nav class="buttonRemove" @click="openremove(index)"><IconRemove /></nav>
                        </nav>
                    </li>
                </ul>
                <h4 v-if="todos.length === 0">Todo is not found!</h4>
            </div>
        </div>
        <div class="mainEdit" v-if="EditID !== 'false'">
            <EditTask
                :itemId="EditID"
                :itemName="EditTodo"
                :itemStatus="object['name']"
                @cancel="cancel"
                @update="updateTodo"
              />
        </div>
        <div class="mainEdit" v-if="RemoveID !== 'false'">
            <ConfirmRemoveVue
                :itemId="RemoveID"
                :itemName="RemoveTodo"
                :itemIndex="RemoveIndex"
                @cancel="cancelRemove"
                @remove="removeTodo()"
              />
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import IconRemove from '../icons/iconRemove.vue'
    import IconEdit from '../icons/iconEdit.vue'
    import EditTask from './EditTask.vue'
    import AddComponentsVue from './AddComponents.vue';
    import ConfirmRemoveVue from './ConfirmRemove.vue';
    import axios from 'axios';

    const RemoveIndex = ref(-1)
    const newTodo = ref('');
    const EditTodo = ref('');
    const EditID = ref('false');
    const RemoveTodo = ref('');
    const RemoveID = ref('false');
	const todos = ref();
    searchAll()
    const object = {
                name: 'Completed'
            }
    const arrayOfObjects = [{
                  name: 'Completed',
                },{
                  name: 'Inprogress',
                }];
    function methodToRunOnSelect(payload){
        object['name'] = payload['name'];
        console.log(object)
    }

    function addTodo () {
		axios
        .post("http://localhost:3030/v1/add",{
                "test 1": 'Bearer {token}'
            },{
            headers: {
                Authorization: 'Bearer {token}'
            },
            data: {
                "test 2": 'Bearer {token}'
            },
        })
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                todos.value.push({
                    id: response.data[i]['id'],
                    content: response.data[i]['name'],
                    status: response.data[i]['status']
                });
            }
        })
        .catch(e => {
            console.log(e)
        })
	}
    function removeTodo (index) {
        searchAll()
        todos.value.splice(index, 1);
		saveData();
        RemoveID.value = 'false'
	}
    
    function openremove (index) {
        RemoveID.value = this.todos[index]['id']
        RemoveTodo.value = this.todos[index]['content']
        RemoveIndex = index
	}

    function openedit (index) {
        EditID.value = this.todos[index]['id']
        EditTodo.value = this.todos[index]['content']
        object['name'] = this.todos[index]['status']
	}

    function searchCompleted () {			
		todos.value = []
        axios
        .post("http://localhost:3030/v1/search/Completed",{
                "test": 'Bearer {token}'
            },{
            headers: {
                Authorization: 'Bearer {token}'
            },
            data: {
                "test": 'Bearer {token}'
            },
        })
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                todos.value.push({
                    id: response.data[i]['id'],
                    content: response.data[i]['name'],
                    status: response.data[i]['status']
                });
            }
        })
        .catch(e => {
            console.log(e)
        })
	}

	function searchInprogress () {
		todos.value = []
        axios
        .get('http://localhost:3030/v1/search/Inprogress')
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                todos.value.push({
                    id: response.data[i]['id'],
                    content: response.data[i]['name'],
                    status: response.data[i]['status']
                });
            }
        })
        .catch(e => {
            console.log(e)
        })
	}

	function searchAll() {
		todos.value = []
        axios
        .get('http://localhost:3030/v1/search/all')
        .then(response => {
            for (var i = 0; i < response.data.length; i++) {
                todos.value.push({
                    id: response.data[i]['id'],
                    content: response.data[i]['name'],
                    status: response.data[i]['status']
                });
            }
        })
        .catch(e => {
            console.log(e)
        })
	}

    function updateTodo(){
        todos.value = []
		let todosList = JSON.parse(localStorage.getItem('todos')) || defaultData;
		for (var i = 0; i<todosList.length; i++) {
            if(todosList[i]['id'] === ID){

            }else{
                
            }
			
		}
        saveData();
        EditTodo.value = ''
        EditID.value = 'false'
    }
    function cancel() {
        EditTodo.value = ''
        EditID.value = 'false'
        object['name'] = 'Completed'
        searchAll()
    }
    function cancelRemove() {
        RemoveID.value = 'false'
        searchAll()
    }
</script>

<style>
.screan{
    width: 100%;
    position: absolute;
}
.mainEdit{
    position: absolute;
    z-index: 3;
    width: 500px;
	margin-left: 30%;
	margin-right: 30%;
	margin-top: 80px;
	margin-top: 80px;
	background: #ffffff;
	border-radius: 10px;
	border: 1px solid #dfe6f0;
    color: #0786bd;
}

.mainEdit .header-container{
    max-width: 500px;
	margin-left: auto;
	margin-right: auto;
    padding-left: 20px;
    border-bottom: 1px solid #dfe6f0;
}

.mainEdit .add-container{
    max-width: 500px;
	padding-left: 20px;
	padding-top: 20px ;
	border-bottom: 1px solid #dfe6f0;
}

.update-data-popup{
    /* width: 100%; */
    margin-left: 2%;
	display: inline-block;
}

.update-data-popup .button-cancel{
    height: 36px;
	width: 105px;
    /* width: fit-content; */
	box-shadow: none;
	outline: none;
	padding-left: 12px;
	padding-right: 12px;
	border-radius: 18px;
	font-size: 18px;
	margin-top: 18px;
	margin-bottom: 12px;
	margin-left: 20px;
    margin-right: 0px;
    text-align: center;
	color: #0786bd;
	background-color: #ffffff;
	border: 1px solid #dfe6f0;
}

.update-data-popup .button-update{
    height: 36px;
	width: 105px;
    /* width: fit-content; */
	box-shadow: none;
	outline: none;
	padding-left: 12px;
	padding-right: 12px;
	border-radius: 18px;
	font-size: 18px;
	margin-top: 18px;
	margin-bottom: 12px;
	margin-left: 20px;
    margin-right: 0px;
    text-align: center;
	color: #ffffff;
	background-color: #0786bd;
	border: 1px solid #dfe6f0;
}

.mainEdit .footer-container{
    max-width: 500px;
    display: inline;
}

.add-container dropdown{
    height: 480px;
	width: 75%;
	background-color: transparent;
	border-radius: 5px;
	color: #0786bd;
	border: 1px solid #dfe6f0;
}

.main{
    position: absolute;
    z-index: 2;
    width: 600px;
	margin-left: 25%;
	margin-right: 25%;
	margin-top: 80px;
	background: #ffffff;
	border-radius: 10px;
	border: 1px solid #dfe6f0;
    color: #0786bd;
}
.header-container{
    max-width: 600px;
	margin-left: auto;
	margin-right: auto;
    padding-left: 20px;
    border-bottom: 1px solid #dfe6f0;
}
.header-container h2 {
				font-weight: bold;
				font-size: 22px;
				text-align: left;
				color: #0786bd;
                padding-top: 10px ;
			}
.add-container{
    max-width: 600px;
	padding-left: 20px;
	padding-top: 20px ;
	border-bottom: 1px solid #dfe6f0;
}

.add-container form{
    max-width: 600px;
	flex-direction: column;
}

.add-container .textField{
    display: inline;
    height: 38px;
}

.add-container label{
    height: 38px;
	font-size: 14px;
	width: 20%;
	font-weight: bold;
	color: #0786bd;
	text-align: center;
	padding: 20px;
}

.add-container input{
    height: 48px;
	width: 75%;
	background-color: transparent;
	border-radius: 5px;
	color: black;
	border: 1px solid #dfe6f0;
}

.add-container button{
    height: 36px;
	/* width: 72px; */
    width: fit-content;
	box-shadow: none;
	outline: none;
	padding-left: 32px;
	padding-right: 32px;
	border-radius: 18px;
	font-size: 18px;
	margin-top: 18px;
	margin-bottom: 12px;
	margin-left: 77%;
	color: #ffffff;
	background-color: #0786bd;
	border: 1px solid #dfe6f0;
}

.list-todo-container{
    /* padding: 20px; */
    max-width: 600px;
    /* height: 150px; */
}

.list-todo-container .right-wrapper{
    margin-left: 28%;
	display: inline-block;
}

.list-todo-container .button-search{
    height: 36px;
	/* width: 105px; */
    width: fit-content;
	box-shadow: none;
	outline: none;
	padding-left: 22px;
	padding-right: 22px;
	border-radius: 18px;
	font-size: 18px;
	margin-top: 18px;
	margin-bottom: 12px;
	margin-left: 20px;
    text-align: center;
	color: #ffffff;
	background-color: #0786bd;
	border: 1px solid #dfe6f0;
}

.list-todo-container .button-edit{
    height: 36px;
	box-shadow: none;
	outline: none;
	border-radius: 10px;
	font-size: 20px;
	margin-top: 18px;
	margin-bottom: 12px;
	margin-left: 20px;
    text-align: center;
	color: #0786bd;
	border: 1px solid #dfe6f0;
    width: 63px;
    justify-content: center;
}

.list-todo-container .button-edit span{
    font-size: 12px;
}

.list-todo-container .button-edit a{
    height: 25px;
    margin-bottom: 5px;
}

.list-todo-container .update-data{
    cursor: pointer;
	width: 30%;
	color: #0786bd;
    display: inline;
}

.update-data .buttonEdit{
    display: inline;
	cursor: pointer;
	width: 30%;
    border: 1px solid #dfe6f0;
	color: #0786bd;
    background: #fff;
    cursor: pointer;
    vertical-align: middle;
    
    outline: none;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0;
    margin: 0;
    position: relative;
    margin-left: 60px;
    display: inline-flex;
    align-items: center;
    border-radius: 12px;
    font-size: 13.5px;
    width: 64px;
    justify-content: center;
}

.update-data .buttonRemove{
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    outline: none;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: #fff;
    cursor: pointer;
    vertical-align: middle;
	margin-left: 8px;
    line-height: 22px;
    border-radius: 13.5px;
    width: 27px;
    height: 27px;
    font-size: 13.5px;
    border: 1px solid #dfe6f0;
    color: #0786bd;
}

.buttonRemove vsg{
    fill: currentColor;
}

.list-todo-container ul {
	padding: 10px;
}

.list-todo-container li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 2px solid white 0.35;
	padding: 12px 24px;
	border-radius: 6px;
	margin-bottom: 12px;
}


.list-todo-container span {
	cursor: pointer;
	width: 30%;
	color: #0786bd;
    font-weight: bold;
	/* border-right: 1px solid #0786bd; */
}
.name{
	text-align: left;
    border-right: 1px solid #dfe6f0;
}
.status{
	text-align: right;
	padding-right: 20px;
    border-right: 1px solid #dfe6f0;
}
.list-todo-container h4 {
	width: 100%;
    text-align: center;
}
</style>