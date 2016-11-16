/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-pouch',

  included: function included(app) {
    if (isFastBoot()) {
      app.import('vendor/ember-pouch/ember-pouch-fastboot.js');
    } else {
      var bowerDir = app.bowerDirectory;

      app.import(bowerDir + '/pouchdb/dist/pouchdb.js');
      app.import(bowerDir + '/relational-pouch/dist/pouchdb.relational-pouch.js');
      app.import('vendor/shims/pouchdb.js', {
        type: 'vendor',
        exports: {
          'pouchdb': [ 'default' ]
        }
      });
    }
  }
};

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
