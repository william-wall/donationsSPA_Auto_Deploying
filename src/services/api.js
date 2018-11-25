import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://donationweb-ssd-nodeserver.herokuapp.com/'
    // baseURL: 'http://localhost:3001/'

  })
}
