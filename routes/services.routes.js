import express from 'express'
import connector from '../database/db.js'
import {
  isAuthenticated
} from '../controllers/authController.js'

let USER = null

const router = express.Router()

router.get('/services', isAuthenticated, function (req, res) {
  USER = req.user
  res.render('services', { user: USER })
})

export default router