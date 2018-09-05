var express = require('express')
var router = express.Router()
var request = require('request')

router.get('/', function(req, res, next) {
  let options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: {
      term: 'restaurants',
      location: '99508'
    },
    headers: {
      'Postman-Token': 'ca1d9c8e-9775-41d3-9e11-563bb16bfaa7',
      'Cache-Control': 'no-cache',
      Authorization: 'Bearer ' + process.env.TOKEN
    }
  }

  request.get(options, (error, response, body) => {
    if (error) return next(error)
    res.send(body)
  })
})

module.exports = router
