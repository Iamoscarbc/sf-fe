<template>
  <div class="inspect-page">
    <h2>Registro de Fiscalizaciones</h2>
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
                  @click="openModalInspect(a)"
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
          { text: 'Nombres', value: 'firstname' },
          { text: 'Apellidos', value: 'lastname' },
          { text: 'DNI', value: 'docnumber' },
          { text: 'Descripción', value: 'description' },
          { text: 'Documentos', value: 'documents' }
      ],
      list: [],
      loadingFileDownload: false
    }
  },
  methods: {
    ...mapActions("inspect", ['getInspects']),
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
}
</style>
