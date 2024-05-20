import axios from "axios";

export default{
    namespaced:true,
    state:{
        suppliers:[],
        supplier:null
    },
    mutations:{
        setSuppliers(state, suppliers){
            state.suppliers = suppliers;
        },
        setSupplier(state, supplier){
            state.supplier = supplier;
        }
    },
    getters:{
        getSuppliers(state){
            return state.suppliers;
        },
        supplier(state){
            return state.supplier;
        },
    },
    actions:{
        async importSuppliers({commit}, userId){
            try {
                const response = await axios.get(`supplier/${userId}`);
                console.log(response);
                commit('setSuppliers', response);
            } catch (error) {
                console.log(error);
            }
        },
        async getSupplierById({ commit }, id) {
            try {
                if ( id == null || id <= 0){
                  console.warn(`Supplier ${id} not found.`);
                    return ;
                }
    
                const supplierInSearch = await axios.get(`supplier/${id}/show`);
                console.log(supplierInSearch);
                commit('setSupplier', supplierInSearch);
                
            } catch (error) {
                console.log(error);
            }
        },
        async UpdateSupplier(_, Supplier){
            try {
                console.log('supplier router data:',Supplier);
                return await axios.put(`supplier/${Supplier.id}`, Supplier);
            } catch (error) {
                console.log(error);
            }
        },
        async AddSupplier(_, Supplier){
            try {
                console.log('supplier router data:',Supplier);
                return await axios.post(`supplier`, Supplier);
            } catch (error) {
                console.log(error);
            }
        },
    }
}