import { Plugins } from '@capacitor/core';
import axios from 'axios';
const { Storage } = Plugins;

async function getItem(key) {
    if (platform === 'android') {
        const { value } = await Storage.get({ key: key });
        return value;
    } else {
        return null
    }
};

const null_token = {
    status:406,
    message: "Token null"
}

export default {
    addFavourites(state, payload) {
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