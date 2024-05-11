<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title">Add Supplier</h2>
                            <SupplierForm   @modify-array="addSupplier"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SupplierForm from '@/components/forms/SupplierForm.vue'
export default {
    name:'Addsupplier',
    components:{
        SupplierForm
    },
    data() {
        return {
            supplier:[],
        }
    },
    methods:{
        addSupplier(supplier){
            console.log(supplier);
        }
    }
}
</script>
<style lang="">
    
</style>