<template>
  <div class="row">
    <div class="col-xl">
        <div class="card">
            <div class="card-body">
                <h1  v-if="showitem" class=" card-title text-center ">Invoice</h1>
                <div class="d-flex justify-content-between">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <td :contenteditable="editable" >{{recipient.name}}</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td :contenteditable="editable" >{{recipient.address}}</td>
                      </tr>
                      <tr>
                        <th>Phone</th>
                        <td :contenteditable="editable" >{{recipient.phone}}</td>
                      </tr>
                    </thead>
                  </table>
                  <div v-if="showitem">
                    <img src="http://www.jonathantneal.com/examples/invoice/logo.png" alt="" class="img-fluid mb-2" />
                    <input type="file" accept="image/*" class="form-control" @change="handleFileUpload" />
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>
  </template>
  
<script>
  export default {
    props: {
      recipient:{
        type: Object,
        default:()=>({
          name:"",
          adress:'',
          phone:''
        })
      },
      editable: {
        type: Boolean,
        default: false
      },
      showitem: {
          type: Boolean,
          default: false,
      }
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.$el.querySelector('img').src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
    },
  };
</script>
  
<style scoped>
  img {
    max-height: 100%;
    max-width: 100%;
  }
</style>  