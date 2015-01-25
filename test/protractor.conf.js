'use strict';
var Firebase;
var ref;

exports.config = {

  specs: [
    'e2e/*.js'
  ],

  sauceUser: 'lowe0292',
  sauceKey: '29826175-7af4-4fe9-b4ed-c57947527e15',

  baseUrl: process.env.BASE_URL,

  framework: 'jasmine',

  onPrepare: function () {
    Firebase = require('firebase');
    ref = new Firebase(process.env.FIREBASE_URL);
    ref.set({}); // empty the database
  },

  onComplete: function () {
    ref.set({});
  }

};
