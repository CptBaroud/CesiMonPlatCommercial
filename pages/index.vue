<template>
  <v-container>
    <v-row
      class="mb-6"
    >
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          max-height="500"
        >
          <order-table :item="orderAccepted" />
        </v-card>
      </v-col>
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          max-height="500"
        >
          <order-table :item="orderNotAccepted" />
        </v-card>
      </v-col>
    </v-row>
    <v-row
      class="mb-6"
    >
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          max-height="500"
        >
          <deliveriesTableau :item="deliveriesDone" />
        </v-card>
      </v-col>
      <v-col col="6">
        <v-card
          rounded="xl"
          flat
          class="mt-4"
          max-height="500"
        >
          <deliveriesTableau :item="deliveriesNotDone" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderTable from '../components/orderTable.vue'
import deliveriesTableau from '../components/deliveriesTable.vue'

export default {
  components: {
    deliveriesTableau,
    orderTable
  },
  computed: {
    orderAccepted () {
      return this.$store.getters['order/allOrder'].filter(object => object.status === 'accepted')
    },
    orderNotAccepted () {
      return this.$store.getters['order/allOrder'].filter(object => object.status !== 'accepted')
    },
    deliveriesDone () {
      return this.$store.getters['delivery/deliveries'].filter(object => object.status === true)
    },
    deliveriesNotDone () {
      return this.$store.getters['delivery/deliveries'].filter(object => object.done === false)
    }
  },
  mounted () {
    this.$store.dispatch('order/fetch', this.$auth.getToken('local'))

    this.$store.dispatch('delivery/fetch', this.$auth.getToken('local'))
  }
}
</script>
