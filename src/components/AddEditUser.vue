<template>
    <div class="d-flex flex-column">
        <v-form
        ref="userForm"
        v-model="validForm"
        >
            <v-row class="mb-3">
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="data.firstname"
                :rules="rules.firstname"
                label="Nombre"
                hide-details="auto"
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="data.lastname"
                :rules="rules.lastname"
                label="Apellido"
                hide-details="auto"
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="data.phone"
                :rules="rules.phone"
                label="Celular"
                hide-details="auto"
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                type="number"
                v-model="data.docnumber"
                :rules="rules.docnumber"
                label="Número de Documento"
                hide-details="auto"
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                type="number"
                v-model="data.codemployee"
                :rules="rules.codemployee"
                label="Código de Empleado"
                hide-details="auto"
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-select
                :items="listProfiles"
                v-model="data.idProfile"
                :rules="rules.idProfile"
                item-value="_id"
                item-text="name"
                label="Perfil"
                hide-details="auto"
                outlined
                ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="data.user"
                :rules="rules.user"
                label="Usuario"
                hide-details="auto"
                outlined
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="data.password"
                :rules="rules.password"
                label="Contraseña"
                hide-details="auto"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                outlined
                ></v-text-field>
            </v-col>
            </v-row>
        </v-form>
        <v-btn
            class="mt-3"
            :loading="loading"
            :disabled="!validForm || loading"
            color="primary"
            elevation="10"
            x-large
            @click="createorEditUserService()"
        >
          {{ !data._id ? 'Crear' : 'Editar' }} Usuario
        </v-btn>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  export default {
    name: 'UserAddPage',
    layout: 'auth',
    props: {
      dataProp: {
        type: Object,
        default: () => {}
      }
    },
    data(){
      return {
        validForm: false,
        data: {
          firstname: '',
          lastname: '',
          phone: '',
          docnumber: '',
          codemployee: '',
          user: '',
          password: '',
          idProfile: ''
        },
        rules: {
          firstname: [
            v => !!v || 'Nombres es requerido',
          ],
          lastname: [
            v => !!v || 'Apellidos es requerido',
          ],
          phone: [
            v => !!v || 'Celular es requerido',
            v => v.length == 9 || 'Debe tener 9 caracteres'
          ],
          docnumber: [
            v => !!v || 'Número de Documento es requerido',
            v => v.length == 8 || 'Debe tener 8 caracteres'
          ],
          codemployee: [
            v => !!v || 'Código de Empleado es requerido',
          ],
          user: [
            v => !!v || 'Usuario es requerido',
          ],
          password: [
            v => !!v || 'Contraseña es requerido',
            v => v.length >= 8 || 'Mínimo 8 caracteres'
          ],
          idProfile: [
            v => !!v || 'Perfil es requerido',
          ]
        },
        listProfiles: [],
        showPassword: false,
        loading: false
      }
    },
    methods: {
      ...mapActions("profiles", ['getProfiles']),
      ...mapActions("users", ['createUser', 'updateUser']),
      async getProfilesService() {
        try {
          let res = await this.getProfiles()
          if(res.success){
            this.listProfiles = res.data
          }
        } catch (error) {
          console.log("error", error)
        }
      },
      async createorEditUserService(){
        if(!this.$route.params.id){
            await this.createUserService()
        }else{
            await this.updateUserService()
        }
      },
      async createUserService(){
        try {
          this.loading = true
          let res = await this.createUser(this.data)
          if(res.success){
            this.$router.back()
            this.$swal.fire({
              title: 'Usuario Registrado',
              icon: 'success',
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      },
      async updateUserService(){
        try {
          this.loading = true
          let res = await this.updateUser(this.data)
          if(res.success){
            this.$router.back()
            this.$swal.fire({
              title: 'Usuario Actualizado',
              icon: 'success',
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      }
    },
    mounted(){
      this.getProfilesService()
    },
    created(){
      if(!!this.$route.params.id){
        this.data = this.dataProp
      }
    }
  }
  </script>
  <style lang="scss">
  .user-add-page{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  