const base = '/api'
export default {
    getProfiles: ($axios) => {
        return $axios.$get(`${base}/profiles`)
    }
}