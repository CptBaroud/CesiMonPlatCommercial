<template>
  <v-card
    rounded="xl"
    color="secondary"
    flat
  >
    <v-card-text>
      <v-list-item style="padding: 0">
        <v-list-item-action-text class="mr-2">
          <v-sheet color="primary" rounded="lg" width="64" height="64">
            <v-img v-if="item.avatar" :src="item.avatar" max-width="64" min-width="64" />
            <v-icon v-else size="64">
              mdi-clipboard-list
            </v-icon>
          </v-sheet>
        </v-list-item-action-text>
        <v-list-item-content style="padding-top: 0; padding-bottom: 0">
          <v-list-item-title
            class="text-h6 font-weight-bold d-inline-block text-truncate list-title-ticket mb-1"
          >
            {{ item.firstName }}
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-action-text class="text-h6 font-weight-bold">
          {{ item.email }}<span style="color: var(--v-primary-base)">€</span>
        </v-list-item-action-text>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    item: {
      type: Object,
      default () {
        return {
          firstName: '',
          lastName: '',
          email: '',
          avatar: ''
        }
      }
    }
  }
}

</script>
<style scoped></style>
