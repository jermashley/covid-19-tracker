export const state = () => ({
  countries: null,
  selectedCountry: null,
  selectedFlag: null,
  countriesWithStates: null,
  countryHasStates: false,
  countryStates: null,
})

export const getters = {
  countries: (state) => {
    return state.countries
  },

  selectedCountry: (state) => {
    return state.selectedCountry
  },

  selectedFlat: (state) => {
    return state.selectedFlag
  },

  countryName: (state) => (iso2) => {
    if (iso2) {
      const country = state.countries.find((country) => country.iso2 === iso2)
      return country.countryRegion
    } else {
      return null
    }
  },
}

export const mutations = {
  SET_COUNTRIES(state, value) {
    state.countries = value
  },

  SET_COUNTRIES_WITH_STATES_LIST(state, value) {
    state.countriesWithStates = value
  },

  SORT_COUNTRIES(state) {
    const sortedCountries = state.countries.sort((a, b) => {
      return a.countryRegion
        .toLowerCase()
        .localeCompare(b.countryRegion.toLowerCase())
    })

    state.countries = sortedCountries
  },

  SET_SELECTED_COUNTRY(state, value) {
    state.selectedCountry = value
  },

  SET_SELECTED_FLAG(state, value) {
    state.selectedFlag = value.flag
  },

  SET_COUNTRY_HAS_STATES(state, value) {
    state.countryHasStates = value
  },
}

export const actions = {
  async SET_COUNTRIES({ commit, dispatch }) {
    try {
      const data = await this.$axios.$get(
        `https://covid19.mathdro.id/api/confirmed`
      )

      let countriesWithoutStates = data.filter(
        (dataBlock) => dataBlock.provinceState === null
      )

      countriesWithoutStates = countriesWithoutStates.reduce((a, b) => {
        if (b.iso2) {
          a.push({
            countryRegion: b.countryRegion,
            iso2: b.iso2,
            iso3: b.iso3,
            states: false,
          })
        } else if (b.countryRegion === `Korea, South`) {
          a.push({
            countryRegion: `Korea, Republic of`,
            iso2: `KR`,
            iso3: `KOR`,
            states: false,
          })
        }

        return a
      }, [])

      const countriesWithStates = data.filter((dataBlock) => {
        return (
          dataBlock.provinceState !== null &&
          dataBlock.iso2 &&
          dataBlock.provinceState !== `US`
        )
      })

      let countriesWithStatesList = countriesWithStates.reduce(
        (a, b, index) => {
          a[index] = b.iso2
          return a
        },
        []
      )

      countriesWithStatesList = countriesWithStatesList
        .filter(
          (value, index) => countriesWithStatesList.indexOf(value) === index
        )
        .sort()

      const rebuiltCountriesWithStates = countriesWithStatesList.map((iso2) => {
        const countryData = countriesWithStates.find(
          (item) => item.iso2 === iso2
        )

        let states = countriesWithStates.reduce((a, b, index) => {
          if (b.iso2 === iso2) {
            a[index] = {
              countryRegion: b.countryRegion,
              provinceState: b.provinceState,
            }
          }

          return a
        }, [])

        states = states.filter((val) => val)

        const country = {
          countryRegion:
            countryData.countryRegion === `US`
              ? `United States`
              : countryData.countryRegion,
          iso2: countryData.iso2,
          iso3: countryData.iso3,
          states,
        }

        return country
      })

      const countries = rebuiltCountriesWithStates.concat(
        countriesWithoutStates
      )

      commit(`SET_COUNTRIES`, countries)
      commit(`SET_COUNTRIES_WITH_STATES_LIST`, countriesWithStatesList)

      setTimeout(() => {
        dispatch(`SORT_COUNTRIES`)
      }, 750)
    } catch (e) {
      console.log(`SET_COUNTRIES: ${e}`)
      commit(`SET_COUNTRIES`, null)
    }
  },

  SORT_COUNTRIES({ commit }) {
    commit(`SORT_COUNTRIES`)
  },

  SET_SELECTED_COUNTRY({ commit, dispatch, state }, payload) {
    dispatch(`SET_SELECTED_FLAG`, payload)
    commit(`SET_SELECTED_COUNTRY`, payload)
  },

  async SET_SELECTED_FLAG({ commit }, payload) {
    const flagUrl = await this.$axios.$get(
      `https://restcountries.eu/rest/v2/alpha/${payload}?fields=flag`
    )

    commit(`SET_SELECTED_FLAG`, flagUrl)
  },
}
