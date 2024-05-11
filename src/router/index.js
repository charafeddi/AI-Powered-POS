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

//Pages
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
        path:'/product',
        name:'Product',
        component:Product,
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
        path:'/todo',
        name:'ToDo',
        component:ToDo,
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
        path:'/supplierList',
        name:'supplierList',
        component: supplierList,
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
        component: Singin
    },
    {
        path:'/Signup',
        name:'Signup',
        component: Singup
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