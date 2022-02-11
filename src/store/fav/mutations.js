export default {
    setFavourites(state, payload){
        state.Favourites = payload
    },
    addFavourites(state, payload) {
       state.Favourites = [...state.Favourites, payload]
    },
}