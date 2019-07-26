const express = require('express')
const router = express.Router()
const passport = require('passport')
//載入bcryptjs
const bcrypt = require('bcryptjs')

const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  console.log('req.email', req.body)
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  console.log('name', req.body)
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {                                       // 檢查 email 是否存在
      console.log('User already exists')
      res.render('register', {                // 使用者已經註冊過
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({    // 如果 email 不存在就直接新增
        name,
        email,
        password
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save().then(user => {
            res.redirect('/')
          }).catch(err => console.error(err))
        })
      })
    }
  })

})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router