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

exp.get('/api/:loggedId', (req, res) => {
	const connection = mysql.createConnection( connectionCfg ),
		query = 'SELECT * FROM data WHERE id=?'

	const id = req.params.loggedId

	connection.query(query, [id], (err, sqlRres)=>{
		if(err) throw err
		if(sqlRres.length)
			res.json(sqlRres[0].data)
		else
			res.json('')
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

exp.get('/loginAction/:login/:password',
	(req, res) => {
		const login = req.params.login,
			password = req.params.password,
			connection = mysql.createConnection( connectionCfg ),
			query = "SELECT id, login, password FROM data WHERE login=?"

		connection.query(query, [login], (err, sqlRes)=>{
			if(err) throw err

			/*
			if(sqlRes.length === 0)
			 	res.json({loginNotFound:true, wrongPassword:false, loggedId:''} )
			if(sqlRes[0].password !== password){
		       res.json({loginNotFound:false, wrongPassword:true, loggedId:''} )
			}
			*/

			if(sqlRes.length === 0 || sqlRes[0].password !== password){
				res.json({success:false, loggedId:'', loggedLogin:''} )
			} else {
				res.json({success:true, loggedId:sqlRes[0].id, loggedLogin:sqlRes[0].login} )
			}
			connection.end()
		})
	}
)

exp.listen(5000, () => { console.log(`serv started`) })