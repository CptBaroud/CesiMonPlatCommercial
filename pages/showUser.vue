<template>
  <v-data-iterator
    :items="users"
    no-data-text="Aucun utilisateurs pour l'instant"
  >
    <template #default="{items}">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item._id"
          cols="4"
        >
          <UserTable
            :item="item"
          />
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import axios from 'axios'
import UserTable from '../components/userTable.vue'

export default {
  components: {
    UserTable
  },
  computed: {
    users: {
      get () {
        return this.$store.getters['user/users']
      }
    }
  },
  mounted () {
    this.$store.dispatch('user/fetch', this.$auth.getToken('local'))
  }
}

</script>
