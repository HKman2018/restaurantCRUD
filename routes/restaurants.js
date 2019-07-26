const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

//篩選
router.get('/sort/:id', authenticated, (req, res) => {
  console.log('req.params.id', req.params.id)
  let filter;
  switch (req.params.id) {
    case 'a-z':
      filter = { name_en: 1 }
      break;
    case 'z-a':
      filter = { name_en: -1 }
      break;
    case 'rating':
      filter = { rating: -1 }
      break;
    case 'location':
      filter = { location: -1 }
      break;
    case 'category':
      filter = { category: -1 }
      break;
  }
  Restaurant.find({ userId: req.user._id }).sort(filter).exec((err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurant })
  })
})
//新增頁面
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})
router.post('/', authenticated, (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,
    userId: req.user._id,
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})
//detail
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
})
//修改
router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    return res.render('edit', { restaurant: restaurant })
  })
})
//更新內容
router.put('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect('/restaurants/' + restaurant.id)
    })
  })
})
//刪除
router.delete('/:id/delete', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove((err) => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router