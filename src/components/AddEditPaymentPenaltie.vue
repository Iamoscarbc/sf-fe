<template>
    <div class="d-flex flex-column">
        <v-form
          ref="payment-penaltieForm"
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
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="data.payer.firstname"
                :rules="rules.payerFirstname"
                label="Nombres del Pagador"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="data.payer.lastname"
                :rules="rules.payerLastname"
                label="Apellidos del Pagador"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="data.payer.docnumber"
                :rules="rules.payerDocnumber"
                label="Número de Documento del Pagador"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="data.payer.phone"
                :rules="rules.payerPhone"
                label="Celular del Pagador"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menuDatepicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="data.payer.birthdate"
                    :rules="rules.payerBirthdate"
                    label="Fecha de Nacimiento"
                    readonly
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="data.payer.birthdate"
                  @input="menuDatepicker = false"
                  :max="minimunAge"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                type="number"
                v-model="data.amount"
                :rules="rules.amount"
                label="Monto"
                hide-details="auto"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea
                v-model="data.paymentReason"
                :rules="rules.paymentReason"
                label="Motivo de Pago"
                hide-details="auto"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
        <DragAndDrop @changeFileList="changeFileList" v-if="!data._id"/>
        <div class="container-filename" v-else>
          <span class="filename" v-for="(f, i) in data.documents" :key="i">
            {{ !!f ? f.name : '' }}
            <button class="ml-auto" type="button" @click="downloadFile(i)" title="Download file" v-if="!!f">
                <v-icon>mdi-download</v-icon>
            </button>
          </span>
        </div>
        <v-btn
            class="mt-3"
            :loading="loading"
            :disabled="!validForm || loading"
            color="primary"
            elevation="10"
            x-large
            @click="createOrEditPaymentPenaltieService()"
        >
          {{ !data._id ? 'Registrar' : 'Actualizar' }} Fiscalización
        </v-btn>
    </div>
  </template>

  <script>
  import DragAndDrop from '@/components/DragAndDrop.vue';
  import { mapActions } from 'vuex'
  export default {
    name: 'AddEditPaymentPenaltie',
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
        menuDatepicker: false,
        minimunAge: null,
        data: {
            _id: '',
            date: '',
            paymentReason: '',
            amount: 0,
            payer: {
              firstname: '',
              lastname: '',
              docnumber: '',
              phone: '',
              birthdate: null
            },
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
          paymentReason: [
            v => !!v || 'Motivo es requerido',
          ],
          amount: [
            v => v > 0 || 'Monto es requerido',
          ],
          payerFirstname: [
            v => !!v || 'Nombres de Pagador son requeridos',
          ],
          payerLastname: [
            v => !!v || 'Apellidos de Pagador son requeridos',
          ],
          payerDocnumber: [
            v => !!v || 'Número de Documento de Pagador es requerido',
            v => v.toString().length == 8 || 'Número de Documento de Pagador debe tener 8 caracteres'
          ],
          payerPhone: [
            v => !!v || 'Celular de Pagador es requerido',
            v => v.toString().length == 9 || 'Celular de Pagador debe tener 9 caracteres'
          ],
          payerBirthdate: [
            v => !!v || 'Fecha de Nacimiento de Pagador es requerido',
          ]
        }
      }
    },
    methods:{
      ...mapActions("payment-penaltie", ['createPaymentsPenaltie', 'updatePaymentsPenaltie']),
      changeFileList(filelist){
        this.data.documents = filelist
      },
      async createOrEditPaymentPenaltieService(){
        if(!this.$route.params.id){
            await this.createPaymentPenaltieService()
        }else{
            await this.updatePaymentPenaltieService()
        }
      },
      async createPaymentPenaltieService(){
        try {
          this.loading = true
          let res = await this.createPaymentsPenaltie(this.data, this.data.documents)
          if(res.success){
            this.$router.back()
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      },
      async updatePaymentPenaltieService(){
        try {
          this.loading = true
          let res = await this.updatePaymentsPenaltie({
            paymentReason: this.data.paymentReason,
            _id: this.data._id
          })
          if(res.success){
            this.$router.back()
          }
        } catch (error) {
          console.log("error", error)
        } finally {
          this.loading = false
        }
      }
    },
    created(){
      this.minimunAge = this.$moment().subtract(18, 'y').toISOString()
      this.data.payer.birthdate = this.$moment().subtract(18, 'y').format('YYYY-MM-DD')
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

  .container-filename{
        width: 100%;
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        gap: 16px;
        margin: 16px 0px;
        .filename{
            display: flex;
            align-items: center;
            background: #cccccc;
            padding: 6px 12px;
            width: calc(100% - 82px);
            max-width: 23.5%;
            height: 100%;
            max-height: 48px;
            button{
                .v-icon:hover{
                    color: #1a4a84 ;
                }
            }
        }
        label{
            cursor: pointer;
            .icon-file{
                display: flex;
            }
        }
    }
  </style>
