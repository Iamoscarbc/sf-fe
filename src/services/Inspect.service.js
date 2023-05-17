const base = '/api'
export default {
    createInspect: ($axios, data, documents) => {
        var formData = new FormData();
        for (let i = 0; i < documents.length; i++) {
            const d = documents[i];
            formData.append("file", d)            
        }
        formData.append("description", data.description)
        formData.append("date", data.date)
        return $axios.$post(`${base}/inspects`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
    },
    getInspects: ($axios) => {
        return $axios.$get(`${base}/inspects`)
    }
}