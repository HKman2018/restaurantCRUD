const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .sort({ name: 'asc' }).exec((err, restaurant) => {
      console.log('req.user._id }', req.user.name)
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurant, userName: req.user.name })
    })

})

module.exports = router