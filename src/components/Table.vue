<template lang="">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    <div class="input-group input-group-sm">
                      <input type="text" v-model="filters['global'].value" class="form-control" placeholder="Search...">
                      <span class="input-group-append">
                        <button type="button" class="btn btn-secondary" @click="clearFilter">
                          <i class="fas fa-times"></i>
                        </button>
                      </span>
                    </div>
                </div>                          
                <div class="card-body">
                    <DataTable :value="product" :filters="filters" filterDisplay="menu" :filterBy="filterBy" tableStyle="min-width: 50rem">
                        <Column field="product_code" header="Code"></Column>
                        <Column field="designation" header="Name"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                        <Column field="prix_achat" header="Price"></Column>
                        <Column field="discount" header="Discount">
                            <template #body="slotProps">
                                <span>
                                    {{ slotProps.data.discount ? slotProps.data.discount:0 }}
                                </span>
                            </template>
                        </Column>
                        <Column  header="Status">
                            <template #body="slotProps">
                                <button class="btn" :class="getButtonClass(inventoryStatus(slotProps.data.quantity))">
                                    {{inventoryStatus(slotProps.data.quantity)}}
                                </button>
                            </template>
                        </Column>
                        <Column header="SubTotal">
                            <template #body="slotProps">
                                <span>
                                    {{subTotal(slotProps.data.quantity,slotProps.data.prix_achat ,slotProps.data.discount)}}
                                </span>
                            </template>
                        </Column>
                        <Column header="Action">
                            <template #body="slotProps">
                                <button @click="deleteProduct(slotProps.data.id)" class="btn btn-danger mr-2"><i class="fa-regular fa-trash-can"></i></button>  &nbsp;
                                <router-link :to="{name: 'UpdateProduct', params: {id: slotProps.data.id}}" class="btn btn-primary"><i class="fa-regular fa-pen-to-square"></i></router-link>
                            </template>
                        </Column>
                        <template #footer>
                            <tr>
                              <td class="text-right font-weight-bold">Total:</td>
                              <td colspan="6"></td>
                              <td class="font-weight-bold">{{ total }}</td>
                            </tr>
                          </template>                          
                    </DataTable>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import DataTable from 'primevue/datatable/DataTable.vue';
import Column from 'primevue/column/Column.vue';
export default {
    name:'Table',
    components:{
        DataTable,
        Column
    },
    data() {
        return {
            filters: {
                'global': { value: null, matchMode: 'contains' }
            },
            product: this.arrayProp.data,
            total:  this.arrayProp.total.toFixed(2),
        }
    },
    props:{
        arrayProp:{
            type: Array,
            required: true,
        }
    },
    watch: {
        product: {
            handler() {
                // Detect changes in the arrayProp and set showSubmitButton to true
                this.$emit('modify-array');
            }
        }
    },
    methods: {
        filterBy(product, filter) {
            if (filter['global'].value) {
            return (
                product.code.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                product.name.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                product.category.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                product.inventoryStatus.toLowerCase().includes(filter['global'].value.toLowerCase())
            );
            }
            
            return true;
        },
        clearFilter() {
            this.filters['global'].value = null;
        },
        deleteProduct(id) {
            this.product = this.product.filter(item => item.id !== id);
            this.$emit('modify-array');
        },
        getButtonClass(status) {
            switch (status) {
                case 'INSTOCK':
                return 'btn-success';
                case 'LOWSTOCK':
                return 'btn-warning';
                case 'OUTOFSTOCK':
                return 'btn-danger';
                default:
                return '';
            }
        },
        inventoryStatus(quantity){
            if (quantity>=100) {
                return 'INSTOCK' ;
            }else if  (quantity>0){
                return 'LOWSTOCK' ;
            }else{
                return 'OUTOFSTOCK' ;
            }
        },
        subTotal(quantity,prix_achat,discount){
            if (discount === null){
                return (quantity * prix_achat).toFixed(2) ; 
            }

            return (quantity * prix_achat - (prix_achat * quantity * discount)).toFixed(2); 
        }
    },

}
</script>
<style>
    .dark-theme .p-datatable .p-datatable-thead > tr > th {
      background-color: #272B33; /* change the header background color */
      border-color: #404652!important;
      color: #5E606E;
      box-shadow: 0 0 .5rem rgba(0,0,0,.1);
    }
    
    .dark-theme .p-datatable .p-datatable-tbody > tr > td {
      background-color: #272B33; /* change the row background color */
      border-color: #404652!important;
      box-shadow: 0 0 .5rem rgba(0,0,0,.1);
      color: #5E606E;
    }
    
    .dark-theme .p-datatable .p-datatable-footer {
      background-color: #272B33; /* change the row background color */
      border-color: #404652!important;
      box-shadow: 0 0 .5rem rgba(0,0,0,.1);
      color: #5E606E;
    }
</style>