'use strict';

describe('Directive: numeric', function() {
  var $scope, form;
  beforeEach(module('propertyManagementApp'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    var element = angular.element(
      '<form name="form">' +
      '<input ng-model="model.num" name="num" numeric />' +
      '</form>'
    );
    $scope.model = { num: null }
    $compile(element)($scope);
    form = $scope.form;
  }));

  it('should strip non-numeric characters', function () {
    form.num.$setViewValue('(918) 685-0032');
    $scope.$digest();
    expect($scope.model.num).toEqual('9186850032');

    form.num.$setViewValue('$1,200');
    $scope.$digest();
    expect($scope.model.num).toEqual('1200');
  });

});

