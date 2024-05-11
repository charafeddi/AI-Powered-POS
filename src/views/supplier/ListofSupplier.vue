<template lang="">
    <div class="page-content">
        <div class="main-wrapper">
            <div class="row">
                <div class="col-xl">
                    <div class="card">
                        <div class="card-header">
                            <div class="input-group input-group-sm">
                              <input type="text" v-model="filters['global'].value" class="form-control" style="width: 200px;" placeholder="Search...">
                              <span class="input-group-append">
                                <button type="button" class="btn btn-secondary mr-2" @click="clearFilter">
                                  <i class="fas fa-times"></i>
                                </button>
                                <router-link class="btn btn-success" :to="{name:'AddSupplier'}">
                                    <i class="fa-solid fa-plus"></i>
                                  </router-link>
                              </span>
                            </div>
                        </div> 
                        <div class="card-body">
                            <DataTable :value="supplier" :fliters="filters" :filterBy="filterBy" tableStyle="min-width: 50rem">
                                <Column field="name" header="Name"></Column>
                                <Column field="email" header="Email"></Column>
                                <Column field="phone" header="Phone"></Column>
                                <Column field="address" header="Address"></Column>
                                <Column field="city" header="City"></Column>
                                <Column header="Action">
                                    <template #body="slotProps">
                                        <router-link :to="{name: 'UpdateSupplier', params:{ id: slotProps.data.id}}" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></router-link>
                                        <button @click="deleteSupplier(slotProps.data.id)" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i> </button>
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

export default {
    name:'ListOfSupplier',
    components:{
        DataTable,
        Column
    },
    data() {
        return {
            filters: {
                'global': { value: null, matchMode: 'contains' }
            },
            supplier:[
                {
                    id:1222,
                    name:'Edi Soft',
                    address:'Debsoltan',
                    phone:'0536998855',
                    email:'ediSoft@gmail.com',
                    fax:'0536998855',
                    zipcode:'20000',
                    city:'casablanca'
                }
            ],
        }
    },
    methods: {
        filterBy(product, filter) {
            if (filter['global'].value) {
            return (
                supplier.phone.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                supplier.name.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                supplier.address.toLowerCase().includes(filter['global'].value.toLowerCase()) ||
                supplier.email.toLowerCase().includes(filter['global'].value.toLowerCase())
            );
            }
            return true;
        },
    },
}
</script>
<style lang="">
    
</style>