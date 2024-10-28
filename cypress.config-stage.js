const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "suvvpd",
  // ...rest of the Cypress project config
  e2e: {
    watchForFileChanges: false,
    baseUrl:"https://sqlverifier-staging-08050d656f7a.herokuapp.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }  
});