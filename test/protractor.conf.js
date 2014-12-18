var Firebase;
var ref;

exports.config = {

  allScriptsTimeout: 120000,

  specs: [
    'e2e/*.js'
  ],

  sauceUser: 'lowe0292',
  sauceKey: '29826175-7af4-4fe9-b4ed-c57947527e15',

  baseUrl: process.env.BASE_URL,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000,
  },

  'appium-version' : '1.2.1',

  onPrepare: function () {
    Firebase = require('firebase');
    ref = new Firebase(process.env.FIREBASE_URL);
    ref.set({}); // empty the database
    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);
  },

  onComplete: function () {
    ref.set({});
  }

};
