const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//search
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurant) => {
    if (err) return console.error(err)
    const restaurants = restaurant.filter(item => {
      return item.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: restaurants, keyword: keyword })

  })
})


module.exports = router