import { Plugins } from '@capacitor/core';
import axios from 'axios';

const { Storage } = Plugins;


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
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload.user
            state.isLogedIn = payload.isLogedIn
        },
    },
    actions: {
        loginAction(state, payload) {
            return new Promise((resolve, reject) => {

                axios_open.post('login', payload).then(response => {
                    setItem(response.data.token);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            });
        },
        getCreds(state, payload) {
            return new Promise((resolve, reject) => {
                axios.get("inspect").then(response => {
                    // console.log(response);
                    if (response.status === 200) {
                        state.commit("setUser", {user:response.data.client, isLogedIn:true})
                        resolve(response);
                    } else {
                        reject(response);
                    }
                }).catch(err => {
                    if (err.response) {
                        if (err.response.status === 401) {
                            state.commit("setUser", {user:null, isLogedIn:false})
                            reject(err);
                        }
                    }
                    reject(err);
                })
            });
        }
    },
    getters: {
        getUser: state => state.user,
        getUserStatus: state => state.isLogedIn
    }
}