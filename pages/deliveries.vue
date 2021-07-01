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
            Livraisons acceptées
          </v-card-title>
          <deliveries-table :item="deliveriesNotDone" />
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
            Livraisons finies
          </v-card-title>
          <deliveries-table :item="deliveriesDone" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import deliveriesTable from '../components/deliveriesTable.vue'

export default {
  name: 'Livraisons',
  components: {
    deliveriesTable
  },
  computed: {
    deliveriesDone () {
      return this.$store.getters['delivery/deliveries'].filter(object => object.status === true)
    },
    deliveriesNotDone () {
      return this.$store.getters['delivery/deliveries'].filter(object => object.done === false)
    }
  },
  mounted () {
    this.$store.dispatch('delivery/fetch', this.$auth.getToken('local'))
  }
}
</script>

<style scoped>

</style>
