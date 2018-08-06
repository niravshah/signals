var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  shortid: {type: String},
  name: {type: String},
  email: {type: String},
  password: {type: String},
  admin: {type: Boolean},
  active: {type: Boolean}
})

module.exports = mongoose.model('User', userSchema, 'user')
