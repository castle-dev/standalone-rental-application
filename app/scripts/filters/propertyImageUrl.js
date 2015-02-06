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
    return function (input, width, height) {
      if (input && input.thumbnail) {
        return input.thumbnail;
      } else if (input) {
        return 'https://maps.googleapis.com/maps/api/streetview?location=' + input.street + ' ' + input.city + ' ' + input.stateAbbreviation + '&size=' + width + 'x' + height;
     }
    };
  });
