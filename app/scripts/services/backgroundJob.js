'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:BackgroundJob
 * @description
 * # BackgroundJob
 * Factory for saving background jobs to the database
 */
angular.module('propertyManagementApp')
  .factory('BackgroundJob', function ($firebase, $window, FIREBASE_URL) {
    var ref = new $window.Firebase(FIREBASE_URL);
    return {
      create: function (job) {
        return $firebase(ref.child('backgroundJobs')).$asArray().$add(job);
      }
    };
  });

