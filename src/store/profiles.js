import ProfilesService from '@/services/Profiles.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getProfiles({state, commit}){
        return await ProfilesService.getProfiles(this.$axios)
    }
}