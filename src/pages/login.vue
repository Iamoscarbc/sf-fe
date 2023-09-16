<template>
    <div class="page-login">
      <div class="form-login">
        <div class="container-logo">
          <img src="@/assets/img/logo-MML.png">
          <span>Control de Registro de Fiscalizaciones</span>
        </div>
        <v-form
          ref="loginForm"
          v-model="validForm">
          <v-text-field
            v-model="data.user"
            :rules="rules.user"
            label="Usuario"
            prepend-inner-icon="mdi-account"
            height="60"
            solo
          ></v-text-field>
          <v-text-field
            v-model="data.password"
            :rules="rules.password"
            label="Contraseña"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            height="60"
            solo
          ></v-text-field>
          <v-btn
            :loading="loading"
            :disabled="!validForm || loading"
            color="primary"
            elevation="10"
            x-large
            @click="login()">
            Ingresar
          </v-btn>
        </v-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    layout: 'not-auth',
    data(){
      return{
        showPassword: false,
        validForm: false,
        loading: false,
        data: {
          user: null,
          password: null
        },
        rules: {
          user: [
            v => !!v || 'Usuario es requerido',
          ],
          password: [
            v => !!v || 'Contraseña es requerido',
          ]
        }
      }
    },
    methods: {
      async login(){
        this.loading = true
        try {
          await this.$auth.loginWith('local', { data: this.data })
        } catch (error) {
          this.$swal.fire({
            title: error.data.message,
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: false
          })
        }
        this.loading = false
      }
    }
  }
  </script>
  <style lang="scss">
    .page-login{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      height: auto;
      &::before{
        content: " ";
        position: absolute;
        top: 0;
        width: 100vw;
        height: 0;
        min-height: 100%;
        filter: grayscale(100%);
        background-position: center;
        background-repeat: repeat;
        background-size: contain;
        background-image: url(@/assets/img/login-MML.jpg);
        background-attachment: scroll;
      }
      &::after{
        content: " ";
        position: absolute;
        top: 0;
        width: 100vw;
        height: 0;
        min-height: 100%;
        background-color: rgba(26,74,132,0.8);
      }
      .form-login{
        z-index: 1;
        max-width: 440px;
        width: 100%;
        max-height: 470px;
        height: 100%;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 36px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .container-logo{
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          img{
            width: 100%;
            max-width: 230px;
            height: 100px;
          }
          span{
            color: #1a4a84;
            font-weight: 800;
          }
        }
        .v-form{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .v-input{
            width: 100%;
          }
          .v-btn{
            margin-top: 20px;
            width: 100%;
          }
        }
      }
    }
  </style>
  