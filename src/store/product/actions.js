import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

async function getItem(key) {
    if (platform === 'android') {
        const { value } = await Storage.get({ key: key });
        return value;
    } else {
        return null
    }
};

export default {
    setProductTerlaris(state, payload) {
        return new Promise((resolve, reject) => {
            getItem('mlinjo_token').then(token => {
                if (token === null) {
                    axios_open.get("products/promo-section").then(response => {
                        state.commit("setSectionProdukTerlaris", response.data.data)
                        // console.log(response);
                        resolve(response)
                    }).catch(e => {
                        reject(e)
                    })
                } else {
                    axios.get("products/promo-section").then(response => {
                        state.commit("setSectionProdukTerlaris", response.data.data)
                        // console.log(response);
                        resolve(response)
                    }).catch(e => {
                        reject(e)
                    })
                }
                // console.log(token);
            }).catch(error => {
                reject(error)
            })
        })
    }
}