var mongoose = require('mongoose')
var Schema = mongoose.Schema

var prudentialSchema = new Schema({
  id: {type: String},
  ticker: {type: String},
  report_date: {type: Date},
  label: {type: String},
  new_ticker: {type: String},
  exchange: {type: String},
  exchange_name: {type: String},
  country: {type: String},
  region: {type: String},
  composite_code: {type: String},
  mic_code: {type: String},
  flags: {type: Number},
  metindex: {type: Number},
  he_negativeindex: {type: Number},
  prudentialtopnegativeindex: {type: Number},
  prudentialnegativeindex: {type: Number},
  lmuncertaintyindex: {type: Number},
  lmnegativeindex: {type: Number},
  deamplification_wordsindex: {type: Number},
  sadnessindex: {type: Number}
})

module.exports = mongoose.model('Prudential', prudentialSchema, 'prudential')


