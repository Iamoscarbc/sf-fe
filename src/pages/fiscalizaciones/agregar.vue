<template>
    <div class="inspect-add-page">
      <h2>Registro de Fiscalizaciones</h2>
        <v-form
          ref="inspectForm"
          v-model="validForm">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="data.date"
                :rules="rules.date"
                label="Fecha"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :value="$auth.user.docnumber"
                label="DNI"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :value="$auth.user.codemployee"
                label="Código de Empleado"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :value="$auth.user.user"
                label="Usuario"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :value="$auth.user.firstname + ' ' + $auth.user.lastname"
                label="Nombres"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="data.description"
                :rules="rules.description"
                label="Descripción"
                hide-details="auto"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <DragAndDrop @changeFileList="changeFileList"/>
        <v-btn
          :loading="loading"
          :disabled="!validForm || loading"
          color="primary"
          elevation="10"
          x-large
          @click="createInspectService()"
        >
          Registrar Fiscalización
        </v-btn>
    </div>
  </template>
  
  <script>
  import DragAndDrop from '@/components/DragAndDrop.vue';
  import { mapActions } from 'vuex'
  export default {
    name: 'InspectAddPage',
    layout: 'auth',
    components: { DragAndDrop },
    data(){
      return {
        validForm: false,
        loading: false,
        data: {
          date: '',
          description: '',
          documents: []
        },
        rules: {
          date: [
            v => !!v || 'Fecha es requerido',
          ],
          description: [
            v => !!v || 'Descripción es requerido',
          ],
        }
      }
    },
    methods:{
      ...mapActions("inspect", ['createInspect']),
      changeFileList(filelist){
        this.data.documents = filelist
      },
      async createInspectService(){
        try {
          this.loading = true
          let res = await this.createInspect(this.data, this.data.documents)
          if(res.success){
            // this.$router.back()
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      }
    },
    created(){
      this.loading = true
      this.data.date = this.$moment().format('YYYY-MM-DD')
      this.loading = false
    }
  }
  </script>
  <style lang="scss">
  .inspect-add-page{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  