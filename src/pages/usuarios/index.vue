<template>
  <div class="user-page">
    <div class="title-container">
      <h2>Usuarios</h2>
      <v-btn
        color="primary"
        to="/usuarios/agregar">
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
    loading-text="Obteniendo registros de usuarios"
  >
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom v-if="!loadingFileDownload">
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
                color="info"
                v-bind="attrs"
                v-on="on"
                @click="openModalUser(a)"
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
      search: '',
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
.user-page{
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
