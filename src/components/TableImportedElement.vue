<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">
                    <div class="input-group input-group-sm">
                        <input
                            type="text"
                            v-model="filters['global'].value"
                            class="form-control"
                            placeholder="Search..."
                        />
                        <span class="input-group-append">
                            <button type="button" class="btn btn-secondary" @click="clearFilter">
                                <i class="fas fa-times"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <DataTable
                        :value="products"
                        :filters="filters"
                        filterDisplay="menu"
                        :filterBy="filterBy"
                        tableStyle="min-width: 50rem"
                    >
                        <Column field="product_code" header="Code"></Column>
                        <Column field="designation" header="Name"></Column>
                        <Column field="quantity" header="Quantity"></Column>
                        <Column field="prix_achat" header="Price"></Column>
                        <Column field="discount" header="Discount">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.discount ? slotProps.data.discount : 0 }}</span>
                            </template>
                        </Column>
                        <Column header="SubTotal">
                            <template #body="slotProps">
                                <span>
                                    {{ subTotal(slotProps.data.quantity, slotProps.data.prix_achat, slotProps.data.discount) }}
                                </span>
                            </template>
                        </Column>
                        <Column header="Action">
                            <template #body="slotProps">
                                <button
                                    @click="deleteProduct(slotProps.data.product_code)"
                                    class="btn btn-danger mr-2">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                                &nbsp;
                                <button
                                    @click="showModal(slotProps.data)"
                                    class="btn btn-info mr-2">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="card-body text-center">
                        <button class="btn btn-success" @click="submitProducts">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <!-- Task Modal -->
    <div v-if="modalOpen" class="modal fade show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: block;">
        <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal(null)">
                <i class="material-icons">close</i>
            </button>
            </div>
            <div class="modal-body">
            <form @submit.prevent="updateTask()">
                <div class="form-group">
                <input type="text" class="form-control" v-model="ProductForm.product_code" placeholder="Product Code" required>
                </div>
                <div class="form-group">
                <input type="text" class="form-control" v-model="ProductForm.designation" placeholder="Designation" required readonly>
                </div>
                <div class="form-group">
                <input type="number" class="form-control" step="0.01" v-model="ProductForm.prix_achat" placeholder="Price" required >
                </div>
                <div class="form-group">
                <input type="number" class="form-control" v-model="ProductForm.quantity" placeholder="Quantity" required>
                </div>
                <div class="form-group">
                    <div class="form-group col-md-6">
                        <label for="inputCategory">Category</label>
                        <select id="inputSupplier" class="form-control custom-select" v-model="ProductForm.product_type_id">
                            <option selected>Choose...</option>
                            <option v-if="ProductType && ProductType.data" v-for="Ptype in ProductType.data" :key="Ptype.id" :value="Ptype.id">
                                {{ Ptype.type }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="showModal(null)">Cancel</button>
                <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import DataTable from "primevue/datatable/DataTable.vue";
import Column from "primevue/column/Column.vue";
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

export default {
    name: "TableImportedElement",
    components: {
        DataTable,
        Column,
    },
    props: {
        arrayProp: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();
        const products = ref([...props.arrayProp]);
        const filters = ref({
            global: { value: null, matchMode: "contains" },
        });
        const modalOpen = ref(false);
        const ProductForm = ref({
            product_code: "",
            designation: "",
            quantity: null,
            prix_achat: null,
            prix_vente: null,
            discount: null,
            product_type_id: null,
            supplier_id: null,
            product_unit_id: null,
            user_id: null
        });

        const ProductType = ref(null);

        onMounted(async () => {
            await store.dispatch('productType/importProductType');
            ProductType.value = store.getters['productType/getProductsType'];
        });

        watch(
            () => props.arrayProp,
            (newVal) => {
                products.value = [...newVal];
            }
        );

        const deleteProduct = (productCode) => {
            const index = products.value.findIndex((item) => item.product_code === productCode);
            if (index !== -1) {
                products.value.splice(index, 1);
            }
        };

        const updateTask = () => {
            const index = products.value.findIndex(item => item.product_code === ProductForm.value.product_code);
            if (index !== -1) {
                products.value[index] = { ...ProductForm.value };
                showModal(null);
            }
        };

        const showModal = (task = null) => {
            if (task) {
                ProductForm.value = { ...task };
            } else {
                ProductForm.value = {
                    product_code: "",
                    designation: "",
                    quantity: null,
                    prix_achat: null,
                    prix_vente: null,
                    discount: null,
                    product_type_id: null,
                    supplier_id: null,
                    product_unit_id: null,
                    user_id: null
                };
            }
            modalOpen.value = !modalOpen.value;
        };

        const subTotal = (quantity, prix_achat, discount) => {
            if (isNaN(discount)) {
                return (quantity * prix_achat).toFixed(2);
            }
            return (quantity * prix_achat - (prix_achat * quantity * discount) / 100).toFixed(2);
        };

        const clearFilter = () => {
            filters.value.global.value = null;
        };

        const submitProducts = () => {
            store.dispatch("product/AddProduct", {
                'products': products.value
            }).then((response) => {
                if (response.status === 201) {
                    const user = store.getters['auth/user'];
                    this.$router.push({
                        name: 'Product',
                        params: {
                            id: user ? user.id : 'nothing'
                        }
                    });
                } else {
                    console.error("Failed to add product:", response);
                }
            }).catch((error) => {
                console.error("Error while adding supplier:", error);
            });
        };

        const filterBy = (product, filter) => {
            if (filter.global.value) {
                return (
                    product.product_code.toLowerCase().includes(filter.global.value.toLowerCase()) ||
                    product.designation.toLowerCase().includes(filter.global.value.toLowerCase())
                );
            }
            return true;
        };

        return {
            products,
            filters,
            deleteProduct,
            subTotal,
            clearFilter,
            submitProducts,
            filterBy,
            ProductType,
            showModal,
            updateTask,
            modalOpen,
            ProductForm,
        };
    },
};
</script>
