export default {
    setFavourites(state, payload) {
        state.Favourites = payload
        state.CountFavourites = state.Favourites.length
    },
    addFavourites(state, payload) {
        state.Favourites.push(payload)
        state.CountFavourites = state.Favourites.length

    },
    removeFavourites(state, payload) {
        let newArray = state.Favourites;
        // console.log(state.Favourites);
        // console.log(_.find(state.Favourites, function (obj) {
        //     return obj.id === payload
        // }));
        _.remove(newArray, function (obj) {
            return (obj.id == payload)
        })

        state.Favourites = newArray;
        state.CountFavourites = state.Favourites.length

        // console.log(state.Favourites.length);

    }
}