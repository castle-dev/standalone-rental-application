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
      .when('/profile/:profileId/edit', {
        templateUrl: 'views/profile.html',
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
      })
      .otherwise({
        redirectTo: '/signup'
      });
  })
  .run(function ($window, STRIPE_API_KEY) {
    $window.Stripe.setPublishableKey(STRIPE_API_KEY);
  });
