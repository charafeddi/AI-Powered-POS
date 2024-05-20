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
                    <div v-else  class="card">
                        <div class="card-body">
                            <h2 class="card-title">Update Supplier</h2>
                            <SupplierForm :supplier="supplier.data"   @submit="updateSupplier"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SupplierForm from '@/components/forms/SupplierForm.vue';
import {mapActions, mapGetters} from 'vuex';
export default {
    name:'UpdateSupplier',
    components:{
        SupplierForm,
    },
    props:['id'],
    data() {
        return {
            loading:true,
        }
    },
    computed:{
        ...mapGetters({
            'supplier':'supplier/supplier'
        })
    },
    methods: {
        ...mapActions({
            'getSupplier':'supplier/getSupplierById',
            'UpdateSupplier' : 'supplier/UpdateSupplier'
        }),
        updateSupplier(supplier){
            this.UpdateSupplier(supplier).then((response) => {
                if (response.status === 201) {
                    this.$router.push({
                        name:'supplierList', 
                        params:{
                            id: supplier.user_id
                        }
                    });
                } else {
                     // Handle the error or display a message to the user
                    console.error("Failed to add supplier:", response);
                }
            }).catch((error) => {
                    // Handle the error or display a message to the user
                    console.error("Error while adding supplier:", error);   
            });
        }
    },
    created() {
        this.getSupplier(this.id).finally(()=>{
            this.loading=false;
        });
    },
}
</script>
