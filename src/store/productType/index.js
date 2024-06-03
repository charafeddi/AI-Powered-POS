import axios from "axios";
 
export default{
    namespaced:true,
    state:{
        productsType:[],
    },
    mutations:{
        setProductsType(state, productsType){
            state.productsType = productsType;
        }
    },
    getters:{
        getProductsType(state){
            return state.productsType;
        },
    },
    actions:{
        // todo: fix later need to add the user to only import the product type related to the user
        async importProductType({commit}){
            try {
                const response = await axios.get('ProductType');
                console.log(response);
                commit('setProductsType', response);
            } catch (error) {
                console.log(error);
            }
        },
    }
}