const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "suvvpd",
  // ...rest of the Cypress project config
  e2e: {
    watchForFileChanges: false,
    baseUrl: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
