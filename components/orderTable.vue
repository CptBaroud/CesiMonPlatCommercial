<template>
  <v-card
    rounded="xl"
    flat
    class="mt-4"
    color="secondary"
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
        :page="page"
        :items-per-page="itemPerPages"
        hide-default-footer
        no-data-text="Aucune données disponibles"
        no-results-text="Aucune données ne correspond a votre recherche"
      >
        <template #[`item.status`]="{item}">
          <v-chip :color="statusColor(item.status)">
            {{ statusText(item.status) }}
          </v-chip>
        </template>
        <template #[`item.price`]="{item}">
          {{ item.price }} <span style="color: var(--v-primary-base)">€</span>
        </template>
        <template #[`item.created`]="{item}">
          {{ new Date(item.created).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }) }}
        </template>
        <template #[`item.items`]="{item}">
          <v-chip-group column>
            <v-chip v-for="(object, i) in item.items" :key="i">
              {{ object.name }} <span class="ml-1" style="color: var(--v-primary-base);"> x </span>{{ object.quantity }}
            </v-chip>
          </v-chip-group>
        </template>
        <template #footer>
          <v-pagination
            v-model="page"
            class="mt-2"
            :length="itemsLength"
            :total-visible="3"
            circle
          />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'OrderTable',
  search: '',
  props: {
    item: {
      type: Array,
      default () {
        return [{
          user: Number,
          created: Date,
          restaurant: [],
          accepted: Boolean,
          price: Intl,
          article: [],
          menu: []
        }]
      }
    }
  },
  data () {
    return {
      search: '',
      page: 1,
      itemPerPages: 10,
      data: [],
      headers: [
        {
          text: 'Utilisateur',
          align: 'start',
          filterable: false,
          value: 'user'
        },
        {
          text: 'Créer le',
          value: 'created'
        },
        {
          text: 'Restaurant',
          value: 'restaurant.name'
        },
        {
          text: 'Etat',
          value: 'status'
        },
        {
          text: 'Articles',
          value: 'items'
        },
        {
          text: 'Prix',
          value: 'price',
          width: 100
        }
      ]
    }
  },
  computed: {
    itemsLength () {
      return Math.ceil(this.item.length / this.itemPerPages)
    }
  },
  methods: {
    statusColor (item) {
      switch (item) {
        case 'pending':
          return 'warning'
        case 'accepted':
          return 'success'
        case 'declined':
          return 'error'
        default:
          return 'primary'
      }
    },

    statusText (item) {
      switch (item) {
        case 'pending':
          return 'En attente'
        case 'accepted':
          return 'Acceptée'
        case 'declined':
          return 'Refusée'
        default:
          return 'Indéfinis'
      }
    }
  }
}

</script>

<style scoped>
>>> .v-data-table {
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
