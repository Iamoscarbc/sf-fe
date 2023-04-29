<template>
  <div class="payment-penalites-page">
    <h2>Usuarios</h2>
    <v-data-table
    :headers="headers"
    :items="list"
    :items-per-page="5"
    class="elevation-1"
    :loading="loading"
    loading-text="Obteniendo registros de usuarios"
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
  </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserPage',
  layout: 'auth',
  data(){
    return {
      loading: false,
      headers: [
          { text: '', value: 'actions' },
          { text: 'Usuario', value: 'user' },
          { text: 'Nombres', value: 'firstname' },
          { text: 'Apellidos', value: 'lastname' },
          { text: 'DNI', value: 'docnumber' },
          { text: 'Celular', value: 'phone' },
          { text: 'Cod. Empleado', value: 'codemployee' },
          { text: 'Perfil', value: 'idProfile.name' }
      ],
      list: [],
      loadingFileDownload: false
    }
  },
  methods: {
    ...mapActions("users", ['getUsers']),
    async getUsersService(){
      try {
        this.loading = true
        let res = await this.getUsers()
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
    this.getUsersService()
  }
}
</script>
<style lang="scss">
.payment-penalites-page{
display: flex;
flex-direction: column;
gap: 20px;
}
</style>
