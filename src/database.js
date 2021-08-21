const mysql = require('mysql');
const { promisify } = require('util'); // convertimos codigo de callbacks en async await o promesas
const { database } = require('./keys.js');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			console.error('DATABASE CONNECTION WAS CLOSED');
		};
		if (err.code === 'ER_CON_COUNT_ERROR') {
			console.error('DATABASE HAS TO MANY CONNECTIONS');
		};
		if (err.code === 'ECONNREFUSED') {
			console.error('DATABASE CONNECTION WAS REFUSED');
		};
		return;
	};

	if (connection) connection.release();
	console.log('THE DATABASE HAS BEEN SUCCESSFULLY CONNECTED');
	return;
});

pool.query = promisify(pool.query); // cada vez que haga una consulta de datos podre utilizar async o promesas // query = consultas

module.exports = pool;