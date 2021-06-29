export default {
  setOrder (state, data) {
    state.order = data
  },

  setAllOrder (state, data) {
    // Pour chaque commandes
    data.forEach((dataItem) => {
      // On créer un tableau temporaire contenant les menu et les articles de la commande
      const temp = dataItem.article.concat(dataItem.menu)
      // On set un objet items qui va contenir les articles et les menu
      dataItem.items = []
      // Pour chacun de ces items
      temp.forEach((article) => {
        // On cherche l'emplacement de l'item dans le tableau général
        const id = dataItem.items.findIndex((findIndex) => {
          return findIndex._id === article._id
        })

        // Si on l'item existe deja on incrémente juste sa quantitée
        if (id !== -1) {
          dataItem.items[id].quantity++
          // Sinon on l'insère dans le tableau items
        } else {
          // On initialise la quantitée à 1
          article.quantity = 1
          dataItem.items.push(article)
        }
      })
    })
    state.allOrder = data
  },

  addArticleToOrder (state, data) {
    const id = state.order.article.findIndex((item) => {
      return item._id === data.item._id
    })

    const item = data.item
    item.elementType = data.type

    if (id !== -1) {
      state.order.article[id].quantity++
    } else {
      item.quantity = 1
      state.order.article.push(item)
    }
  },

  removeArticleFromOrder (state, data) {
    const id = state.order.menu.findIndex((item) => {
      return item._id === data.item._id
    })

    if (state.order.menu[id].quantity > 1) {
      state.order.menu[id].quantity--
    } else {
      state.order.menu.splice(id, 1)
    }
  },

  addMenuToOrder (state, data) {
    const id = state.order.menu.findIndex((item) => {
      return item._id === data.item._id
    })

    const item = data.item
    item.elementType = data.type

    if (id !== -1) {
      state.order.menu[id].quantity++
    } else {
      item.quantity = 1
      state.order.menu.push(item)
    }
  },

  removeMenuFromOrder (state, data) {
    const id = state.order.article.findIndex((item) => {
      return item._id === data.item._id
    })

    if (state.order.article[id].quantity > 1) {
      state.order.article[id].quantity--
    } else {
      state.order.article.splice(id, 1)
    }
  },

  increaseTotalPrice (state, price) {
    state.totalPrice = Math.round((state.totalPrice + price) * 100) / 100
  },

  decreaseTotalPrice (state, price) {
    if (state.totalPrice > 0) {
      state.totalPrice = Math.round((state.totalPrice - price) * 100) / 100
    }
  },

  editOrder (state, data) {
    const index = state.order.findIndex((item) => {
      return item._id === data._id
    })
    state.order.splice(index, 1)
    state.order.push(data)
  },

  removeOrder (state, data) {
    const index = state.order.findIndex((item) => {
      return item._id === data._id
    })
    state.order.splice(index, 1)
  }
}
