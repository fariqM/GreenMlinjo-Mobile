export default {
    namespaced: true,
    state: {
        masjid: [],
        selectedPaketSedekah: null,
        paymentMethod: [
            {
                title: "Transfer Bank",
                type:1,
                subtitle: null,
                icon: "mdi-swap-horizontal",
                child: [
                    {
                        title: "Bank BCA",
                        icon: "/assets/images/bca.png",
                        subtitle:
                            "Menerima transfer dari semua Bank termasuk Bank Syariah",

                        steps: [
                            {
                                method: "ATM",
                                icon:"mdi-plus",
                                steps: [
                                    "Masukkan kartu ATM",
                                    "Pilih Menu <b>Bayar/Beli</b>",
                                    "Pilih Menu <b>Lainnya > MultiPayment</b>",
                                    "Masukkan kode <b>6278</b>",
                                    "Masukkan Nomor Virtual Account <span>62783243464</span>",
                                    "Periksa layar konfirmasi dan tekan <b>Ya</b>",
                                ],
                            },
                            {
                                method: "mBanking",
                                icon:"mdi-plus",
                                steps: [
                                    "Login ke mBanking",
                                    "Pilih Menu <b>Bayar</b>",
                                    "Pilih Menu <b>e-Commerce</b>",
                                    "Pilih Penyedia Layanan: <b>Green Mlijo</b>",
                                    "Masukkan Nomor Virtual Account <span>62783243464</span>",
                                    "Periksa layar konfirmasi dan tekan <b>Ya</b>",
                                ],
                            },
                        ],
                    },
                    {
                        title: "Bank Mandiri",
                        icon: "/assets/images/mandiri.png",
                        subtitle:
                            "Menerima transfer dari semua Bank termasuk Bank Syariah",

                        steps: [
                            {
                                method: "ATM",
                                icon:"mdi-plus",
                                steps: [
                                    "Masukkan kartu ATM",
                                    "Pilih Menu <b>Bayar/Beli</b>",
                                    "Pilih Menu <b>Lainnya > MultiPayment</b>",
                                    "Masukkan kode <b>6278</b>",
                                    "Masukkan Nomor Virtual Account <span>62783243464</span>",
                                    "Periksa layar konfirmasi dan tekan <b>Ya</b>",
                                ],
                            },
                            {
                                method: "mBanking",
                                icon:"mdi-plus",
                                steps: [
                                    "Login ke mBanking",
                                    "Pilih Menu <b>Bayar</b>",
                                    "Pilih Menu <b>e-Commerce</b>",
                                    "Pilih Penyedia Layanan: <b>Green Mlijo</b>",
                                    "Masukkan Nomor Virtual Account <span>62783243464</span>",
                                    "Periksa layar konfirmasi dan tekan <b>Ya</b>",
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: "Mlijo Pay",
                type:2,
                subtitle: "Rp43.000 - Bebas Biaya Penanganan",
                icon: "mdi-credit-card-outline",
            },
            {
                title: "COD (Bayar di Tempat)",
                type:3,
                subtitle: "Bayar Kontan Setelah Barang Sampai",
                icon: "mdi-cash-fast",
            },
        ],
        selectedPayment:null,
    },
    mutations: {
        setSelectedSedekah(state, payload) {
            state.selectedPaketSedekah = payload
        },
        addQty(state, payload) {
            state.selectedPaketSedekah.qty = parseInt(payload)
        },
        setSelectedPayment(state, payload){
            state.selectedPayment = payload
        }
    },
    actions: {

    },
    getters: {
        getSelectedSedekah: state => state.selectedPaketSedekah,
        getPaymentMethod: state => state.paymentMethod,
        getSelectedPayment: state => state.selectedPayment,
    }
}