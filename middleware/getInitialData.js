export default function({ store }) {
  store.dispatch(`global/SET_CONFIRMED`)
  store.dispatch(`global/SET_RECOVERED`)
  store.dispatch(`global/SET_DEATHS`)
  store.dispatch(`countries/SET_COUNTRIES`)
  // store.dispatch(`countries/SORT_COUNTRIES`)
}
