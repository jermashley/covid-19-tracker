<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex flex-row items-center justify-between mb-12">
      <h1 class="text-3xl font-semibold leading-none text-gray-800">
        Virus Tracker
      </h1>

      <div
        class="p-2 font-mono text-sm font-black text-gray-700 uppercase bg-red-200 rounded-lg"
      >
        <span class="opacity-75">[covid_19]</span>
      </div>
    </div>

    <h2
      class="flex flex-row items-center justify-start text-4xl font-semibold leading-none text-gray-800"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="inline-block mr-3"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.66669 16C2.66669 8.63599 8.63602 2.66666 16 2.66666C23.364 2.66666 29.3334 8.63599 29.3334 16C29.3334 23.364 23.364 29.3333 16 29.3333C8.63602 29.3333 2.66669 23.364 2.66669 16ZM5.33335 16C5.33335 18.829 6.45716 21.5421 8.45755 23.5425C10.4579 25.5429 13.171 26.6667 16 26.6667C18.829 26.6667 21.5421 25.5429 23.5425 23.5425C25.5429 21.5421 26.6667 18.829 26.6667 16C26.6667 13.171 25.5429 10.4579 23.5425 8.45752C21.5421 6.45713 18.829 5.33332 16 5.33332C13.171 5.33332 10.4579 6.45713 8.45755 8.45752C6.45716 10.4579 5.33335 13.171 5.33335 16ZM11.0027 13.9307C11.3267 13.2533 11.86 11.3333 12.2454 11.3333C12.6294 11.3333 12.4894 12.2973 12.8334 12.3813C13.1227 12.452 12.9 11.9507 13.704 11.8613C14.508 11.772 15.384 12.264 15.384 12.264C15.384 12.264 16.3334 12.5 17.2094 12.264C17.2094 12.264 16.7467 11.5627 17.3134 11.3333C17.8787 11.104 18.6494 11.952 18.6774 12.5C18.7054 13.048 17.4187 13.416 17.4187 13.416L18.6774 14.172C18.6774 14.172 19.0467 13.0013 19.8334 12.9893C20.5334 12.976 21.4107 14.256 21 14.8333C20.5894 15.4107 20.3254 15.0133 20.3254 15.0133C20.3254 15.0133 19.072 16.2827 18.6774 16.5107C18.284 16.7373 17.7334 16.5107 17.7334 16.5107C17.7334 16.5107 17.5 16.9427 17.7334 17.1413C18.2067 17.6293 19.436 18.1147 19.436 18.1147C19.436 18.1147 23.216 18.7293 23.3334 19.5C23.4507 20.2707 20.3254 24.1667 19.8334 24.1667H18.6667C18.1907 23.3267 19.436 20.6413 19.436 20.6413C19.436 20.6413 18.796 19.932 18.6667 19.5C18.5387 19.068 18.9147 18.308 18.9147 18.308L17.2094 17.5227C17.2094 17.5227 16.3027 17.5227 15.8534 17.1667C15.404 16.8107 15.1667 14.8333 15.1667 14.8333L13.54 13.6413C13.54 13.6413 12.1267 15.436 11.6667 15.2067C11.2054 14.9773 10.68 14.6067 11.0027 13.9307ZM19.7627 11.1333C18.6374 11.1333 15.9294 9.70132 16.384 8.93332C16.384 7.83199 19.2307 7.99732 19.8414 7.99732C20.452 7.99732 21.948 8.46932 22.7787 9.13066C23.6094 9.79066 22.428 10.7347 22.016 11.1333C21.6027 11.5333 20.8894 11.1333 19.7627 11.1333Z"
          fill="#2D3748"
        />
      </svg>

      Global
    </h2>

    <StatGroup
      :stats="globalStats"
      style="margin: 0 -1.5rem; padding-left: 1.5rem; padding-right: 1.5rem;"
    />

    <div v-if="!selectedCountry" class="w-full mx-auto mt-20">
      <p class="text-3xl font-light leading-10 text-center text-gray-500">
        Search for your country to see the latest statistics.
      </p>
    </div>

    <div
      v-if="selectedCountry"
      class="flex flex-row items-center justify-start mt-8"
    >
      <img
        v-if="selectedFlag"
        :src="selectedFlag"
        :alt="`Flag of ${countryName(selectedCountry)}`"
        class="w-auto h-full mr-3 rounded-sm opacity-75"
        style="max-height: 1.5rem;"
      />
      <h2 class="text-2xl font-semibold leading-none text-gray-800">
        {{ countryName(selectedCountry) }}
      </h2>
    </div>

    <StatGroup
      v-if="selectedCountry"
      :stats="countryStats"
      style="margin: 0 -1.5rem; padding-left: 1.5rem; padding-right: 1.5rem;"
    />

    <CountrySelect />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PluginManager } from 'covid19-api'

export default {
  name: `Home`,

  components: {
    StatGroup: () => import(`../components/StatGroup`),
    CountrySelect: () => import(`../components/CountrySelect`),
  },

  data() {
    return {
      countrySelect: null,
    }
  },

  computed: {
    ...mapGetters({
      globalStats: `global/stats`,
      countries: `countries/countries`,
      selectedCountry: `countries/selectedCountry`,
      selectedFlag: `countries/selectedFlat`,
      countryName: `countries/countryName`,
      countryStats: `local/stats`,
    }),
  },

  methods: {
    setCountryAndStats() {
      this.$store.dispatch(`countries/SET_SELECTED_COUNTRY`, this.countrySelect)
      this.$store.dispatch(`local/SET_DATA`, this.countrySelect)
    },
  },
}
</script>

<style lang="scss" scoped></style>
