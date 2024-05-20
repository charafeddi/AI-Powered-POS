import axios from "axios";

export default{
    namespaced:true,
    state:{
       todos:[],
        todo:null
    },
    mutations:{
        setTodos(state, todos ){
            state.todos = todos;
        },
        setTodo(state, todo ){
            state.todo = todo;
        }
    },
    getters:{
        getTodos(state){
            return state.todos;
        },
        getTodo(state){
            return state.todo;
        }
    },
    actions:{
        async importTodos({commit}, userid){
            try {
                const response = await axios.get(`todo/${userid}`);
                console.log('todos response ',response);
                commit('setTodos',response);
            } catch (error) {
                console.log(error)
            }
        },
        async deleteTask(_, id){
            try {
                return await axios.delete(`todo/${id}`);
            } catch (error) {
                console.log(error);
            }
        },
        async addNewTask(_, task){
            try {
                return await axios.post(`todo`, task);
            } catch (error) {
                console.log(error);
            }
        },
        async UpdateTask(_, task){
            try {
                return await axios.put(`todo/${task.id}`, task);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportTrushedTask({commit},userID){
            try {
                const response = await axios.get(`todo/${userID}/trash`);
                console.log('todos response ',response);
                commit('setTodos', response);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportFinishedTask({commit},userID){
            try {
                const response = await axios.get(`todo/${userID}/done`);
                console.log('todos response ',response);
                commit('setTodos', response);
            } catch (error) {
                console.log(error);
            }
        },
    },
}