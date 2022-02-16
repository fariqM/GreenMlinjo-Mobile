export default {
    setCarts(state, payload) {
        state.Carts = payload
        state.CountCarts = state.Carts.length
    },
    addCarts(state, payload) {
        state.Carts.push(payload)
        state.CountCarts = state.Carts.length

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