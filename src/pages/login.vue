<template>
    <div class="page-login">
      <div class="form-login">
        <div class="container-logo">
          <img src="@/assets/img/logo-MMl.png">
        </div>
        <v-form>
          <v-text-field
            label="Usuario"
            prepend-inner-icon="mdi-account"
            height="60"
            solo
          ></v-text-field>
          <v-text-field
            label="Contraseña"
            prepend-inner-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            height="60"
            solo
          ></v-text-field>
          <v-btn
            color="primary"
            elevation="10"
            x-large>
            Ingresar
          </v-btn>
        </v-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data(){
      return{
        showPassword: false
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
          margin-bottom: 20px;
          img{
            width: 100%;
            max-width: 230px;
            height: 100px;
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
  