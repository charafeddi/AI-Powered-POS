<template>
  <div class="page-content">
      <div class="main-wrapper">
        <div class="row">
          <div class="col-xl">
              <div class="card">
                  <div v-if="loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                  <div v-else class="card-body">
                      <h2 class="card-title">Update Product</h2>
                      <ProductForm :product="product.data" @submit="submitForm"/>
                  </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import ProductForm from '@/components/forms/ProductForm.vue'
import {mapGetters,mapActions} from 'vuex'
export default {
  name:'UpdateProduct',
  components: {
      ProductForm
  },
  data() {
    return {
      loading:true,
    }
  },
  props:['id'],
  methods: {
    ...mapActions({
      'getProductById': 'product/getProductById',
      'updateProduct': 'product/UpdateProduct'
    }),
    submitForm(product) {
      console.log(product);
      this.updateProduct(product).then((response) => {

        if (response.status === 201) {
          this.$router.push({
            name:'Product', 
            params:{
              id: product.user_id ? product.user_id : 'nothing'
            }
          })      
        } else {
          // Handle the error or display a message to the user
          console.error("Failed to update product:", response);
        }
        }).catch((error) => {
            // Handle the error or display a message to the user
            console.error("Error while update product:", error);   
        });
      console.log('Form submitted:', product);
    }
  },
  computed:{
    ...mapGetters({
      'product' : 'product/getProduct' 
    })
  },
  created() {
    this.getProductById(this.id).finally(()=>{
      this.loading = false;
    });
  },
}
</script>