import express from 'express'
import connector from '../database/db.js'
import {
  isAuthenticated
} from '../controllers/authController.js'

let USER = null

const router = express.Router()

router.get('/services', isAuthenticated, function (req, res) {
  USER = req.user
  connector.query('SELECT nameClients FROM clients', function(err, result) {
    if (err) {
      console.error('Error al obtener las opciones de la base de datos:', err);
      return;
    }
    connector.end();
  });
  res.render('services', { user: USER, result })
})

export default router