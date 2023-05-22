import mysql from 'mysql'

const connector = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app'
})

connector.connect(err => {
  if (err) {
    console.log('Connection error is: ' + err)
    return
  }
  console.log('Successfully Connected!')
})

export default connector
