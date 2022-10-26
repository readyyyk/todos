const mysql = require('mysql')
const express = require('express')

const exp = express()
exp.use(express.json())

const connectionCfg = {
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "todo0os-db"
}

exp.get('/api', (req, res) => {
	const connection = mysql.createConnection( connectionCfg ),
		query = 'SELECT * FROM data WHERE id=?'

	//temp id
	const id = 2

	connection.query(query, [id], (err, sqlRres)=>{
		if(err) throw err
		res.json(sqlRres[0].data)
		connection.end()
	})
})

exp.post('/upd', (req, res) => {
	const connection = mysql.createConnection( connectionCfg ),
		query = 'UPDATE data SET data=? WHERE id=?'

	const data = req.body.data,
		id = req.body.loggedId

	connection.query(query, [data, id], (err, sqlRres)=>{

		if(err) throw err
		res.sendStatus(201)
	})
	connection.end()
})

exp.listen(5000, () => { console.log(`serv started`) })