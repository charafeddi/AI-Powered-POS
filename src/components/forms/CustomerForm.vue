<template lang="">
    <form @submit.prevent="$emit('submit', this.customer)">
        <div class="form-group">
            <label for="inputName">Name</label>
            <input type="text" v-model="customer.name" class="form-control" id="username" required placeholder="Username">
        </div>
        <div class="form-group">
            <label for="inputEmail4">Email</label>
            <input type="email" v-model="customer.email" class="form-control" id="inputEmail4" required placeholder="Email">
        </div>
        <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" v-model="customer.address" class="form-control" id="inputAddress" placeholder="1234 Main St">
        </div>
        <div class="form-group">
            <label for="inputMobile_phone">Mobile Phone</label>
            <input type="text" v-model="customer.phone" class="form-control" id="inputMobile Phone" required placeholder="158865983235">
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" v-model="customer.city" class="form-control" id="inputCity" placeholder="Hangzhou">
            </div>
            <div class="form-group col-md-4">
                <label for="inputCountry">Country</label>
                <input type="text" v-model="customer.country" class="form-control" id="inputCountry" placeholder="China">
            </div>
            <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" v-model="customer.postal_code" class="form-control" id="inputZip" placeholder="24500">
            </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-submit">Submit</button>
    </form>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'CustomerForm',
    props:{
        customer:{
            type:Object,
            default: ()=> ({
                name:'',
                email:'',
                phone:'',
                address:'',
                city:'',
                country:'',
                postal_code:'',
                user_id:'',
            })
        }
    },
    computed:{
        ...mapGetters({
            'user': 'auth/user'
        })
    },
    created() {
        this.customer.user_id = this.user.id;
    },
}
</script>