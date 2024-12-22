<template>
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
                    <p class="small my-2">
                      Drag & Drop file(s) inside dashed region<br><i>or</i>
                    </p>
                    <input
                      ref="fileInput"
                      @change="handleFileChange"
                      class="position-absolute invisible"
                      type="file"
                      multiple
                      accept="image/jpeg, image/png, image/svg+xml"
                    />
                    <label
                      class="btn btn-upload mb-3"
                      @click="handleButtonClick"
                      for="upload_image_background"
                      >Choose file(s)</label
                    >
                    <div class="upload_gallery d-flex flex-wrap justify-content-center gap-3 mb-0"></div>
                    <button type="submit" :class="{ 'd-none': !selectedFile }" class="btn btn-primary mt-3">
                      Upload File
                    </button>
                  </fieldset>
                </form>
                <div v-if="selectedFile" class="d-flex justify-content-center align-items-center mt-3">
                  <img :src="selectedFile" alt="Preview" class="img-fluid" style="max-width: 200px" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!loading">
          <Table :arrayProp="products" />
        </div>
      </div>
    </div>
    <div class="modal fade show" 
            id="exampleModalCenter" 
            tabindex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalCenterTitle" 
            v-if="openModel" 
            style="display: block;"
            aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="spinner-border text-primary" 
                role="status">
                <span class="sr-only">Loading...</span>
            </div>  
        </div>
    </div>
</template>
  
  <script>
  import axios from "axios";
  import { ref } from "vue";
  import Table from "@/components/TableImportedElement.vue";
  import { useStore } from 'vuex';
  export default {
    name: "ImportProduct",
    components: {
      Table,
    },
    setup() {
      const store = useStore();
      const selectedFile = ref(null);
      const file = ref(null);
      const products = ref([]);
      const loading = ref(true);
      const fileInput = ref(null); // Reference for the file input
      const openModel = ref(false);
      const headerMapping = {
            "Code Article": "product_code",
            "Désignation": "designation",
            "Qté": "quantity",
            "quantite": "quantity",
            "PXUnit.": "prix_achat",
            "PX Unit.": "prix_achat",
            "Remise": "discount",
            "Sous-Total": "subtotal" // If needed, although not used in the mappedProduct
        };

      const handleFileChange = (event) => {
        selectedFile.value = URL.createObjectURL(event.target.files[0]);
        file.value = event.target.files[0];
      };
  
      const handleButtonClick = () => {
        fileInput.value.click();
      };
  
      const handleFileUpload = () => {
        const formData = new FormData();
        formData.append("file", file.value);
        openModel.value = true;
        
        axios.post("http://127.0.0.1:5002/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            products.value = mapProductData(processData(response.data));
            console.log('result : ', products.value);
            loading.value = false;
            openModel.value = false;
          })
          .catch((error) => {
            console.error(error);
            openModel.value = false;
          });
      };
  
      const processData = (data) => {
            const headers = data[0].map(header => headerMapping[header] || header); // Map headers to consistent keys
            const products = [];

            for (let i = 1; i < data.length; i++) {
                const row = data[i];
                const product = {};

                // Create a product object with consistent keys
                headers.forEach((header, index) => {
                    product[header] = row[index];
                });

                // Check if the current row has only the designation field filled
                if (Object.values(product).filter(value => value !== "").length === 1 && product["designation"]) {
                    // Find the last product in the products array
                    const lastProductIndex = products.length - 1;

                    // Make sure the last product exists before updating it
                    if (lastProductIndex >= 0) {
                        const lastProduct = products[lastProductIndex];
                        lastProduct["designation"] = lastProduct["designation"] + " - " + product["designation"];
                    }
                } else if (Object.values(product).some(value => value !== "")) {
                    products.push(product);
                }
            }
            return products;
        };

  
        const mapProductData = (products) => {
            // Create an empty array to store the mapped products
            const mappedProducts = [];
            const user = store.getters['auth/user'];

            // Loop through the array of products
            for (const product of products) {
                // Create a new object with the mapped properties
                const mappedProduct = {
                    product_code: product["product_code"],
                    designation: product["designation"],
                    prix_achat: parseFloat(product["prix_achat"]),
                    quantity: parseFloat(product["quantity"]),
                    discount: product["discount"] ? parseFloat(product["discount"]) : 0,
                    user_id: user.id,
                };

                // Add the mapped product to the array
                mappedProducts.push(mappedProduct);
            }
            // Return the array of mapped products
            return mappedProducts;
        };

      return {
        selectedFile,
        file,
        products,
        loading,
        fileInput, // Return fileInput to be used in the template
        handleFileChange,
        handleButtonClick,
        handleFileUpload,
        processData,
        mapProductData,
        openModel, // Return openModel to be used in the template
        };
    },
  };
  </script>
  
  <style>
  .dark-theme .card-body {
    color: #767885;
  }
  .dark-theme .upload_dropZone label {
    color: #767885;
  }
  </style>
  