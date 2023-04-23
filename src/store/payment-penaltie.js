import PaymentPenaltieService from '@/services/PaymentPenaltie.service.js'
export const state = () => ({
    
})

export const getters = {}

export const mutations = {}

export const actions = {
    async getPaymentsPenalties({state, commit}){
        return await PaymentPenaltieService.getPaymentsPenalties(this.$axios)
    }
}