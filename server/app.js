require('dotenv').config()

var express = require('express')
var path = require('path')
var http = require('http')
var cors = require('cors')

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var hbs = require('express-hbs')
var app = express()

var index = require('./routes/index')
var upload = require('./routes/upload')
var auth = require('./routes/auth')
var users = require('./routes/user')

var mongoose = require('mongoose')

var url = 'mongodb://' + process.env.MONGODB_USERNAME + ':' + process.env.MONGODB_PASSWORD + '@mongodb/' + process.env.MONGODB_DATABASE
if (process.env.NODE_ENV == 'dev') {
  url = process.env.MONGODB_URL + process.env.MONGODB_DATABASE
}

mongoose.connect(url, {useNewUrlParser: true})
  .then(() => {
    console.log('mongo connection successful: ', url)
  })
  .catch((err) => console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/default'
}))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/', index)
app.use('/api/auth', auth)
app.use('/api/upload', upload)
app.use('/api/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(500).json({status: err.status, message: err.message})
})

var port = process.env.PORT || '5001'
app.set('port', port)

var server = http.createServer(app)

server.listen(port, function () {
  console.log('Signals API running on port: ' + port)
})