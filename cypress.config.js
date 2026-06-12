const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://lets-teste-qa.lovable.app",
    video: true,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  }
});
