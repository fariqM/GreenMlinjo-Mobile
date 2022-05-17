export default {
    namespaced: true,
    state: {
        orders: [],
        lastOrder: null,
    },
    mutations: {
        addOrder(state, payload) {
            state.orders.push(payload)
        },
        setLastOrder(state, payload) {
            state.lastOrder = payload
        },
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
        },
        confirmOrder(state, payload) {
            return new Promise((resolve, reject) => {
                axios.put(`orders/confirm/${payload.orderId}`).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        getLastOrder(state, payload) {
            return new Promise((resolve, reject) => {
                axios.get(`orders/get-last-order/${payload}`).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    },
    getters: {
        getOrders: state => state.lastOrder,
    }
}