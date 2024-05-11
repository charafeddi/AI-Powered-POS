<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-5">
                <div class="auth-form">
                    <div class="row">
                        <div class="col">
                            <div class="logo-box"><a href="#" class="logo-text">Connect</a></div>
                            <form @submit.prevent="submit()">
                                <div class="form-group">
                                    <input type="email" v-model="user.email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <input type="password" v-model="user.password" class="form-control" id="password" placeholder="Password">
                                </div>
                                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                                    {{ errorMessage }}
                                </div>
                                <button type="submit" class="btn btn-primary btn-block btn-submit">Sign In</button>
                                <div class="auth-options">
                                    <div class="custom-control custom-checkbox form-group">
                                        <input type="checkbox" class="custom-control-input" id="exampleCheck1">
                                        <label class="custom-control-label" for="exampleCheck1">Remember me</label>
                                    </div>
                                    <a href="#" class="forgot-link">Forgot Password?</a>
                                    <router-link :to="{name:'Signup'}" class="forgot-link"> Register</router-link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 d-none d-lg-block d-xl-block">
                <div class="auth-image"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    name:'Signin',
    data() {
        return {
            user: {
                email:'',
                password:''
            },
            errorMessage:''
        }
    },
    methods: {
        ...mapActions({
            'singIn': 'auth/signin'
        }),
        submit() {
           this.singIn(this.user)
           .then(()=> this.$router.push({name:'DashBoard'}))
           .catch(error=>{
                this.showErrorMessage(error);
           });
        },
        showErrorMessage(error){
            this.errorMessage = error;
            setTimeout(()=>{
                this.errorMessage = '';
                this.user.email= '';
                this.user.password= '';
            }, 2000);

        }
    },
}
</script>
