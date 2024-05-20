<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">Add Supplier</h2>
                            <SupplierForm   @submit="addToSupplier"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SupplierForm from '@/components/forms/SupplierForm.vue';
import {mapActions} from 'vuex';
export default {
    name:'Addsupplier',
    components:{
        SupplierForm
    },
    methods:{
        ...mapActions({
            'addSupplier' : 'supplier/AddSupplier',
        }),
        addToSupplier(supplier){
            console.log("supp ",supplier);
            this.addSupplier(supplier).then((response) => {
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
    }
}
</script>
<style lang="">
    
</style>