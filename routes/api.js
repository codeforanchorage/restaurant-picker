var express = require('express')
var router = express.Router()
var request = require('request')

router.get('/', function(req, res, next) {
  let options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: {
      term: req.query.term || 'restaurants',
      location: req.query.location || '99508',
    },
    headers: {
      Authorization: 'Bearer ' + process.env.TOKEN
    }
  }

  request.get(options, (error, response, body) => {
    if (error) return next(error)
    res.send(body)
  })
})

module.exports = router
