'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:sidebar
 * @description
 * # sidebar
 * Directive containing template for the sidebar
 */
angular.module('propertyManagementApp')
  .directive('sidebar', function (Sidebar, Auth, $location) {
    return {
      restrict: 'A',
      templateUrl: 'views/partials/sidebar.html',
      link: function (scope, elem) {
        scope.sidebar = {
          data: Sidebar.getData()
        };
        scope.path = $location.path();
        scope.collapseSidebar = Sidebar.toggle;
        var unwatch = scope.$watch('sidebar.data.collapsed', function (collapsed) {
          if (collapsed) {
            elem.removeClass('sidebar-open');
          } else {
            elem.addClass('sidebar-open');
          }
        });
        scope.$on('$destroy', function () {
          unwatch();
        });
        Auth.isUserTenant()
        .then(function () { scope.isTenant = true; },
              function () { scope.isTenant = false; });
      }
    };
  })
  .directive('content', function (Sidebar) {
    return {
      link: function (scope, elem) {
        scope.sidebar = {
          data: Sidebar.getData()
        };
        var unwatch = scope.$watch('sidebar.data.collapsed', function (collapsed) {
          if (collapsed) {
            elem.removeClass('sidebar-open');
          } else {
            elem.addClass('sidebar-open');
          }
        });
        scope.$on('$destroy', function () {
          unwatch();
        });
      }
    };
  })
  .directive('sidebarToggle', function (Sidebar) {
    return {
      template: '<a id="menu-toggle" ng-click="toggle()"><i class="fa fa-bars"></i></a>',
      link: function (scope) {
        scope.toggle = Sidebar.toggle;
      }
    };
  });

