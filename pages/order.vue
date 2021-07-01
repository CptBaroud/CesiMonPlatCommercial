<template>
  <v-container class="mt-2">
    <v-row
      class="mb-6"
    >
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          color="background"
          max-height="500"
        >
          <v-card-title>
            Commandes acceptées
          </v-card-title>
          <order-table :item="orderDone" />
        </v-card>
      </v-col>
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          color="background"
          max-height="500"
        >
          <v-card-title>
            Commandes finies
          </v-card-title>
          <order-table :item="orderNotDone" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderTable from '../components/orderTable.vue'

export default {
  name: 'Commandes',
  components: {
    orderTable
  },
  computed: {
    orderDone () {
      return this.$store.getters['order/allOrder'].filter(object => object.status === 'accepted')
    },
    orderNotDone () {
      return this.$store.getters['order/allOrder'].filter(object => object.status !== 'accepted')
    }
  },
  mounted () {
    this.$store.dispatch('order/fetch', this.$auth.getToken('local'))
  }
}
</script>

<style scoped>

</style>
