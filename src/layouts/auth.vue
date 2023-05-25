<template>
    <v-app>
      <v-app-bar 
        app
        elevation="4"
        clipped-left
        color="primary"
        dark
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Control de Registro de Fiscalización</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        app
        clipped
        v-model="drawer"
        :fixed="false"
      >
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            color="primary"
            router
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn color="infoCustom" block @click="closeSession()">
              Cerrar Sesión
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
    </v-app>
</template>
  
<script>
import { mapActions } from 'vuex'
  export default {
    name: 'AuthLayout',
    middleware: ['auth'],
    data () {
      return {
        drawer: true,
        group: null
      }
    },
    computed: {
      items () {
        let items = [
          {
            icon: 'mdi-home',
            title: 'Inicio',
            to: '/'
          },
          {
            icon: 'mdi-file-document-arrow-right-outline',
            title: 'Fiscalizaciones',
            to: '/fiscalizaciones',
            role: 'view-inspects'
          },
          {
            icon: 'mdi-credit-card-outline',
            title: 'Pago de Penalidades',
            to: '/pago-de-penalidades',
            role: 'view-payment-penalties'
          },
          {
            icon: 'mdi-account',
            title: 'Usuarios',
            to: '/usuarios',
            role: 'view-users'
          }
        ]
        
        return items.filter(ele => {
          if(!ele.role){
            return true
          }

          if(!this.$auth.user){
            return false            
          }
          
          return this.$auth.user.idProfile.roles.includes(ele.role)
        })
      }
    },
    methods:{
      async closeSession(){
        await this.$auth.logout('local')
      }
    }
  }
</script>  