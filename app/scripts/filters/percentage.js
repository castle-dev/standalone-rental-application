'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.filter:percentage
 * @description
 * # percentage
 * Filter that eats a number and spits out a percent
 */
angular.module('propertyManagementApp')
  .filter('percentage', function ($window) {
    return function (input, decimals, suffix) {
      decimals = angular.isNumber(decimals) ? decimals : 0;
      suffix = suffix || '%';
      if ($window.isNaN(input)) {
        return '';
      }
      return Math.round(input * Math.pow(10, decimals + 2))/Math.pow(10, decimals) + suffix;
    };
  });
