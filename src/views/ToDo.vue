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
                                    <button class="btn btn-primary btn-block" @click="showModal(true)">Create New Task</button>
                                </div>
                                <div class="todo-menu">
                                    <!-- Menu items (filtering can be implemented here) -->
                                    <ul class="list-unstyled">
                                        <li class="active"><a href="#"><i class="fas fa-bars"></i>All</a></li>
                                        <li><a href="#"><i class="fas fa-check"></i>Completed</a></li>
                                        <li><a href="#"><i class="fas fa-trash"></i>Deleted</a></li>
                                    </ul>
                                </div>
                                <div class="divider"></div>
                                <div class="todo-search">
                                    <!-- Search (filter tasks) -->
                                    <form>
                                        <div class="input-group">
                                            <input type="text" id="todo-search" class="form-control" placeholder="Search task">
                                        </div>
                                    </form>
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
                            <li v-for="(task, index) in tasks" :key="index">
                            <a href="javascript:void(0);" class="custom-checkbox">
                                <input type="checkbox" class="custom-control-input" :id="'task' + task.id" v-model="task.completed">
                                <label class="custom-control-label" :for="'task' + task.id">{{ task.text }}</label>
                            </a>
                            <button @click="showModal(true, task)">Edit</button>
                            <button @click="deleteTask(task.id)">Delete</button>
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
      <!-- Task Modal -->
        <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" v-if="modalOpen">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ editingTask ? 'Edit Task' : 'New Task' }}</h5>
                        <button type="button" class="close" @click="showModal(false)">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="editingTask ? updateTask() : addTask()">
                            <div class="form-group">
                                <input type="text" class="form-control" v-model="taskForm.text" placeholder="Task Name" required>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="showModal(false)">Cancel</button>
                                <button type="submit" class="btn btn-primary">{{ editingTask ? 'Update' : 'Add' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
  export default {
    name: "ToDo",
    data() {
      return {
        tasks: [],
        modalOpen: false,
        taskForm: { text: '' },
        editingTask: null
      };
    },
    methods: {
        showAlert(){
            alert("clicked");
        },
        showModal(open, task = null) {
                console.log("am here");
                this.modalOpen = open;
                if (open && task) {
                    this.taskForm.text = task.text;
                    this.editingTask = task;
                } else {
                    this.taskForm.text = '';
                    this.editingTask = null;
                }
        },
        addTask() {
            if (this.taskForm.text.trim()) {
                const newTask = {
                    id: Date.now(),
                    text: this.taskForm.text,
                    completed: false
                };
                this.tasks.push(newTask);
                this.showModal(false);
            }
        },
        updateTask() {
            if (this.editingTask && this.taskForm.text.trim()) {
                this.editingTask.text = this.taskForm.text;
                this.showModal(false);
            }
        },
        deleteTask(id) {
            const index = this.tasks.findIndex(t => t.id === id);
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }
        }
    }
  };
</script>
  
<style scoped>
  /* Add your styles here */
</style>
  