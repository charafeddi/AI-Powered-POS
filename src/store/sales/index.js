import axios from "axios";

export default{
    namespaced:true,
    state:{
        sales:[],
        sale:null,
    },
    mutations:{
        setSales(state, sales){
            state.sales = sales;
        },
        setSale(state, sale){
            state.sale = sale;
        },
    },
    getters:{
        getSales(state){
            return state.sales;
        },
        getSale(state){
            return state.sale;
        }
    },
    actions:{
        async ImportSales({commit},userid){
            try {
                const response = await axios.get(`sales/${userid}`);
                console.log('response of sales importation', response);
                commit('setSales', response);
            } catch (error) {
                console.log(error);
            }
        },
        async getSaleInfoById({commit}, id){
            try {
                const response = await axios.get(`sales/${id}/show`);
                console.log('response of sales importation' , response);
                commit('setSale', response);
            } catch (error) {
                console.log(error);
            }
        },
        async UpdateSale(_, sales){
            try {
                return await axios.put(`sales/${sales.id}`,sales);
            } catch (error) {
                console.log(error);
            }
        },
        async addSales(_, sales){
            try {
                return await axios.post(`sales`,sales);
            } catch (error) {
                console.log(error);
            }
        }
    }
}