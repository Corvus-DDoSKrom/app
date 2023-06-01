import connector from '../database/db.js'

let USER = null

export const registerSuppliers = async function (req, res) {
  try {
    const nameSuppliers = req.body.nameSuppliers
    const companySuppliers = req.body.companySuppliers
    const documentSuppliers = req.body.documentSuppliers
    const mailSuppliers = req.body.mailSuppliers
    const phoneSuppliers = req.body.phoneSuppliers
    const directionSuppliers = req.body.directionSuppliers
    const datecreateSuppliers = new Date()
    connector.query('SELECT * FROM suppliers WHERE companySuppliers = ?', companySuppliers, async function (_error, results) {
      if (results.length === 1) {
        console.log(_error)
        USER = req.user
        res.render('register-suppliers', { alert: 'incorrectcreatedSupplier', user: USER })
      } else {
        connector.query('INSERT INTO suppliers SET ?', {
          nameSuppliers,
          companySuppliers,
          documentSuppliers,
          mailSuppliers,
          phoneSuppliers,
          directionSuppliers,
          datecreateSuppliers
        }, function (error, results) {
          if (error) { console.log(error) }
          res.render('register-suppliers', { alert: 'successfullycreatedSupplier', user: USER })
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteSuppliers = async function (req, res) {
  try {
    const idSuppliers = req.params.idSuppliers
    connector.query('DELETE FROM suppliers WHERE idSuppliers = ?', idSuppliers, function (error, results) {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      } else {
        res.sendStatus(200)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateSuppliers = async function (req, res) {
  try {
    const idSuppliers = req.body.idSuppliers
    const nameSuppliers = req.body.nameSuppliers
    const companySuppliers = req.body.companySuppliers
    const documentSuppliers = req.body.documentSuppliers
    const mailSuppliers = req.body.mailSuppliers
    const phoneSuppliers = req.body.phoneSuppliers
    const directionSuppliers = req.body.directionSuppliers
    const dateupdateSuppliers = new Date()
    connector.query('UPDATE suppliers SET ? WHERE idSuppliers = ?', [{
      nameSuppliers,
      companySuppliers,
      documentSuppliers,
      mailSuppliers,
      phoneSuppliers,
      directionSuppliers,
      dateupdateSuppliers
    }, idSuppliers], function (error, results) {
      if (error) { console.log(error) }
      res.redirect(`/suppliers?alert=successfulUpdated&user=${USER}`)
    })
  } catch (error) {
    console.log(error)
  }
}
