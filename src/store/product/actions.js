// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;
import { Storage } from '@capacitor/storage';

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
                        // console.log(e.response);
                        if (e.response) {
                            if (e.response.status === 401) {
                                axios_open.get("products/promo-section").then(response => {
                                    state.commit("setSectionProdukTerlaris", response.data.data)
                                    // console.log(response);
                                    resolve(response)
                                }).catch(err => {
                                    reject(err)
                                })
                            }
                        } else {
                            reject(e)
                        }

                    })
                }
                // console.log(token);
            }).catch(error => {
                reject(error)
            })
        })
    },
    setProductSedekah(state) {
        return new Promise((resolve, reject) => {
            axios.get('products/sedekah-product').then(r => {
                state.commit("setSedekahProduct", r.data.data)
                resolve(r)
            }).catch(e => {
                reject(e)
            })
        })
    }
}