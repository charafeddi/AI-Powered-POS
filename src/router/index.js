import {createRouter, createWebHistory} from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import store from '@/store'

//Product
import Product from '../views/Product/Product.vue'
import ImportProduct from '../views/Product/ImportProduct.vue'
import AddProductManually from '../views/Product/AddProductManually.vue'
import UpdateProduct from '../views/Product/UpdateProduct.vue'

//Todo
import ToDo from '../views/ToDo.vue'

//Supplier
import supplierList from '../views/supplier/ListofSupplier.vue'
import AddSupplier from '../views/supplier/Addsupplier.vue'
import UpdateSupplier from '../views/supplier/UpdateSupplier.vue'

//Authentication
import Singin from '../views/authentication/Signin.vue'
import Singup from '../views/authentication/Signup.vue'

// Customers 
import CustomersList from '../views/customeres/CustomersList.vue'
import CustomersAdd from '../views/customeres/AddCustomer.vue'
import CustomersUpdate from '../views/customeres/UpdateCustomer.vue'

// Sales 
import SalesList from '../views/sales/SalesList.vue'
import SalesAdd from '../views/sales/AddSales.vue'
import showSale from '../views/sales/showSale.vue'
import SalesUpdate from '../views/sales/UpdateSales.vue'

//Pages Not Found
import NotFound from '../views/NotFound'

const routes =[
    {
        path:'/',
        name:'DashBoard',
        component:DashBoard,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/product/:id',
        name:'Product',
        component:Product,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/import-product',
        name:'ImportProduct',
        component:ImportProduct,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/todo/:id',
        name:'ToDo',
        component:ToDo,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/add-product',
        name:'Addproduct',
        component:AddProductManually,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/update-product/:id',
        name:'UpdateProduct',
        component:UpdateProduct,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/supplierList/:id',
        name:'supplierList',
        component: supplierList,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/AddSupplier',
        name:'AddSupplier',
        component: AddSupplier,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Signin',
        name:'Signin',
        component: Singin,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({name: 'DashBoard'})
            }
            next()
        }
    },
    {
        path:'/Signup',
        name:'Signup',
        component: Singup,
        beforeEnter: (to, from, next) => {
            if (store.getters['auth/authenticated']) {
                return next({name: 'DashBoard'})
            }
            next()
        }
    },
    {
        path:'/UpdateSupplier/:id',
        name:'UpdateSupplier',
        component: UpdateSupplier,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Customers/:id',
        name:'CustomersList',
        component: CustomersList,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/CustomersUp/:id',
        name:'CustomersUpdate',
        component: CustomersUpdate,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Customers',
        name:'CustomersAdd',
        component: CustomersAdd,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Sales/:id',
        name:'SalesList',
        component: SalesList,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Sales/update/:id',
        name:'SalesUpdate',
        component: SalesUpdate,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Sales',
        name:'SalesAdd',
        component: SalesAdd,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/Sales/show/:id',
        name:'showSale',
        component: showSale,
        props:true,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({name: 'Signin'})
            }
            next()
        }
    },
    {
        path:'/:catchAll(.*)',
        component:NotFound,
        meta:{
            layout:"EmptyLayout"
        }
    }
]


const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes
})

export default router