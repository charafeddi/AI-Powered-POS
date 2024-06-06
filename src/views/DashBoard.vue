<template lang="">
    <div class="page-content">
        <div class="page-info">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Apps</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </nav>
            <div class="page-options">
                <!-- <a href="#" class="btn btn-secondary">Settings</a> -->
                <router-link :to="{name:'SalesAdd'}" class="btn btn-primary">Add Sale</router-link>
            </div>
        </div>
        <div class="main-wrapper">
            <div class="row stats-row">
                <div class="col-lg-4 col-md-12">
                    <div class="card card-transparent stats-card">
                        <div class="card-body">
                            <div class="stats-info">
                                <h5 class="card-title">$ {{ Earnings }} <span class="stats-change stats-change-danger">-8%</span></h5>
                                <p class="stats-text">Total revenue for last Week</p>
                            </div>
                            <div class="stats-icon change-danger">
                                <i class="material-icons">trending_down</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="card card-transparent stats-card">
                        <div class="card-body">
                            <div class="stats-info">
                                <h5 class="card-title">$ {{ TotalSales }} <span class="stats-change stats-change-success">+16%</span></h5>
                                <p class="stats-text">Total Sales for this month</p>
                            </div>
                            <div class="stats-icon change-success">
                                <i class="material-icons">trending_up</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="card card-transparent stats-card">
                        <div class="card-body">
                            <div class="stats-info">
                                <h5 class="card-title">{{NetProfit}}<span class="stats-change stats-change-success">+12%</span></h5>
                                <p class="stats-text">Net Profit in this month</p>
                            </div>
                            <div class="stats-icon change-success">
                                <i class="material-icons">trending_up</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <!-- Peak Sales Hours Chart -->
                    <div class="card">
                        <div class="card-header">
                        <h5 class="card-title">Peak Sales Hours</h5>
                        </div>
                        <div class="card-body">
                        <peak-sales-hours-chart></peak-sales-hours-chart>
                        </div>
                    </div>
                    
                </div>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Low Stock Item Alert<a href="#" class="card-title-helper blockui-transactions"><i class="material-icons">refresh</i></a></h5>
                            <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Code</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in LowStockAlert" :key="index">
                                            <td>{{item.product_code}}</td>
                                            <td>{{item.designation}}</td>
                                            <td>{{item.quantity}}</td>
                                            <td><span class="badge badge-warning">LOW IN STOCK</span></td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>    
                        </div>
                    </div>
                </div>
                
            </div>
             <div class="row">
                <div class="col-lg-4">
                    <div class="card top-products">
                        <div class="card-body">
                            <h5 class="card-title">Popular Products<span class="card-title-helper">3 months</span></h5>
                            <div class="top-products-list">
                                <div v-for="(item, index) in PopularProduct" :key="index" class="product-item">
                                    <h5>{{ item.designation}}</h5>
                                    <span>{{ item.total_quantity }} Sale</span>
                                    <!-- <i class="material-icons product-item-status product-item-success">arrow_upward</i> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card card-transactions">
                        <div class="card-body">
                            <h5 class="card-title">Transactions<a href="#" class="card-title-helper blockui-transactions"><i class="material-icons">refresh</i></a></h5>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Company</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in SuppliersTransaction" :key="index">
                                            <td>{{item.id}}</td>
                                            <td>{{item.name}}</td>
                                            <td>${{item.total_cost}}</td>
                                            <td><span class="badge badge-success">Finished</span></td>
                                        </tr>
                                    </tbody>
                                </table> 
                            </div>     
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex';
import { ref, watch, onMounted } from 'vue';
import PeakSalesHoursChart from '@/components/charts/PeakSalesHoursChart.vue';
export default {
    name:"DashBoard",
    components: {
        PeakSalesHoursChart,
    },
    setup() {
        const store = useStore();
        const user = ref(null);
        const Earnings = ref(null);
        const PopularProduct = ref(null);
        const TotalSales = ref(null);
        const NetProfit = ref(null);
        const SuppliersTransaction = ref(null);
        const LowStockAlert = ref(null);
        onMounted(async () => {
            // Fetch user information first
            user.value = store.getters['auth/user'];
            if (!user.value) {
                await store.dispatch('auth/attempt');
                user.value = store.getters['auth/user'];
            }

            // Fetch earnings once user is available
            if (user.value) {
                await store.dispatch('analytics/ImportEarning', { period: 'week', id: user.value.id });
                Earnings.value = store.getters['analytics/getEarnings'].data.earnings;

                await store.dispatch('analytics/ImportPopularProduct' , {period:'3months', id: user.value.id});
                PopularProduct.value = store.getters['analytics/getPopularProduct'].data;

                await store.dispatch('analytics/ImportTotalSales' , {period:'month', id: user.value.id});
                TotalSales.value = store.getters['analytics/getTotalSales'].data.total_sales;

                await store.dispatch('analytics/ImportTotalSales' , {period:'month', id: user.value.id});
                TotalSales.value = store.getters['analytics/getTotalSales'].data.total_sales;

                await store.dispatch('analytics/ImportNetProfit' , {period:'3months', id: user.value.id});
                NetProfit.value = store.getters['analytics/getNetProfit'].data.net_profit;

                await store.dispatch('analytics/ImportSupplierTransaction' , user.value.id);
                SuppliersTransaction.value = store.getters['analytics/getSupplierTransaction'].data;
                
                await store.dispatch('analytics/ImportLowStockAlert' , user.value.id);
                LowStockAlert.value = store.getters['analytics/getLowStockAlert'].data;
                
            }
        });

        return {
            Earnings,
            PopularProduct,
            TotalSales,
            NetProfit,
            SuppliersTransaction,
            LowStockAlert
        };
    },
}
</script>