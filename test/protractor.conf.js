exports.config = {
  allScriptsTimeout: 30000,
  getPageTimeout: 30000,

  specs: [
    'e2e/*.js'
  ],

  sauceUser: 'lowe0292',
  sauceKey: '29826175-7af4-4fe9-b4ed-c57947527e15',

  multiCapabilities: [{
      'browserName': 'chrome'
    }, {
      'browserName': 'firefox'
    }, {
      'browserName': 'internet explorer'
    }],

  baseUrl: process.env.BASE_URL,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: function () {
    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);
  }
};
