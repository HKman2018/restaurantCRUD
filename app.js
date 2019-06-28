const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helpers = require('./public/handlebarsHelpers')
const Restaurant = require('./models/restaurant')


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

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

//router
app.use('/', require('./routes/home'))
app.use('/search', require('./routes/search'))
app.use('/restaurants', require('./routes/restaurants'))



//express port 3000
app.listen(3000, () => {
  console.log('Express is listening on localhost:${port}')
})