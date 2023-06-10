const base = '/api'
export default {
    getGraphics: ($axios, data) => {
        return $axios.$get(`${base}/indicators/${data.year}-${data.month}`)
    }
}