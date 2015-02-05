'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Geography
 * @description
 * # Geography
 * Factory containing logic for location data
 */
angular.module('propertyManagementApp')
  .factory('Geography', function () {

    return {
      getAvailableStates: function () {
        return [
          'MI'
        ];
      }
    };
  });
