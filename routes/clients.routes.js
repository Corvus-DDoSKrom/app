import express from 'express'
import connector from '../database/db.js'
import { isAuthenticated } from '../controllers/authController.js'
import {
  registerClients,
  deleteClients,
  updateClients
} from '../controllers/clientsController.js'

const router = express.Router()

router.get('/clients', isAuthenticated, function (req, res) {
  connector.query('SELECT * FROM clients', function (error, results) {
    if (error) {
      throw error
    } else {
      const USER = req.user
      res.render('clients', { user: USER, results })
    }
  })
})

router.get('/register-clients', isAuthenticated, function (req, res) {
  const USER = req.user
  res.render('register-clients', { alert: '', user: USER })
})

router.get('/update/:idClients', function (req, res) {
  const idClients = req.params.idClients
  connector.query('SELECT * FROM clients WHERE idClients = ?', [idClients], (error, results) => {
    if (error) {
      throw error
    } else {
      const USER = req.user
      res.render('update-clients', { alert: '', clients: results[0], user: USER })
    }
  })
})

router.post('/register-clients', registerClients)
router.post('/delete/:idClients', deleteClients)
router.post('/updateClients', updateClients)

export default router
