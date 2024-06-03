<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else>
                <InvoiceHeader 
                    :editable="editable" 
                    @update-recipient = 'handleUpdateRecipient'
                    :recipient="sale.data.recipient"
                />
                <InvoiceDetails :showID="showID" 
                    :showitem="showitem"
                    :editable="editable"
                    :showUpdateItem="showUpdateItem"
                    @update-items="handleUpdateItems"
                    @update-saleinf="handleUpdateSaleinf"
                    :saleinf="sale.data.sale" :arrayProp="sale.data.table"
                />
                <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-primary" @click="update">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InvoiceHeader from '@/components/sales-partials/InvoiceHeader.vue';
import InvoiceDetails from '@/components/sales-partials/InvoiceDetails.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name:'UPDATESALE',
    data() {
        return {
            loading:true,
            showUpdateItem:true,
            editable:true,
            showitem: true,
            showID: true,
            saleinf: {
                id: '',
                total_amount: 0,
                amount_paid: 0,
                user_id:'',
                date: '',
            },
             items: [],
             ClientForm: {
                id: '',
                name: '',
                address: '',
                phone: ''
            }
        }
    },
    props:['id'],
    components: {
        InvoiceHeader,
        InvoiceDetails,
    },
    computed:{
        ...mapGetters({
            sale : 'sales/getSale',
        }),
        isPaid(){
            return parseFloat(this.saleinf.amount_paid) >= parseFloat(this.saleinf.total_amount);
        }
    },
    methods: {
        ...mapActions({
            getSaleById:'sales/getSaleInfoById',
            UpdateSale:'sales/UpdateSale'
        }),
        handleUpdateRecipient(recipient){
            this.ClientForm = recipient;
            console.log("Console Client in Addsale :", recipient);
        },
        handleUpdateItems(items) {
            this.items = items;
            console.log("Console ITems in Addsale :", items);
        },
        handleUpdateSaleinf(saleinf) {
            this.saleinf = saleinf;
            console.log("Console saleinf in Addsale :", saleinf);
        },
        ClientInfIsEmpty(){
            return this.ClientForm.id && this.ClientForm.name && this.ClientForm.address && this.ClientForm.phone;
        },
        update(){
            if(this.ClientInfIsEmpty){
                this.ClientForm = {...this.sale.data.recipient}
            }
            const object= {
                'client_id': parseInt(this.ClientForm.id),
                'id':parseInt(this.saleinf.id),
                'total_amount': parseFloat(this.saleinf.total_amount),
                'amount_paid': parseFloat(this.saleinf.amount_paid),
                'paid': this.isPaid,
                'user_id': parseInt(this.saleinf.user_id),
                'table': this.items,
            };

            console.log(object);

            this.UpdateSale(object).then((response)=>{
                if (response.status === 201) {
                    this.$router.push({
                        name:'SalesList',
                        params:{
                            id: this.saleinf.user_id,
                        }
                    });
                } else {
                  // Handle the error or display a message to the user
                  console.error("Failed to add sale:", response);
              }
            }).catch((error) => {
               // Handle the error or display a message to the user
               console.error("Error while adding sale:", error);   
            });
        }
    },
    created() {
        this.getSaleById(this.id) .finally(()=>{
            this.loading =false;
        });
    },
}
</script>