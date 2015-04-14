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
  .config(function ($routeProvider, $locationProvider, ngFabFormProvider) {
    ngFabFormProvider.extendConfig({
      validationsTemplate : 'views/partials/validationMessages.html'

    });
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/apply/:address', {
        templateUrl: 'views/prescreen.html',
      })
      .when('/apply', {
        templateUrl: 'views/prescreen.html',
      })
      .otherwise({
        redirectTo: '/apply'
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
