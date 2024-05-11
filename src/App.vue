<template>
  <div v-if="!authenticated">
    <div class="auth-page sign-in">
      <LoadEvent/>
      <div class="connect-container align-content-stretch d-flex flex-wrap">
          <router-view></router-view>
      </div> 
    </div>
  </div>
  <div v-else-if="this.$route.meta.layout=='EmptyLayout'">
    <div class="error-page error-404">
      <LoadEvent/>
      <div class="connect-container align-content-stretch d-flex flex-wrap">
        <div class="container d-flex align-content-stretch flex-wrap">
          <router-view></router-view>
        </div>
      </div> 
    </div>
  </div>
  <div v-else>
    <LoadEvent/>
    <div class="connect-container align-content-stretch d-flex flex-wrap">
        <!--menu-->
        <SideBar/>
        <!--menu-->
        <!-- page container -->
        <div class="page-container">
            <!-- Navbar -->
            <Header/>
            <!-- / Navbar -->

              <!-- content-->
              <router-view></router-view>
              <!-- /content-->

              <!-- Footer -->
              <Footer/>
              <!-- / Footer -->
        </div>
        <!-- / page container -->
    </div>
  </div>
</template>

<script>
import SideBar from './components/partials/SideBar.vue';
import Header from './components/partials/Header.vue';
import Footer from './components/partials/Footer.vue';
import LoadEvent from './components/partials/LoadEvent.vue';
import {mapGetters} from 'vuex';
export default {
  name: 'App',
  components: {
    SideBar,
    Header,
    Footer,
    LoadEvent,
  },
  computed: {
    ...mapGetters({
      'authenticated':'auth/authenticated'
    })
  },
}
</script>

<style></style>
