<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">
                    <div v-if="loading">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div v-else class="card">
                        <div  class="card-body">
                            <h2 class="card-title">Update Customer</h2>
                            <CustomerForm :customer="customer.data"   @submit="updateCustomer"/>
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
    name:'UpdateCustomer',
    components:{
        CustomerForm,
    },
    props:['id'],
    data() {
        return {
            loading:true,
        }
    },
    computed:{
        ...mapGetters({
            'customer':'customers/getCustomer'
            }),
    },
    methods:{
        ...mapActions({
            'getcustomer' : 'customers/getCustomerById',
            'update' : "customers/UpdateCustomer"
        }),
        updateCustomer(customer){
            this.update(customer).then((response) =>{
                if (response.status === 201) {
                    this.$router.push({
                        name:'CustomersList',
                        params:{
                            id: customer.user_id
                        }
                    })
                } else {
                    // handle the error or displya a message to the user
                    console.error('Failed to add Customer:',response)
                }
            }).catch((error) => {   
                // Handle the error or display a message to the user 
                console.log("Error while adding Customer :", error);
            })
        }
    },
    created() {
        this.getcustomer(this.id).finally(()=>{
            this.loading = false;
        })
    },
}
</script>