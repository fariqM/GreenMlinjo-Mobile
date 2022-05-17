export default {
    namespaced: true,
    state: {
        vouchers:[],
        selectedVoucher:[],
    },
    mutations: {
        setVoucher(state, payload){
            state.vouchers = payload
        },
        setSelectedVoucher(state, payload){
            state.selectedVoucher = payload
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
        getSelectedVoucher: state => state.selectedVoucher,
    }
}