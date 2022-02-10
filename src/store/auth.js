import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


async function setItem(token) {
    await Storage.set({
        key: 'mlinjo_token',
        value: token
    });
};

// async function getItem(key) {
//     const { value } = await Storage.get({ key: key });
//     return value;
//     // console.log('Got item: ', value);
// };

async function getToken() {
    const { value } = await Storage.get({ key: 'mlinjo_token' });
    console.log('Got item: ', value);
    return value;
};

export default {
    namespaced: true,
    state: {
        user: { name: 'me' }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
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
                getToken().then(token => {
                    resolve(token);
                }).catch(e => {
                    reject(e);
                })
            });
        }
    },
    getters: {
        getUser: state => state.user,
    }
}