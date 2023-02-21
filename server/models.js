var db = require('../sql/index.js');

module.exports = {
  groceries: {
    get: function (callback) {
      db.query('select * from groceries order by orderNum desc', function(err, results) {
        if (err) {
          callback(err);
        } else {
          callback(null, results);
        }
      });
    },
    post: function (data, callback) {
      db.query(`select description from groceries where description  = '${data.description}';`, function(err, results) {
        if (err) {
          callback(err);
        } else {
          if (results.length === 0) {
            var query = `insert into groceries (orderNum, quantity, description, done) SELECT ifnull(MAX( orderNum )+1,0), ${data.quantity}, "${data.description}", ${data.done} from groceries;`;
            db.query(query, function(err, results) {
              if (err) {
                callback(err);
              } else {
                callback(null, results);
              }
            });
          } else {
            var query = `update groceries set quantity = ${data.quantity} where description = "${data.description}";`;
            db.query(query, function(err, results) {
              if (err) {
                callback(err);
              } else {
                callback(null, results);
              }
            });
          }
        }
      });
    },
    put: function (data, callback) {
      db.query(`select description, orderNum from groceries where description  = '${data.description}';`, function(err, results) {
        if (err) {
          callback(err);
        } else {
          var query1;
          var query2;
          var currentLoc = results[0].orderNum;
          var currentItem = results[0].description;

          var move = function(query1, query2) {
            db.query(query1, function(err, results) {
              if (err) {
                callback(err);
              } else {
                db.query(query2, function(err, results) {
                  if (err) {
                    callback(err);
                  } else {
                    callback(null, results);
                  }
                });
              }
            });
          }

          if (data.location === 'bottom') {
            query1 = `update groceries set orderNum = ${currentLoc} where orderNum = ${currentLoc - 1};`;
            query2 = `update groceries set orderNum = ${currentLoc - 1} where description = "${currentItem}";`;
            move(query1, query2);
          }
          if (data.location === 'top') {
            query1 = `update groceries set orderNum = ${currentLoc} where orderNum = ${currentLoc + 1};`;
            query2 = `update groceries set orderNum = ${currentLoc + 1} where description = "${currentItem}";`;
            move(query1, query2);
          }
        }
      });
    }
  },
  historical: {
    post: function (data, callback) {
      var query = `insert into historical (quantity, description) values (${data.quantity}, "${data.description}");`;
      db.query(query, function(err, results) {
        if (err) {
          callback(err);
        } else {
          db.query(`delete from groceries where description = "${data.description}";`, function(err, results) {
            if (err) {
              callback(err);
            } else {
              callback(null, results);
            }
          })
        }
      });
    },
    put: function (callback) {
      var query = `insert into historical (quantity, description) select quantity, description from groceries;`;
      db.query(query, function(err, results) {
        if (err) {
          callback(err);
        } else {
          db.query(`TRUNCATE TABLE Groceries`, function(err, results) {
            if (err) {
              callback(err);
            } else {
              callback(null, results);
            }
          });
        }
      });
    }
  }
};