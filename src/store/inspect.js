import InspectService from '@/services/Inspect.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getInspects({state, commit}){
        return await InspectService.getInspects(this.$axios)
    }
}