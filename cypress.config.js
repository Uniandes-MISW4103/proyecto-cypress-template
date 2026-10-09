const { defineConfig } = require("cypress");
const abp = require("./abp.cjs");

module.exports = defineConfig({
  e2e: {
    // URL of the application under test (ABP_URL in the repository's .env).
    baseUrl: abp.ABP_URL,
  },
  // Available in the tests with Cypress.expose("ABP_ADMIN_EMAIL"), etc.
  expose: abp,
});
