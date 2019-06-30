const express = require('express')
const app = express()
const port = 3000
//into express handlebars
const exphbs = require('express-handlebars')
//into mongoose
const mongoose = require('mongoose')
//into body-parser
const bodyParser = require('body-parser')
//into methodOverride
const methodOverride = require('method-override')
//into handlebarHelpers
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
//setting method-override
app.use(methodOverride('_method'))
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
  console.log(`Express is listening on localhost:${port}`)
})