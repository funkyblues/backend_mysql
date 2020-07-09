const express = require('express');
const mysql = require('mysql');
var app = express();
app.use(express.json());

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ch100300',
	database: 'hi',
});

connection.connect((err) => {
	if (!err) {
		console.log('DB connection succeded.');
	} else {
		console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
	}
});

app.listen(3000, () => console.log('Express server is running at port no : 3000'));

//모든 데이터 가져오기. 오래걸리지 않을까?
app.get('/topic', (req, res) => {
	connection.query('SELECT * FROM topic', (err, rows, fields) => {
		if (!err) {
			res.send(rows);
		} else {
			console.log(err);
		}
	});
});

//id 지목해서 데이터 가져오기. 이 데이터는 json 형식 파일인듯.
app.get('/topic/:id', (req, res) => {
	connection.query('SELECT * FROM topic WHERE id = ?', [req.params.id], (err, rows, fields) => {
		if (!err) {
			res.send(rows);
		} else {
			console.log(err);
		}
	});
});

// app.get('/', function (req, res) {
// 	connection.query('SELECT * FROM topic WHERE id=1', function (error, rows, fields) {
// 		if (!!error) {
// 			console.log('Error in the query');
// 		} else {
// 			console.log('Successful query');
// 		}
// 	});
// });

// app.listen(3306);
