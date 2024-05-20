<template>
  <div class="row">
    <div class="col-xl">
        <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Sale Id #</th>
                        <td :contenteditable="editable">{{saleinf.id}}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td :contenteditable="editable">{{saleinf.date}}</td>
                      </tr>
                      <tr>
                        <th>Amount Due</th>
                        <td :contenteditable="editable">{{saleinf.total_amount}}</td>
                      </tr>
                    </thead>
                  </table>

                  <table class="table table-bordered mt-3">
                    <thead class="thead-dark">
                      <tr>
                        <th>Product Code</th>
                        <th>designation</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>SubTotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in items" :key="index">
                        <td contenteditable="true" @input="updateItem(index, 'product.product_code', $event.target.value)">{{ item.product.product_code }}</td>
                        <td contenteditable="true" @input="updateItem(index, 'product.designation', $event.target.value)">{{ item.product.designation }}</td>
                        <td contenteditable="true" @input="updateItem(index, 'unit_price', $event.target.value)">{{ item.unit_price }}</td>
                        <td contenteditable="true" @input="updateItem(index, 'quantity', $event.target.value)">{{ item.quantity }}</td>
                        <td>{{ Number(item.unit_price) * Number(item.quantity) }}</td>
                        <td v-if="showitem">
                          <button @click="removeItem(index)" class="btn btn-danger btn-sm">Remove</button>
                        </td>
                      </tr>                      
                    </tbody>
                  </table>
                  <button v-if="showitem" @click="addItem" class="btn btn-primary">Add Item</button>

                  <table class="table table-bordered mt-3">
                    <tbody>
                      <tr>
                        <th>Total</th>
                        <td>${{ total }}</td>
                      </tr>
                      <tr>
                        <th>Amount Paid</th>
                        <td :contenteditable="editable">${{ saleinf.amount_paid }}</td>
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
</template>

<script>
export default {
  props: {
      saleinf: {
          type: Object,
          default: () => ({
              id: '',
              total_amount: '',
              amount_paid: '',
              date: ''
          })
      },
      arrayProp: {
          type: Array,
          default:()=>([
          {
            product:{ 
              product_code: '',
              designation: ''
            },
             unit_price:'',
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
      }
  },
  data() {
      return {
          items:this.arrayProp,
      };
  },
  computed: {
      total() {
          return this.items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
      },
  },
  methods: {
      addItem() {
        const newItem = Vue.observable({
          product: {
            product_code: '',
            designation: ''
          },
          unit_price: '',
          quantity: ''
        });

        this.items.push(newItem);
      },
      removeItem(index) {
          this.items.splice(index, 1);
      },
      updateItem(index, property, value) {
        if (property.includes('.')) {
          const [parent, child] = property.split('.');
          this.items[index][parent][child] = value;
        } else {
          this.items[index][property] = value;
        }
      }
  },
  created() {
      console.log('arrayprops:', this.arrayProp)
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
      color:#ffff !important;
    }

    .dark-theme table thead > tr > td {
      background-color: #272B33; /* change the header background color */
      border-color: #404652!important;
      color: #5E606E;
      box-shadow: 0 0 .5rem rgba(0,0,0,.1);
    }
    
    .dark-theme table tbody > tr > td {
      background-color: #272B33; /* change the row background color */
      border-color: #404652!important;
      box-shadow: 0 0 .5rem rgba(0,0,0,.1);
      color: #5E606E;
    }
    
    .dark-theme table tbody > tr > th {
      background-color: #272B33; /* change the row background color */
      border-color: #404652!important;
      box-shadow: 0 0 .5rem rgba(0,0,0,.1);
      color: #5E606E;
    }
</style>