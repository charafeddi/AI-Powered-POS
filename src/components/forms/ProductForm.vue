<template lang="">
    <form @submit.prevent="$emit('submit', product)">
        <div class="form-row align-items-end">
            <div class="form-group col-md-4 mb-0">
              <label for="productCode" class="form-label">Code</label>
              <input type="text" class="form-control" id="productCode" v-model="product.code" required>
            </div>
            <div class="form-group col-md-4 mb-0">
              <label for="productName" class="form-label">Product Name</label>
              <input type="text" class="form-control" id="productName" v-model="product.name" required>
            </div>
            <div class="form-group col-md-4">
                <div class="d-flex align-items-end">
                    <img :src="previewImage || require('@/assets/img/image.png')" class="img-thumbnail" alt="" @click="chooseImage">
                    <input type="file" @change="onFileChange" class="form-control-file" id="productImage" hidden>
                </div>
                <label for="productImage" class="form-label">Image </label>
            </div>
          </div>                              
        <div class="form-group">
          <label for="productDescription" class="form-label">Description</label>
          <textarea class="form-control" id="productDescription" v-model="product.description" required></textarea>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
              <label for="productsell_price" class="form-label"> Buying Price</label>
              <input type="number" class="form-control" id="productsell_price" v-model="product.buying_prive" required>
            </div>
            <div class="col-md-4 mb-4">
              <label for="productsell_price" class="form-label">Selling price</label>
              <input type="number" class="form-control" id="productsell_price" v-model="product.sell_price">
            </div>
            <div class="col-md-4 mb-4">
                <label for="productQuantity" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="productQuantity" v-model="product.quantity" required>
              </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productDiscount" class="form-label">Discount</label>
              <input type="number" class="form-control" id="productDiscount" v-model="product.discount">
            </div>
            <div class="form-group col-md-6">
              <label for="productSubTotal" class="form-label">SubTotal</label>
              <input type="number" class="form-control" id="productSubTotal" v-model="product.subtotal" required>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputSupplier">Supplier</label>
                <select id="inputSupplier" class="form-control custom-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
            </div>
            <div class="form-group col-md-6">
                <label for="inputCategory">Category</label>
                <select id="inputCategory" class="form-control custom-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
    export default {
      name: 'ProductForm',
      props: {
        product: {
          type: Object,
          default: () => ({
            name: '',
            code: '',
            description: '',
            sell_price: '',
            buying_price: '',
            price: null,
            quantity: null,
            image: null
          })
        }
      },
      data() {
        return {
          previewImage: null
        };
      },
      methods: {
        chooseImage() {
          document.getElementById('productImage').click();
        },
        onFileChange(event) {
          const file = event.target.files[0];
          this.product.image = file;
          const reader = new FileReader();
          reader.onload = (event) => {
            this.previewImage = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
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