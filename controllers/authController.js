import connector from '../database/db.js'
import Jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { promisify } from 'util'

export const register = async (req, res) => {
  try {
    const name = req.body.name
    const user = req.body.user
    const password = req.body.password
    const passHash = await bcryptjs.hash(password, 8)
    connector.query('INSERT INTO users SET ?', { user, name, password: passHash }, (error, results) => {
      if (error) { console.log(error) }
      res.redirect('/')
    })
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  try {
    const user = req.body.user
    const pass = req.body.pass

    if (!user || !pass) {
      res.render('login', {
        alert: true,
        alertTitle: 'Advertencia',
        alertMessage: 'Ingrese un usuario y password',
        alertIcon: 'info',
        showConfirmButton: true,
        timer: false,
        ruta: 'login'
      })
    } else {
      connector.query('SELECT * FROM users WHERE user = ?', [user], async (_error, results) => {
        if (results.length === 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
          res.render('login', {
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Usuario y/o Password incorrectas',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
          })
        } else {
          const id = results[0].id
          const token = Jwt.sign({ id }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
          })
          console.log('TOKEN: ' + token + ' para el USUARIO : ' + user)

          const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
          }
          res.cookie('jwt', token, cookiesOptions)
          res.render('login', {
            alert: true,
            alertTitle: 'Conexión exitosa',
            alertMessage: '¡LOGIN CORRECTO!',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 800,
            ruta: ''
          })
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(Jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
      connector.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (_error, results) => {
        if (!results) { return next() }
        req.user = results[0]
        return next()
      })
    } catch (error) {
      console.log(error)
      return next()
    }
  } else {
    res.redirect('/login')
  }
}

export const logout = (req, res) => {
  res.clearCookie('jwt')
  return res.redirect('/')
}
