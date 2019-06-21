const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json').results

console.log('restaurantList', restaurantList)
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
  console.log(`restaurantList count: ${restaurantList.length}`)
  restaurantList.forEach(item => {
    // console.log(`${item['name']}`)
    Restaurant.create({
      ...item
    })
  })
  console.log('done')
})