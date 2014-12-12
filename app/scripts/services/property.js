'use strict';


/**
 * @ngdoc function
 * @name propertyManagementApp.factory:Property
 * @description
 * # Property
 * Factory for getting data about properties
 * from the database
 */
angular.module('propertyManagementApp')
  .factory('Property', function ($firebase, FIREBASE_URL, $window, $q, Auth) {
    var ref = new $window.Firebase(FIREBASE_URL);

    var Property = {
      getCurrentUserProperties: function () {
        var deferred = $q.defer();
        $firebase(ref.child('properties').child(Auth.getCurrentUser().uid))
        .$asArray()
        .$loaded()
        .then(function (currentUserProperties) {
          deferred.resolve(currentUserProperties);
        })
        .catch(function (err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
      getPropertyData: function (id) {
        var promise = $firebase(ref.child('properties').child(Auth.getCurrentUser().uid).child(id))
        .$asObject()
        .$loaded();
        return promise;
      }
    };

    return Property;

  });
