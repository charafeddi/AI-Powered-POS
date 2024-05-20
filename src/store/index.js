import {createStore} from 'vuex';
import auth from './auth';
import product from './product';
import supplier from './supplier';
import productType from './productType';
import customers from './customers';
import sales from './sales';
import todo from './todo';

export default createStore({
    state:{

    },
    mutations: {
        // your mutations here
      },
    actions: {
        // your actions here
    },
    modules: {
        // your modules here
        auth,
        product,
        supplier,
        productType,
        customers,
        sales,
        todo
    }
})