import axios from "axios";

export default{
    namespaced:true,
    state:{
        Earnings:null,
        PopularProduct:[],
        totalSales:null,
        netProfit: null,
        SupplierTransaction :[],
        LowStockAlert:[],
        peakSalesHours:[]
    },
    mutations:{
        setEarnings(state, Earnings){
            state.Earnings = Earnings
        },
        setPopularProduct(state, PopularProduct){
            state.PopularProduct = PopularProduct;
        },
        setTotalSales(state, totalSales){
            state.totalSales = totalSales
        },
        setNetProfit(state, netProfit){
            state.netProfit = netProfit
        },
        setSupplierTransaction(state, SupplierTransaction ){
            state.SupplierTransaction = SupplierTransaction;
        },
        setLowStockAlert(state, LowStockAlert ){
            state.LowStockAlert = LowStockAlert;
        },
        setPeakSalesHours(state, peakSalesHours){
            state.peakSalesHours =peakSalesHours
        }
    },
    getters:{
        getEarnings(state){
            return state.Earnings;
        },
        getPopularProduct(state){
            return state.PopularProduct;
        },
        getTotalSales(state){
            return state.totalSales;
        },
        getNetProfit(state){
            return state.netProfit
        },
        getSupplierTransaction(state){
            return state.SupplierTransaction;
        },
        getLowStockAlert(state){
            return state.LowStockAlert;
        },
        getPeakSalesHours(state){
            return state.peakSalesHours;
        }
    },
    actions:{
        async ImportEarning({commit}, {period, id}){
            try {
                const response = await axios.get(`/analytics/${id}/earnings`, {
                    params:{
                        period:period,
                    }
                });
                commit('setEarnings', response);
            } catch (error) {
                console.log("there is an error in importing the earnings :", error);
            }
        },
        async ImportPopularProduct({commit}, {period, id}){
            try {
                const response = await axios.get(`/analytics/${id}/popular-products`, {
                    params:{
                        period:period
                    }
                })
                commit('setPopularProduct', response);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportTotalSales({commit}, {period, id}){
            try {
                const response = await axios.get(`/analytics/${id}/total-sales`, {
                    params:{
                        period:period
                    }
                })
                commit('setTotalSales', response);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportNetProfit({commit}, {period, id}){
            try {
                const response = await axios.get(`/analytics/${id}/net-profit`, {
                    params:{
                        period:period
                    }
                })
                commit('setNetProfit', response);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportSupplierTransaction({commit}, id){
            try {
                const response = await axios.get(`/analytics/${id}/supplier-performance`)
                commit('setSupplierTransaction', response);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportLowStockAlert({commit}, id){
            try {
                const response = await axios.get(`/analytics/${id}/Low-Stock-Alerts`)
                commit('setLowStockAlert', response);
            } catch (error) {
                console.log(error);
            }
        },
        async ImportPeakSalesHours({commit}, {period,id}){
            try {
                const response = await axios.get(`/analytics/${id}/peak-sales-hours`,{
                    params:{
                        period:period,
                    }
                })
                commit('setPeakSalesHours', response);
            } catch (error) {
                console.log(error);
            }
        },
        
    }
}