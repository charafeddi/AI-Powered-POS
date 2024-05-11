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
            <Table :arrayProp="product" @modify-array="onModifyArray"/>
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
export default {
    name: 'Product',
    components: {
        Table
    },
    data() {
        return {
            isOpen: false,
            showSubmitButton: false,
            product: [
                {
                    id: '1000',
                    code: 'f230fh0g3',
                    name: 'Bamboo Watch',
                    description: 'Product Description',
                    image: 'bamboo-watch.jpg',
                    price: 65,
                    category: 'Accessories',
                    quantity: 24,
                    discount:15.00,
                    inventoryStatus: 'INSTOCK',
                    subtotal: 600,
                    rating: 5
                },
                {
                    id: '100',
                    code: 'f230fhdfg3',
                    name: 'Black Watch',
                    description: 'Product Description',
                    image: 'Black-Watch.jpg',
                    price: 120,
                    category: 'Accessories',
                    quantity: 45,
                    discount:15.00,
                    inventoryStatus: 'INSTOCK',
                    subtotal: 200,
                    rating: 5
                },
                {
                    id: '170',
                    code: 'dfsafh0g3',
                    name: 'Blue Band',
                    description: 'Product Description',
                    image: 'Blue-Band.jpg',
                    price: 88,
                    category: 'Accessories',
                    quantity: 44,
                    discount:15.00,
                    inventoryStatus: 'INSTOCK',
                    subtotal: 400,
                    rating: 5
                },
            ]
        }
    },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
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
    }
}
</script>


