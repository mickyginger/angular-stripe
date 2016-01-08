angular
  .module('angularStripe', [])
  .constant('API_URL', 'http://localhost:3000')
  .config(function() {
    Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  });
