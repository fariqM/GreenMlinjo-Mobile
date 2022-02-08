export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
    },
    actions: {
        loginAction(state, payload) {

            return new Promise((resolve, reject) => {
                axios_api.post('login', payload).then(response => {
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })

            // console.log(payload);
        }
    },
    getters: {
        getUser: state => state.user,
    }
}