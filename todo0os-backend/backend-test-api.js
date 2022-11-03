
const mysql = require('mysql')
const express = require('express')
const cors = require("cors")
const bcrypt = require('bcrypt')

const exp = express()
exp.use(express.json())
exp.use(cors())

const connectionCfg = {
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "todo0os-db-test-api"
}
const PORT = 5000

exp.get('/login/:login/:password',
	async (req, res) => {
		const login = req.params.login,
			password = req.params.password,
			connection = mysql.createConnection( connectionCfg ),
			query = "SELECT id, login, password FROM users WHERE login=?"
		connection.query(query, [login], async (err, sqlRes)=> {
			if (err) throw err

			if(!sqlRes){
				res.json({success:false, error:'Account with this username not found', loggedId:'', loggedLogin:''} )
			} else {
				const hashedPassword = sqlRes[0].password
				const validPassword = await bcrypt.compare(password, hashedPassword)
				if( validPassword ){
					res.status(200).json({success:true, loggedId:sqlRes[0].id, loggedLogin:sqlRes[0].login} )
				} else {
					res.status(500).json({success:false, error:'Wrong password', loggedId:'', loggedLogin:''} )
				}
			}
			connection.end()
		})
	}
)

exp.get('/registration/:login/:password',
	async (req, res) => {
		const login = req.params.login,
			password = req.params.password,
			connection = mysql.createConnection( connectionCfg ),
			query = "SELECT id FROM users WHERE login=?"
		connection.query(query, [login], async (err, sqlRes)=> {
			if (err) throw err

			if(sqlRes.length){
				res.status(500).json({success:false, error:'Account with this login already exists', loggedId:'', loggedLogin:''} )
				connection.end()
			} else {
				const hashedPassword = await bcrypt.hash(password, 3)
				const query = "INSERT INTO `users`(`login`, `password`) VALUES (?,?)"
					connection.query(query, [login, hashedPassword], async (err, sqlRes)=> {
					if (err) throw err
					res.status(200).json({success:true, loggedId:sqlRes.insertId, loggedLogin: login} )
					connection.end()
				})
			}
		})
	}
)


exp.listen(PORT, () => { console.log(`test serv started on port:${PORT}`) })