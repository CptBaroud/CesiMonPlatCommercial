export default () => ({
  order: {
    user: {},
    accepted: {
      type: Boolean,
      default: false
    },
    price: Number,
    menu: [],
    article: []
  },
  allOrder: [],
  totalPrice: 0
})
