<template>
    <div class="inspect-add-page">
      <h2>Registrar Fiscalización</h2>
      <AddEditInspect/>
    </div>
  </template>
  
  <script>
  import AddEditInspect from '@/components/AddEditInspect.vue'
  export default {
    name: 'InspectAddPage',
    layout: 'auth',
    components: {
      AddEditInspect
    }
  }
  </script>
  <style lang="scss">
  .inspect-add-page{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  </style>
  