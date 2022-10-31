
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


exp.get('/login/:login/:password',
	(req, res) => {
		const login = req.params.login,
			password = req.params.password,
			connection = mysql.createConnection( connectionCfg ),
			query = "SELECT id, login, password FROM users WHERE login=?"
		connection.query(query, [login], (err, sqlRes)=> {
			if (err) throw err

			if(sqlRes.length === 0){
				res.json({success:false, error:'Account with this username not found', loggedId:'', loggedLogin:''} )
			} else {
				const hashedPassword = sqlRes[0].password
				if( !== password){

				} else {
					res.json({success:true, loggedId:sqlRes[0].id, loggedLogin:sqlRes[0].login} )
				}
			}
			connection.end()
		})
	}
)
