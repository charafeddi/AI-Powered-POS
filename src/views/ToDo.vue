<template>
    <div class="page-content">
        <div class="page-info">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Apps</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Todo</li>
                </ol>
            </nav>
        </div>
        <div class="main-wrapper">
            <div class="row">
                <div class="col-lg-3">
                    <!-- Sidebar with button to trigger modal for new task -->
                    <div class="card">
                        <div class="card-body">
                            <div class="todo-sidebar">
                                <div class="todo-new-task">
                                    <button class="btn btn-primary btn-block" @click="showModal(null)">
                                          Create New Task
                                    </button>
                                     <!-- Task Modal -->
                                    <div v-if="modalOpen" class="modal fade show"   id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: block;">
                                        <div class="modal-dialog modal-dialog-centered" role="document" >
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">{{ editingTask ? 'Edit Task' : 'New Task' }}</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal(null)">
                                                        <i class="material-icons">close</i>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form @submit.prevent="editingTask ? updateTask() : addTask()">
                                                        <div class="form-group">
                                                            <input type="text" class="form-control" v-model="taskForm.text" placeholder="Task Name" required>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" @click="showModal(null)">Cancel</button>
                                                            <button type="submit" class="btn btn-primary">{{ editingTask ? 'Update' : 'Add' }}</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="todo-menu">
                                    <!-- Menu items (filtering can be implemented here) -->
                                    <ul class="list-unstyled">
                                        <li class="active"><a href="#" @click="all"><i class="fas fa-bars"></i>All</a></li>
                                        <li><a href="#" @click="showCompletedTasks"><i class="fas fa-check"></i>Completed</a></li>
                                        <li><a href="#" @click="showDeletedTask"><i class="fas fa-trash"></i>Deleted</a></li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <!-- Task list -->
                    <div class="card">
                    <div class="card-body">
                        <div class="todo-list">
                        <ul class="list-unstyled">
                            <li class="d-flex align-items-center justify-content-between" v-for="(task, index) in Tasks.data" :key="index">
                                <a href="javascript:void(0);" style="text-decoration: none" class="custom-checkbox" :class="task.aClass" :for="'task' + task.id">
                                    <input type="checkbox" class="custom-control-input" @click="toggleTaskCompletion(task)" :id="'task' + task.id" v-model="task.completed">
                                    <label class="custom-control-label"></label>
                                    {{ task.text }}
                                </a>
                                <div>
                                    <span class="btn" @click="showModal(task)">
                                        <i class="fas fa-edit"></i>
                                    </span>                                      
                                    <span class='btn' @click="deleteTask(task.id)"><i class="fas fa-trash"></i></span>
                                </div>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     
    </div>
</template>
  
<script>
import {mapActions, mapGetters} from 'vuex';
  export default {
    name: "ToDo",
    props:['id'],
    data() {
      return {
        modalOpen: false,
        taskForm: { text: '',completed:false },
        editingTask: null,
        searchTerm:''
      };
    },
    computed:{
        ...mapGetters({
            'Tasks':'todo/getTodos'
        })
    },
    methods: {
        ...mapActions({
            'importTodos':'todo/importTodos',
            'addTaskInDB' : 'todo/addNewTask',
            'deleteTaskInDB': 'todo/deleteTask',
            'updateTaskInDB': 'todo/UpdateTask',
            'ImportTrushed': 'todo/ImportTrushedTask',
            'ImportFinished': 'todo/ImportFinishedTask',
        }),
        showAlert(){
            alert("clicked");
        },
        toggleTaskCompletion(task) {
            task.completed = !task.completed;
            task.aClass = task.completed ? 'done' : '';
            
            if (!task || !task.id) {
                console.error('Invalid task object:', task);
                return;
            }
            // rest of the method logic

            this.updateTaskInDB({
                id: task.id,
                task: task.text,
                done: task.completed,
                user_id: this.id,
            })
            .then((response) => {
                    if (response.status === 201) {
                    this.importTodos(this.id);
                    } else {
                    console.log('failed to update task :', response);
                    }
                })
                .catch((error) => {
                    console.log('Error while updating task', error);
                });
        },
        showModal(task = null) {
        this.modalOpen = !this.modalOpen;

            if (task) {
                this.editingTask = task;
                this.taskForm.text = task.text;
            } else {
                this.editingTask = null;
                this.taskForm.text = '';
            }
        },
        addTask() {
            if (this.taskForm.text.trim()) {
                const newTask = {
                    task: this.taskForm.text,
                    done: false,
                    user_id: this.id,
                };
                this.addTaskInDB(newTask)
                .then((response)=>{
                    if (response.status === 201) {
                        this.importTodos(this.id);
                    } else {
                        console.log('failed to add task :', response);
                    }               
                })
                .catch((error)=>{
                    console.log('Error while adding task', error);
                });

                this.showModal();
            }
        },
        updateTask() {
            if (this.editingTask && this.taskForm.text.trim()) {
                const updatedTask = {
                    id: this.editingTask.id,
                    task: this.taskForm.text,
                    done: this.taskForm.completed,
                    user_id: this.id,
                };

                this.updateTaskInDB(updatedTask)
                .then((response) => {
                    if (response.status === 201) {
                    this.importTodos(this.id);
                    } else {
                    console.log('failed to update task :', response);
                    }
                })
                .catch((error) => {
                    console.log('Error while updating task', error);
                });

                this.showModal();
            }
        },
        deleteTask(id) {
            this.deleteTaskInDB(id).then((response)=>{
                if (response.status === 201) {
                    this.importTodos(this.id);
                } else {
                    console.log('failed to delete task', response);
                }
            }).catch((error)=>{
                console.log('Error while deleting the task', error);
            })
        },
        showDeletedTask(){
            this.ImportTrushed(this.id);
        },
        showCompletedTasks(){
            this.ImportFinished(this.id);
        },
        all(){
            this.importTodos(this.id);
        },
    },
    created() {
        this.importTodos(this.id);
    },
  };
</script>

<style>
    @import '@/assets/plugins/css/close.css';
    @import '@/assets/plugins/css/modal.css';
    @import '@/assets/plugins/css/reboot.css';
    @import '@/assets/plugins/css/flex.css';
    @import '@/assets/plugins/css/display.css';
</style>