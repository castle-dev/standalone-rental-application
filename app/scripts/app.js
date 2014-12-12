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
    'slick'
  ])
  .config(function ($routeProvider) {
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
          loggedIn: function (Auth) {
            Auth.logoutCurrentUser(); // redirects to login
          }
        }
      })
      .when('/creditCard', {
        templateUrl: 'views/creditCard.html',
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
      })
      .when('/apply', {
        templateUrl: 'views/prescreen.html',
      })
      .when('/properties', {
        templateUrl: 'views/properties.html',
      })
      .when('/properties/:id', {
        templateUrl: 'views/property.html',
      })
      .otherwise({
        redirectTo: '/signup'
      });
  })
  .run(function ($window, STRIPE_PUBLISHABLE_KEY) {
    $window.Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
  });
