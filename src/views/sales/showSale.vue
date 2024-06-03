<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div v-if="loading">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-else >
                <InvoiceHeader :recipient="sale.data.recipient" />
                <InvoiceDetails  :saleinf="sale.data.sale" :arrayProp="sale.data.table" />
            </div>
        </div>
    </div>
</template>

<script>
import InvoiceHeader from '@/components/sales-partials/InvoiceHeader.vue';
import InvoiceDetails from '@/components/sales-partials/InvoiceDetails.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'showSale',
    data() {
        return {
            loading: true,
            showitem: false,
        }
    },
    props: ['id'],
    components: {
        InvoiceHeader,
        InvoiceDetails,
    },
    methods: {
        ...mapActions({
            'importSaleByID' : 'sales/getSaleInfoById',
        }),
        seeSale(){
            console.log('this is sale', this.sale);
        }
    },
    computed: {
        ...mapGetters({'sale': 'sales/getSale'}),
    },
    created() {
        this.importSaleByID(this.id)
        .finally(()=>{
            this.loading =false;
        });
    },
};
</script>
