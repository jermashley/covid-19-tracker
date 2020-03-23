export const state = () => ({
  confirmed: 0,
  recovered: 0,
  deaths: 0,
  searchIsOpen: false,
  lastUpdated: null,
})

export const getters = {
  confirmed(state) {
    return state.confirmed
  },

  recovered(state) {
    return state.recovered
  },

  deaths(state) {
    return state.deaths
  },

  stats(state) {
    const { confirmed, recovered, deaths } = state
    const stats = [
      { value: confirmed, label: `confirmed` },
      { value: recovered, label: `recovered` },
      { value: deaths, label: `deaths` },
    ]
    return stats
  },

  searchIsOpen(state) {
    return state.searchIsOpen
  },

  lastUpdated(state) {
    return state.lastUpdated
  },
}

export const mutations = {
  SET_CONFIRMED(state, value) {
    state.confirmed = value
  },

  SET_RECOVERED(state, value) {
    state.recovered = value
  },

  SET_DEATHS(state, value) {
    state.deaths = value
  },

  SET_SEARCH_IS_OPEN(state, value) {
    state.searchIsOpen = value
  },

  SET_LAST_UPDATED(state, value) {
    state.searchIsOpen = value
  },
}

export const actions = {
  async SET_CONFIRMED({ commit }) {
    try {
      const { confirmed } = await this.$axios.$get(
        `https://covid19.mathdro.id/api`
      )
      commit(`SET_CONFIRMED`, confirmed.value)
    } catch (e) {
      console.log(e)
      commit(`SET_CONFIRMED`, 0)
    }
  },

  async SET_RECOVERED({ commit }) {
    try {
      const { recovered } = await this.$axios.$get(
        `https://covid19.mathdro.id/api`
      )
      commit(`SET_RECOVERED`, recovered.value)
    } catch (e) {
      console.log(e)
      commit(`SET_RECOVERED`, 0)
    }
  },

  async SET_DEATHS({ commit }) {
    try {
      const { deaths } = await this.$axios.$get(
        `https://covid19.mathdro.id/api`
      )
      commit(`SET_DEATHS`, deaths.value)
    } catch (e) {
      console.log(e)
      commit(`SET_DEATHS`, 0)
    }
  },

  SET_SEARCH_IS_OPEN({ commit }, value) {
    commit(`SET_SEARCH_IS_OPEN`, value)
  },

  async SET_LAST_UPDATED(state, value) {
    // const date =
  },
}
