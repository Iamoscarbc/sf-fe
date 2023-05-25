const base = '/api'
export default {
    getUsers: ($axios) => {
        return $axios.$get(`${base}/users`)
    },
    createUser: ($axios, data) => {
        return $axios.$post(`${base}/user`, data)
    },
    updateUser: ($axios, data) => {
        return $axios.$put(`${base}/user/${data._id}`, data)
    },
    getOneUser: ($axios, data) => {
        return $axios.$get(`${base}/user/${data}`)
    },
    deleteUser: ($axios, data) => {
        return $axios.$delete(`${base}/user/${data._id}`)
    }
}