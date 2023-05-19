<template>
    <div class="payment-penaltie-edit-page">
      <h2>Actualizar Pago de Penalidad </h2>
      <AddEditPaymentPenaltie :dataProp="data" v-if="!loading"/>
      <v-progress-circular v-else
          indeterminate
          color="primary"
      ></v-progress-circular>
    </div>
  </template>

  <script>
  import { mapActions } from 'vuex'
  import AddEditPaymentPenaltie from '@/components/AddEditPaymentPenaltie.vue'
  export default {
    name: 'InspectEditPage',
    layout: 'auth',
    components: {
      AddEditPaymentPenaltie
    },
    data(){
      return {
        data: {},
        loading: false,
      }
    },
    methods: {
      ...mapActions("payment-penaltie", ['getOnePaymentsPenaltie']),
      async getOnePaymentsPenaltieService(){
        try {
          this.loading = true
          let res = await this.getOnePaymentsPenaltie(this.$route.params.id)
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
      this.getOnePaymentsPenaltieService()
    }
  }
  </script>
  <style lang="scss">
  .payment-penaltie-edit-page{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
