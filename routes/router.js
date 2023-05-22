import express from 'express'
import {
  register,
  login,
  logout,
  isAuthenticated
} from '../controllers/authController.js'

const router = express.Router()

const titlePage = 'App'

router.get('/', isAuthenticated, function (req, res) {
  res.render('index')
})

router.get('/login', function (req, res) {
  if (req.cookies.jwt) {
    res.redirect('/')
  } else {
    res.render('login', { alert: false })
  }
})

router.get('/register', function (req, res) {
  res.render('register', { title: titlePage })
})

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

export default router
