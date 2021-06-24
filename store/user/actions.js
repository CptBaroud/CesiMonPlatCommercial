import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/users', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setUsers', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(e)
        })
    })
  }
}
