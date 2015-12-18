angular
  .module('angularStripe')
  .controller('PaymentController', PaymentController);

PaymentController.$inject = ['$http', 'API_URL'];
function PaymentController($http, API_URL) {
  var self = this;

  self.card = {};
  self.amount = 1000;
  self.currency = "gbp";
  self.paymentSuccessful = false;

  self.pay = function() {
    self.card.stripeToken = null;
    Stripe.card.createToken(self.card, function(status, response) {
      if(status === 200) {
        var data = {
          card: self.card,
          token: response.id,
          amount: self.amount,
          currency: self.currency
        };

        $http
          .post(API_URL + '/payment', data)
          .then(function(res) {
            if(res.status === 200) {
              self.paymentSuccessful = true;
            }
          });
      }
    });
  }
}