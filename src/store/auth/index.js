import axios from 'axios'

export default{
    namespaced:true,
    state:{
        token:null,
        user:null,
    },
    mutations:{
        setToken(state, token){
            state.token = token
        },
        setUser(state, data){
            state.user = data
        },
    },
    getters:{
        authenticated(state){
            return state.token && state.user;
        },
        user(state){
            return state.user;
        }
    },
    actions:{
        async signin({dispatch}, credentials) {
            try{
                const response = await axios.post("auth/login", credentials);

                 return dispatch('attempt', response.data.access_token)

            }catch(error){
                return Promise.reject(error.response.data.error);
            }
        },
        async attempt({commit, state}, token){
            try {
                if (token) {
                    commit('setToken', token)
                }

                if (!state.token) {
                    return;
                }
                const response = await axios.get("auth/user-profile")

                commit('setUser', response.data)

                console.log('success')

            } catch (error) {
                commit('setUser',null)
                commit('setToken',null)
                console.log("dispatch error",error)
            }
        },
        signOut({commit}){
           return axios.post('auth/logout').then(()=>{
                commit('setUser',null)
                commit('setToken',null)
            })
        }
    }
}