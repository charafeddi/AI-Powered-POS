<template lang="">
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">
                    <div class="card">
                        <div  class="card-body">
                            <h2 class="card-title">Update Customer</h2>
                            <CustomerForm   @submit="addCustomer"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CustomerForm from '@/components/forms/CustomerForm.vue';
import {mapActions, mapGetters} from 'vuex';
export default {
    name:'AddCustomer',
    components:{
        CustomerForm
    },
    methods: {
        ...mapActions({
            'AddCustomer':'customers/AddCustomer',
        }),
        addCustomer(customer){
            this.AddCustomer(customer).then((response)=>{
                if (response.status === 201) {
                    this.$router.push({
                        name:'CustomersList',
                        params:{
                            id: customer.user_id
                        }

                    });
                } else {
                     // Handle the error or display a message to the user
                     console.error("Failed to add Customer:", response);
                }
            }).catch((error) => {
                // Handle the error or display a message to the user
                console.error("Error while adding Customer:", error);   
            });
        }
    },

}
</script>
