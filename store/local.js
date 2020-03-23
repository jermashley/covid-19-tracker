export const state = () => ({
  confirmed: 0,
  recovered: 0,
  deaths: 0,
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
}

export const actions = {
  async SET_CONFIRMED({ commit }, iso2) {
    try {
      const { confirmed } = await this.$axios.$get(
        `https://covid19.mathdro.id/api/countries/${iso2}`
      )
      commit(`SET_CONFIRMED`, confirmed.value)
    } catch (e) {
      console.log(e)
      commit(`SET_CONFIRMED`, 0)
    }
  },

  async SET_RECOVERED({ commit }, iso2) {
    try {
      const { recovered } = await this.$axios.$get(
        `https://covid19.mathdro.id/api/countries/${iso2}`
      )
      commit(`SET_RECOVERED`, recovered.value)
    } catch (e) {
      console.log(e)
      commit(`SET_RECOVERED`, 0)
    }
  },

  async SET_DEATHS({ commit }, iso2) {
    try {
      const { deaths } = await this.$axios.$get(
        `https://covid19.mathdro.id/api/countries/${iso2}`
      )
      commit(`SET_DEATHS`, deaths.value)
    } catch (e) {
      console.log(e)
      commit(`SET_DEATHS`, 0)
    }
  },

  SET_DATA({ dispatch }, iso2) {
    dispatch(`SET_CONFIRMED`, iso2)
    dispatch(`SET_RECOVERED`, iso2)
    dispatch(`SET_DEATHS`, iso2)
  },
}
