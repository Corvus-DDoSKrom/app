import express from 'express'
import {
  register,
  login,
  logout,
  isAuthenticated
} from '../controllers/authController.js'

const router = express.Router()

const titlePage = 'Marin Muebles'

router.get('/', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('index', { user: USER })
})

router.get('/login', function (req, res) {
  if (req.cookies.jwt) {
    res.redirect('/')
  } else {
    res.render('login', { alert: false })
  }
})

router.get('/profile', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('profile', { title: titlePage, user: USER })
})

router.get('/register', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('register', { title: titlePage, user: USER })
})

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

export default router
