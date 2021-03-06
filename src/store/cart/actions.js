// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;
import { Storage } from '@capacitor/storage';

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
    removeCarts(state, payload) {
        return new Promise((resolve, reject) => {
            axios.delete("carts/remove-carts", { data: { selected: payload } }).then(response => {
                resolve(response)
            }).catch(e => {
                reject(e)
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
                        // console.log(response);
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
    getCartsProduct(state, payload) {
        return new Promise((resolve, reject) => {
            axios.get("carts/cart-products").then(response => {
                resolve(response)
            }).catch(e => {
                reject(e)
            })
        })
    },
    adjustQty(state, payload){
        return new Promise((resolve, reject) => {
            axios.post(`carts/adjust-qty/${payload.cart_id}`, {type:payload.type, }).then(response => {
                resolve(response)
            }).catch(e => {
                reject(e)
            })
        })
    }
}