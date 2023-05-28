import express from 'express'
import {
  isAuthenticated
} from '../controllers/authController.js'

const router = express.Router()

const titlePage = 'Marin Muebles'

router.get('/clients', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('clients', { title: titlePage, user: USER })
})

router.get('/register-client', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('register-client', { title: titlePage, user: USER })
})

router.get('/update-client', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('update-client', { title: titlePage, user: USER })
})
/*
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
*/
export default router
