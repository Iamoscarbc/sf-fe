<template>
    <v-app>
      <Nuxt />
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'NotAuthLayout',
    middleware: 'not-auth',
    data () {
      return {
      }
    }
  }
  </script>
  