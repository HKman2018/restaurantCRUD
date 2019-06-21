const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurant.json')


//setting mongoose connect
mongoose.connect('mongodb://localhost/restaurantCRUD', { useNewUrlParser: true })
//mongoose connection
const db = mongoose.connection
// connect error
db.on('error', () => {
  console.log('mongodb error')
})
//connected
db.once('open', () => {
  console.log('mongodb connected!')
})

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//public => CSS
app.use(express.static('public'))


// set route
app.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => {
    return res.render('index', { restaurant: restaurant })
  })
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log('keyword', keyword)
  const restaurant = Restaurant.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  console.log('restaurant', restaurant)
  res.render('index', { restaurant: Restaurant, keyword: keyword })

})

app.get('/restaurants/:restaurant_id', (req, res) => {

  const selectRestaurant = Restaurant.filter(restaurant => restaurant.id == req.params.restaurant_id)
  res.render('show', { restaurant: selectRestaurant[0] })
})


//express port 3000
app.listen(3000, () => {
  console.log('app is running')
})