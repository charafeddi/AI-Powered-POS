<template>
  <div class="page-content">
      <div class="main-wrapper">
        <div class="row">
          <div class="col-xl">
              <div class="card">
                  <div class="card-body">
                      <h2 class="card-title">Update Product</h2>
                      <ProductForm :product="product" @submit="submitForm"/>
                  </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import ProductForm from '@/components/forms/ProductForm.vue'
export default {
    name:'UpdateProduct',
    components: {
        ProductForm
    },
    props:['id'],
    data() {
      return {
          product: {
            name: '',
            code: '',
            description: '',
            sell_price: '',
            buying_price: '',
            price: null,
            quantity: '',
            image: null
          }
      };
  },
  methods: {
    submitForm(product) {
      console.log('Form submitted:', product);
    }
  }
}
</script>