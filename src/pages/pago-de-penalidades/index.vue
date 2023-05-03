<template>
    <div class="payment-penalites-page">
      <div class="title-container">
        <h2>Pago de Penalidades</h2>
        <v-btn
          color="primary"
          to="/pago-de-penalidades/agregar">
          Registrar
        </v-btn>
      </div>
      <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
      loading-text="Obteniendo registros de pago de penalidades"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom v-if="!loadingFileDownload">
          <template v-slot:activator="{ on, attrs }">
              <v-icon 
                  color="info"
                  v-bind="attrs"
                  v-on="on"
                  @click="openModalPaymentPenaltie(a)"
                  large
                  >mdi-pencil</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom v-if="!loadingFileDownload">
          <template v-slot:activator="{ on, attrs }">
            <v-icon 
              color="error"
              v-bind="attrs"
              v-on="on"
              @click="deleteConfirm(a)"
              large
              >mdi-trash-can</v-icon>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </template>
      <template v-slot:item.documents="{ item }">
        <div v-for="a in item.documents" :key="a">
          <v-tooltip bottom v-if="!loadingFileDownload">
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                v-bind="attrs"
                v-on="on"
                @click="downloadFile(a)"
                large
                >mdi-file-download-outline</v-icon>
            </template>
            <span>{{a.path}}</span>
          </v-tooltip>
          <v-progress-circular v-else
              indeterminate
              color="primary"
          ></v-progress-circular>
        </div>
      </template>
      <template v-slot:item.amount="{ item }">        
          <span>S/. {{ item.amount }}</span>
      </template>
    </v-data-table>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  export default {
    name: 'PaymentPenaltiesPage',
    layout: 'auth',
    data(){
      return {
        loading: false,
        headers: [
            { text: '', value: 'actions' },
            { text: 'Fecha', value: 'date' },
            { text: 'Nombres', value: 'firstname' },
            { text: 'Apellidos', value: 'lastname' },
            { text: 'DNI', value: 'docnumber' },
            { text: 'Motivo', value: 'paymentReason' },
            { text: 'Monto', value: 'amount' },
            { text: 'Documentos', value: 'documents' }
        ],
        list: [],
        loadingFileDownload: false
      }
    },
    methods: {
      ...mapActions("payment-penaltie", ['getPaymentsPenalties']),
      async getPaymentsPenaltiesService(){
        try {
          this.loading = true
          let res = await this.getPaymentsPenalties()
          if(res.success){
            this.list = res.data
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      },
      async downloadFile(a){
        console.log("a", a)
      }
    },
    mounted(){
      this.getPaymentsPenaltiesService()
    }
  }
  </script>
<style lang="scss">
.payment-penalites-page{
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
  