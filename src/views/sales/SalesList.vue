<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">    
                    <div v-if="loading">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    <div v-else class="card">
                        <div  class="card-header">
                            <div class="input-group input-group-sm">
                            <input type="text" v-model="filters['global'].value" class="form-control" style="width: 200px;" placeholder="Search...">
                            <span class="input-group-append">
                                <button type="button" class="btn btn-secondary mr-2" @click="clearFilter">
                                    <i class="fas fa-times"></i>
                                </button>
                                &nbsp;
                                <router-link class="btn btn-success" :to="{name:'SalesAdd'}"> Add Sale
                                    <i class="fa-solid fa-plus"></i>
                                </router-link>
                            </span>
                            </div>
                        </div> 
                        <div class="card-body">
                            <DataTable :value="salesData.data" :fliters="filters" filterDisplay="menu" :filterBy="filterBy" tableStyle="min-width: 50rem">
                                <Column field="name" header="Client Name"></Column>
                                <Column field="total_amount" header="Total Amount"></Column>
                                <Column field="amount_paid" header="Paid Amount"></Column>
                                <Column header="Status">
                                    <template #body="slotProps">
                                        <button class="btn" :class="getButtonClass(slotProps.data.paid)">
                                            {{SaleStatus(slotProps.data.paid)}}
                                        </button>
                                    </template>
                                </Column>
                                <Column field="date" header="Date"></Column>
                                <Column header="Action">
                                    <template #body="slotProps" >
                                        <router-link :to="{name: 'SalesUpdate', params:{ id: slotProps.data.id}}" class="btn btn-success">
                                            <i class="fa-regular fa-pen-to-square"></i>
                                        </router-link>
                                        &nbsp;
                                        <router-link :to="{name: 'showSale', params:{ id: slotProps.data.id}}" class="btn btn-info">
                                            <i class="fa fa-eye"></i>
                                        </router-link>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DataTable from 'primevue/datatable/DataTable.vue';
import Column from 'primevue/column/Column.vue';
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'ListOfSupplier',
    components:{
        DataTable,
        Column
    },
    props:['id'],
    data() {
        return {
            loading:true,
            filters: {
                'global': { value: null, matchMode: 'contains' }
            },
        }
    },
    computed:{
        ...mapGetters({
            'salesData':'sales/getSales',
        }),
    },
    methods: {
        ...mapActions({
            'ImportSales': 'sales/ImportSales'
        }),
        filterBy(value, filter) {
            if (filter['global'].value) {
                return (
                value.phone.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                value.name.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                value.address.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                value.email.toLowerCase().includes(filter['global'].value.toLowerCase())
                );
            }
            return true;
        },
        clearFilter() {
            this.filters['global'].value = null;
        },
        SaleStatus(status){
            if(status){
                return 'Paid';
            }else{
                return 'Not Paid';
            }
        },
        getButtonClass(status) {
            if (status) {
                return 'btn-success';
            } else {
                return 'btn-danger';
            }
        },
    },
    created() {
        this.ImportSales(this.id).finally(() => {
            this.loading = false;
        });
    },
}
</script>
