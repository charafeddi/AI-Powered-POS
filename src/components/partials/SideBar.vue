<template >
  <div class="page-sidebar">
    <div class="logo-box"><router-link :to='{ name : "DashBoard"}' class="logo-text">Connect</router-link><a href="#" id="sidebar-close"><i class="material-icons">close</i></a> <a href="#" id="sidebar-state"><i class="material-icons">adjust</i><i class="material-icons compact-sidebar-icon">panorama_fish_eye</i></a></div>
        <PerfectScrollbar >
            <div class="page-sidebar-inner">
                <ul class="accordion-menu">
                    <li class="sidebar-title">Apps</li>
                    <li >
                        <router-link :to='{ name : "DashBoard"}' active-class="activelink"> <i class="material-icons-outlined">dashboard</i>Dashboard</router-link>
                    </li>
                    <li >
                        <router-link :to="{name:'Mail', params:{id:user.id}}" active-class="activelink" ><i class="material-icons-outlined">inbox</i>Mailbox</router-link>
                    </li>
                    <!-- <li>
                        <a href="#"><i class="material-icons-outlined">account_circle</i>Profile</a>
                    </li> -->
                    <li>
                        <router-link :to="{name:'Product', params:{id: user.id}}" active-class="activelink"><i class="material-icons">inventory</i>Product</router-link>
                    </li>
                    <!-- <li>
                        <a href="#" active-class="activelink"><i class="material-icons-outlined">calendar_today</i>Calendar</a>
                    </li> -->
                    <li>
                        <router-link :to="{name :'ToDo', params:{id: user.id}}" active-class="activelink"><i class="material-icons">done</i>Todo</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'CustomersList', params:{id:user.id}}" active-class="activelink">
                            <i class="material-icons">account_circle</i>
                            Customers
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'supplierList', params:{id :user.id}}" active-class="activelink">
                            <i class="material-icons">local_shipping</i>
                            Supplier
                        </router-link>
                        
                    </li>
                    <li>
                        <router-link :to="{name:'SalesList', params:{id:user.id}}" active-class="activelink"><i class="material-icons">shopping_basket</i>Sales</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'Analytics', params:{id:user.id }}" active-class="activelink"><i class="material-icons">query_stats</i> Analytics</router-link>
                    </li>
                   <li>
                        <a class="dropdown-item" @click="logOut()" href="#"><i class="material-icons">input</i>Log out</a>
                    </li>
                     <!-- <li>
                        <a href="#"><i class="material-icons">input</i>Forms</a>
                    </li> 
                    <li class="sidebar-title">
                        Other
                    </li>
                    <li v-bind:class="{ open: isSubMenuExpanded }">
                            <a href="" v-on:click.prevent="toggleSubMenu"><i class="material-icons">star_border</i>Pages<i class="material-icons has-sub-menu">add</i></a>
                            <ul class="sub-menu" v-if="isSubMenuExpanded">
                            <li>
                                <a href="404.html">404</a>
                            </li>
                            <li>
                                <a href="500.html">500</a>
                            </li>
                            <li>
                                <a href="sign-in.html">Sign In</a>
                            </li>
                            <li>
                                <a href="sign-up.html">Sign Up</a>
                            </li>
                            </ul>
                    </li>
                    <li>
                        <a href="#"><i class="material-icons">bookmark_border</i>Documentation</a>
                    </li>
                    <li>
                        <a href="#"><i class="material-icons">access_time</i>Change Log</a>
                    </li> -->
                </ul>
            </div>
        </PerfectScrollbar>
    </div>
</template>
<script>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import '@/assets/css/perfect-scrollbar.css';
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Sidebar',
  data() {
    return {
        isSubMenuExpanded: false,
    }
  },
  components: {
    PerfectScrollbar
  },
  computed:{
    ...mapGetters({
        'user': 'auth/user'
    })
  },
  methods: {
    ...mapActions({
        'signOut': 'auth/signOut'
    }),
    toggleSubMenu() {
      this.isSubMenuExpanded = !this.isSubMenuExpanded;
    },
    logOut(){
      this.signOut().then(()=>{
        this.$router.replace({name: 'Signin'});
      });
    }
  },
};
</script>

<style>
.ps {
  max-height: 800px; /* or height: 100px; */
}

.sidebar {
  height: calc(100vh - 50px); /* Adjust height as needed */
}


.activelink{
    background:linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%);
    color:#fff
}
</style>