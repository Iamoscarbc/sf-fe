<template>
  <div class="payment-penaltie-add-page">
    <h2>Registrar Pago de Penalidades</h2>
    <AddEditPaymentPenaltie/>
  </div>
</template>

<script>
import AddEditPaymentPenaltie from '@/components/AddEditPaymentPenaltie.vue'
export default {
  name: 'PaymentPenaltieAddPage',
  layout: 'auth',
  components: {
    AddEditPaymentPenaltie
  }
}
</script>
<style lang="scss">
.payment-penaltie-add-page{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
