'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Sidebar
 * @description
 * # Sidebar
 * Factory containing logic for 
 * opening and closing the sidebar
 */
angular.module('propertyManagementApp')
.factory('Sidebar', function () {
  var data = {
    collapsed: true
  };

  var handleTouchMove = function(e) {
    //disable scroll on mobile when the sidebar is open
    if(!data.collapsed) {
      e.preventDefault();
    }
  };

  document.addEventListener('touchmove', handleTouchMove, true);

  return {
    toggle: function() {
      data.collapsed = !data.collapsed;
    },
    getData: function() {
      return data;
    },
  };
});

