/* global element, by */
'use strict';

function makeId () {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for( var i=0; i < 6; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
function waitForUrlToChangeTo (urlRegex) {
    var currentUrl;
    return browser.getCurrentUrl()
    .then(function storeCurrentUrl(url) {
      currentUrl = url;
    })
    .then(function waitForUrlToChangeTo() {
      return browser.wait(function waitForUrlToChangeTo() {
        return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
          return urlRegex.test(url);
        });
      });
    });
}
var testUser = {
  email: 'optimus.prime.' + makeId() + '@gmail.com',
  password: 'fakepassword1'
};

describe('Property Management App ::', function() {

  it('should redirect to the login page', function() {
    browser.get('/');
    waitForUrlToChangeTo(/login/);
    expect(browser.getCurrentUrl()).toMatch(/login/);
  });

  describe('Invalid login :: ', function () {

    var emailInput;
    var passwordInput;
    var submitButton;
    var errors;

    beforeEach(function () {
      emailInput = element(by.model('user.email'));
      passwordInput = element(by.model('user.password'));
      submitButton = element(by.id('login-submit-button'));
      errors = element.all(by.repeater('error in errors'));
    });

    it('shouldn\'t submit an invalid form', function () {
      emailInput.sendKeys('test');
      passwordInput.sendKeys('login\n');
      expect(browser.getCurrentUrl()).toMatch(/login/);
      errors.then(function (rows) {
        expect(rows.length).toBe(0);
      });
    });

    describe('Signup ::', function () {

      var firstNameInput;
      var lastNameInput;
      var emailInput;
      var phoneNumberInput;
      var passwordInput;
      var signupSubmitButton;

      beforeEach(function () {
        firstNameInput = element(by.model('newUser.firstName'));
        lastNameInput = element(by.model('newUser.lastName'));
        emailInput = element(by.model('newUser.email'));
        phoneNumberInput = element(by.model('newUser.phoneNumber'));
        passwordInput = element(by.model('newUser.password'));
        signupSubmitButton = element(by.id('signup-submit-button'));
      });

      it('should allow users to sign up and redirect to /properties', function () {
        browser.get('/#/signup');
        firstNameInput.sendKeys('Optimus');
        lastNameInput.sendKeys('Prime');
        emailInput.sendKeys(testUser.email);
        phoneNumberInput.sendKeys('3132142663');
        passwordInput.sendKeys(testUser.password + '\n');
        waitForUrlToChangeTo(/properties/);
        expect(browser.getCurrentUrl()).toMatch(/properties/);
      });

      it('should allow users to log out', function () {
        browser.get('/#/logout');
        waitForUrlToChangeTo(/login/);
        expect(browser.getCurrentUrl()).toMatch(/login/);
      });

    });
  });
});
