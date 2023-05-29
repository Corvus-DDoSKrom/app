import connector from '../database/db.js'

export const registerClients = async function (req, res) {
  try {
    const nameClients = req.body.nameClients
    const companyClients = req.body.companyClients
    const documentClients = req.body.documentClients
    const mailClients = req.body.mailClients
    const phoneClients = req.body.phoneClients
    const directionClients = req.body.directionClients
    const datecreateClients = new Date()
    connector.query('SELECT * FROM clients WHERE companyClients = ?', companyClients, async function (_error, results) {
      if (results.length === 1) {
        console.log(_error)
        const USER = req.user
        res.render('register-clients', { alert: 'incorrectcreatedClient', user: USER })
      } else {
        connector.query('INSERT INTO clients SET ?', {
          nameClients,
          companyClients,
          documentClients,
          mailClients,
          phoneClients,
          directionClients,
          datecreateClients
        }, function (error, results) {
          if (error) { console.log(error) }
          const USER = req.user
          res.render('register-clients', { alert: 'successfullycreatedClient', user: USER })
        })
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteClients = async function (req, res) {
  try {
    const idClients = req.params.idClients
    connector.query('DELETE FROM clients WHERE idClients = ?', idClients, function (error, results) {
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

export const updateClients = async function (req, res) {
  try {
    const idClients = req.body.idClients
    const nameClients = req.body.nameClients
    const companyClients = req.body.companyClients
    const documentClients = req.body.documentClients
    const mailClients = req.body.mailClients
    const phoneClients = req.body.phoneClients
    const directionClients = req.body.directionClients
    const dateupdateClients = new Date()
    connector.query('UPDATE clients SET ? WHERE idClients = ?', [{
      nameClients,
      companyClients,
      documentClients,
      mailClients,
      phoneClients,
      directionClients,
      dateupdateClients
    }, idClients], function (error, results) {
      if (error) { console.log(error) }
      res.redirect('/clients')
    })
  } catch (error) {
    console.log(error)
  }
}
