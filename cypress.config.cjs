const { defineConfig } = require('cypress')
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackOptions= webpackPreprocessor.defaultOptions;
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', webpackPreprocessor(webpackOptions))
    },
    supportFile: false
  }
});

/*
import { defineConfig } from 'cypress'
import webpackPreprocessor from '@cypress/webpack-preprocessor';
console.log(webpackPreprocessor);
export default defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return webpackPreprocessor(on, config);
      // return require('./cypress/plugins/index.cjs')(on, config)
      // return import('./cypress/plugins/index.cjs')(on, config);
    },
    supportFile: false
  },
})
*/
