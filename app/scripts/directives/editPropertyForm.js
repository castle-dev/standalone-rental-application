'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.directive:editPropertyForm
 * @description
 * # editPropertyForm
 * Directive containing template and logic
 * for editing a property
 */
angular.module('propertyManagementApp')
.directive('editPropertyForm', function (Geography, Property, BackgroundJob, $route, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/partials/editPropertyForm.html',
    link: function (scope) {
      scope.availableStates = Geography.getAvailableStates();
      scope.rentStatuses = Property.getAvailableRentStatuses();
      scope.addIssue = function () {
        if (!scope.property.issues) { scope.property.issues = []; }
        scope.property.issues.push('');
      };
      scope.addAlert = function () {
        if (!scope.property.additionalInfo) { scope.property.additionalInfo = []; }
        scope.property.additionalInfo.push('');
      };
      scope.addTenant = function () {
        if (!(scope.tenants && scope.tenants.length)) { scope.tenants = []; }
        scope.tenants.push({});
      };
      scope.deleteIssue = function ($index) {
        scope.property.issues.splice($index, 1);
      };
      scope.deleteAlert = function ($index) {
        scope.property.additionalInfo.splice($index, 1);
      };
      scope.deleteDocument = function ($index) {
        scope.property.documents.splice($index, 1);
      };
      scope.deleteImage = function ($index) {
        scope.property.images.splice($index, 1);
      };
      scope.sendNotificationEmail = function (template, callToAction) {
        Property.getOwnerInfo(scope.property.id).then(function (ownerInfo) {
          return BackgroundJob.create({
            jobType: 'notificationEmail',
            template: template,
            email: ownerInfo.email,
            name: ownerInfo.name,
            address: scope.property.street,
            callToActionPath: callToAction
          });
        })
        .then(function () {
          scope.notificationSent = true;
          $timeout(function () {
            scope.notificationSent = false;
          }, 3000);
        });
      };
      scope.submit = function () {
        Property.update(scope.property, scope.tenants)
        .then(function () {
          $route.reload();
        });
      };
      scope.$watch('newDoc', function () {
        if (scope.newDoc && scope.newDoc.name && scope.newDoc.url) {
          if (!scope.property.documents) { scope.property.documents = []; }
          scope.property.documents.push(scope.newDoc);
          scope.newDoc = {};
        }
      });
      scope.$watch('newImage', function () {
        if (scope.newImage && scope.newImage.url) {
          if (!scope.property.images) { scope.property.images = []; }
          scope.property.images.push(scope.newImage.url);
          scope.newImage = {};
        }
      });
      scope.$watch('newThumbnail', function () {
        if (scope.newThumbnail && scope.newThumbnail.url) {
          scope.property.thumbnail = scope.newThumbnail.url;
          scope.newThumbnail = {};
        }
      });
    }
  };
});

