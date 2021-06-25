<template>
  <v-container class="mt-4">
    <v-row>
      <v-col cols="12">
        <statsCard
          :evolution="0"
          :value="TotalPrice"
          subtitle="Chiffre d'affaires transactionnel global en cours "
          color="primary"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import statsCard from '../components/statsCard.vue'

export default {
  name: 'Stats',
  components: {
    statsCard
    // eslint-disable-next-line vue/no-unused-components
    // apexchart: () => import('vue-apexcharts')
  },
  computed: {
    TotalPrice () {
      let TotalPrice = 0
      this.$store.getters['order/allOrder'].forEach((item) => {
        TotalPrice = TotalPrice + item.price
      })
      return TotalPrice
    }
  },
  mounted () {
    this.$store.dispatch('order/fetch', this.$auth.getToken('local'))
  }
}
</script>

<style scoped>

</style>
