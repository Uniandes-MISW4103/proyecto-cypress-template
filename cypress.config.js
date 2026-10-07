const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://angular-6-registration-login-example.stackblitz.io',
  },
});
