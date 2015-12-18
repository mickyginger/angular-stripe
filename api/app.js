var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:8000"
}));

app.post('/payment', function(req, res) {
  var token = req.body.token;

  var charge = stripe.charges.create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: token,
    description: 'TEST'
  }, function(err, charge) {
    if(err) {
      return res.status(500).json({ message: err })
    }
    res.status(200).json({ message: "Payment successful" });
  });
});

app.listen(PORT);
console.log("Express is listening to port " + PORT);