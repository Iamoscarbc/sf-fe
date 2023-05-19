const base = '/api'
export default {
    createPaymentsPenaltie: ($axios, data, documents) => {
        var formData = new FormData();
        for (let i = 0; i < documents.length; i++) {
            const d = documents[i];
            formData.append("file", d)
        }
        formData.append("paymentReason", data.paymentReason)
        formData.append("date", data.date)
        formData.append("amount", data.amount)
        formData.append("payer", JSON.stringify(data.payer))
        return $axios.$post(`${base}/payment-penaltie`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    },
    getPaymentsPenalties: ($axios) => {
        return $axios.$get(`${base}/payment-penaltie`)
    },
    getOnePaymentsPenaltie: ($axios, data) => {
        return $axios.$get(`${base}/payment-penaltie/${data}`)
    },
    updatePaymentsPenaltie: ($axios, data) => {
        return $axios.$put(`${base}/payment-penaltie/${data._id}`, data)
    },
    deletePaymentsPenaltie: ($axios, data) => {
        return $axios.$delete(`${base}/payment-penaltie/${data._id}`)
    }
}
