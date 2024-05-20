import axios from "axios";

export default{
    namespaced:true,
    state:{
        customers:[],
        customer:null
    },
    mutations:{
        setCustomers(state,customers){
            state.customers = customers; 
        },
        setCustomer(state, customer){
            state.customer = customer; 
        }
    },
    getters:{
        getCustomers(state){
            return  state.customers;
        },
        getCustomer(state){
            return state.customer;
        }
    },
    actions:{
        async importCustomers({commit},userID){
            try {
                const  response = await axios.get(`client/${userID}`);
                console.log('customers :', response);
                commit('setCustomers',response);
            } catch (error) {
                console.error(error);
            }
        },
        async getCustomerById({ commit }, id) {
            try {
                if ( id == null || id <= 0){
                  console.warn(`Customer ${id} not found.`);
                    return ;
                }
    
                const customerInSearch = await axios.get(`client/${id}/show`);
                commit('setCustomer', customerInSearch);
                
            } catch (error) {
                console.log(error);
            }
        },
        async UpdateCustomer(_, Customer){
            try {
                return await axios.put(`client/${Customer.id}`, Customer);
            } catch (error) {
                console.log(error);
            }
        },
        async AddCustomer(_, Customer){
            try {
                return await axios.post(`client`, Customer);
            } catch (error) {
                console.log(error);
            }
        },

    }
}