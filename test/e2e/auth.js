'use strict';

describe('Property Management App: Authentication', function() {

  beforeEach(function () {
    browser.get('/');
  });

  it('should redirect to the login page', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/login');
  });

});
