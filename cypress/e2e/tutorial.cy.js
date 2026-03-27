describe("Testing basic Angular registration", () => {
  beforeEach(() => {
    cy.visit("/register");
    cy.get("button").should("be.visible").click();
  });

  it("Test links between registration and login page", () => {
    cy.get("a.btn.btn-link").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/login`);
    cy.get("a.btn.btn-link").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/register`);
  });

  it("Test form feedback", () => {
    cy.get("button.btn.btn-primary").click();
    cy.get("div.invalid-feedback").should("have.length", 4);
  });

  it("Create an user and login", () => {
    cy.get("form").within(() => {
      cy.get('input[formcontrolname="firstName"]').type("Monitor");
      cy.get('input[formcontrolname="lastName"]').type("Pruebas");
      cy.get('input[formcontrolname="username"]').type("pruebas");
      cy.get('input[formcontrolname="password"]').type("MISO4208");
      cy.get("button.btn.btn-primary").click();
    });
    cy.get("div.alert.alert-success").should("be.visible");
    cy.get("form").within(() => {
      cy.get('input[formcontrolname="username"]').type("pruebas");
      cy.get('input[formcontrolname="password"]').type("MISO4208");
      cy.get("button.btn.btn-primary").click();
    });
    cy.get("h1").invoke("text").should("equal", "Hi Monitor!");
  });
});
