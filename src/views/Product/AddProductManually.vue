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
  import {mapActions} from 'vuex';
  export default {
    name:"AddProductManually",
    components:{
      ProductForm
    },
    methods: {
      ...mapActions({
        'addProduct': 'product/AddProduct'
      }),
        submitForm(product) {
            // Here you can perform actions like sending the form data to a server        
            this.addProduct({
              'products': [product]
            }).then((response) => {
              if (response.status === 201) {
                this.$router.push({
                  name: 'Product',
                  params:{
                    id:product.user_id
                  }
                });
              } else {
                  // Handle the error or display a message to the user
                  console.error("Failed to add product:", response);
              }
            }).catch((error) => {
               // Handle the error or display a message to the user
               console.error("Error while adding product:", error);   
            });
        },
    }
  };
  </script>
  
    