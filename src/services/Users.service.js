const base = '/api'
export default {
    getUsers: ($axios) => {
        return $axios.$get(`${base}/users`)
    }
}