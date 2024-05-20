<template>
    <div class="page-content">
        <div class="main-wrapper">
            <div >
                <InvoiceHeader :editable="editable" />
                <InvoiceDetails :showitem="showitem" :editable="editable" />
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
        }
    },
    components: {
        InvoiceHeader,
        InvoiceDetails,
    },
    methods: {
        ...mapActions({
            'importSaleByID' : 'sales/getSaleInfoById',
        }),
    },
};
</script>
