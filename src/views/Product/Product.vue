<template>
    <div class="page-content">
        <div class="page-info">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Apps</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Data Tables</li>
                </ol>
            </nav>
            <div class="page-options dropdown" @click="toggleDropdown" :class="{ show: isOpen }">
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    Add Product
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <router-link class="dropdown-item" :to="{name: 'ImportProduct'}">Import from Image</router-link>
                    <div class="dropdown-divider"></div>
                    <router-link class="dropdown-item" :to="{name:'Addproduct'}">Add manually</router-link>
                </div>
            </div>
        </div>
        <div class="main-wrapper">
            <div v-if="loading">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <Table v-else :arrayProp="products" @modify-array="onModifyArray"/>
            <div class="row" v-show="showSubmitButton">
                <div class="col">
                    <div class="card">
                        <div class="card-body d-flex justify-content-center align-items-center">
                            <button type="submit" class="btn btn-primary"  @click="submitForm">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'Product',
    components: {
        Table
    },
    data() {
        return {
            loading: true,
            isOpen: false,
            showSubmitButton: false,
        }
    },
    props:['id'],
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        ...mapActions({
            'ImportProducts' : 'product/importProducts'
        }),
        onModifyArray() {
            this.showSubmitButton = true;
        },
        handleOutsideClick(e) {
            if (!this.$el.contains(e.target)) {
                this.closeDropdown();
            }
        },
        toggleDropdown() {
            this.isOpen = !this.isOpen;
        },
        closeDropdown() {
            if (this.isOpen) {
                this.isOpen = false;
            }
        },
    },
    created() {
        this.ImportProducts(this.id).finally(() => {
            this.loading = false;
        });
    },
    computed:{
        ...mapGetters({
            'products' : 'product/products'
        })
    }
}
</script>


