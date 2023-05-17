<template>
    <div class="inspect-edit-page">
      <h2>Actualizar Fiscalización </h2>
      <AddEditInspect :dataProp="data" v-if="!loading"/>
      <v-progress-circular v-else
          indeterminate
          color="primary"
      ></v-progress-circular>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  import AddEditInspect from '@/components/AddEditInspect.vue'
  export default {
    name: 'InspectEditPage',
    layout: 'auth',
    components: {
      AddEditInspect
    },
    data(){
      return {
        data: {},
        loading: false,
      }
    },
    methods: {
      ...mapActions("inspect", ['getOneInspect']),
      async getOneInspectService(){
        try {
          this.loading = true
          let res = await this.getOneInspect(this.$route.params.id)
          if(res.success){
            res.data
            this.data = {
              ...res.data,
              firstname: res.data.idUser.firstname,
              lastname: res.data.idUser.lastname,
              codemployee: res.data.idUser.codemployee,
              docnumber: res.data.idUser.docnumber,
              user: res.data.idUser.user
            }
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      }
    },
    created(){
      this.getOneInspectService()
    }
  }
  </script>
  <style lang="scss">
  .inspect-edit-page{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  