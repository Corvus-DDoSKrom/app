import express from 'express'
import connector from '../database/db.js'
import { isAuthenticated } from '../controllers/authController.js'
import {
  registerSuppliers,
  deleteSuppliers,
  updateSuppliers
} from '../controllers/suppliersController.js'

const router = express.Router()

let USER = null

router.get('/suppliers', isAuthenticated, function (req, res) {
  connector.query('SELECT * FROM suppliers', function (error, results) {
    if (error) {
      throw error
    } else {
      USER = req.user
      res.render('suppliers', { alert: req.query.alert, user: USER, results, req })
    }
  })
})

router.get('/register-suppliers', isAuthenticated, function (req, res) {
  res.render('register-suppliers', { alert: '', user: USER })
})

router.get('/updatesuppliers/:idSuppliers', function (req, res) {
  const idSuppliers = req.params.idSuppliers
  connector.query('SELECT * FROM suppliers WHERE idSuppliers = ?', [idSuppliers], function (error, results) {
    if (error) {
      throw error
    } else {
      res.render('update-suppliers', { suppliers: results[0], user: USER })
    }
  })
})

router.post('/register-suppliers', registerSuppliers)
router.post('/deleteSuppliers/:idSuppliers', deleteSuppliers)
router.post('/updateSuppliers', updateSuppliers)

export default router
