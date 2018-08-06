var express = require('express')
var multer = require('multer')
var shortid = require('shortid')
var fs = require('fs')
var kue = require('kue')
var csv1 = require('csv-stream')
var date_utils = require('date-and-time')

var router = express.Router()
var queue = kue.createQueue()
var upload = multer({dest: 'uploads/'})
var csvStream = csv1.createStream()
var PrudentialModel = require('../models/prudential')

router.post('/', upload.single('file'), function (req, res) {
  var job_id = shortid.generate()
  req.file.job_id = job_id
  req.file.title = job_id

  var job = queue.create('csv2json', req.file).save(function (err) {
    // console.log(job.data)
    if (err) {
      return res.status(500).send({'message': err.message, 'job_id': job.id})
    } else {
      return res.status(200).send({'job_id': job.id})
    }
  })

})

queue.process('csv2json', function (job, done) {

  var readStream = fs.createReadStream(job.data.path)
  var errorBag = []
  var counter = 0

  readStream.pipe(csvStream)
    .on('error', function (err) {
      // console.error(err)
    })
    .on('header', function (columns) {
      // console.log(columns)
    })
    .on('end', function () {
      done(null, {errorBag: errorBag, counter: counter})
    })
    .on('data', function (data) {

      var date = data.report_date

      if (typeof date != 'undefined') {

        if (date_utils.isValid(date, 'D/MM/YYYY')) {
          date = date_utils.parse(date, 'D/MM/YYYY')
        } else if (date_utils.isValid(date, 'M/D/YYYY')) {
          date = date_utils.parse(date, 'M/D/YYYY')
        } else {
          date = date_utils.parse(date)
        }

        var d2 = {
          id: data.reportid,
          ticker: data.ticker.trim(),
          report_date: date,
          label: data.label,
          new_ticker: data.new_ticker,
          exchange: data.exchange,
          exchange_name: data.exchange_name,
          country: data.country,
          region: data.region,
          composite_code: data.composite_code,
          mic_code: data.mic_code,
          flags: parseInt(data.flags) || 0,
          metindex: parseFloat(data.metindex),
          he_negativeindex: parseFloat(data.he_negativeindex),
          prudentialtopnegativeindex: parseFloat(data.prudentialtopnegativeindex),
          prudentialnegativeindex: parseFloat(data.prudentialnegativeindex),
          lmuncertaintyindex: parseFloat(data.lmuncertaintyindex),
          lmnegativeindex: parseFloat(data.lmnegativeindex),
          deamplification_wordsindex: parseFloat(data.deamplification_wordsindex),
          sadnessindex: parseFloat(data.sadnessindex)
        }
        var instance = new PrudentialModel(d2)
        instance.save(function (err, obj) {
          if (err) {
            errorBag.push(data['﻿sr_no'] + ' : ' + data.reportid + ' : ' + err.message)
          } else {
            counter = counter + 1
          }
        })
      } else {
        errorBag.push(data['﻿sr_no'] + ' : ' + data.reportid + ' : ' + 'Report Date Undefined', data.report_date)
      }
    })
})

queue.on('job enqueue', function (id, type) {
  console.log('Job %s got queued of type %s', id, type)
}).on('job complete', function (id, result) {
  console.log('Job %s completed with data ', id, result.counter, result.errorBag.length, result.errorBag)
}).on('job failed', function (id, err) {
  console.log('Job %s failed with message: ', id, err)
})

module.exports = router
