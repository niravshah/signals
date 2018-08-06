import Api from '@/services/Api'

export default {
  getData () {
    return Api().get('/api/users')
  },
  create(user){
    return Api().post('/api/users', {data: user})
  },
  delete(ids){
    return Api().post('/api/users/delete', {data: ids})
  }
}
