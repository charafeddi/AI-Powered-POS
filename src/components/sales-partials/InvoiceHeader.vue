<template>
  <div class="row">
    <div class="col-xl">
        <div class="card">
            <div class="card-body">
                <h1 v-if="showitem" class="card-title text-center">Invoice</h1>
                <div class="d-flex justify-content-between">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <td  @input="updatesaleInf('name', $event.target.innerText)">{{recipient.name}}</td>
                      </tr>
                      <tr>
                        <th>Client Address</th>
                        <td  @input="updatesaleInf('address', $event.target.innerText)">{{recipient.address}}</td>
                      </tr>
                      <tr>
                        <th>Client Email</th>
                        <td  @input="updatesaleInf('email', $event.target.innerText)">{{recipient.email}}</td>
                      </tr>
                      <tr>
                        <th>Client Phone</th>
                        <td @input="updatesaleInf('phone', $event.target.innerText)">{{recipient.phone}}</td>
                      </tr>
                    </thead>
                  </table>
                  <div v-if="showitem">
                    <img src="http://www.jonathantneal.com/examples/invoice/logo.png" alt="" class="img-fluid mb-2" />
                    <input type="file" accept="image/*" class="form-control" @change="handleFileUpload" />
                  </div>
                </div>
                <button class="btn btn-info" @click="showModal()">
                  Select Client 
                </button>
            </div>
        </div>
    </div>
  </div>

  <!-- Task Modal -->
  <div v-if="modalOpen" class="modal fade show" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style="display: block;">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Select Client</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal()">
            <i class="material-icons">close</i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="selectClient()">
            <div class="form-group">
              <input type="text" class="form-control" v-model="ClientForm.name" @keyup="filterClients" placeholder="client phone or name or email" required>
              <ul v-if="filteredClients.length" class="list-group">
                <li v-for="client in currentClients" :key="client.id" class="list-group-item" @click="selectClient(client)">
                  {{ client.phone }} - {{ client.name }}
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="showModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Select</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    recipient: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
      })
    },
    editable: {
      type: Boolean,
      default: false
    },
    showitem: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      modalOpen: false,
      filteredClients: [],
      searchTerm: '',
      ClientForm: {
        id: '',
        name: '',
        address: '',
        phone: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      clients: 'customers/getCustomers',
      user: 'auth/user'
    }),
    currentClients() {
      const start = 0;
      const end = 5;
      return this.filteredClients.slice(start, end);
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.importclients(newValue.id);
        }
      }
    },
  },
  methods: {
    ...mapActions({
      importclients: 'customers/importCustomers'
    }),
    showModal() {
      this.filteredClients = [];
      this.modalOpen = !this.modalOpen;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$el.querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    updateRecipient(value) {
      this.searchTerm = value;
    },
    filterClients() {
      const searchTerm = this.ClientForm.name.toLowerCase();
      this.filteredClients = this.clients.data.filter(client =>
        client.name.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.phone.toLowerCase().includes(searchTerm)
      );
    },
    selectClient(client) {
      this.recipient.id = client.id;
      this.recipient.name = client.name;
      this.recipient.address = client.address;
      this.recipient.email = client.email;
      this.recipient.phone = client.phone;

      console.log('client form:', this.recipient);
      this.$emit('update-recipient', this.recipient);
      this.showModal();
    },
    updatesaleInf(property, value) {
      this.recipient[property] = value;
      this.$emit('update-recipient', this.recipient);
    },
  }
};
</script>

<style scoped>
  img {
    max-height: 100%;
    max-width: 100%;
  }
</style>