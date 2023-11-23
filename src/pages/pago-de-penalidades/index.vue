<template>
    <div class="payment-penalites-page">
      <div class="title-container">
        <h2>Pago de Penalidades</h2>
        <v-btn
          color="primary"
          to="/pago-de-penalidades/agregar"
          v-if="!!$auth.user && $auth.user.idProfile.roles.includes('register-payment-penalties')">
          Registrar
        </v-btn>
      </div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
      :search="search"
      loading-text="Obteniendo registros de pago de penalidades"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom v-if="!loadingFileDownload && !!$auth.user && $auth.user.idProfile.roles.includes('update-payment-penalties')">
          <template v-slot:activator="{ on, attrs }">
              <v-icon
                  color="info"
                  v-bind="attrs"
                  v-on="on"
                  @click="$router.push('/pago-de-penalidades/editar/'+item._id)"
                  large
                  >mdi-pencil</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip bottom v-if="!loadingFileDownload && !!$auth.user && $auth.user.idProfile.roles.includes('delete-payment-penalties')">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="error"
              v-bind="attrs"
              v-on="on"
              @click="deleteConfirm(item)"
              large
              >mdi-trash-can</v-icon>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </template>
      <template v-slot:item.documents="{ item }">
        <div class="d-flex">
          <div v-for="a in item.documents" :key="a.path">
            <v-tooltip bottom v-if="!loadingFileDownload">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  @click="downloadFile(a, item)"
                  large
                  >mdi-file-download-outline</v-icon>
              </template>
              <span>{{a.name}}</span>
            </v-tooltip>
            <v-progress-circular v-else
                indeterminate
                color="primary"
            ></v-progress-circular>
          </div>
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
        search: '',
        loading: false,
        headers: [
            { text: '', value: 'actions' },
            { text: 'Fecha', value: 'date' },
            { text: 'Nombres', value: 'idUser.firstname' },
            { text: 'Apellidos', value: 'idUser.lastname' },
            { text: 'DNI', value: 'idUser.docnumber' },
            { text: 'Motivo', value: 'paymentReason' },
            { text: 'Monto', value: 'amount' },
            { text: 'Documentos', value: 'documents' }
        ],
        list: [],
        loadingFileDownload: false
      }
    },
    methods: {
      ...mapActions("payment-penaltie", ['getPaymentsPenalties', 'deletePaymentsPenaltie']),
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
      async deleteConfirm(data){
        this.$swal.fire({
          title: '¿Estás seguro de eliminar este registro?',
          text: "La eliminación es irreversible",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.deletePaymentsPenaltieService(data)
          }
        })
      },
      async deletePaymentsPenaltieService(data){
        try {
          let res = await this.deletePaymentsPenaltie(data)
          if(res.success){
            this.$swal.fire({
              title: 'Pago de Penalidad Eliminado',
              icon: 'success',
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          await this.getPaymentsPenaltiesService()
        }
      },
    async downloadFile(a, item){
      window.open(`http://206.189.176.12:3000/api/files/${item._id}/${a.name}`, '_blank')
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
