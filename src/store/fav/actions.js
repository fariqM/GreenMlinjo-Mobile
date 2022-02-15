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
    addFavourites(state, payload) {
        return new Promise((resolve, reject) => {
            getItem('mlinjo_token').then(token => {
                if (token === null) {
                    reject(null_token)
                } else {
                    axios.post("favourites/add-favourites", { product_id: payload }).then(response => {
                        if (response.status === 201) {
                            // add fav
                            state.commit("addFavourites", response.data.data)
                            resolve(response)
                        } else {
                            // remove fav
                            state.commit("removeFavourites", response.data.data)
                            resolve(response)
                        }
                        // console.log(response);
                        // state.commit("setFavourites", response.data.data)

                    }).catch(e => {
                        reject(e)
                    })
                }
            })
        })
        state.commit("addFavourites", payload);
    },
    setFavourites(state, payload) {
        return new Promise((resolve, reject) => {
            getItem('mlinjo_token').then(token => {
                if (token === null) {
                    reject(null_token)
                } else {
                    axios.get("favourites/my-favourites").then(response => {
                        state.commit("setFavourites", response.data.data)
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