var models = require('./models.js');

module.exports = {
  groceries: {
    get: function (req, res) {
      models.groceries.get((err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(result);
        }
      });
    },
    post: function (req, res) {
      models.groceries.post(req.body.data, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(result);
        }
      });
    },
    put: function (req, res) {
      models.groceries.put(req.body.data, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(result);
        }
      });
    }
  },
  historical: {
    post: function (req, res) {
      models.historical.post(req.body.data, (err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(result);
        }
      });
    },
    put: function (req, res) {
      models.historical.put((err, result) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(result);
        }
      });
    }
  }
};