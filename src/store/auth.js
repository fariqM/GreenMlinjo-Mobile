// import { Plugins } from '@capacitor/core';
// import axios from 'axios';
import { Storage } from '@capacitor/storage';
// const { Storage } = Plugins;


async function setItem(token) {
    await Storage.set({
        key: 'mlinjo_token',
        value: token
    });
};

async function getItem(key) {
    const { value } = await Storage.get({ key: key });
    return value;
};

async function getToken() {
    const { value } = await Storage.get({ key: 'mlinjo_token' });
    // console.log('Got item: ', value);
    return value;
};

export default {
    namespaced: true,
    state: {
        user: {},
        isLogedIn: false,
        address: [],
        choosenAddress: null,
        balance:null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.user
            state.isLogedIn = payload.isLogedIn
        },
        setAddress(state, payload) {
            state.address = payload
        },
        setChoosenAddress(state, payload) {
            state.choosenAddress = payload
        },
        setBalance(state, payload){
            state.balance = payload
        }
    },
    actions: {
        loginAction(state, payload) {
            return new Promise((resolve, reject) => {
                axios_open.post('login', payload).then(response => {
                    state.commit("setUser", { user: response.data.user, isLogedIn: true })
                    setItem(response.data.token).then(setComplete => {
                        state.dispatch("getBalance")
                        resolve(response);
                    }).catch(e => {
                        reject(e);
                    })
                }).catch(error => {
                    reject(error);
                })
            });
        },
        logoutAction(state) {
            return new Promise((resolve, reject) => {
                axios.post('logout').then(r => {
                    state.commit("setUser", {
                        user: {},
                        isLogedIn: false,
                    })
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        getCreds(state, payload) {
            return new Promise((resolve, reject) => {
                axios.get("inspect").then(response => {
                    // console.log(response);
                    if (response.status === 200) {
                        state.commit("setUser", { user: response.data.client, isLogedIn: true })
                        state.dispatch("getBalance")
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch(err => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            state.commit("setUser", { user: null, isLogedIn: false })
                            reject(err);
                        }
                    }
                    reject(err);
                })
            });
        },
        getBalance(state){
            return new Promise((resolve, reject) => {
                axios.get("blc/get-balance").then(r => {
                    console.log("get balance");
                    state.commit("setBalance", r.data.balance.balance)
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        makeTopup(state, payload){
            return new Promise((resolve, reject) => {
                axios.post("blc/topup", payload).then(r => {
                    resolve(r)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        getAddress(state) {
            return new Promise((resolve, reject) => {
                axios.get('get-my-address').then(response => {
                    state.commit("setAddress", response.data.data)
                    resolve(response)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        addAddress(state, payload) {
            return new Promise((resolve, reject) => {
                axios.post('create-new-address', payload).then(response => {
                    resolve(response)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        chooseAddress(state, payload) {
            return new Promise((resolve, reject) => {
                axios.put(`choose-address/${payload}`).then(response => {
                    resolve(response)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        getChoosenAddress(state) {
            return new Promise((resolve, reject) => {
                axios.get('get-choosen-address').then(response => {
                    state.commit("setChoosenAddress", response.data.data)
                    resolve(response)
                }).catch(e => {
                    if (e.response) {
                        if (e.response.status === 404) {
                            state.commit("setChoosenAddress", null)
                        }
                    }
                    reject(e)
                })
            })
        }
    },
    getters: {
        getUser: state => state.user,
        getUserStatus: state => state.isLogedIn,
        getAddress: state => state.address,
        getChoosenAddress: state => state.choosenAddress,
        getBalance: state => state.balance
    }
}