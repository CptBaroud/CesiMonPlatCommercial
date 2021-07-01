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
        >
          <v-card-title>
            Toutes les commandes
            <v-spacer />
            <v-btn
              icon
              color="primary"
              nuxt
              to="/order"
            >
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-title>
          <order-table :item="order" />
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
            Toutes les livraisons
            <v-spacer />
            <v-btn
              icon
              color="primary"
              nuxt
              to="/order"
            >
              <v-icon>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </v-card-title>
          <deliveriesTable :item="deliveries" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderTable from '../components/orderTable.vue'
import deliveriesTable from '../components/deliveriesTable'

export default {
  components: {
    orderTable,
    deliveriesTable
  },
  computed: {
    order: {
      get () {
        return this.$store.getters['order/allOrder']
      }
    },

    deliveries: {
      get () {
        return this.$store.getters['delivery/deliveries']
      }
    }
  },
  mounted () {
    this.$store.dispatch('order/fetch', this.$auth.getToken('local'))

    this.$store.dispatch('delivery/fetch', this.$auth.getToken('local'))
  }
}
</script>
