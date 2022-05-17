export default {
    setCarts(state, payload) {
        state.Carts = payload
        state.CountCarts = state.Carts.length
    },
    addCarts(state, payload) {
        let exist = false;
        let cart = null;
        state.Carts.forEach(element => {
            if (payload.cartId == element.id) {
                exist = true
                cart = element
            }
        });
        console.log("existcards", exist);
        console.log("cart", cart);

        if (!exist) {
            state.CountCarts += 1
        }
    },
    removeCarts(state, payload) {
        let newArray = state.Carts;
        _.remove(newArray, function (obj) {
            return (obj.id == payload)
        })

        state.Carts = newArray;
        state.CountCarts = state.Carts.length
    }
}