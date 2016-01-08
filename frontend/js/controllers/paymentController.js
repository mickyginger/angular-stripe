angular
  .module('angularStripe')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', 'API_URL'];
function PaymentController($http, API_URL) {
  var self = this;

  self.card = {};
  self.payee = null;
  self.amount = null;
  self.currency = "gbp";
  self.paymentSuccessful = true;

  self.pay = function() {
    Stripe.card.createToken(self.card, function(status, response) {
      if(status === 200) {
        var data = {
          token: response.id,
          amount: self.amount,
          currency: self.currency,
          payee: self.payee
        };

        $http
          .post(API_URL + '/payment', data)
          .then(function(res) {
            if(res.status === 200) {
              self.paymentSuccessful = true;
            }
            else {
              self.paymentSuccessful = false;
            }
          });
      }
    });
  }

  self.reset = function() {
    self.card = {};
    self.payee = "";
    self.amount = null;
    self.paymentSuccessful = false;
    self.Form.$setPristine(true);
    // use vanilla JS to reset form to remove browser's native autocomplete highlighting
    document.getElementsByTagName('form')[0].reset();
  }
}
