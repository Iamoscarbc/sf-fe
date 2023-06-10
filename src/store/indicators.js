import IndicatorsService from '@/services/Indicators.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getGraphics({state, commit}, data){
        return await IndicatorsService.getGraphics(this.$axios, data)
    }
}