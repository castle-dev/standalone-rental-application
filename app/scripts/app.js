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
    'ngTable'
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
          loggedIn: function (Auth) {
            Auth.logoutCurrentUser(); // redirects to login
          }
        }
      })
      .when('/creditCard', {
        templateUrl: 'views/creditCard.html',
      })
      .when('/bankAccount', {
        templateUrl: 'views/bankAccount.html',
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
        templateUrl: 'views/properties.html',
      })
      .when('/properties/add', {
        templateUrl: 'views/addProperty.html',
      })
      .when('/properties/:propertyId', {
        templateUrl: 'views/property.html',
        resolve: {
          'requiresAuth': function (Auth) { return Auth.require(); }
        }
      })
      .when('/tenants/:tenantId', {
        templateUrl: 'views/tenant.html',
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
