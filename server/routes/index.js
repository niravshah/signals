var express = require('express')
var router = express.Router()

var jwt = require('express-jwt')
var _ = require('underscore')

var PrudentialModel = require('../models/prudential')

router.get('/', function (req, res) {
  res.json({'message': 'OK'})
})

router.get('/data', function (req, res) {
  PrudentialModel
    .find({flags: {$gt: 0}})
    .sort([['report_date', -1]])
    .limit(100)
    .exec(function (err, models) {
      if (err) {
        res.status(500).json({message: 'Could not get latest rows.' + err.message})
      } else {
        res.json(models)
      }
    })
})

router.get('/data/featured', function (req, res) {
  PrudentialModel
    .find({flags: {$gt: 0}})
    .sort([['flags', -1], ['report_date', -1]])
    .limit(100)
    .exec(function (err, models) {
      if (err) {
        res.status(500).json({message: 'Could not get featured rows.' + err.message})
      } else {
        res.json(models)
      }
    })
})

router.get('/data/:ticker', function (req, res) {
  PrudentialModel
    .find({ticker: req.params.ticker})
    .sort([['report_date', -1]])
    .exec(function (err, models) {

      if (err) {
        res.status(500).json({message: err.message})
      } else {
        if (models.length > 0) {

          var allvals = []
          var reports = []
          var flags = {}
          var dptni = {}, dhni = {}, dpni = {}, dlmui = {}, dlmni = {}, ddawi = {}, dsi = {}

          _.each(models, function (model) {
            var ptni = model.prudentialtopnegativeindex
            var hni = model.he_negativeindex
            var pni = model.prudentialnegativeindex
            var lmui = model.lmuncertaintyindex
            var lmni = model.lmnegativeindex
            var dawi = model.deamplification_wordsindex
            var si = model.sadnessindex

            dptni[model.report_date] = ptni
            dhni[model.report_date] = hni
            dpni[model.report_date] = pni
            dlmui[model.report_date] = lmui
            dlmni[model.report_date] = lmni
            ddawi[model.report_date] = dawi
            dsi[model.report_date] = si
            allvals.push(ptni, hni, pni, lmui, lmni, dawi, si)
            reports.push(model.reportid)
            flags[model.report_date] = model.flags
          })

          var min = _.min(allvals)
          var max = _.max(allvals)
          res.json({
            min: min,
            max: max,
            reports: reports,
            ticker: models[0].ticker,
            label: models[0].label,
            exchange: models[0].exchange,
            exchange_name: models[0].exchange_name,
            country: models[0].country,
            region: models[0].region,
            mic_code: models[0].mic_code,
            flags: flags,
            prudentialtopnegativeindex: dptni,
            he_negativeindex: dhni,
            prudentialnegativeindex: dpni,
            lmuncertaintyindex: dlmui,
            lmnegativeindex: dlmni,
            deamplification_wordsindex: ddawi,
            sadnessindex: dsi,
            models: models
          })
        } else {
          res.status(500).json({message: 'No models found'})
        }
      }

    })
})

router.get('/filter/ticker', function (req, res) {
  PrudentialModel.find({}).distinct('ticker', function (err, ticker) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json({data: ticker})
    }
  })
})

router.get('/vue-good-schema', function (req, res) {
  res.json([{label: 'ticker', field: 'ticker'},
    {label: 'report_date', field: 'report_date'},
    {label: 'flags', field: 'flags'},
    {label: 'exchange', field: 'exchange'},
    {label: 'country', field: 'country'},
    {label: 'region', field: 'region'},
    {label: 'metindex', field: 'metindex'},
    {label: 'he_negativeindex', field: 'he_negativeindex'},
    {label: 'prudentialtopnegativeindex', field: 'prudentialtopnegativeindex'},
    {label: 'prudentialnegativeindex', field: 'prudentialnegativeindex'},
    {label: 'lmuncertaintyindex', field: 'lmuncertaintyindex'},
    {label: 'lmnegativeindex', field: 'lmnegativeindex'},
    {label: 'deamplification_wordsindex', field: 'deamplification_wordsindex'},
    {label: 'sadnessindex', field: 'sadnessindex'}])
})

router.get('/vue-good-schema/users', function (req, res) {
  res.json([{label: 'name', field: 'name'},
    {label: 'email', field: 'email'},
    {label: 'admin', field: 'admin'},
    {label: 'active', field: 'active'},
    {label: 'shortid', field: 'shortid'}
  ])
})

module.exports = router
