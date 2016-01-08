angular
  .module('angularStripe', [])
  .constant('API_URL', 'http://localhost:3000')
  .config(function() {
    Stripe.setPublishableKey('pk_test_hH5Fe3p7JU0r88Hklk3Y6J7m');
  });
