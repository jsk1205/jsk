const state = {
    loading: false,
    userInfo: null,
}
const mutations = {
    SET_LOADING: (state, loading) => {
        state.loading = loading
    }
}
const actions = {
    setLoading({ commit }, loading) {
        commit('SET_LOADING', loading)
    }
}