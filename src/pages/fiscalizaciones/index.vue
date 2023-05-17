<template>
  <div class="inspect-page">
    <div class="title-container">
      <h2>Registro de Fiscalizaciones</h2>
      <v-btn
        color="primary"
        to="/fiscalizaciones/agregar">
        Registrar
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="list"
      :items-per-page="5"
      class="elevation-1"
      :loading="loading"
      loading-text="Obteniendo registros de fiscalizaciones"
    >
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom v-if="!loadingFileDownload">
          <template v-slot:activator="{ on, attrs }">
              <v-icon 
                  color="info"
                  v-bind="attrs"
                  v-on="on"
                  @click="$router.push('/fiscalizaciones/editar/'+item._id)"
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
              @click="deleteConfirm(item)"
              large
              >mdi-trash-can</v-icon>
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </template>
      <template v-slot:item.documents="{ item }">
        <div class="d-flex">
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
              <span>{{a.name}}</span>
            </v-tooltip>
            <v-progress-circular v-else
                indeterminate
                color="primary"
            ></v-progress-circular>
          </div>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'InspectPage',
  layout: 'auth',
  data(){
    return {
      loading: false,
      headers: [
          { text: '', value: 'actions' },
          { text: 'Fecha', value: 'date' },
          { text: 'Nombres', value: 'idUser.firstname' },
          { text: 'Apellidos', value: 'idUser.lastname' },
          { text: 'DNI', value: 'idUser.docnumber' },
          { text: 'Descripción', value: 'description' },
          { text: 'Documentos', value: 'documents' }
      ],
      list: [],
      loadingFileDownload: false
    }
  },
  methods: {
    ...mapActions("inspect", ['getInspects', 'deleteInspect']),
    async getInspectsService(){
      try {
        this.loading = true
        let res = await this.getInspects()
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
          await this.deleteInspectService(data)
        }
      })
    },
    async deleteInspectService(data){
      try {
        let res = await this.deleteInspect(data)
      } catch (error) {
        console.log("error", error)
      } finally {
        await this.getInspectsService()
      }
    },
    async downloadFile(a){
      console.log("a", a)
    }
  },
  mounted(){
    this.getInspectsService()
  }
}
</script>
<style lang="scss">
.inspect-page{
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
