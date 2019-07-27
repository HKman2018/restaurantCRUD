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
//載入express-session
const session = require('express-session')
const passport = require('passport')
//載入connect-flash
const flash = require('connect-flash')

//判別開發環境
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

//setting mongoose connect
mongoose.connect('mongodb://localhost/restaurantCRUD', { useNewUrlParser: true, useCreateIndex: true })
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

//使用session and passport
app.use(session({
  secret: 'rewioqurjfdsfldsjl',
  resave: 'false',
  saveUninitialized: 'false',
}))
app.use(passport.initialize())
app.use(passport.session())
//載入passport config
require('./config/passport')(passport) //(function(passport))

//use connect flash
app.use(flash())
//登入後可以取得使用者資訊
app.use((req, res, next) => {
  res.locals.users = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
//router
app.use('/', require('./routes/home'))
app.use('/search', require('./routes/search'))
app.use('/restaurants', require('./routes/restaurants'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))



//express port 3000
app.listen(3000, () => {
  console.log(`Express is listening on localhost:${port}`)
})