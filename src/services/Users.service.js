const base = '/api'
export default {
    getUsers: ($axios) => {
        return $axios.$get(`${base}/users`)
    },
    createUser: ($axios, data) => {
        return $axios.$post(`${base}/user`, data)
    },
}