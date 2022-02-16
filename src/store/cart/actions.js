import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

async function getItem(key) {
    const { value } = await Storage.get({ key: key });
    return value;
};

const null_token = {
    response: {
        status: 406,
        message: "Mobile token null"
    }
}

export default {
    addCarts(state, payload) {
        return new Promise((resolve, reject) => {
            getItem('mlinjo_token').then(token => {
                if (token === null) {
                    reject(null_token)
                } else {
                    axios.post("carts/add-carts", { product_id: payload }).then(response => {
                        if (response.status === 201) {
                            // add cart
                            state.commit("addCarts", response.data.data)
                            resolve(response)
                        } else {
                            // remove cart
                            state.commit("removeCarts", response.data.data)
                            resolve(response)
                        }
                    }).catch(e => {
                        reject(e)
                    })
                }
            })
        })
    },
    setCarts(state, payload) {
        return new Promise((resolve, reject) => {
            getItem('mlinjo_token').then(token => {
                if (token === null) {
                    reject(null_token)
                } else {
                    axios.get("carts/my-carts").then(response => {
                        state.commit("setCarts", response.data.data)
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
    },
    getCartsProduct(state, payload){
        return new Promise((resolve, reject) => {
            axios.get("carts/cart-products").then(response => {
                resolve(response)
            }).catch(e => {
                reject(e)
            })
        })
    }
}