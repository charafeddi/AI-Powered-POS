<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div >
                <InvoiceHeader 
                    :editable="editable" 
                    @update-recipient = 'handleUpdateRecipient'
                />
                <InvoiceDetails :showID="showID" 
                    :showitem="showitem"
                    :editable="editable"
                    @update-items="handleUpdateItems"
                    @update-saleinf="handleUpdateSaleinf"
                />
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <button class="btn btn-primary" @click="save">SAVE</button>
            </div>
        </div>
    </div>
</template>

<script>
import InvoiceHeader from '@/components/sales-partials/InvoiceHeader.vue';
import InvoiceDetails from '@/components/sales-partials/InvoiceDetails.vue';
import { mapActions } from 'vuex';

export default {
    name: 'AddSale',
    data() {
        return {
            editable:true,
            showitem: true,
            showID: false,
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
    components: {
        InvoiceHeader,
        InvoiceDetails,
    },
    computed:{
        isPaid(){
            return parseFloat(this.saleinf.amount_paid) >= parseFloat(this.saleinf.total_amount);
        }
    },
    methods: {
        ...mapActions({
            addSale : 'sales/addSales',
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
        save(){

            const object= {
                'client_id': parseInt(this.ClientForm.id),
                'total_amount': parseFloat(this.saleinf.total_amount),
                'amount_paid': parseFloat(this.saleinf.amount_paid),
                'paid': this.isPaid,
                'user_id': parseInt(this.saleinf.user_id),
                'table': this.items,
            };

            console.log(object);

            this.addSale(object).then((response)=>{
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
};
</script>
