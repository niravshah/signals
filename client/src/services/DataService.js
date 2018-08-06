import Api from '@/services/Api'

export default {
  getData () {
    return Api().get('/data')
  },
  getFeaturedRows (){
    return Api().get('/data/featured')
  },
  getSchema(type){

    var schemaUrl = '/vue-good-schema'
    if (type) {
      schemaUrl = schemaUrl + '/' + type
    }
    return Api().get(schemaUrl)
  },
  getTickerFilter(){
    return Api().get('/filter/ticker')
  },
  getDataForTicker(val){
    return Api().get('/data/' + val)
  }
}
