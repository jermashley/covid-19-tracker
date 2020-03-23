<template>
  <section
    class="flex flex-row items-stretch justify-start px-3 py-2 bg-gray-200 rounded-lg"
    style="width: max-content;"
  >
    <div
      :class="`mr-3 rounded block`"
      style="padding: 0.125rem;"
      :style="{ 'background-color': accentColor }"
    ></div>
    <div class="flex flex-col items-start justify-center">
      <span class="font-mono text-2xl font-semibold leading-none text-gray-800">
        {{ fomrattedValue }}
      </span>
      <h3
        class="mt-1 font-sans text-xs font-extrabold leading-none text-gray-600 uppercase "
      >
        {{ label }}
      </h3>
    </div>
  </section>
</template>

<script>
export default {
  name: `Stat`,

  props: {
    label: {
      type: String,
      default: `Label`,
    },

    value: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    fomrattedValue() {
      const formattedValue = this.value.toLocaleString(undefined)

      return formattedValue
    },

    accentColor() {
      if (this.label === `confirmed`) {
        return `#FBD38D`
      } else if (this.label === `recovered`) {
        return `#68D391`
      } else if (this.label === `deaths`) {
        return `#F56565`
      } else {
        return `#718096`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section {
}
</style>
