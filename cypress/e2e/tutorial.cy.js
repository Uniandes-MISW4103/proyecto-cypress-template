// Example on an external demo (not the application under test): registration and login with the
// administrator credentials of the repository's .env.
const DEMO_URL = "https://angular-6-registration-login-example.stackblitz.io";
const [firstName, ...lastName] = Cypress.expose("ABP_ADMIN_NAME").split(" ");
const username = Cypress.expose("ABP_ADMIN_EMAIL");
const password = Cypress.expose("ABP_ADMIN_PASSWORD");

describe("Testing basic Angular registration", () => {
  beforeEach(() => {
    cy.visit(`${DEMO_URL}/register`);
    // StackBlitz shows "Starting dev server" before its run button appears, which can take
    // longer than Cypress' default 4 s timeout.
    cy.get("button", { timeout: 30000 }).should("be.visible").click();
  });

  it("Test links between registration and login page", () => {
    cy.get("a.btn.btn-link").click();
    cy.url().should("eq", `${DEMO_URL}/login`);
    cy.get("a.btn.btn-link").click();
    cy.url().should("eq", `${DEMO_URL}/register`);
  });

  it("Test form feedback", () => {
    cy.get("button.btn.btn-primary").click();
    cy.get("div.invalid-feedback").should("have.length", 4);
  });

  it("Create an user and login", () => {
    cy.get("form").within(() => {
      cy.get('input[formcontrolname="firstName"]').type(firstName);
      cy.get('input[formcontrolname="lastName"]').type(lastName.join(" "));
      cy.get('input[formcontrolname="username"]').type(username);
      cy.get('input[formcontrolname="password"]').type(password);
      cy.get("button.btn.btn-primary").click();
    });
    cy.get("div.alert.alert-success").should("be.visible");
    cy.get("form").within(() => {
      cy.get('input[formcontrolname="username"]').type(username);
      cy.get('input[formcontrolname="password"]').type(password);
      cy.get("button.btn.btn-primary").click();
    });
    cy.get("h1").invoke("text").should("equal", `Hi ${firstName}!`);
  });
});
