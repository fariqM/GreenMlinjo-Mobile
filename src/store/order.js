export default {
    namespaced: true,
    state: {

    },
    mutations: {

    },
    actions: {
        makeOrder(state, payload) {
            return new Promise((resolve, reject) => {
                axios.post("orders/make-order", {products:payload}).then(response => {
                    resolve(response)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    },
    getters: {

    }
}