'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.controller:PasswordResetController
 * @description
 * # PasswordResetController
 * Controller of the propertyManagementApp
 */
angular.module('propertyManagementApp')
  .controller('PasswordResetController', function ($scope, $routeParams) {
    this.token = $routeParams.token;
  });
