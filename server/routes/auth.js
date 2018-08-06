var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var User = require('../models/User')

router.post('/login', function (req, res) {

  User.findOne({email: req.body.data.email}).exec(function (err, user) {
    if (err) {
      res.status(500).json({message: err.message})
    } else if (user) {
      if (user.password === req.body.data.password && user.active) {
        let token = jwt.sign({
          data: {email: user.email, admin: user.admin, active: user.active}
        }, process.env.JWT_SECRET, {
          expiresIn: 3600,
          algorithm: 'HS256'
        })
        res.json({'token': token})
      } else {
        res.status(500).json({message: 'Could not login with those credentials'})
      }

    } else {
      res.status(500).json({message: 'Could not login with those credentials'})
    }
  })

})

module.exports = router
