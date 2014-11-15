'use strict';

describe('Directive: signupForm', function() {

  // load the directive's module
  beforeEach(module('propertyManagementApp'));
  // load the cached templates
  beforeEach(module('partials'));

  var element, scope, inputs;

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    element = angular.element(
      '<signup-form></signup-form>'
    );
    $compile(element)(scope);
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

});

