var express = require('express')
var shortid = require('shortid')
var router = express.Router()
var User = require('../models/User')

router.get('/', function (req, res) {
  User.find({}).exec(function (err, models) {
    res.json(models)
  })
})

router.post('/', function (req, res) {
  User.findOne({email: req.body.data.email}, function (err, user) {
    console.log(err, user)
    if (err) {
      res.status(500).json({message: 'Error creating new user.' + err.message})
    } else if (user) {
      res.status(500).json({message: 'User with this email already exists'})
    } else {
      var newUser = new User(req.body.data)
      newUser.active = true
      newUser.shortid = shortid.generate()
      newUser.save(function (err, user) {
        if (err) {
          res.status(500).json({message: 'Error creating new user.' + err.message})
        } else {
          res.json({message: 'New user created'})
        }
      })

    }
  })
})

router.post('/delete', function (req, res) {
  User.find({shortid: {$in: req.body.data}}).exec(function (err, models) {
    if (err) {
      res.status(500).json({message: err.message})
    } else if (models.length > 0) {

      models.forEach(function (model) {
        model.remove()
      })

      res.json({message: 'Requested users were deleted from the system'})

    } else {
      res.status(500).json({message: 'No documents found for shortid: ' + req.body.data})
    }
  })

})

module.exports = router
