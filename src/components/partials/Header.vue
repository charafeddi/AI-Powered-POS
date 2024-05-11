<template>
  <div class="page-header">
    <nav class="navbar navbar-expand">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="navbar-nav">
            <li class="nav-item small-screens-sidebar-link">
                <a href="#" class="nav-link"><i class="material-icons-outlined">menu</i></a>
            </li>
            <li class="nav-item nav-profile dropdown" @click="toggleDropdown" :class="{ show: isOpen }">
                <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="@/assets/img/avatars/profile-image-1.png" alt="profile image">
                    <span>{{user.name}}</span><i class="material-icons dropdown-icon">keyboard_arrow_down</i>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Calendar<span class="badge badge-pill badge-info float-right">2</span></a>
                    <a class="dropdown-item" href="#">Settings &amp Privacy</a>
                    <a class="dropdown-item" href="#">Switch Account</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click="logOut()" href="#">Log out</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link"><i class="material-icons-outlined">mail</i></a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link"><i class="material-icons-outlined">notifications</i></a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link" @click="toggleTheme" id="dark-theme-toggle">
                    <i class="material-icons-outlined">brightness_2</i>
                    <i class="material-icons">brightness_2</i>
                </a>
            </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#" class="nav-link">Projects</a>
                </li> 
                <li class="nav-item">
                    <a href="#" class="nav-link">Tasks</a>
                </li>
                <li class="nav-item">   
                    <a href="#" class="nav-link">Reports</a>
                </li>
            </ul>
        </div>
        <div class="navbar-search">
            <form>
                <div class="form-group">
                    <input type="text" name="search" id="nav-search" placeholder="Search...">
                </div>
            </form>
        </div>
    </nav>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'TheNavbar',
  data() {
    return {
        isDarkTheme: false,
        isOpen: false
    };
  },
  created(){
    this.loadTheme();   
  }, 
  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods:{
    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.closeDropdown();
      }
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown() {
      if (this.isOpen) {
        this.isOpen = false;
      }
    },
    loadTheme() {
      const theme = localStorage.getItem('theme');
      this.isDarkTheme = theme === 'dark';
      this.updateBodyClass();
    },
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      this.updateBodyClass();
    },
    updateBodyClass() {
      if (this.isDarkTheme) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    },
    ...mapActions({
        'signOut': 'auth/signOut'
    }),
    logOut(){
      this.signOut().then(()=>{
        this.$router.replace({name: 'Signin'});
      });
    }
  },
  computed:{
    ...mapGetters({
        'authenticated': 'auth/authenticated',
        'user': 'auth/user'
    }),

  }
}
</script>

<style scoped>

</style>
