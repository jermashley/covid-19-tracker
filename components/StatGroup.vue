<template>
  <div
    v-if="stats"
    class="flex flex-row items-center justify-start py-4 overflow-x-auto"
  >
    <Stat
      v-for="stat in stats"
      :key="stat.label + stat.value"
      :label="stat.label"
      :value="stat.value"
      class="mr-3"
    />
  </div>
</template>

<script>
export default {
  name: `StatGroup`,

  components: {
    Stat: () => import(`./Stat`),
  },

  props: {
    stats: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
