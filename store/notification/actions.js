import axios from 'axios'

export default {
  fetch (context, token) {
    return new Promise((resolve, reject) => {
      axios.get(process.env.api_url + '/notification', {
        headers: {
          authorization: token
        }
      })
        .then((response) => {
          context.commit('setNotification', response.data)
          resolve(response)
        }).catch((e) => {
        // eslint-disable-next-line no-console
          console.error(e)
          reject(onerror)
        })
    })
  }
}
