<template>
  <div class="row">
    <div class="col-xl">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr v-if="showID">
                  <th>Sale Id #</th>
                  <td >{{ saleinf.id }}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td> {{ saleinf.date ? saleinf.date  : this.formattedDate }}</td>
                </tr>
                <tr>
                  <th>Amount Due</th>
                  <td>$ {{saleinf.total_amount ? saleinf.total_amount : 0.0  }}</td>
                </tr>
              </thead>
            </table>
            <table class="table table-bordered mt-3">
              <thead class="thead-dark">
                <tr>
                  <th>Product Code</th>
                  <th>Designation</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>
                    {{ item.product.product_code }}
                  </td>
                  <td>
                    {{ item.product.designation }}
                  </td>
                  <td :contenteditable="editable" @input="updateItem(index, 'unit_price', $event.target.innerText)">
                    {{ item.unit_price }}
                  </td>
                  <td :contenteditable="editable" @input="updateItem(index, 'quantity', $event.target.innerText)">
                    {{ item.quantity }}
                  </td>
                  <td>{{(Number(item.unit_price) * Number(item.quantity)).toFixed(2)}}</td>
                  <td v-if="showitem">
                    <button @click="removeItem(index)" class="btn btn-danger btn-sm"><i class="fas fa-trash"></i></button>
                    &nbsp;
                    <button v-if="showUpdateItem" @click="showModal(item)" class="btn btn-primary btn-sm"> <i class="fas fa-edit"></i></button>
                  </td>
                  <!-- <td>
                    <ul v-if="item.filteredProducts && item.filteredProducts.length" class="list-group">
                      <li v-for="product in item.filteredProducts" :key="product.product_code" class="list-group-item" @click="selectProduct(index, product)">
                        {{ product.product_code }} - {{ product.designation }}
                      </li>
                    </ul>
                  </td> -->
                </tr>
              </tbody>
            </table>
            <button v-if="showitem" @click="showModal(null)" class="btn btn-info">Add Item</button>

            <table class="table table-bordered mt-3">
              <tbody>
                <tr>
                  <th>Total</th>
                  <td>${{ total }}</td>
                </tr>
                <tr>
                  <th>Amount Paid</th>
                  <td :contenteditable="editable" @input="updatesaleInf('amount_paid', $event.target.innerText)">{{saleinf.amount_paid ? saleinf.amount_paid : 0.0  }}</td>
                </tr>
                <tr>
                  <th>Balance Due</th>
                  <td>${{ total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="Modalerror" class="modal fade bd-example-modal-lg show" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: block;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Error</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModalError">
                    <i class="material-icons">close</i>
                </button>
            </div>
            <div class="modal-body">
                {{errorMessage}}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="showModalError">Close</button>
            </div>
        </div>
    </div>
  </div>
  <!-- Task Modal -->
  <div v-if="modalOpen" class="modal fade show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: block;">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ editingTask ? 'Update Product' : 'Add Product' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal(null)">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editingTask ? updateTask() : addTask()">
            <div class="form-group">
              <input type="text" class="form-control" v-model="taskForm.product.product_code" @keyup="filterProducts()" placeholder="Product Code or Designation" required>
              <ul v-if="filteredProducts.length" class="list-group">
                <li v-for="product in currentItems" :key="product.product_code" class="list-group-item" @click="selectProduct(product)">
                  {{ product.product_code }} - {{ product.designation }}
                </li>
              </ul>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="taskForm.product.designation" placeholder="Designation" required readonly>
            </div>
            <div class="form-group">
              <input type="number" class="form-control" step="0.01" v-model="taskForm.unit_price" placeholder="Price" required >
            </div>
            <div class="form-group">
              <input type="number" class="form-control" v-model="taskForm.quantity" placeholder="Quantity" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal(null)">Cancel</button>
              <button type="submit" class="btn btn-primary">{{ editingTask ? 'Update' : 'Add' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    saleinf: {
      type: Object,
      default: () => ({
        id: '',
        total_amount: '',
        amount_paid: '',
        date: '',
        user_id:''
      })
    },
    showID: {
        type: Boolean,
        default: true
      },
    arrayProp: {
      type: Array,
      default: () => ([
        {
          id:'',
          product: {
            id:'',
            product_code: '',
            designation: ''
          },
          unit_price: '',
          quantity: ''
        },
      ])
    },
    editable: {
      type: Boolean,
      default: false,
    },
    showitem: {
      type: Boolean,
      default: false,
    },
    showUpdateItem: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      modalOpen: false,
      Modalerror:false,
      errorMessage:"",
      elementsPerPage: 5,
      currentPage: 0,
      items: this.arrayProp,
      filteredProducts: [],
      taskForm: {
        id:'',
        product: {
          id:'',
          product_code: '',
          designation: ''
        },
        unit_price: 0,
        quantity: 0
      },
      editingTask: false,
    };
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      products: 'product/products'
    }),
    total() {
      return this.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0).toFixed(2);
    },
    numberOfPages() {
      return Math.ceil(this.filteredProducts.length / this.elementsPerPage);
    },
    currentItems() {
      const start = this.currentPage * this.elementsPerPage;
      const end = start + this.elementsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    formattedDate() {
      const today = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return today.toLocaleDateString('en-US', options);
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.importProductfromDB(newValue.id);
          this.saleinf.user_id = newValue.id;
        }
      }
    },
  },
  methods: {
    ...mapActions({
      importProductfromDB: 'product/importProducts'
    }),
    showModalError(){
      this.Modalerror = ! this.Modalerror;
    },
    showModal(task = null) {
      if (task) {
        this.taskForm = { ...task };
        this.editingTask = true;
      } else {
        this.taskForm = {
          product: {
            id:'',
            product_code: '',
            designation: ''
          },
          unit_price: 0,
          quantity: 0
        };
        this.editingTask = false;
      }
      this.modalOpen = !this.modalOpen;
    },
    addTask() {
      this.checkFirstItem();
      this.items.push(this.taskForm);
      this.saleinf.total_amount = this.total;
      this.emitItems();
      this.showModal();
    },
    updateTask() {
      const index = this.items.findIndex(item => item.product.id === this.taskForm.product.id);
      if (index !== -1) {
        this.items[index] = { ...this.taskForm };
        this.saleinf.total_amount = this.total;
        this.emitItems();
        this.showModal();
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
      this.saleinf.total_amount = this.total;
      this.emitItems();
    },
    updateItem(index, property, value) {
      if (value<0 ) {
          this.errorMessage = 'please input correct value';
          this.showModalError();
          return;
        } 

      if (property.includes('.')) {
        const [parent, child] = property.split('.');
        this.items[index][parent][child] = value;
      } else {
        this.items[index][property] = value;
      }
      this.saleinf.total_amount = this.total;
      this.emitItems();
      console.log('product items', this.items);
    },
    updatesaleInf(property, value) {
        if (value<0 ) {
          this.errorMessage = 'please input correct value';
          this.showModalError();
        } else {
          this.saleinf[property] = value;
          console.log('sale inf', this.saleinf);
          this.emitSaleinf();
        }
    },
    filterProducts() {
        const searchTerm = this.taskForm.product.product_code.toLowerCase() 

        this.filteredProducts = this.products.data.filter(product =>
          product.product_code.toLowerCase().includes(searchTerm) ||
          product.designation.toLowerCase().includes(searchTerm)
        );
    },
    selectProduct(product) {
        this.taskForm.product.id = parseInt(product.id);
        this.taskForm.product.product_code = product.product_code;
        this.taskForm.product.designation = product.designation;
        this.taskForm.unit_price = parseFloat(product.prix_vente);
        this.taskForm.quantity = parseInt(product.quantity);
        this.filteredProducts = [];
    },
    checkFirstItem() {
      if (this.items.length > 0) {
        const firstItem = this.items[0];
        const isEmpty = !firstItem.product.product_code && !firstItem.product.designation && !firstItem.unit_price && !firstItem.quantity;
        if (isEmpty) {
          this.items.splice(0, 1);
        } else {
          return ;
        }
      }
    },
    emitItems() {
      this.$emit('update-items', this.items);
    },
    emitSaleinf() {
      this.$emit('update-saleinf', this.saleinf);
    },
  },
};
</script>

<style>

.dark-theme table thead > tr > th {
  background-color: #272B33; /* change the header background color */
  border-color: #404652!important;
  color: #5E606E;
  box-shadow: 0 0 .5rem rgba(0,0,0,.1);
}

table thead.thead-dark > tr > th {
  color: #ffff !important;
}

.dark-theme table thead > tr > td {
  background-color: #272B33; /* change the header background color */
  border-color: #404652!important;
  color: #5E606E;
}

.dark-theme table tbody > tr > td {
  background-color: #272B33; /* change the header background color */
  border-color: #404652!important;
  color: #5E606E;
}

.dark-theme table tbody > tr > th {
  background-color: #272B33; /* change the header background color */
  border-color: #404652!important;
  color: #5E606E;
}

.dark-theme .list-group-item {
  color: #5E606E;
}
</style>