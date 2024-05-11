<template lang="">
    <form @submit.prevent="$emit('submit',supplier)">
        <div class="form-group ">
            <label for="supplierName" class="form-label">Supplier Name :</label>
            <input type="text" class="form-control" id="supplierName" v-model="supplier.name" required>
        </div>
        <div class="form-group">
          <label for="suppliersell_price" class="form-label">Email :</label>
          <input type="email" class="form-control" id="suppliersell_price" v-model="supplier.email">
        </div>
        <div class="form-group">
          <label for="supplierDescription" class="form-label">Address :</label>
          <input type="text" class="form-control" id="supplierAdress" v-model="supplier.address" required>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
            <label for="suppliersell_price" class="form-label">Phone :</label>
            <input type="text" class="form-control" id="suppliersell_price" v-model="supplier.phone" required>
            </div>
            <div class="form-group col-md-6">
                <label for="supplierfax" class="form-label">Fax :</label>
                <input type="text" class="form-control" id="supplierfax" v-model="supplier.fax" required>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-6 mb-3">
                <label for="validationCustom03">State :</label>
                <input type="text" class="form-control" id="validationCustom03" v-model="supplier.state" placeholder="State" required>
                <div class="invalid-feedback">
                    Please provide a valid city.
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <label for="validationCustom04">City :</label>
                <input type="text" class="form-control" id="validationCustom04" v-model="supplier.city" placeholder="City" required>
                <div class="invalid-feedback">
                    Please provide a valid state.
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <label for="validationCustom05">Zip :</label>
                <input type="text" class="form-control" id="validationCustom05" v-model="supplier.zipcode" placeholder="Zip" required>
                <div class="invalid-feedback">
                    Please provide a valid zip.
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>
<script>
export default {
    name:'SupplierForm',
    props:{
        supplier:{
            type:Object,
            default: () => ({
                name:'',
                address:'',
                phone:'',
                email:'',
                fax:'',
                zipcode:'',
                city:'',
                state:''
            })
        }
    },
}
</script>
