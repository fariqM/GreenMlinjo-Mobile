export default {
    namespaced: true,
    state: {
        masjid:[],
        selectedPaketSedekah:null
    },
    mutations: {
        setSelectedSedekah(state, payload){
            state.selectedPaketSedekah = payload
        },
        addQty(state, payload){
            state.selectedPaketSedekah.qty = parseInt(payload)
        }
    },
    actions: {

    },
    getters: {
        getSelectedSedekah: state => state.selectedPaketSedekah
    }
}