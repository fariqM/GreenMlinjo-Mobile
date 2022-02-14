import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

async function getItem(key) {
    const { value } = await Storage.get({ key: key });
    return value;
};

export default {
    setProductTerlaris(state, payload) {
        return new Promise((resolve, reject) => {
            getItem('mlinjo_token').then(token => {
                // console.log("my token => " + token);
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