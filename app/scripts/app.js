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
    'angularPayments'
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
      .when('/profile', {
        templateUrl: 'views/profile.html',
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
      })
      .when('/apply', {
        templateUrl: 'views/rentalApplication.html',
      })
      .otherwise({
        redirectTo: '/signup'
      });
  })
  .run(function ($window, STRIPE_PUBLISHABLE_KEY) {
    $window.Stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
  });
