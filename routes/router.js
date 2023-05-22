import express from 'express'
import {
  register,
  login,
  logout
} from '../controllers/authController.js'

const router = express.Router()

const titlePage = 'App'

router.get('/', function (req, res) {
  res.render('index', { title: titlePage })
})

router.get('/login', function (req, res) {
  res.render('login', { title: titlePage })
})

router.get('/register', function (req, res) {
  res.render('register', { title: titlePage })
})

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

export default router
