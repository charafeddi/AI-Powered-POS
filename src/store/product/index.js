import axios from "axios"

export default {
    namespaced:true,
    state:{
        products:[],
        product:null
    },
    mutations:{
        setProducts(state, data){
            state.products = data
        },
        setProduct(state, product){
            state.product = product
        }
    },
    getters:{
        products(state){
            return state.products;
        },
        getProduct(state){
            return state.product;
        }
    },
    actions:{
        async importProducts({commit}, userID){
            try {
                const responce = await axios.get(`products/${userID}`);
                commit('setProducts', responce.data);
            } catch (error) {
                console.log(error);
            }
        },
        async getProductById({commit}, id){
           try {
                const productInSearch = await axios.get(`products/${id}/show`);
                commit('setProduct',productInSearch);
                console.log('productInSearch' ,productInSearch);
           } catch (error) {
                console.log(error);
           }
        },
        async UpdateProduct(_, product){
            try {
                return await axios.put(`products/${product.id}`, product);
            } catch (error) {
                console.log(error);
            }
        },
        async AddProduct(_, product){
            try {
                return await axios.post(`products`, product);
            } catch (error) {
                console.log(error);
            }
        }
    }
}