import PaymentPenaltieService from '@/services/PaymentPenaltie.service.js'
export const state = () => ({

})

export const getters = {}

export const mutations = {}

export const actions = {
    async getPaymentsPenalties({state, commit}){
        return await PaymentPenaltieService.getPaymentsPenalties(this.$axios)
    },
    async createPaymentsPenaltie({state, commit}, data){
        return await PaymentPenaltieService.createPaymentsPenaltie(this.$axios, data, data.documents)
    },
    async getOnePaymentsPenaltie({state, commit}, data){
        return await PaymentPenaltieService.getOnePaymentsPenaltie(this.$axios, data)
    },
    async updatePaymentsPenaltie({state, commit}, data){
        return await PaymentPenaltieService.updatePaymentsPenaltie(this.$axios, data)
    },
    async deletePaymentsPenaltie({state, commit}, data){
        return await PaymentPenaltieService.deletePaymentsPenaltie(this.$axios, data)
    },
}
