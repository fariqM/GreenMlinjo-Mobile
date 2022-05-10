export default {
    namespaced: true,
    state: {
        vouchers:[],
    },
    mutations: {
        setVoucher(state, payload){
            state.vouchers = payload
        }
    },
    actions: {
        getVouchers(state){
            return new Promise((resolve, reject) => {
                axios.get('get-vouchers').then(r => {
                    state.commit("setVoucher", r.data.data)
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        }
    },
    getters: {
        getVouchers: state => state.vouchers,
    }
}