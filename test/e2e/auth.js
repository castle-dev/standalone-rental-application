/* global element, by */
'use strict';

describe('Property Management App: Authentication', function() {

  beforeEach(function () {
    browser.get('/');
  });

  it('should redirect to the login page', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/login');
  });

  describe('logging in', function () {

    var emailInput;
    var passwordInput;
    var errors;
    var clearInputs = function () {
      emailInput.clear();
      passwordInput.clear();
    };

    beforeEach(function () {
      emailInput = element(by.model('user.email'));
      passwordInput = element(by.model('user.password'));
      errors = element.all(by.repeater('error in errors'));
      clearInputs();
    });

    it('shouldn\'t submit an invalid form', function () {
      emailInput.sendKeys('test');
      passwordInput.sendKeys('login\n');
      expect(browser.getLocationAbsUrl()).toMatch('/login');
      errors.then(function (rows) {
        expect(rows.length).toBe(0);
      });
    });

  });

});
