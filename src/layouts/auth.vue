<template>
    <v-app>
      <Nuxt />
    </v-app>
</template>
  
<script>
  export default {
    name: 'AuthLayout',
    middleware: ['auth'],
    data () {
      return {
        
      }
    }
  }
</script>  