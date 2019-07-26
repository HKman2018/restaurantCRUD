const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ name: 'asc' }).exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurant })
    })

})

module.exports = router