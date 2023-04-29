import UsersService from '@/services/Users.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getUsers({state, commit}){
        return await UsersService.getUsers(this.$axios)
    }
}