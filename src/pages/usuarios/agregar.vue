<template>
  <div class="user-add-page">
    <h2>Registro de Usuario</h2>
    <AddEditUser/>
  </div>
</template>

<script>
import AddEditUser from '@/components/AddEditUser.vue'
export default {
  name: 'UserAddPage',
  layout: 'auth',
  components: {
    AddEditUser
  }
}
</script>
<style lang="scss">
.user-add-page{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
