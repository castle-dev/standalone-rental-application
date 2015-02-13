'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.directive:searchBox
 * @description
 * # searchBox
 * Directive for displaying
 * a search box
 */
angular.module('propertyManagementApp')
  .directive('searchBox', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/partials/searchBox.html',
      scope: {
        query: '='
      }
    };
  });
