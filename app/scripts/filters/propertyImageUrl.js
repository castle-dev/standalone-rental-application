'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.filter:googleMapsImageUrl
 * @description
 * # googleMapsImageUrl
 * Filter that eats and address and spits out an image
 */
angular.module('propertyManagementApp')
  .filter('propertyImageUrl', function () {
    return function (input) {
      return input.thumbnail || 'https://maps.googleapis.com/maps/api/streetview?location=' + input.street + ' ' + input.city + ' ' + input.stateAbbreviation + '&size=90x90';
    };
  });
