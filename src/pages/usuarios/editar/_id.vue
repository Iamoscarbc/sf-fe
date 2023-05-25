<template>
  <div class="user-add-page">
    <h2>Edición de Usuario</h2>
    <AddEditUser :dataProp="data" v-if="!loading"/>
      <v-progress-circular v-else
          indeterminate
          color="primary"
      ></v-progress-circular>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AddEditUser from '@/components/AddEditUser.vue'
export default {
  name: 'UserAddPage',
  layout: 'auth',
  components: {
    AddEditUser
  },
  data(){
    return {
      data: {},
      loading: false,
    }
  },
  methods: {
    ...mapActions("users", ['getOneUser']),
    async getOneUserService(){
      try {
        this.loading = true
        let res = await this.getOneUser(this.$route.params.id)
        if(res.success){
          this.data = res.data
        }
      } catch (error) {
        console.log("error", error)
      } finally {
        this.loading = false
      }
    }
  },
  created(){
    this.getOneUserService()
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
