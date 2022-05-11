export default {
    namespaced: true,
    state: {
        orders:[]
    },
    mutations: {
        addOrder(state, payload){
            state.orders.push(payload)
        }
    },
    actions: {
        makeOrder(state, payload) {
            return new Promise((resolve, reject) => {
                axios.post("orders/make-order", payload).then(response => {
                    resolve(response)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    },
    getters: {
        getOrders: state => state.orders,
    }
}