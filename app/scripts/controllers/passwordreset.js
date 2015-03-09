'use strict';

/**
 * @ngdoc function
 * @name propertyManagementApp.controller:PasswordResetController
 * @description
 * # PasswordResetController
 * Controller of the propertyManagementApp
 */
angular.module('propertyManagementApp')
  .controller('PasswordResetController', function ($routeParams, $location, $scope, Auth) {
    var vm = this;
    vm.email = $routeParams.email;
    vm.token = $routeParams.token;
    vm.newPassword = '';

    $scope.$watch(function () { return vm.form && vm.form.password.$error.pattern; }, function (newValue) {
      vm.passwordContainsNumber = (newValue === undefined) && vm.form && !vm.form.password.$error.required;
    });
    $scope.$watch(function () { return vm.form && vm.form.password.$error.minlength; }, function (newValue) {
      vm.passwordIsLongEnough = (newValue === undefined) && vm.form && !vm.form.password.$error.required;
    });
    $scope.$watch(function () { return vm.newPassword; }, function () {
      checkMatch();
    });
    $scope.$watch(function () { return vm.confirm; }, function () {
      checkMatch();
    });

    function checkMatch () {
      vm.passwordsMatch = vm.confirm && (vm.confirm === vm.newPassword);
      if (vm.form) { vm.form.confirm.$setValidity('matches', vm.passwordsMatch); }
    }

    this.submit = function () {
      vm.errors = [];
      var user = {
        email: vm.email,
        password: vm.newPassword
      };
      Auth.resetPassword(vm.email, vm.token, vm.newPassword)
        .then(function () { return Auth.loginUser(user); })
        .then(function (to) { $location.path(to); })
        .catch(function (err) { vm.errors.push(err); });
    };
  });
