const base = '/api'
export default {
    addFile: ($axios, data) => {
        var formData = new FormData();
        console.log("data", data)
        formData.append("file", data);
        return $axios.$post(`${base}/addFile`, formData)
    },
    getInspects: ($axios) => {
        return $axios.$get(`${base}/inspects`)
    }
}