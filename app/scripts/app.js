'use strict';

/**
 * @ngdoc overview
 * @name propertyManagementApp
 * @description
 * # propertyManagementApp
 *
 * Main module of the application.
 */
angular
  .module('propertyManagementApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'angularPayments',
    'ui.mask',
    'slick',
    'ngFabForm',
    'ngMessages',
    'ngTable',
    'internationalPhoneNumber'
  ])
  .config(function ($routeProvider, ngFabFormProvider) {
    ngFabFormProvider.extendConfig({
      validationsTemplate : 'views/partials/validationMessages.html'

    });
    $routeProvider
      .when('/signup', {
        templateUrl: 'views/signup.html',
      })
      .when('/login', {
        templateUrl: 'views/login.html',
      })
      .when('/logout', {
        template: '',
        resolve: {
          loggedIn: function (Auth) { Auth.logoutCurrentUser(); }
        }
      })
      .when('/creditCard', {
        redirectTo: '/credit-card'
      })
      .when('/credit-card', {
        templateUrl: 'views/creditCard.html',
        resolve: { 'requiresAuth': function (Auth) { return Auth.require(); } }
      })
      .when('/bankAccount', {
        redirectTo: '/bank-account'
      })
      .when('/bank-account', {
        templateUrl: 'views/bankAccount.html',
        resolve: { 'requiresAuth': function (Auth) { return Auth.require(); } }
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
      })
      .when('/apply/:address', {
        templateUrl: 'views/prescreen.html',
      })
      .when('/apply', {
        templateUrl: 'views/prescreen.html',
      })
      .when('/inherited/:address', {
        templateUrl: 'views/inherited.html',
      })
      .when('/inherited/', {
        templateUrl: 'views/inherited.html',
      })
      .when('/properties', {
        controller: 'PropertiesController as vm',
        templateUrl: 'views/properties.html',
        resolve: { 'requiresAuth': function (Auth) { return Auth.require(); } }
      })
      .when('/properties/add', {
        templateUrl: 'views/addProperty.html',
        resolve: { 'requiresAuth': function (Auth) { return Auth.require(); } }
      })
      .when('/properties/:propertyId', {
        templateUrl: 'views/property.html',
        resolve: { 'requiresAuth': function (Auth) { return Auth.require(); } }
      })
      .when('/tenants/dashboard', {
        templateUrl: 'views/tenant/dashboard.html',
        resolve: { 'requiresAuth': function (Auth) { return Auth.require(); } }
      })
      .when('/tenants/contact', {
        templateUrl: 'views/tenant/contact.html',
      })
      .when('/tenants/:tenantId/signup', {
        controller: 'TenantSignupController as vm',
        templateUrl: 'views/tenant/signup.html',
      })
      .when('/tenants/:tenantId', {
        templateUrl: 'views/tenant.html',
      })
      .when('/password-reset/:email/:token', {
        controller: 'PasswordResetController as vm',
        templateUrl: 'views/passwordreset.html',
      })
      .when('/password-reset/send', {
        controller: 'PasswordResetEmailController as vm',
        templateUrl: 'views/passwordresetemail.html'
      })
      .otherwise({
        redirectTo: '/properties'
      });
  })
  .run(function ($window, $rootScope, $location, STRIPE_PUBLISHABLE_KEY) {
    $window.Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
    $rootScope.$on('$routeChangeSuccess', function () {
      $window.ga('send', 'pageview', { page: $location.path() });
    });
    $rootScope.$on('$routeChangeError', function (event, next, previous, err) {
      if (err === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
    });
  });
