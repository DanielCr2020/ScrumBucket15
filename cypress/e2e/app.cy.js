describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe("Find buttons upon landing", () => {
  it("Find sign up button", () => {
      cy.visit("http://localhost:3000/");
      cy.get("#signUpButton").should("have.text", "Sign Up");
  });
  it("Find log in button", () => {
      cy.visit("http://localhost:3000/");
      cy.get("#logInButton").should("have.text", "Log In");
  });
});