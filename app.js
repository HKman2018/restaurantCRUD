const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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
app.use(bodyParser.urlencoded({ extended: true }))

//models
const Restaurant = require('./models/restaurant')
// set route


app.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => {
    return res.render('index', { restaurants: restaurant })
  })
})
//新增頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
app.post('/restaurants', (req, res) => {
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
  })
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
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






//express port 3000
app.listen(3000, () => {
  console.log('app is running')
})