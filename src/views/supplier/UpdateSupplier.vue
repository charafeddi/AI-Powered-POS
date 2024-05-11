<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">Update Supplier</h2>
                            <SupplierForm :supplier="supplier"   @submit="updateSupplier"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SupplierForm from '@/components/forms/SupplierForm.vue';

export default {
    name:'UpdateSupplier',
    components:{
        SupplierForm,
    },
    props:['id'],
    data() {
        return {
            supplier:{
                    name:'Edi Soft',
                    address:'Debsoltan',
                    phone:'0536998855',
                    email:'ediSoft@gmail.com',
                    fax:'0536998855',
                    zipcode:'20000',
                    city:'casablanca'
            }
        }
    },
    methods: {
        updateSupplier(supplier){
            console.log('Supplier: ', supplier);
        }
    },
}
</script>
