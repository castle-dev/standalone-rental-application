'use strict';

describe('Directive: signupForm', function() {
  var element, scope, inputs;

  beforeEach(module('propertyManagementApp'));
  beforeEach(module('partials'));
  beforeEach(module(function ($provide) {
    var Auth = {};
    $provide.value('Auth', Auth);
  }));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    element = angular.element(
      '<signup-form></signup-form>'
    );
    var directive = $compile(element)(scope);
    scope = directive.scope();
    scope.$apply();
    inputs = element.find('input');
  }));

  it('should display a single form', function () {
    var forms = element.find('form');
    expect(forms.length).toBe(1);
  });

  it('should have an email input field', function () {
    var hasEmailInput = false;
    for(var i = 0; i < inputs.length; i++){
      if(angular.element(inputs[i]).attr('type') === 'email') { hasEmailInput = true; }
    }
    expect(hasEmailInput).toBe(true);
  });

  it('should have an password input field', function () {
    var hasPasswordInput = false;
    for(var i = 0; i < inputs.length; i++){
      if(angular.element(inputs[i]).attr('type') === 'email') { hasPasswordInput = true; }
    }
    expect(hasPasswordInput).toBe(true);
  });

  it('should have an password input field', function () {
    var hasPasswordInput = false;
    for(var i = 0; i < inputs.length; i++){
      if(angular.element(inputs[i]).attr('type') === 'email') { hasPasswordInput = true; }
    }
    expect(hasPasswordInput).toBe(true);
  });

  it('should have a submit button', function () {
    var button = angular.element(element.find('button'));
    expect(button.attr('type') === 'submit');
  });

  it('should check password requirements', function () {
    scope.newUser.password = 'badpwd';
    scope.$digest();
    expect(scope.passwordIsLongEnough).toBe(false);
    expect(scope.passwordContainsNumber).toBe(false);
    scope.newUser.password = 'fakepassword1';
    scope.$digest();
    expect(scope.passwordIsLongEnough).toBe(true);
    expect(scope.passwordContainsNumber).toBe(true);
    scope.newUser.password = 'longenough';
    scope.$digest();
    expect(scope.passwordIsLongEnough).toBe(true);
    expect(scope.passwordContainsNumber).toBe(false);
    scope.newUser.password = '1234567';
    scope.$digest();
    expect(scope.passwordIsLongEnough).toBe(false);
    expect(scope.passwordContainsNumber).toBe(true);
  });

});

