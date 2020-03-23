<template>
  <main :class="{ searchIsOpen: searchIsOpen }">
    <section
      id="countrySearch"
      class="relative flex flex-row items-center justify-start px-8 py-3"
    >
      <input
        id="search"
        ref="search"
        v-model="searchInput"
        type="text"
        name="search"
        placeholder="Search countries"
        @input="searchCountries"
        @focus="$store.dispatch(`global/SET_SEARCH_IS_OPEN`, true)"
      />

      <button
        v-if="!searchIsOpen"
        id="searchButton"
        class="z-10 flex flex-row items-center justify-center px-4 py-3 bg-transparent outline-none"
        style="margin-right: -1rem;"
        @click="$refs.search.focus()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#718096"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="#718096"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <button
        v-if="searchIsOpen"
        id="closeButton"
        class="z-10 flex flex-row items-center justify-center px-4 py-3 bg-transparent outline-none"
        style="margin-right: -1rem;"
        @click="
          $store.dispatch(`global/SET_SEARCH_IS_OPEN`, false),
            $refs.search.blur()
        "
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#FC8181"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#FC8181"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div
        class="searchButtonToInput"
        :class="{ extended: searchActive }"
      ></div>
    </section>

    <section
      v-if="!searchResults.length"
      class="flex flex-col items-stretch justify-start px-3 countrySelect"
    >
      <div class="h-full">
        <div v-for="(country, index) in countries" :key="index">
          <button
            class="flex flex-row items-center justify-start w-full px-3 py-2 mb-1 font-sans text-base font-medium text-gray-700 bg-gray-100 border border-gray-200 border-solid rounded-lg"
            @click="
              setCountry(country.iso2),
                $event.target.blur(),
                $refs.search.blur(),
                $store.dispatch(`global/SET_SEARCH_IS_OPEN`, false)
            "
          >
            {{ country.countryRegion }}
          </button>
        </div>
      </div>
    </section>

    <section
      v-if="searchResults.length"
      class="flex flex-col items-stretch justify-start px-3 countrySelect"
    >
      <div class="h-full">
        <div v-for="(country, index) in searchResults" :key="index">
          <button
            class="flex flex-row items-center justify-start w-full px-3 py-2 mb-1 font-sans text-base font-medium text-gray-700 bg-gray-100 border border-gray-200 border-solid rounded-lg"
            @click="
              setCountry(country.iso2),
                $event.target.blur(),
                $refs.search.blur(),
                $store.dispatch(`global/SET_SEARCH_IS_OPEN`, false),
                (searchResults = []),
                (searchInput = null)
            "
          >
            {{ country.countryRegion }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: `CountrySelect`,

  data() {
    return {
      searchInput: null,
      searchActive: false,
      filteredCountries: null,
      searchResults: [],
    }
  },

  computed: {
    ...mapGetters({
      countries: `countries/countries`,
      countryName: `countries/countryName`,
      searchIsOpen: `global/searchIsOpen`,
    }),
  },

  methods: {
    setCountry(iso2) {
      this.$store.dispatch(`countries/SET_SELECTED_COUNTRY`, iso2)
      this.$store.dispatch(`local/SET_DATA`, iso2)
    },

    searchCountries() {
      this.$search(this.searchInput, this.countries, {
        keys: [`countryRegion`],
        tokenize: true,
      }).then((results) => {
        this.searchResults = results
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* eslint-disable */
main {
  position: fixed;
  bottom: 4rem;
  left: 50%;
  z-index: 100;
  width: calc(100% - 3rem);
  max-width: 24rem;
  margin: 0 auto;
  transform: translateX(-50%);
  transition: 350ms ease-in-out;
  box-shadow: 0 8px 40px -16px rgba(45, 55, 72, 0.2),
    0 40px 64px -16px rgba(45, 55, 72, 0.15);

  @apply bg-white border border-gray-200 border-solid rounded-lg;

  &.searchIsOpen {
    bottom: 1.5rem;
    transition: 350ms ease-in-out;

    .countrySelect {
      height: 18rem;
      transition: 350ms ease-in-out;
    }

    .searchButtonToInput {
      width: calc(100% - 6rem);
      right: 5rem;
      transition: 350ms ease-in-out;

      @apply bg-gray-100 shadow-outline;
    }
  }
}

#search {
  @apply font-sans text-2xl text-gray-700 leading-6 font-medium z-10 flex-grow w-full h-auto px-0 py-3 bg-transparent outline-none;

  &::placeholder {
    @apply font-sans text-2xl text-gray-400 leading-6 font-medium;
  }
}

#searchButton {
  opacity: 1;
  transition: 350ms ease-in-out;
}

.searchButtonToInput {
  position: absolute;
  top: 0;
  right: 1rem;
  bottom: 0;
  z-index: 1;
  width: calc(1.5rem + 2rem);
  margin: 0.75rem 0;
  transition: 350ms ease-in-out;

  @apply bg-gray-200 border border-solid border-gray-300 rounded-lg outline-none;
}

.countrySelect {
  height: 0rem;
  overflow-y: auto;
  transition: 350ms ease-in-out;

  @apply bg-transparent;
}
</style>
