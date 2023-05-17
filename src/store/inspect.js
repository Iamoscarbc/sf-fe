import InspectService from '@/services/Inspect.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getInspects({state, commit}){
        return await InspectService.getInspects(this.$axios)
    },
    async createInspect({state, commit}, data){
        return await InspectService.createInspect(this.$axios, data, data.documents)
    },
    async getOneInspect({state, commit}, data){
        return await InspectService.getOneInspect(this.$axios, data)
    },
    async updateInspect({state, commit}, data){
        return await InspectService.updateInspect(this.$axios, data)
    },
    async deleteInspect({state, commit}, data){
        return await InspectService.deleteInspect(this.$axios, data)
    },
}