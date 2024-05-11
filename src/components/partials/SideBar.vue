<template >
  <div class="page-sidebar">
    <div class="logo-box"><a href="#" class="logo-text">Connect</a><a href="#" id="sidebar-close"><i class="material-icons">close</i></a> <a href="#" id="sidebar-state"><i class="material-icons">adjust</i><i class="material-icons compact-sidebar-icon">panorama_fish_eye</i></a></div>
    <div class="page-sidebar-inner slimscroll">
        <ul class="accordion-menu">
            <li class="sidebar-title">Apps</li>
            <li >
                <router-link :to='{ name : "DashBoard"}' active-class="activelink"> <i class="material-icons-outlined">dashboard</i>Dashboard</router-link>
            </li>
            <li >
                <a href="#"><i class="material-icons-outlined">inbox</i>Mailbox</a>
            </li>
            <li>
                <a href="#"><i class="material-icons-outlined">account_circle</i>Profile</a>
            </li>
            <li>
                <router-link :to="{name:'Product'}" active-class="activelink"><i class="material-icons">inventory</i>Product</router-link>
            </li>
            <li>
                <a href="#"><i class="material-icons-outlined">calendar_today</i>Calendar</a>
            </li>
            <li>
                <router-link :to="{name :'ToDo'}" active-class="activelink"><i class="material-icons">done</i>Todo</router-link>
            </li>
            <li>
                <a href="#"><i class="material-icons">account_circle</i>Customers</a>
            </li>
            <li>
                <router-link :to="{name: 'supplierList'}" active-class="activelink"><i class="material-icons">local_shipping</i>Supplier</router-link>
            </li>
            <li>
                <a href=""><i class="material-icons">shopping_basket</i>Sales</a>
            </li>
            <li>
                <a href="#"><i class="material-icons">bar_chart</i>Analytics</a>
            </li>
            <li>
                <a href="#"><i class="material-icons">input</i>Forms</a>
            </li>
            <li class="sidebar-title">
                Other
            </li>
            <li>
                <a href=""><i class="material-icons">star_border</i>Pages<i class="material-icons has-sub-menu">add</i></a>
                <ul class="sub-menu">
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
            </li>
        </ul>
    </div>
</div>
</template>
<script>
export default {
  name: 'Sidebar',
};
</script>

<style>
.activelink{
    background:linear-gradient(90deg,#55c3b7 0,#5fd0a5 48%,#66da90 100%);
    color:#fff
}
</style>