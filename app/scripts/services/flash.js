'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Flash
 * @description
 * # Flash
 * Factory for displaying flash messages to users
 */
angular.module('propertyManagementApp')
  .factory('Flash', function () {
    var queue = [];

    return {
      setMessage: function (message) {
        queue.push(message);
      },
      getMessage: function () {
        return queue.shift() || '';
      }
    };
  });

