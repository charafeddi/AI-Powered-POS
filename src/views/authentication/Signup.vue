<template >
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-5">
                <div class="auth-form">
                    <div class="row">
                        <div class="col">
                            <div class="logo-box"><a href="#" class="logo-text">Connect</a></div>
                            <form @submit.prevent="signup()">
                                <div class="form-group">
                                    <label for="inputName">Name</label>
                                    <input type="text" v-model="user.name" class="form-control" id="username" required placeholder="Username">
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" v-model="user.email" class="form-control" id="inputEmail4" required placeholder="Email">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputPassword4">Password</label>
                                        <input type="password" v-model="user.password" class="form-control" id="inputPassword4" required placeholder="Password">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Password Confirmation</label>
                                        <input type="password" v-model="user.password_confirmation" class="form-control" id="inputPassword4" required placeholder="Password">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Address</label>
                                    <input type="text" v-model="user.address" class="form-control" id="inputAddress" placeholder="1234 Main St">
                                </div>
                                <div class="form-group">
                                    <label for="inputMobile_phone">Mobile Phone</label>
                                    <input type="text" v-model="user.mobile_phone" class="form-control" id="inputMobile Phone" required placeholder="158865983235">
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputCity">City</label>
                                        <input type="text" v-model="user.city" class="form-control" id="inputCity" placeholder="Hangzhou">
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label for="inputCountry">Country</label>
                                        <input type="text" v-model="user.country" class="form-control" id="inputCountry" placeholder="China">
                                    </div>
                                    <div class="form-group col-md-2">
                                        <label for="inputZip">Zip</label>
                                        <input type="text" v-model="user.postal_code" class="form-control" id="inputZip" placeholder="24500">
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block btn-submit">Sign Up</button>
                                <div class="auth-options">
                                    <div class="custom-control custom-checkbox form-group">
                                        <input type="checkbox" class="custom-control-input" id="exampleCheck1">
                                        <label class="custom-control-label" for="exampleCheck1">Sign me in</label>
                                    </div>
                                    <router-link :to="{name: 'Signin'}" class="forgot-link">Already have an account?</router-link>
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

import axios from 'axios'
export default {
    name:'Singup',
    data() {
        return {
            user:{
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
                mobile_phone:'',
                address : null,
                city : null,
                country : null,
                postal_code : null,
                photo: null,
                office_phone:null,
                job_title:null
            }
        }
    },
    methods: {
        async signup() {
            try{
                const response = await axios.post('auth/register', this.user);
                console.log(response);
                // redirectionto the singin page
                this.$router.push('/signin');
            } catch(error){
                console.log(error);
            }
        }
    },
}
</script>
