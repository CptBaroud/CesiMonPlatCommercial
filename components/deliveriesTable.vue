<template>
  <v-card
    rounded="xl"
    flat
    class="mt-4"
  >
    <v-card-title>
      <v-text-field
        v-model="search"
        rounded
        filled
        prepend-inner-icon="mdi-magnify"
        label="Recherche"
        single-line
        hide-details
      />
      <v-spacer />
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="item"
        :headers="headers"
        :search="search"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DeliveriesTable',
  search: '',
  props: {
    item: {
      type: Array,
      default () {
        return [{
          deliveryMan: Number,
          client: Number,
          status: Number,
          address: String,
          deliveryTime: Date,
          end: Date,
          done: Boolean,
          order: []
        }]
      }
    }
  },
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Livreur',
          align: 'start',
          filterable: false,
          value: 'deliveryMan'
        },
        {
          text: 'Client',
          value: 'client'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Restaurant',
          value: 'restaurant'
        },
        {
          text: 'Accepté',
          value: 'accepted'
        },
        {
          text: 'Adresse',
          value: 'address'
        },
        {
          text: 'Heure de livraison',
          value: 'deliveryTime'
        },
        {
          text: 'Terminé',
          value: 'done'
        }
      ]
    }
  }
}

</script>

<style scoped>
>>> .theme--dark .v-data-table {
  background-color: var(--v-secondary-base) !important;
}

>>> .theme--light .v-data-table {
  background: var(--v-secondary-base) !important;
}

>>> .v-data-table table {
  border-collapse: separate;
  border-radius: 25px;
  background: var(--v-secondary-base) !important;
  margin-top: -4px; /* correct offset on first border spacing if desired */
}

>>> .v-data-table table th {
  background: var(--v-background-base);
  border-style: none;
}

>>> .v-data-table table th:first-child {
  border-top-left-radius: 28px;
}

>>> .v-data-table table th:last-child {
  border-top-right-radius: 28px;
}

>>> .v-data-table tbody {
  border-radius: 28px;
}

>>> .v-data-table td {
  border-style: none;
}

>>> .v-data-table tr {
  background: var(--v-secondary-base);
}

>>> .v-data-table__wrapper tr {
  background: var(--v-secondary-base);
}

>>> .v-data-table tr:hover {
  background: var(--v-background-base);
}

>>> .v-data-table tbody:hover {
  background: var(--v-background-base);
  cursor: pointer;
}

>>> .v-data-table__wrapper tr:hover {
  background: var(--v-background-base);
}

>>> .v-data-table tr:first-child td:first-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 28px;
}

>>> .v-data-table tr:first-child td:last-child {
  border-bottom-right-radius: 28px;
  border-top-right-radius: 0;
}

>>> .v-data-table tr:last-child td:first-child {
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
}

>>> .v-data-table tr:last-child td:last-child {
  border-bottom-right-radius: 28px;
  border-top-right-radius: 28px;
}

>>> .v-data-table td:first-child {
  border-left-style: none;
  border-top-left-radius: 28px;
  border-bottom-left-radius: 28px;
}

>>> .v-data-table td:last-child {
  border-right-style: none;
  border-bottom-right-radius: 28px;
  border-top-right-radius: 28px;
}

>>> .theme--light.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child)
> td:not(.v-data-table__mobile-row), .theme--light.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child) >
th:not(.v-data-table__mobile-row) {
  border-bottom: none !important;
}

>>> .theme--dark.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child)
> td:not(.v-data-table__mobile-row), .theme--dark.v-data-table >
.v-data-table__wrapper > table > tbody > tr:not(:last-child) >
th:not(.v-data-table__mobile-row) {
  border-bottom: none !important;
}

>>> .theme--dark.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: none !important;
}

>>> .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  border-bottom: none !important;
}

>>> .theme--dark.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: var(--v-background-base) !important;
}

>>> .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: var(--v-background-base) !important;
}

>>> .v-data-table tbody tr.v-data-table__expanded__content {
  box-shadow: none;
}

</style>
