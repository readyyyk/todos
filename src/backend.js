const mysql = require('mysql')

/* export */ const connectionCfg = {
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "todo0os-db"
}

/* export */ const selectQuery = (conCfg, id) => {
	const connection = mysql.createConnection( conCfg ),
		query = 'SELECT * FROM data WHERE id=?'

	let data
	connection.query(query, [id], (err, res)=>{
		if(err) throw err

		data = JSON.parse(res[0].data)
		console.log( data )

		connection.end()
	})


}

/* export */ const updateQuery = (conCfg, data, id) => {
	const connection = mysql.createConnection( conCfg )
	connection.query(`UPDATE data SET data='${data}' WHERE id=${id}`, (err, res)=>{
		if(err) throw err
		console.log(`data on id ${id} updated`)
	})
	connection.end()
}

const testData = '[{"id":0,"title":"test updated group","bgColor":"#BFBFBF","textColor":"#0D6EFD"},{"id":1,"groupId":0,"title":"test updated todo","text":"First todo text","startDate":"2022-10-22","endDate":"2022-11-16","status":"in progress"}]'
//updateQuery(testData, 2)
console.log( selectQuery(connectionCfg,2) )