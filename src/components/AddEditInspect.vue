<template>
    <div class="d-flex flex-column">
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
                :value="data.docnumber"
                label="DNI"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                :value="data.codemployee"
                label="Código de Empleado"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :value="data.user"
                label="Usuario"
                disabled
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                :value="data.firstname + ' ' + data.lastname"
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
            class="mt-3"
            :loading="loading"
            :disabled="!validForm || loading"
            color="primary"
            elevation="10"
            x-large
            @click="createOrEditInspectService()"
        >
          {{ !data._id ? 'Registrar' : 'Actualizar' }} Fiscalización
        </v-btn>
    </div>
  </template>
  
  <script>
  import DragAndDrop from '@/components/DragAndDrop.vue';
  import { mapActions } from 'vuex'
  export default {
    name: 'AddEditInspect',
    layout: 'auth',
    components: { DragAndDrop },
    props: {
        dataProp: {
            type: Object,
            default: () => {}
        }
    },
    data(){
      return {
        validForm: false,
        loading: false,
        data: {
            _id: '',
            date: '',
            description: '',
            docnumber: '',
            codemployee: '',
            user: '',
            firstname: '',
            lastname: '',
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
      ...mapActions("inspect", ['createInspect', 'updateInspect']),
      changeFileList(filelist){
        this.data.documents = filelist
      },
      async createOrEditInspectService(){
        if(!this.$route.params.id){
            await this.createInspectService()
        }else{
            await this.updateInspectService()
        }
      },
      async createInspectService(){
        try {
          this.loading = true
          let res = await this.createInspect(this.data, this.data.documents)
          if(res.success){
            this.$router.back()
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      },
      async updateInspectService(){
        console.log("this.dataProp", this.dataProp)
        // try {
        //   this.loading = true
        //   let res = await this.updateInspect(this.data, this.data.documents)
        //   if(res.success){
        //     this.$router.back()
        //   }
        // } catch (error) {
        //   console.log("error", error)
        // } finally {
        //   this.loading = false
        // }
      }
    },
    mounted(){
      if(!this.$route.params.id){
          this.loading = true
          this.data.date = this.$moment().format('YYYY-MM-DD')
          this.data.docnumber = this.$auth.user.docnumber
          this.data.codemployee = this.$auth.user.codemployee
          this.data.user = this.$auth.user.user
          this.data.firstname = this.$auth.user.firstname
          this.data.lastname = this.$auth.user.lastname
          this.loading = false
      }else{
        this.data = this.dataProp
      }
    }
  }
  </script>
  <style lang="scss">
  </style>
  