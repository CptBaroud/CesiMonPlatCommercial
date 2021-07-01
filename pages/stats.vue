<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="2">
        <statsCard
          :evolution="0"
          icon="mdi-chart-arc"
          :value="TotalPrice"
          :price="true"
          subtitle="Chiffre d'affaires transactionnel global en cours "
          color="primary"
        />
        <statsCard
          :evolution="0"
          :value="order.length"
          icon="mdi-chart-arc"
          :price="false"
          subtitle="Commandes"
          color="accent"
        />
        <statsCard
          :evolution="0"
          icon="mdi-chart-arc"
          :value="deliveries.length"
          subtitle="Livraisons"
          :price="false"
          color="accent"
        />
      </v-col>
      <v-col cols="3">
        <v-card
          color="background"
          rounded="xl"
          flat
        >
          <v-card-title>
            Commandes acceptées par jours
          </v-card-title>
          <v-card-text>
            <v-card
              rounded="xl"
              flat
              color="secondary"
            >
              <v-card-text>
                <apexchart ref="acceptedCommands" type="line" :options="$vuetify.theme.dark ? areaDayDarkChartOptions : areaDayLightChartOptions" :series="series1" />
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <!--<v-col cols="3">
        <v-card
          color="background"
          rounded="xl"
          flat
        >
          <v-card-title>
            Livraisons effectuées par jours
          </v-card-title>
          <v-card-text>
            <v-card
              rounded="xl"
              flat
              color="secondary"
            >
              <v-card-text>
                <apexchart ref="acceptedDeliveries" type="line" :options="$vuetify.theme.dark ? areaDayDarkChartOptions : areaDayLightChartOptions" :series="series2" />
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
import statsCard from '../components/statsCard.vue'

export default {
  name: 'Stats',
  components: {
    statsCard,
    apexchart: () => import('vue-apexcharts')
  },
  data () {
    return {
      // Option des chart apex chart style dark
      areaDayDarkChartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          events: {
            mounted: () => {
              this.fillAcceptedOrder()
              this.fillAcceptedDeliveries()
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          show: true,
          theme: 'dark'
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 0
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          categories: []
        }
      },
      // Option des chart apex chart style night
      areaDayLightChartOptions: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          events: {
            mounted: () => {
              this.fillAcceptedOrder()
              this.fillAcceptedDeliveries()
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          show: true,
          theme: 'light'
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 0
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          categories: []
        }
      },
      areaBarChartOptions: {
        chart: {
          type: 'bar',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          },
          events: {
            mounted: () => {
              this.fillMenuData()
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          show: true,
          theme: 'light'
        },
        grid: {
          show: false
        },
        yaxis: {
          show: false,
          min: 0
        },
        xaxis: {
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          },
          categories: []
        }
      },
      series1: [{
        name: 'Commande',
        data: []
      }],
      series2: [{
        name: 'Commande',
        data: []
      }]
    }
  },
  computed: {
    TotalPrice () {
      let TotalPrice = 0
      this.$store.getters['order/allOrder'].forEach((item) => {
        TotalPrice = TotalPrice + item.price
      })
      return Math.ceil(TotalPrice)
    },

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
  },
  methods: {
    fillAcceptedOrder () {
      // Tableau contenant les données a update
      const newData = []
      const newLabels = []

      // On clones les donnée pour eviter de modifier le store a un endroit ou il est pas senser etre modifier
      let orders = this.order.slice()

      // On groupe les ticket par leur date de création via un map Reduce
      orders = orders.sort(function (a, b) {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)
        return dateA - dateB
      }).reduce((groups, item) => {
        const created = new Date(item.created)

        const createdDate = created.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })

        // Si on le tableau est vide on l'initialise
        if (groups === null) {
          groups = []
        }

        if (item.status === 'accepted') {
          if (!groups[createdDate]) {
            groups[createdDate] = 0
          }
          groups[createdDate]++
        }

        return groups
      }, {})

      // On remplis les tableaux
      Object.entries(orders).forEach((item) => {
        newLabels.push(item[0])
        newData.push(item[1])
      })

      // On réassigne les nouvelles valeurs
      this.series1 = [{
        name: 'Commandes acceptées',
        data: newData
      }]
      // On update les labels
      this.$refs.acceptedCommands.updateOptions({ labels: newLabels })
    },

    fillAcceptedDeliveries () {
      // Tableau contenant les données a update
      const newData = []
      const newLabels = []

      // On clones les donnée pour eviter de modifier le store a un endroit ou il est pas senser etre modifier
      let del = this.deliveries.slice()

      // On groupe les ticket par leur date de création via un map Reduce
      del = del.sort(function (a, b) {
        const dateA = new Date(a.created)
        const dateB = new Date(b.created)
        return dateA - dateB
      }).reduce((groups, item) => {
        const created = new Date(item.created)

        const createdDate = created.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })

        // Si on le tableau est vide on l'initialise
        if (groups === null) {
          groups = []
        }

        if (item.done) {
          if (!groups[createdDate]) {
            groups[createdDate] = 0
          }
          groups[createdDate]++
        }

        return groups
      }, {})

      // On remplis les tableaux
      Object.entries(del).forEach((item) => {
        newLabels.push(item[0])
        newData.push(item[1])
      })

      // On réassigne les nouvelles valeurs
      this.series2 = [{
        name: 'Livraisons effectuées',
        data: newData
      }]
      // On update les labels
      this.$refs.acceptedDeliveries.updateOptions({ labels: newLabels })
    }
  }
}
</script>

<style scoped>

</style>
