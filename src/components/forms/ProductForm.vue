<template lang="">
    <form @submit.prevent="$emit('submit', this.product)">
        <input type="text" v-model="product.id" hidden>
        <div class="form-row align-items-end">
            <div class="form-group col-md-6">
              <label for="productCode" class="form-label">Product Code</label>
              <input type="text" class="form-control" id="productCode" v-model="product.product_code" required>
            </div>
            <div class="form-group col-md-6">
              <label for="productName" class="form-label">Product Designation</label>
              <input type="text" class="form-control" id="productName" v-model="product.designation" required>
            </div>
          </div>
        <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productsell_price" class="form-label"> Buying Price</label>
              <input type="number" class="form-control" step="0.01" id="productsell_price" v-model="product.prix_achat" required>
            </div>
            <div class="form-group col-md-6">
              <label for="productsell_price" class="form-label">Selling price</label>
              <input type="number" class="form-control" step="0.01" id="productsell_price" v-model="product.prix_vente">
            </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="productQuantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="productQuantity" v-model="product.quantity" required>
          </div>
          <div class="form-group col-md-6">
            <label for="productDiscount" class="form-label">Discount</label>
            <input type="number" class="form-control" id="productDiscount" v-model="product.discount">
          </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputSupplier">Supplier</label>
                <select id="inputSupplier" class="form-control custom-select"  v-model="product.supplier_id">
                    <option selected value="">Choose...</option>
                    <option v-for="supplier in suppliers.data" ::key="supplier.id" :value="supplier.id">{{ supplier.name }}</option>
                    <option value=""> <router-link :to="{name:'AddSupplier'}"></router-link></option>
                </select>
            </div>
            <div class="form-group col-md-6">
                <label for="inputCategory">Category</label>
                <select id="inputCategory" class="form-control custom-select" v-model="product.product_type_id">
                        <option selected value="">Choose...</option>
                        <option v-for="type in productsType.data" :key="type.id" :value="type.id">{{type.type}}</option>
                </select>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
    export default {
      name: 'ProductForm',
      props: {
        product: {
          type: Object,
          default: () => ({
            id:'',
            designation: '',
            product_code: '',
            prix_vente: '',
            prix_achat: '',
            quantity: '',
            discount:'',
            supplier_id:'',
            product_type_id: '',
            supplier_id: '',
            product_unit_id: null,
            user_id:'',
          })
        }
      },
      methods: {
        ...mapActions({
          'importSuppliers': 'supplier/importSuppliers',
          'importProductsType' : 'productType/importProductType'
        }),
      },
      computed:{
        ...mapGetters({
          'suppliers':'supplier/getSuppliers',
          'user': 'auth/user',
          'productsType' : 'productType/getProductsType'
        })
      },
      created() {
        this.importSuppliers(this.user.id);
        this.importProductsType();
        this.product.user_id = this.user.id; 
      },
    };
    </script>
    
    <style>
    @import '@/assets/plugins/css/forms.css';
    
    .img-thumbnail {
      width: 200px;
      height: 200px;
      cursor: pointer;
    }
    </style>