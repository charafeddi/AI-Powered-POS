<template>
    <div class="page-content">
        <div class="main-wrapper">
          <div class="row">
            <div class="col-xl">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">Add Product</h2>
                        <ProductForm @submit="submitForm"/>
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
    name:"AddProductManually",
    components:{
      ProductForm
    },
    methods: {
        submitForm(product) {
            // Here you can perform actions like sending the form data to a server
            console.log('Form submitted:', product);
        },
    }
  };
  </script>
  
    