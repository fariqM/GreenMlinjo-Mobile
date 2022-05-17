export default {
    namespaced: true,
    state: {
        lasTransaction: null,
    },
    mutations: {
        setLastTransaction(state, payload) {
            state.lasTransaction = payload
        }
    },
    actions: {
        createTransaction(state, payload) {
            return new Promise((resolve, reject) => {
                axios.post("transaction/make", payload).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    },
    getters: {
        getLasTransaction: state => state.lasTransaction,
    }
}