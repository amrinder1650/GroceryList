var express = require('express');
var app = express();
var controller = require('./controllers.js');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/groceries', controller.groceries.get);
app.post('/groceries', controller.groceries.post);
app.put('/groceries', controller.groceries.put);
app.post('/move', controller.historical.post);
app.put('/empty', controller.historical.put);

app.listen(3000, function() {
  console.log('Server started and listening on port 3000');
});