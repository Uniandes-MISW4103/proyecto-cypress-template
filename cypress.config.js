const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '7929191-23fa-4724-ae83-7da6a71391ca',
  e2e: {
    baseUrl: 'https://angular-6-registration-login-example.stackblitz.io',
  },
});
