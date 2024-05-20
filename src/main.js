import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EmptyLayout from './views/EmptyLayout.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '@fortawesome/fontawesome-free/css/all.css';
import '@/assets/css/dark_theme.css'                          // Import dark theme 
import '@/assets/css/connect.min.css'                        // Import theme css
import 'primevue/resources/themes/saga-blue/theme.css'       // Import theme CSS
import 'primevue/resources/primevue.min.css'                 // Import core CSS
import 'primeicons/primeicons.css'                           // Import PrimeIcons CSS 


require('@/store/subscriber')
store.dispatch('auth/attempt', localStorage.getItem('token')).then(()=>{

    const app = createApp(App); 
    app.use(store);
    app.use(router);
    app.component(EmptyLayout);
    app.mount('#app');
});
