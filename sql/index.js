var mysql = require('mysql');

var db = mysql.createConnection({
  user: 'root',
  database: 'grocery_database'
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL!')
  }
});

module.exports = db;