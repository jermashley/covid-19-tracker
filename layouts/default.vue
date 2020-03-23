<template>
  <div class="defaultTemplate">
    <nuxt />

    <div
      class="blur-dimmer"
      :class="{
        'dimmer-enabled': searchIsOpen,
        'pointer-events-none': !searchIsOpen,
      }"
      @click="$store.dispatch(`global/SET_SEARCH_IS_OPEN`, false)"
    ></div>

    <div class="bottom-gradient">
      <p class="text-xs font-medium text-center text-white">
        Made with
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="inline"
          style="margin: 0 0.175rem;"
        >
          <path
            d="M11.0663 1.27069C10.9711 1.16292 10.8691 1.06146 10.7608 0.966937C10.2435 0.514688 9.54264 0.199125 8.67583 0.1875H8.65745C8.6057 0.1875 8.55339 0.1905 8.50201 0.1935C7.96351 0.217875 6.40933 0.853125 6.02158 2.10731C5.63476 0.852938 4.0802 0.217312 3.54151 0.1935C3.49145 0.1905 3.43839 0.1875 3.38795 0.1875H3.36789C2.5022 0.198937 1.80133 0.514688 1.28476 0.966937C1.17678 1.06184 1.07471 1.16328 0.979139 1.27069C0.324014 2.01975 0.0123892 3.07987 0.416639 4.04662C0.465577 4.18331 0.521452 4.32469 0.585014 4.46869C1.53714 6.63637 4.12595 9.62194 5.40676 11.028C5.68164 11.3717 5.89201 11.6355 6.01745 11.7909V11.8084L6.01895 11.8069C6.01895 11.8097 6.02195 11.8112 6.02326 11.8127V11.8014L6.02439 11.7997L6.02589 11.8014V11.8127C6.02926 11.8112 6.03076 11.8095 6.03076 11.8069L6.03226 11.8084V11.7909C6.15751 11.6355 6.36883 11.3719 6.64295 11.028C7.9232 9.62194 10.5111 6.63637 11.4628 4.46869C11.5239 4.33006 11.58 4.18928 11.631 4.04662C12.0343 3.07894 11.7253 2.01881 11.0685 1.269"
            fill="#E03A4D"
          />
        </svg>
        and sanitized hands in
        <strong class="font-extrabold">Missouri</strong>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      searchIsOpen: `global/searchIsOpen`,
    }),
  },
}
</script>

<style>
*,
*::before,
*::after {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  @apply bg-gray-100 w-full min-h-screen h-full px-6 pt-8 pb-4 pb-56 overflow-x-hidden;
}

.blur-dimmer {
  content: 'a';
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 75;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  background-color: rgba(113, 128, 150, 0.5);
  backdrop-filter: blur(1rem);
  transition: 350ms ease-in-out;

  &.dimmer-enabled {
    opacity: 1;
    transition: 350ms ease-in-out;
  }
}

.bottom-gradient {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 25vh;
  margin: 0;
  padding: 0 1.5rem 1rem;

  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(160, 174, 192, 0.1) 25%,
    rgba(160, 174, 192, 1) 135%
  );
}
</style>
