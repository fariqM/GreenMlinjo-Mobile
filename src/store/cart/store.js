import State from './state'
import Actions from './actions'
import Mutations from './mutations'
import Getters from './getters'

export default{
    namespaced: true,
    state: State,
    mutations: Mutations,
    actions: Actions,
    getters: Getters
}