'use strict';

describe('Controller: PasswordResetController', function () {

  // load the controller's module
  beforeEach(module('propertyManagementApp'));

  var PasswordResetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PasswordResetCtrl = $controller('PasswordResetController', {
      $scope: scope
    });
  }));

});
