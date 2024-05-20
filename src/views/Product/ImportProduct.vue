<template lang="">
    <div class="page-content d-flex justify-content-center align-items-center">
        <div class="main-wrapper">
            <div v-if="loading" class="row">
                <div class="col-xl">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="handleFileUpload">
                                <fieldset class="upload_dropZone text-center mb-3 p-4">
                                  <legend class="visually-hidden">File uploader</legend>
                                  <svg class="upload_svg" width="60" height="60" aria-hidden="true">
                                    <use href="#icon-imageUpload"></use>
                                  </svg>
                                  <p class="small my-2">Drag & Drop file(s) inside dashed region<br><i>or</i></p>
                                  <input ref="fileInput" @change="handleFileChange" class="position-absolute invisible" type="file" multiple accept="image/jpeg, image/png, image/svg+xml" />
                                  <label class="btn btn-upload mb-3" @click="handleButtonClick" for="upload_image_background">Choose file(s)</label>
                                  <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                                  <button type="submit" :class="{ 'd-none': !selectedFile }" class="btn btn-primary mt-3">Upload File</button>
                                </fieldset>
                              </form>
                              <div v-if="selectedFile" class="d-flex justify-content-center align-items-center mt-3">
                                <img :src="selectedFile" alt="Preview" class="img-fluid" style="max-width: 200px;">
                              </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!loading" >
               <Table :arrayProp="product"/>
                <div class="row" >
                    <div class="col">
                        <div class="card">
                            <div class="card-body d-flex justify-content-center align-items-center">
                                <button type="submit" class="btn btn-primary"  @click="submitForm">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Table from '@/components/Table.vue'


export default {
    name:'ImportProduct',
    data() {
        return {
            selectedFile: null,
            file: null,
            product:[],
            loading:true
        };
    },
    components:{
        Table,
    },
    methods: {
        submitForm(){
            console.log('Product : ',this.product );
            this.$router.push('/product');
        },
        handleFileChange(event) {
            this.selectedFile = URL.createObjectURL(event.target.files[0]);
            this.file = event.target.files[0];
        },
        handleButtonClick() {
            this.$refs.fileInput.click();
        },
        handleFileUpload() {
            const formData = new FormData();
            formData.append('file', this.file);

            axios.post('http://127.0.0.1:5002/', formData, {
                headers: {
                 'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.product = this.mapProductData(this.processData(response.data));
                console.log(this.product);
                this.loading=false;
            }).catch(error => {
                console.error(error);
            });
        },
        processData(data) {
            const headers = data[0];
            const products = [];

            for (let i = 1; i < data.length; i++) {
                const row = data[i];

                // Check if the current row has only the designation field filled
                if (row.filter(field => field !== "").length === 1 && row[headers.indexOf("Désignation")] !== "") {
                    // Find the last product in the products array
                    const lastProductIndex = products.length - 1;

                    // Make sure the last product exists before updating it
                    if (lastProductIndex >= 0) {
                        const lastProduct = products[lastProductIndex];
                        const lastDesignation = lastProduct["Désignation"];
                        lastProduct["Désignation"] = lastDesignation + ' - ' + row[headers.indexOf("Désignation")];
                    }
                } else if (row.some(field => field !== "")) {
                    // Create a new product object and push it to the products array
                    const product = {};
                    headers.forEach((header, index) => {
                        product[header] = row[index];
                    });
                    products.push(product);
                }
            }
            return products;
        },
        mapProductData(products) {
            // Create an empty array to store the mapped products
            const mappedProducts = [];

            // Loop through the array of products
            for (const product of products) {
                // Create a new object with the mapped properties
                const mappedProduct = {
                    product_code: product['Code Article'],
                    designation: product.Désignation,
                    prix_achat: parseFloat(product['PXUnit.']),
                    quantity: parseFloat(product.Qté),
                    discount : parseFloat(product.Remise),
                };

                // Add the mapped product to the array
                mappedProducts.push(mappedProduct);
            }
            // Return the array of mapped products
            return mappedProducts;
        }
    }
}
</script>

<style>
.dark-theme .card-body {
  color: #767885;
}
.dark-theme .upload_dropZone label{
  color: #767885;
}
</style>