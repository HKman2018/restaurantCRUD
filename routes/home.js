const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => {
    return res.render('index', { restaurants: restaurant })
  })
})

module.exports = router